var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    module : {
        loaders: [ {
            test   : /.js$/,
            loader : 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: [
                    'es2015',
                    'stage-2'
                ]
            }
        }
        ]
    }
};
