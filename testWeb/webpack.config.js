var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry:{
    app: './app.js'
  },
  outpput:{
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};