// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1';

export interface ITelegramBot {
  sendMessage: (chatId: number, message: string) => Promise<unknown>;
}

/**
 * API для взаимодействия с телеграм ботом
 */
class AvdeevBot {
  static instance: ITelegramBot | null = null;

  static get() {
    return this.instance;
  }

  /**
   * Устанавливаем instance бота
   */
  static set() {
    const TelegramBot = require('node-telegram-bot-api');
    const token = process.env.TELEGRAM_API_TOKEN;

    let AvdeevBot = new TelegramBot(token, {
      polling: true
    });

    this.instance = AvdeevBot;
  }

  /**
   * Разово устанавливаем instance бота, затем возвращаем имеющийся
   */
  static auth() {
    if (this.get() === null) {
      this.set();
    }
  }
}


export { AvdeevBot };
