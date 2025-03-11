import { resolve } from 'node:path';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/../'],
  maxWorkers: 4,
  moduleDirectories: ['node_modules', 'src'],
  cache: true,
  testMatch: ['<rootDir>/../**/*.test.ts'],
  testPathIgnorePatterns: [
    '/node_modules/(?!(@ngneat/falso)/)',
    '/dist/',
    '.*\\.integration\\.test\\.ts$',
    'test/lib/.*/infrastructure/.*',
  ],
  collectCoverage: false,
  verbose: true,
  rootDir: '.',
  moduleNameMapper: {
    '^#(.*)$': '<rootDir>/../src/lib/$1'
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
