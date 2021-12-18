const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: ['browserslist', 'es5'],
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.bundle.js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(react\-router))/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ProvidePlugin({ React: 'react' }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
