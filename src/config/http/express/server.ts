import { config } from '@config/Environment.config';
import { log } from '@config/Logger.config';
import { errorHandler } from '@config/http/express/ErrorHandler';
import cors from 'cors';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import route from './router';

const app = express();

const configureMiddlewares = () => {
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
        write: (message) => log.info(`🌐 ${message.trim()}`),
      },
    }),
  );
  app.use('/api/v1', route);
  app.use(errorHandler);
};

export function startHttpServer() {
  configureMiddlewares();
  const PORT = process.env.PORT || config.PORT;
  app.listen(PORT, () => {
    log.info('🗄️  Database is connected Successfully');
    log.info('🚀 HTTP Server is running Successfully');
  });
}
