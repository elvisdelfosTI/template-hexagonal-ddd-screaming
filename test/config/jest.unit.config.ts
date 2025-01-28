import type { Config } from '@jest/types';
import { resolve } from 'path';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/../'],
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
  testMatch: ['<rootDir>/../**/*.test.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '.*\\.integration\\.test\\.ts$',
    'test/lib/.*/infrastructure/.*',
  ],
  verbose: true,
  rootDir: '.',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: resolve(__dirname, '../../tsconfig.json'),
      },
    ],
  },
};

export default config;
