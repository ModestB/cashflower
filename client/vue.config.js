const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
  },
  devServer: {
    proxy: 'http://localhost:8080'
  }
}