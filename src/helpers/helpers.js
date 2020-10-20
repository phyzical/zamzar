const {
  isDev,
} = require('./config');

const log = (...values) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(values);
  }
};

const error = (...values) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(values);
  }
};

module.exports = {
  log,
  error,
};
