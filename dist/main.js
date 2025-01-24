"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("module-alias/register");
const express_1 = tslib_1.__importDefault(require("express"));
const tslog_1 = require("tslog");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const http_status_codes_1 = require("http-status-codes");
const route_1 = tslib_1.__importDefault(require("./route"));
const grpc = tslib_1.__importStar(require("@grpc/grpc-js"));
const reflection_1 = require("@grpc/reflection");
const ProtoAuthorServer_1 = require("./lib/Author/infrastructure/api/gRPC/ProtoAuthorServer");
const app = (0, express_1.default)();
const log = new tslog_1.Logger();
function configureMiddlewares() {
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)(':method :url :status :response-time ms', {
        stream: {
            write: (message) => console.log(`🌐 ${message.trim()}`),
        },
    }));
    app.use('/api/v1', route_1.default);
}
function configureErrorHandling() {
    app.use((err, _, res, _next) => {
        log.error(err);
        const statusCode = err instanceof Error
            ? http_status_codes_1.StatusCodes.BAD_REQUEST
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        const message = err instanceof Error ? err.message : 'Something broke.!';
        res.status(statusCode).json({ errors: { message } });
    });
}
function startServer() {
    const PORT = process.env.PORT_REST || 3000;
    const baseUrl = `http://localhost`;
    app.listen(PORT, () => {
        if (process.env.ENV !== 'PROD') {
            console.log(`🗄️  Database: ${process.env.DATABASE_URL}`);
            console.log(`🚀 Server is running at ${baseUrl}:${PORT}`);
            console.log(`📜 Documentation is running at http://localhost:${PORT}/api/v1/documentation`);
        }
    });
}
async function bootstrap() {
    try {
        const server = new grpc.Server();
        server.addService(ProtoAuthorServer_1.AuthorGrpcServer.proto.service, ProtoAuthorServer_1.AuthorGrpcServer.Service);
        const reflection = new reflection_1.ReflectionService(ProtoAuthorServer_1.AuthorGrpcServer.protoWithReflection);
        reflection.addToServer(server);
        await new Promise((resolve, reject) => {
            server.bindAsync(`0.0.0.0:${process.env.PORT_GRPC}`, grpc.ServerCredentials.createInsecure(), (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log(`🥾 gRPC Server running at grpc://localhost:${process.env.PORT_GRPC}`);
                resolve();
            });
        });
    }
    catch (error) {
        console.error('Error setting up reflection:', error);
    }
}
configureMiddlewares();
configureErrorHandling();
startServer();
bootstrap();
