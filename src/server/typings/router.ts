import { IncomingMessage, ServerResponse } from 'http';

/**
 * Тип для роутера по-умолчанию
 */
export type IDefaultRouter = (req: IncomingMessage, res: ServerResponse) => void;
