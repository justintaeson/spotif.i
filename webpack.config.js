require('dotenv/config');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server/public');

module.exports = {
  context: clientPath,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    main: './index.jsx',
    login: './login.js'
  },
  output: {
    path: serverPublicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: clientPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    static: {
      directory: serverPublicPath,
      publicPath: '/',
      watch: true
    },
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`,
      '/': `http://localhost:${process.env.PORT}`
    }
  },
  performance: {
    hints: false
  },
  plugins: [new webpack.EnvironmentPlugin(['CLIENT_ID', 'REDIRECT_URI'])]
};
