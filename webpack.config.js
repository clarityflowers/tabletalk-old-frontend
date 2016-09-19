const path = require('path');

module.exports = {
  entry: './modules/index.js',
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
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'modules'),
      path.join(__dirname, 'style')
    ]
  },
  sassLoader: {
    includePaths: [ 'style' ]
  }
};
