import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default defineConfig({
  plugins: [dts()],
  build: {
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BikeTagClient',
    },
    rollupOptions: {
      plugins: [nodePolyfills()],
      output: {
        exports: 'named',
        globals: {
          'form-data': 'formData',
          '@aws-sdk/client-s3': 'S3Client',
          stream: 'stream',
          imgur: 'ImgurClient',
          axios: 'axios',
          events: 'events',
          lodash: 'lodash',
          tinycache: 'TinyCache',
          '@sanity/client': 'SanityClient',
          'axios-cache-interceptor': 'axiosCacheInterceptor',
        },
      },
    },
  },
})
