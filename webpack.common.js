import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ProvidePlugin } from 'webpack';

export const entry = './src/index.js';
export const resolve = {
  extensions: ['.js', '.jsx'],
};
export const output = {
  path: join(__dirname, 'dist'),
  filename: 'bundle.js',
  clean: true,
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: join(__dirname, '..', 'node_modules'),
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ],
};
export const plugins = [
  new ProvidePlugin({ React: 'react' }),
  new HtmlWebpackPlugin({ template: './public/index.html' }),
];
