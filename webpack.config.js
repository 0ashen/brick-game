const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {

    return {
        mode: env.mode ?? 'development',
        entry: './src/index.ts',
        devServer: {
            static: path.join(__dirname, 'public'),
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Brick game 9999 in 1',
                template: 'public/index.html',
            }),
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].[contenthash].map',
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                },
            ],
        },
        optimization: {
            // moduleIds: 'deterministic',
            // runtimeChunk: 'single',
            // splitChunks: {
            //     cacheGroups: {
            //         vendor: {
            //             test: /[\\/]node_modules[\\/]/,
            //             name: 'vendors',
            //             chunks: 'all',
            //         },
            //     },
            // },
            // usedExports: true,
        },
    };
};