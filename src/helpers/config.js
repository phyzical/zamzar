let dev = false;

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true;
}
const appVersion = require('../../package.json').version;

module.exports = {
  isDev: dev,
  appVersion,
};
