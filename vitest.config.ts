import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/src/**/*.{test,spec}.ts'],
    globals: true, // if you want describe/it/expect globally
    deps: {
      inline: true, // ensures ts dependencies are properly transformed
    },
    // threads: true, // run tests in parallel
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
