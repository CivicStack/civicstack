const path = require('path')
const webpack = require('webpack')

const paths = {
  app: path.join(__dirname, 'lib', 'app'),
  home: path.join(__dirname, 'lib', 'app', 'home.js'),
  build: path.join(__dirname, 'dist')
}

const entry = commonEntry => ({
  home: [...commonEntry, paths.home],
  vendors: ['react']
})

const resolve = {
  extensions: ['', '.js', '.jsx']
}

const output = {
  path: paths.build,
  filename: '[name].js',
  publicPath: '/dist/',
}

const loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [paths.app]
  }
]

module.exports = {
  entry: entry(['babel-polyfill', 'webpack-hot-middleware/client']),
  resolve,
  output,
  module: { loaders },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
