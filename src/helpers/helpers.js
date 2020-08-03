import config from './config';

export function log(...values) {
    if (config.isDev) {
        console.log(values);
    }
}
