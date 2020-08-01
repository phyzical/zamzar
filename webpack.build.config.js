const config = require('./src/helpers/config')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    spawn
} = require('child_process')
let dev = false

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
    dev = true
}
// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

const cssRule = config.isDev ? {
    test: /\.css$/,
    use: [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader'
    }, {
        loader: 'postcss-loader'
    }],
    include: defaultInclude
} : {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
    ],
    include: defaultInclude
}
const webpackPluginConfig = {
    title: 'Zamzar App'
}
const plugins = config.isDev ? [
    new HtmlWebpackPlugin(webpackPluginConfig),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
] : [
    new HtmlWebpackPlugin(webpackPluginConfig),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'bundle.css',
        chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MinifyPlugin()
]

module.exports = {
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                include: defaultInclude
            },
            cssRule,
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }],
                include: defaultInclude
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]'
                }],
                include: defaultInclude
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]'
                }],
                include: defaultInclude
            }
        ]
    },
    target: 'electron-renderer',
    plugins: plugins,
    devtool: config.isDev ? 'cheap-source-map' : 'none',
    devServer: config.isDev ? {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: {
            colors: true,
            chunks: false,
            children: false
        },
        before() {
            spawn(
                    'electron',
                    ['.'], {
                        shell: true,
                        env: process.env,
                        stdio: 'inherit'
                    }
                )
                .on('close', code => process.exit(0))
                .on('error', spawnError => console.error(spawnError))
        }
    } : {},
    stats: config.isDev ? {} : {
        colors: true,
        children: false,
        chunks: false,
        modules: false
    }
}
