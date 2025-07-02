import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default defineConfig({
  plugins: [dts()],
  optimizeDeps: {
    exclude: [
      '@aws-sdk/crc64-nvme-crt',
      '@aws-sdk/signature-v4-crt',
      ' @aws-sdk/signature-v4a',
    ],
  },
  build: {
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BikeTagClient',
    },
    rollupOptions: {
      plugins: [nodePolyfills()],
      external: [
        '@aws-sdk/crc64-nvme-crt',
        '@aws-sdk/signature-v4-crt',
        '@aws-sdk/signature-v4a',
      ],
      output: {
        exports: 'named',
        globals: {
          imgur: 'ImgurClient',
          axios: 'axios',
          util: 'util',
          lodash: 'lodash',
          tinycache: 'TinyCache',
          'form-data': 'formData',
          '@aws-sdk/client-s3': 'S3Client',
          '@aws-sdk/s3-request-presigner': 'S3RequestPresigner',
          '@sanity/client': 'SanityClient',
          'axios-cache-interceptor': 'axiosCacheInterceptor',
        },
      },
    },
  },
})
