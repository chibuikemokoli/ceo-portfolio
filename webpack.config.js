const path = require('path');

module.exports = {
    entry: './assets/js/speed-insights.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
};
