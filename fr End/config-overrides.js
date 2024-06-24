const path = require('path');

module.exports = function override(config, env) {
    config.module.rules.unshift({
        test: /pdf\.worker\.js$/,
        use: { loader: 'worker-loader' }
    });
    return config;
};
