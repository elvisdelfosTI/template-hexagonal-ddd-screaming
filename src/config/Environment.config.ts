import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const environmentSchema = z.object({
  PORT: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .default('8080'),
  ARCHETYPE_HEXAGONAL_DATABASE_NAME: z.string(),
  ARCHETYPE_HEXAGONAL_DATABASE_HOST: z.string(),
  ARCHETYPE_HEXAGONAL_DATABASE_PORT: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .default('5432'),
  ARCHETYPE_HEXAGONAL_DATABASE_USER: z.string(),
  ARCHETYPE_HEXAGONAL_DATABASE_PASSWORD: z.string(),
  PORT_GRPC: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .default('50051'),
  ARCHETYPE_HEXAGONAL_API_JWT_SECRET: z.string(),
  ARCHETYPE_HEXAGONAL_API_JWT_EXPIRES: z.string(),
});

export const config = environmentSchema.parse(process.env);
