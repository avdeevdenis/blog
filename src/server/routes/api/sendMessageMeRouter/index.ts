/**
 * '/api/sendMessageMeRouter'
 * 
 * Роутер отправляет сообщение в телеграме на мой аккаунт, берет единственный параметр из тела ответа - text
 */
import { RequestHandler } from 'express';
import { AvdeevBot } from '../../../helpers/AvdeevBot';
import { sendErrorResponse, sendSuccessResponse } from '../../../helpers/send_response';

/**
 * Мой ID в телеграме
 */
const DENIS_TELEGRAM_ID = 348916796;

const sendMessageMeRouter: RequestHandler = async (req, res) => {
  AvdeevBot.auth();

  const AvdeevBotInstance = AvdeevBot.get();

  if (!AvdeevBotInstance) {
    return sendErrorResponse(res, {
      errorMessage: 'Error with getting bot instance.'
    });
  }

  const DEFAULT_TEXT = 'Hello World';

  const responseText = (
    req.body &&
    req.body.text
  ) || DEFAULT_TEXT;

  let error = null;

  try {
    AvdeevBotInstance.sendMessage(DENIS_TELEGRAM_ID, responseText)
      .catch((e: Error) => {
        error = JSON.stringify(e);
      })
  } catch (e: Error | unknown) {
    error = JSON.stringify(e);
  }

  if (error) {
    return sendErrorResponse(res, {
      errorMessage: error
    });
  }

  return sendSuccessResponse(res);
};

export { sendMessageMeRouter };
