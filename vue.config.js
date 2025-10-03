const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules'
      ],
      alias: {
        cesium: path.resolve(__dirname, 'node_modules/cesium/Source'),
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
          { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
          { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
          { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' },
        ],
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./'),
      }),
    ],
  },
}