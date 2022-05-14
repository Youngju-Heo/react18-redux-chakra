import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BaseHrefWebpackPlugin } from "base-href-webpack-plugin";

const config: Configuration = {
  mode: 'production',
  entry: './src/render/index.tsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[contenthash].js',
    publicPath: '/ds-system/app/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[contenthash].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new BaseHrefWebpackPlugin({ baseHref: '/ds-system/app/' }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/render/assets', to: 'assets' },
        {from: 'public/authenticate.json', to: 'authenticate.json', noErrorOnMissing: true},
        {from: "public/favicon.ico", to: "favicon.ico", noErrorOnMissing: true},
      ],
    }),
  ],
};

export default config;
