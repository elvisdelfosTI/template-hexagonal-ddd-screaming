import { log } from '@config/Logger.config';
import { checkDatabase } from '@config/database/Database.config';
import { startGrpcServer } from '@config/grpc/gRPCServer';
import { startHttpServer } from '@config/http/express/server';

const main = async () => {
  try {
    await checkDatabase();
    const [httpServer, grpcServer] = await Promise.all([
      startHttpServer(),
      startGrpcServer(),
    ]);
    return { httpServer, grpcServer };
  } catch (error) {
    log.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

main();
