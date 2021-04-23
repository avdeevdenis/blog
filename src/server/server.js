const express = require('express');
const next = require('next');
const parserUA = require('ua-parser-js');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

/**
 * Мой ID в телеграме
 */
const DENIS_TELEGRAM_ID = 348916796;

let AvdeevBot = null;

app.prepare().then(() => {
  const server = express();

  async function pingRouter(req, res) {
    console.log('pingRouter fn');

    if (!AvdeevBot) {
      console.log('no bot');
      const TelegramBot = require('node-telegram-bot-api');
      const token = process.env.TELEGRAM_API_TOKEN;
      AvdeevBot = new TelegramBot(token, {
        polling: true
      });
    }

    // const ua = parserUA(req.headers['user-agent']);

    console.log('send bot');
    const messageText = 'Ping';

    let RESPONSE_STATUS = 'SUCCESS';
    let error = null;

    try {
      // await AvdeevBot.sendMessage(9999 + DENIS_TELEGRAM_ID + 'k33', messageText)
      await AvdeevBot.sendMessage(DENIS_TELEGRAM_ID, messageText)
        .catch(e => {
          error = JSON.stringify(e);
          RESPONSE_STATUS = 'ERROR';
        })
    } catch (e) {
      error = JSON.stringify(e);
      RESPONSE_STATUS = 'ERROR';
    }

    return res.json({ RESPONSE_STATUS, error });
  }

  server.get('/ping', pingRouter);

  server.all('*', handle);

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
