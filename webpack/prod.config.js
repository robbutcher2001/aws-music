const baseConfig = require('./base.config.js');

const webpack = require('webpack');

module.exports = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),
  ]
});
