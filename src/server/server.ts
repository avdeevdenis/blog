import express, { Request, Response } from 'express';

import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT || 3001;
export const handle = app.getRequestHandler();

const onServerListen = (err?: Error) => {
  if (err) throw err;

  console.log(`> Server started on http://localhost:${port}`);
};

(async () => {
  try {
    await app.prepare();

    const server = express();

    // server.get('/ping', pingRouter);

    // server.get('/message', (req, res) => messageRouter(req, res));

    server.all('*', (req: Request, res: Response) => handle(req, res));

    server.listen(port, onServerListen);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
