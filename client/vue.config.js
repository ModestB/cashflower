const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
  }
}