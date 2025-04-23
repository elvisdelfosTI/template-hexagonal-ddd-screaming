import { config } from '@config/Environment.config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../../drizzle/schema';

const pool = new Pool({
  host: config.ARCHETYPE_HEXAGONAL_DATABASE_HOST,
  port: config.ARCHETYPE_HEXAGONAL_DATABASE_PORT,
  user: config.ARCHETYPE_HEXAGONAL_DATABASE_USER,
  password: config.ARCHETYPE_HEXAGONAL_DATABASE_PASSWORD,
  database: config.ARCHETYPE_HEXAGONAL_DATABASE_NAME,
});

export const db = drizzle(pool, { schema });
