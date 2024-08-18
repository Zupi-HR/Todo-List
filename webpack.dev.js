const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: {
          directory: path.join(__dirname, 'dist'),
        },
        watchFiles: ["src/*.html"],
      hot: true,
    },
    optimization: {
        runtimeChunk: 'single',
      },
});