module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['google', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import-helpers'],
  rules: {
    'require-jsdoc': 'off',
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          ['module', 'absolute'],
          ['/^~/'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {order: 'asc', ignoreCase: true},
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
