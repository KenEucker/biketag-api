const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const generalConfig = {
  devtool: 'cheap-module-source-map',
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      stream: require.resolve('stream-browserify'),
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
  } else if (argv.mode === 'production') {
    nodeConfig.devtool = false
    browserConfig.devtool = false
  } else {
    throw new Error('Specify env')
  }

  return [nodeConfig, browserConfig]
}
