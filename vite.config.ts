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
      name: 'BikeTag',
      //   formats: ['es', 'cjs'],
      fileName: (format) => `biketag.${format}.js`,
    },
    rollupOptions: {
      plugins: [nodePolyfills()],
      output: {
        exports: 'named',
        globals: {
          imgur: 'ImgurClient',
          '@sanity/client': 'sanityClient',
          axios: 'axios',
          events: 'events',
          lodash: 'lodash',
          tinycache: 'TinyCache',
          'axios-cache-adapter': 'axiosCacheAdapter',
        },
      },
      //   external: ['imgur', 'imgur/common/types'],
    },
  },
})
