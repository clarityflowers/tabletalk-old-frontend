const path = require('path');
var webpack = require('webpack');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const src = path.join(__dirname, 'app');

const resplendence = require('resplendence');
const rxConfig = resplendence.config({src: src, ext: '.scss'});

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'app/common'),
      utils: path.resolve(__dirname, 'app/utils')
    },
    modules: [
      "node_modules",
      path.resolve(src),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["stage-3", "react", "latest"]
            },
          },
          rxConfig.loader
        ],
        include: src
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", 
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        include: src
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ],
        include: src 
      }
    ]
  },
  plugins: [
    new InlineEnvironmentVariablesPlugin([
      'GOOGLE_CLIENT_ID',
      'PORT',
      'NODE_ENV',
      'API_URL'
    ]),
    rxConfig.plugin
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};
