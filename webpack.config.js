const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js',
      publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {

        test: /\.(js|jsx)$/,
        
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          //fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};

module.exports = config;
