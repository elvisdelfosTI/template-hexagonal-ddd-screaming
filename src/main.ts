(async () => {
  if (process.env.NODE_ENV === 'production') {
    await import('module-alias/register');
  }
})();

import express from 'express';
import { Logger } from 'tslog';
import morgan from 'morgan';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import route from './route';
import * as grpc from '@grpc/grpc-js';
import { ReflectionService } from '@grpc/reflection';
import cors from 'cors';

import { AuthorGrpcServer } from './lib/Author/infrastructure/api/gRPC/ProtoAuthorServer';
const app = express();
const log = new Logger();

function configureMiddlewares() {
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

function configureErrorHandling() {
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

function startServer() {
  const PORT = process.env.PORT_REST || 3000;
  const baseUrl = `http://localhost`;
  app.listen(PORT, () => {
    if (process.env.ENV !== 'production') {
      console.log(`🗄️  Database: ${process.env.DATABASE_URL}`);
      console.log(`🚀 Server is running at ${baseUrl}:${PORT}`);
    }
  });
}

async function bootstrap() {
  try {
    const server = new grpc.Server();
    server.addService(AuthorGrpcServer.proto.service, AuthorGrpcServer.Service);
    const reflection = new ReflectionService(
      AuthorGrpcServer.protoWithReflection,
    );
    reflection.addToServer(server);

    await new Promise<void>((resolve, reject) => {
      server.bindAsync(
        `0.0.0.0:${process.env.PORT_GRPC}`,
        grpc.ServerCredentials.createInsecure(),
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          console.log(
            `🥾 gRPC Server running at grpc://localhost:${process.env.PORT_GRPC}`,
          );
          resolve();
        },
      );
    });
  } catch (error) {
    console.error('Error setting up reflection:', error);
  }
}

configureMiddlewares();
configureErrorHandling();
startServer();
bootstrap();
