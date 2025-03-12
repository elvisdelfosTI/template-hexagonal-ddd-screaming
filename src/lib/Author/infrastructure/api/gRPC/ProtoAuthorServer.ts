import path from 'node:path';
import { dirname } from 'node:path';
import {
	type GrpcObject,
	type ServerUnaryCall,
	type ServiceDefinition,
	type UntypedServiceImplementation,
	loadPackageDefinition,
	type sendUnaryData,
} from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { AuthorDto } from '#author/application/UsesCases/UserSave/AuthorSaveDTO';
import ServiceContainer from '#shared/infrastructure/serviceContainer';

const url = dirname(require.resolve('./Author.proto'));

interface CreateAuthorRequest {
	id: number;
	name: string;
	email: string;
	password: string;
	age: number;
}

interface AuthorResponse {
	id: number;
	name: string;
	email: string;
	password: string;
	age: number;
}

interface AuthorCreateResponse {
	id: number;
}

interface AuthorListResponse {
	authors: AuthorResponse[];
}

const AuthorGrpcServer = {
	PROTO_PATH: path.resolve(url, './Author.proto'),
	proto: (
		loadPackageDefinition(
			protoLoader.loadSync(path.resolve(url, './Author.proto'), {
				keepCase: true,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true,
			}),
		).author as GrpcObject
	).AuthorService as unknown as {
		service: ServiceDefinition<UntypedServiceImplementation>;
	},

	protoWithReflection: protoLoader.loadSync(
		path.resolve(url, './Author.proto'),
		{
			keepCase: true,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true,
			json: true,
		},
	),

	Service: {
		GetAll: async (_: unknown, callback: sendUnaryData<AuthorListResponse>) => {
			try {
				const authors = await ServiceContainer.AuthorService.getAll.execute();
				const response: AuthorListResponse = {
					authors: authors.map((author) => ({
						id: author.id.value,
						name: author.name.value,
						email: author.email.value,
						password: author.password.value,
						age: author.age.value,
					})),
				};

				callback(null, response);
			} catch (error) {
				log.error('Error in GetAll:', error);
				callback(
					new Error(error instanceof Error ? error.message : 'Unknown error'),
					null,
				);
			}
		},

		CreateAuthor: async (
			call: ServerUnaryCall<CreateAuthorRequest, AuthorResponse>,
			callback: sendUnaryData<AuthorCreateResponse>,
		) => {
			const { id, name, email, password, age } = call.request;
			const author: AuthorDto = {
				id: id,
				name: name,
				email: email,
				password: password,
				age: age,
			};
			const db: AuthorCreateResponse = {
				id: (await ServiceContainer.AuthorService.save.execute(author)) || 0,
			};
			callback(null, db);
			return db;
		},
	},
};

export { AuthorGrpcServer };
