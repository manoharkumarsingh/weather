const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },

      //   {
      //     test: /\.(png|jpg|svg)$/i,
      //     use: [
      //       {
      //         loader: "url-loader",
      //       },
      //     ],
      //   },

      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { url: true },
          },
          {
            loader: "less-loader",
            options: { sourceMap: true },
          },
        ],
      },

      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { url: true },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "/resources/",
            },
          },
        ],
      },

      // {
      //   test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      //   type: "asset/resource",
      //   // options: {
      //   //   outputPath: "/build/resources/",
      //   // },
      // },
      //   {
      //     test: /\.css$/i,
      //     use: ["style-loader", "css-loader"],
      //   },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
  ],
};
module.exports = config;
