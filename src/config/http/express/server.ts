
import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import route from './route';
import { log } from 'src/config/Logger.config';
import { config, typeServer } from 'src/config/Environment.config';
const app = express();

const  configureMiddlewares = ()=> {
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  app.use(express.json());
  app.use(
    morgan(':method :url :status :response-time ms', {
      stream: {
        write: (message) => console.log(`🌐 ${message.trim()}`),
      },
    }),
  );
  app.use('/api/v1', route);
}

const configureErrorHandling = () => {
  app.use((err: unknown, _: Request, res: Response, _next: NextFunction) => {
    log.error(err);
    const statusCode =
      err instanceof Error
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err instanceof Error ? err.message : 'Something broke.!';
    res.status(statusCode).json({ errors: { message } });
  });
}

export function startHttpServer() {
  configureMiddlewares();
  configureErrorHandling();
  const PORT = config.PORT;
  const baseUrl = 'http://localhost';
  app.listen(PORT, () => {
    if (config.NODE_ENV !== typeServer.PROD) {
      log.info(`🗄️  Database: ${config.DATABASE_URL}`);
      log.info(`🚀 Server is running at ${baseUrl}:${PORT}`);
    }
  });
}
