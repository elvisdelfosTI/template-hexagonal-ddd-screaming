import { log } from '@config/Logger.config';
import { db } from './drizzle/drizzle';

//import { prismaClient } from './prisma/prisma';

//const clientDb = prismaClient;
const clientDb = db

const checkDatabase = async () => {
  const result = await clientDb.execute('SELECT 1');
  if (result) {
    log.info('🗄️  Database is connected Successfully');
  } else {
    log.error('❌ Database is not connected');
  }
}

export { clientDb, checkDatabase  };
