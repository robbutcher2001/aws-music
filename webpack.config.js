const path = require('path');
const htmlwebpack = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new htmlwebpack({
      template: path.join(path.resolve(__dirname, 'src'), 'index.html'),
    }),
  ]
};
