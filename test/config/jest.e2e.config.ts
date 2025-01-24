import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/../'],
  testMatch: ['<rootDir>/../**/*.e2e.test.ts'],
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
    '^@author/(.*)$': '<rootDir>/../src/lib/Author/$1',
    '^@book/(.*)$': '<rootDir>/../src/lib/Book/$1',
    '^@auth/(.*)$': '<rootDir>/../src/lib/Auth/$1',
    '^@shared/(.*)$': '<rootDir>/../src/lib/shared/$1',
    '^@common/(.*)$': '<rootDir>/../src/common/$1',
    '^@prisma$': '<rootDir>/../src/prisma'
  },
  moduleDirectories: ['node_modules', 'src'],
  verbose: true,
};

export default config;
