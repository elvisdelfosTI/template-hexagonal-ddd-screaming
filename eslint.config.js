import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.{ts,tsx,js}'],
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'standard',
    ],
    rules: {
      eqeqeq: ['error', 'always'],
      'prettier/prettier': 'error',
      'no-empty-function': 'error',
      'no-implicit-coercion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      'no-empty-function': ['error', { allow: ['constructors'] }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ]
    },
    ignores: ['node_modules/', 'dist/', 'build/', '.cache/', '.turbo/'], // Ignorar directorios comunes
  },
];
