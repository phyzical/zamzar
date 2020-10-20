const appVersion = require('../../package.json').version;

module.exports = {
  isDev: process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development',
  appVersion,
};
