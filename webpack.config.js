const modoDev = process.env.NODE_ENV !== 'production'
const path = require('path');
const webpack = require('webpack')
// unificar arquivos
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry:'./src/index.js', //ponto de entrada
  output: {
      filename: 'app.js', // nomedo arquivo raiz
      path: __dirname + '/dist',  // caminho onde sera jogado arquivo
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
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
    }),
    new CssMinimizerPlugin({})
    ]
  },
      // area de plugin
  plugins: [
      // função construtora recebe obj com parametros
      new MiniCssExtractPlugin({
        // recebe nome do arq q quero criar e gerado
         filename: 'css/style.css',  // proriedade
        
      }),
      new CopyWebpackPlugin({
        patterns:[
          {context:'src/',from: '**/*.html'},
          {context:'src/',from: 'imgs/**/*'}
        ]
      })
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
    } 
  ]
  }
}