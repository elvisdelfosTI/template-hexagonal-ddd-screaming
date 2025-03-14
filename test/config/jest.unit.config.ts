import { resolve } from 'node:path';
import type { Config } from '@jest/types';

const rootDir = resolve(__dirname, '../..');

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: process.cwd(),
  roots: ['<rootDir>/src', '<rootDir>/test'],
  maxWorkers: 4,
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: [rootDir],
  cache: true,
  testMatch: ['<rootDir>/../**/*.test.ts'],
  testPathIgnorePatterns: [
    '/node_modules/(?!(@ngneat/falso)/)',
    '/dist/',
    '.*\\.integration\\.test\\.ts$',
    'test/lib/.*/infrastructure/.*',
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'cobertura'],
  coverageDirectory: './coverage',
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/lib/$1',
    '^@author/(.*)$': '<rootDir>/src/lib/Author/$1',
  },
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
