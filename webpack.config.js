const modoDev = process.env.NODE_ENV !== 'production'
const path = require('path');
const webpack = require('webpack')
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
// unificar arquivos
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry:'./src/index.js', //ponto de entrada
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  optimization:{
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
            ecma: 6,
        },
        test: /\.js(\?.*)?$/i,
    }),
    new HtmlMinimizerPlugin({}),
    new CssMinimizerPlugin({})
    ]
  }, output: {
    filename: 'app.js', // nome do arquivo raiz
    path: __dirname + '/public',  // caminho onde sera jogado arquivo
},
      // area de plugin
  plugins: [
      // função construtora recebe obj com parametros
      new MiniCssExtractPlugin({
        // recebe nome do arq q quero criar e gerado
         filename: 'style.css',  // proriedade
        
      }),
      new CopyWebpackPlugin({
        patterns:[
          {context:'src/',from: '**/*.html'},
          {context:'src/',from: 'imgs/**/*'}
        ]
      }),
      new webpack.ProvidePlugin({
        identifier: ['module1', 'property1'],
        $: 'jquery',
        JQuery: 'jquery',
      }),
  ],
  module:{   // regras - loader
    rules: [
      {   // regras
        test:/\.(sa|sc|c)ss$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
    },{
      test:/\.(png|svg|jpg|gif)$/,
      use:['file-loader']
    },{
      test: /.(ttf|otf|eot|svg|woff(2)?)$/,
      use:['file-loader']
    },{
      test:/\.js$/,
        use:['babel-loader']
    }
  ]
  }
}