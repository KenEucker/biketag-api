import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'

export default tseslint.config(
  // 1. TypeScript + Prettier config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
      },
      globals: {
        vi: true,
        describe: true,
        it: true,
        expect: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-async-promise-executor': 'off',
      semi: 'off',
      'prettier/prettier': 'warn',
    },
  },

  // 2. JS config
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
    },
  },

  // 3. Ignore patterns — this must be its own object!
  {
    ignores: [
      'dist/',
      'lib/',
      'src/coverage/',
      'vite.config.ts',
      'src/imgurClient/index.js',
      '_site/',
      'examples/',
      '*.md',
      '*.map',
      'index.js',
      'index.mjs',
    ],
  }
)
