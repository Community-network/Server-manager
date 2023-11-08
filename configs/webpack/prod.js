// production config
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const { GenerateSW } = require("workbox-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
    new GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /assets/,
          handler: "CacheFirst",
        },
        {
          urlPattern: new RegExp(
            "^https://fonts.(?:googleapis|gstatic).com/(.*)",
          ),
          handler: "CacheFirst",
        },
        {
          urlPattern: new RegExp("^https://unpkg.com/(.*)"),
          handler: "CacheFirst",
        },
      ],
    }),
  ],
});
