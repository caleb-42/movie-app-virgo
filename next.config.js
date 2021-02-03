/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript();
module.exports = { distDir: 'build' };

const isProd = process.env.NODE_ENV === 'production';

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  ...withSass({
    webpack(config, { isServer }) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
          'webp-loader',
        ],
      });
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));

      return config;
    },
  }),
});
