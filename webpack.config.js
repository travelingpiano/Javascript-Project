const webpack = require('webpack');

module.exports = {
  entry: './lib/entry.js',
  output: {
    filename: './lib/bundle.js',
  },
  module: {
    loaders: [{
      test: [/\.jsx?$/, /\.js?$/],
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};
