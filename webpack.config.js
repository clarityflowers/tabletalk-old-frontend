const path = require('path');

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
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'app'),
    ]
  },
  sassLoader: {
    includePaths: [ 'style' ]
  }
};
