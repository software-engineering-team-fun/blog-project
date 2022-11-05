const path = require('path')

module.exports = {
    mode: 'development',
    entry: './config.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: [/node_modules/],
              },
        ],
      },    
        
    watch: true
}