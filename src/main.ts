import express from 'express';

import { Logger, ILogObj } from 'tslog';
import { Response, Request, NextFunction } from 'express';
import { authorRouter } from './lib/Author/infrastructure/api/express/ExpressAuthorRouter';
import { responseFormatter } from './lib/Author/infrastructure/api/express/middleware/ResponseFormatter';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
const app = express();

app.use(express.json());

// * LOGGER
const log: Logger<ILogObj> = new Logger();
const customTinyFormat = ':method :url :status :response-time ms';
const customMorgan = morgan(customTinyFormat, {
  skip: (_, _res) => false,
  stream: {
    write: (message) => {
      console.log(`🌐 ${message.trim()}`);
    },
  },
});
app.use(customMorgan);

// * ROUTES
app.use(express.json());
app.use(responseFormatter);
app.use(authorRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: unknown, _: Request, res: Response, _next: NextFunction) => {
  log.error(err);
  if (err instanceof Error) {
    res.status(502).json(err.message);
  } else {
    res.status(500).json({
      errors: { message: 'Something broke.!' },
    });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running at http://localhost:3000');
  console.log('📜 Documentation is running at http://localhost:3000/api-docs/');
});
