const path = require('path');
var webpack = require('webpack');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react']
      },
      {
        test: /\.scss$/,
        loaders: ['react-hot', 'style', 'css?sourceMap', 'sass?sourceMap']
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    root: [
      path.resolve('./app')
    ]
  },
  sassLoader: {
    includePaths: [ 'app' ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new InlineEnvironmentVariablesPlugin([
      'GOOGLE_CLIENT_ID',
      'PORT',
      'NODE_ENV',
      'API_URL'
    ])
  ]
};
