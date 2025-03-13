import { AuthorGrpcServer } from '@author/infrastructure/api/gRPC/ProtoAuthorServer';
import * as grpc from '@grpc/grpc-js';
import { ReflectionService } from '@grpc/reflection';
import { config } from '../Environment.config';
import { log } from '../Logger.config';

export async function startGrpcServer() {
  try {
    const server = new grpc.Server();
    server.addService(AuthorGrpcServer.proto.service, AuthorGrpcServer.Service);
    const reflection = new ReflectionService(
      AuthorGrpcServer.protoWithReflection,
    );
    reflection.addToServer(server);

    await new Promise<void>((resolve, reject) => {
      server.bindAsync(
        `0.0.0.0:${config.PORT_GRPC}`,
        grpc.ServerCredentials.createInsecure(),
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          log.info(
            `🥾 gRPC Server running at grpc://localhost:${config.PORT_GRPC}`,
          );
          resolve();
        },
      );
    });
  } catch (error) {
    log.error('Error setting up reflection:', error);
  }
}
