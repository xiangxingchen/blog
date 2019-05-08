const path = require('path');
const MyPlugin = require('./src/MyPlugin.js')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  plugins:[
    new MyPlugin()
  ]
};
