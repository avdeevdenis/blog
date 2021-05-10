import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT || 3001;

const handle = app.getRequestHandler();

export { app, handle, port };

