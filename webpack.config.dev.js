const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// declare node environment, this is important for Babel plugin
process.env.NODE_ENV = "development";

// declare object that configures webpack
module.exports = {
  mode: "development",
  target: "web", // could be node when it runs as node app only
  devTool: "cheap-module-source-map", // generally recommended for development
  entry: "./src/index", // declare apps entry point
  output: {
    // where webpack outputs; for development it puts it only in-memory; in prod this would be .dist
    path: path.resolve(__dirname, "build"),
    publicPath: "/", // this setting specifies public url
    filename: "bundle.js", // for dev no physical file but html needs it even though bundle.js is serverd from in-memory
  },
  devServer: {
      stats: 'minimal', // limits information written to  command line
      overlay: true, // overlay any errors taht occur in the browser
      historyApiFallback: true, // so that all links will be handled by React Router!
      // three below is due to an issue between chrome and webpack
      disableHostCheck: true,
      header: {"Access-Control-Allow-Origin": *},
      https: false
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: "src/index.html", // where to find index.html
          favicon: "src/favicon.ico"
      })
  ],
  // tell webpack what files to handle
  // first rule for JS files / how to find the JS files
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader", "eslint-loader"]
    },
    {
      test: /(\.css)$/,
      use: ["style-loader", "css-loader"]
    }
  ]
};
