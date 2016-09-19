module.exports = {
  entry: './public/index.js',
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css'}
    ]
  }
};
