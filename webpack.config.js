module.exports = {
  entry: './public/index.js',
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
      { test: /\.css$/, loader: 'style!css'}
    ]
  }
};
