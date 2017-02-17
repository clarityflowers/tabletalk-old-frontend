const path = require('path');
var webpack = require('webpack');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=latest&presets[]=react&presets[]=stage-3']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
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
    new InlineEnvironmentVariablesPlugin([
      'GOOGLE_CLIENT_ID',
      'PORT',
      'NODE_ENV',
      'API_URL'
    ])
  ]
};
