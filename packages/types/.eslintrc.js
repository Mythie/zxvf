/**
 * @type import('eslint').Linter.Config
 */
module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',

    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'index',
            position: 'after',
          },
          {
            pattern: '~icons/**',
            group: 'index',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
