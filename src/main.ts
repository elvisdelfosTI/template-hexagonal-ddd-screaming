import { startGrpcServer } from '#config/grpc/grpcserver';
import { startHttpServer } from '#config/http/express/server';
import { config, typeServer } from '#config/Environment.config';
(async () => {
  if (config.NODE_ENV !== typeServer.PROD) {
    await import('module-alias/register');
  }
  await Promise.allSettled(
    [
      startHttpServer(),
      startGrpcServer()
    ]);
})();