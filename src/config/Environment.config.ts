import { z } from 'zod';

export enum typeServer {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
  QA = 'qa',
  LOCAL = 'local',
}

const environmentSchema = z.object({
  NODE_ENV: z
    .enum([
      typeServer.DEV,
      typeServer.PROD,
      typeServer.TEST,
      typeServer.QA,
      typeServer.LOCAL,
    ])
    .default(typeServer.DEV),
  PORT: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .default('3000'),
  DATABASE_URL: z.string(),
  PORT_GRPC: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .default('50051'),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof environmentSchema> {}
  }
}

export const config = environmentSchema.parse(process.env);
