const webpack = require("webpack");
const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function searchHtml() {
    let arr = fs.readdirSync(path.resolve(__dirname, 'src/pages'), 'utf8');
    arr = arr.filter((it) => /\.html/i.test(it));

    return arr.map((nameFile) => {
        return new HtmlWebpackPlugin({
            filename: nameFile,
            template: path.resolve(__dirname, 'src/pages', nameFile)
        })
    })
}

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...searchHtml(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    output: {
        filename: "src/js/[name].[hash].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            // outputPath: 'fonts',
                        },
                    },
                ],
            },
            {
                test: /\.(mp4|webm)$/i,
                use: 'file-loader?name=videos/[name].[ext]',
            },
        ],
    },
};
