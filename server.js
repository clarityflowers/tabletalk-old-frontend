"use strict";
const express = require('express');

if (process.env.NODE_ENV == 'production') {
  const fallback = require('express-history-api-fallback')
  const app = express();
  const root = `${__dirname}/public`;
  app.use(express.static('public'));
  app.use(fallback('index.html', { root } ));
  app.listen(process.env.PORT, function() {
    console.log('Server started on port ' + process.env.PORT);
  })
}
else {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.config.js');

  config.output.path = '/public';
  config.devtool = 'cheap-module-eval-source-map';
  config.entry.unshift('webpack-hot-middleware/client');
  config.module.loaders[0].loaders.unshift('react-hot');
  config.module.loaders[1].loaders.unshift('react-hot');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  var compiler = webpack(config);

  config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");
  config.output.path = '/' + config.output.path;

  var port = process.env.PORT;
  var ip = '0.0.0.0';
  var server =  new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      historyApiFallback: true,
      hot: true
  })

  server.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
  }));

  server.use(require('webpack-hot-middleware')(compiler));

  server.use(express.static('public'));
  server.listen(port, ip, function (err) {
      if(err) {
          return console.error(err);
      }

      console.log('Listening at ' + ip + ':' + port);
  });
}
