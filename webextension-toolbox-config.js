// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const dotenv = require('dotenv-webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(new dotenv());

    return config;
  },
};
