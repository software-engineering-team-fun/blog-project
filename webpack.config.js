const path = require('path')

module.exports = {
    mode: 'development',
    entry: './firebase.js',
    output: {
        path: path.resolve(__dirname, 'functions/dist'),
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
    experiments: {
        topLevelAwait: true
    },    
    watch: true
}