const withTM = require('next-transpile-modules')(['some-external-module']);
module.exports = withTM({});

// next.config.js


module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: /node_modules/,
      });
    }
    return config;
  },
};
