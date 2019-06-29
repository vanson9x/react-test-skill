const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: "vender.[chunkhash].bundle.js"
                }
            }
        }
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].bundle.css'}),
        new CleanWebpackPlugin()
    ]
};
