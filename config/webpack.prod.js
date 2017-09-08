var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
// require("node_modules/angular2-busy/build/style/busy.css");
// require("assets/app.css");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {

    entry: {
        busy: [
            './node_modules/angular2-busy/build/style/busy.css',
        ]
    },
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {

                loaders: [
                    // Extract LESS
                    {
                        test: /\.less$/,
                        loader: ExtractTextPlugin.extract({
                            fallbackLoader: "style-loader",
                            loader: "css-loader!autoprefixer-loader!less-loader"

                        }),
                    },

                    // Extract SCSS
                    {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract({
                            fallbackLoader: "style-loader",
                            loader: "css-loader!autoprefixer-loader!sass-loader",
                        })
                    },

                    // Extract plain-ol' vanilla CSS
                    {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: "css-loader"}),
                    }
                ]
            }
        }),

        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new ExtractTextPlugin('[name].css'),
        new ExtractTextPlugin({filename: 'css/[name].css', disable: false, allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        })
    ]
});

