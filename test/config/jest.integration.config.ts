import type { Config } from '@jest/types';
import { resolve } from 'node:path';
const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/../'],
	testMatch: ['<rootDir>/../**/*.integration.test.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.json',
			},
		],
	},
	moduleNameMapper: {
		'^#author/(.*)$': resolve(__dirname, '../../src/lib/Author/$1'),
		'^#book/(.*)$': resolve(__dirname, '../../src/lib/Book/$1'),
		'^#auth/(.*)$': resolve(__dirname, '../../src/lib/Auth/$1'),
		'^#shared/(.*)$': resolve(__dirname, '../../src/lib/shared/$1'),
		'^#common/(.*)$': resolve(__dirname, '../../src/common/$1'),
		'^#prisma$': resolve(__dirname, '../../src/prisma'),
		'^test/(.*)$': resolve(__dirname, '../../test/$1'),
		'^src/(.*)$': resolve(__dirname, '../../src/$1'),
	},
	moduleDirectories: ['node_modules', 'src'],
	verbose: true,
};

export default config;
