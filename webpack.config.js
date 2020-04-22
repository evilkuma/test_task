const path = require("path")

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {

    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    module: {

        rules: [

            {

                test: /\.vue$/,
                loader: 'vue-loader',
                options: {

                    hotReload: !isProd

                }

            },
            {

                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)

            },
            {

                test: /\.css$/,
                use: [

                    MiniCssExtractPlugin.loader,
                    'css-loader'

                ]

            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]

    },
    plugins: [

        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.join(__dirname, 'src', 'template.html'),
            favicon: './src/assets/img/favicon.ico'
        })

    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    }

}
