import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'src/coverage/',
      'vite.config.ts',
      'src/imgurClient/index.js',
      '_site/',
      'examples',
      'dist',
      'lib',
      '*.md',
      'index.js',
      'index.js.map',
      'index.mjs',
      'index.mjs.map',
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
      },
      globals: {
        // Optional if needed for Vitest
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
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
    },
  }
)
