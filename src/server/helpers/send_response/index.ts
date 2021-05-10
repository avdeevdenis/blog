import { Response } from 'express';

const sendSuccessResponse = (res: Response, responseData: Object = {}) => {
  return res.json({
    success: true,
    ...responseData
  });
};

const sendErrorResponse = (res: Response, responseData: Object = {}) => {
  return res.json({
    error: true,
    ...responseData
  });
};

export { sendSuccessResponse, sendErrorResponse };
