import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/test'],
	testMatch: ['**/*.test.ts'],
	testPathIgnorePatterns: [
		'/node_modules/',
		'/dist/',
		'.*\\.integration\\.test\\.ts$',
		'test/lib/.*/infrastructure/.*',
	],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
	verbose: true,
};

export default config;
