import express, { Response, Request, NextFunction } from 'express';
import { Logger, ILogObj } from 'tslog';
import morgan from 'morgan';
import { responseFormatter } from './lib/Author/infrastructure/api/express/middleware/ResponseFormatter';
import { route } from './route';
import { StatusCodes } from 'http-status-codes';

const app = express();
const log: Logger<ILogObj> = new Logger();

function configureMiddlewares() {
  app.use(express.json());
  app.use(
    morgan(':method :url :status :response-time ms', {
      stream: {
        write: (message) => console.log(`🌐 ${message.trim()}`),
      },
    }),
  );
  app.use(responseFormatter);
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
  const PORT = process.env.PORT || 3000;
  const baseUrl = `http://localhost`;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at ${baseUrl}:${PORT}`);
    console.log(
      `📜 Documentation is running at http://localhost:${PORT}/api/v1/documentation`,
    );
  });
}

configureMiddlewares();
configureErrorHandling();
startServer();
