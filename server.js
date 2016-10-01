"use strict";
const express = require('express');

if (process.env.NODE_ENV == 'production') {
  let app = express();

  app.use(express.static('public'));

  app.listen(process.env.PORT, function() {
    console.log('Server started on port ' + process.env.PORT);
  })
}
else {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var config = require('./webpack.config.js');
  config.entry.unshift("webpack-dev-server/client?http://localhost:8080/")

  var port = process.env.PORT;
  var ip = '0.0.0.0';
  var server =  new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      historyApiFallback: true,
  })
  server.use(express.static('public'));
  server.listen(port, ip, function (err) {
      if(err) {
          return console.log(err);
      }

      console.log('Listening at ' + ip + ':' + port);
  });
}
