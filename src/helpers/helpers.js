import config from './config';

export function log(...values) {
  if (config.isDev) {
    // eslint-disable-next-line no-console
    console.log(values);
  }
}
