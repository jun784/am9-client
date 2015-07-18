var webpack = require('webpack');

module.exports = {
  output: {
    filename: 'main.js'
  },
  resolve: {
    root: ['bower_components'],
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main'])
    )
  ],
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html-loader'},
      {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  }
};
