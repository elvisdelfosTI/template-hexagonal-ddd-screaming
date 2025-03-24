import { config } from '@config/Environment.config';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    database: config.ARCHETYPE_HEXAGONAL_DATABASE_NAME,
    host: config.ARCHETYPE_HEXAGONAL_DATABASE_HOST,
    port: config.ARCHETYPE_HEXAGONAL_DATABASE_PORT,
    user: config.ARCHETYPE_HEXAGONAL_DATABASE_USER,
    password: config.ARCHETYPE_HEXAGONAL_DATABASE_PASSWORD,
    //ssl: { rejectUnauthorized: false }, //NOTE: This is to avoid the SSL error
    ssl: false,
  },
});
