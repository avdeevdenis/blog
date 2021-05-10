import express, { Request, Response } from 'express';

import { app, handle, port } from './helpers/get_server';
import { sendMessageMeRouter } from './routes/api/sendMessageMeRouter';

const onServerListen = (err?: Error) => {
  if (err) throw err;

  console.log(`> Server started on http://localhost:${port}`);
};

const startServer = async () => {
  await app.prepare();

  const server = express();

  /**
   * Access to get a variables from response data
   */
  server.use(express.json());
  server.use(express.urlencoded({
    extended: true
  }));

  server.all('/api/sendMessageMe', sendMessageMeRouter);

  server.all('*', (req: Request, res: Response) => handle(req, res));

  server.listen(port, onServerListen);
};

try {
  startServer();
} catch (e) {
  console.error(e);
  process.exit(1);
}
