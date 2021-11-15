const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const generalConfig = {
  devtool: false,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  performance: {
    maxAssetSize: 1550000,
    maxEntrypointSize: 1550000,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve("crypto-browserify"),
    },
  },
}

const nodeConfig = {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'biketag.node.js',
    libraryTarget: 'umd'
  },
}

const browserConfig = {
  entry: './src/index.ts',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'biketag.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true,
    library: 'biketag',
  },
}

module.exports = (env, argv) => {
  Object.assign(nodeConfig, generalConfig)
  Object.assign(browserConfig, generalConfig)

  if (argv.mode === 'development') {
    nodeConfig.devtool = 'cheap-module-source-map'
    browserConfig.devtool = 'cheap-module-source-map'
    nodeConfig.performance.maxAssetSize *= 2
    browserConfig.performance.maxAssetSize *= 2
    nodeConfig.performance.maxEntrypointSize *= 2
    browserConfig.performance.maxEntrypointSize *= 2
  } else if (argv.mode === 'production') {} else {
    throw new Error('Specify env')
  }

  return [nodeConfig, browserConfig]
}
