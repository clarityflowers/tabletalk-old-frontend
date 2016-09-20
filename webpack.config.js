const path = require('path');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

module.exports = {
  entry: './app/index.js',
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
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
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
      'NODE_ENV'
    ])
  ]
};
