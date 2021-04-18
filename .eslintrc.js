module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    semi: 'off',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
}
