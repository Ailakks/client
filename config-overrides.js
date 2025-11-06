const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config) {
    config.plugins.push(new NodePolyfillPlugin());

    config.resolve.fallback = {
        ...config.resolve.fallback,
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/")
    };

    return config;
};
