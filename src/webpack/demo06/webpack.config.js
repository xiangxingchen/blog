const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      }
    ]
  },
  resolveLoader: {
    modules: [path.join(__dirname, '/src/loader')]
  },
  devServer: {
    contentBase: './dist',
    overlay: {
      warnings: true,
      errors: true
    },
    open: true
  }
}
