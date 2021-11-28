const path = require('path');

module.exports = {
  entry: './server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
        directory: path.join(__dirname, "dist"),
    },
    port: 4000,
    open: true
  }
};