import { log } from '@config/Logger.config';
import { db } from './drizzle/drizzle';

//import { prismaClient } from './prisma/prisma';

//const clientDb = prismaClient;
const clientDb = db;

const checkDatabase = async () => {
  try {
    const result = await clientDb.execute('SELECT 1');
    log.error(result);
    log.error('✅ Database is connected');
  } catch (error) {
    log.error('❌ Database is not connected');
    log.error(error);
  }
};

export { clientDb, checkDatabase };
