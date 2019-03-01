const MonacoWebpakcPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/dist/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
    //   proxy:{
    //       '/code': 'http://localhost:3000',
    //       '/loadProject': 'http://localhost:3000',
    //       '/loadFiles': 'http://localhost:3000'
    //   }
    },
    plugins: [
        new MonacoWebpakcPlugin({
            languages: ['javascript', 'json', 'java']
        }),
    ],
};