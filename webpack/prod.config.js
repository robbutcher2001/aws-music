const baseConfig = require('./base.config.js');

const webpack = require('webpack');

module.exports = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __API_BASE__: JSON.stringify('/api')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      }
    })
  ]
});
