const morgan = require('morgan');

const httpLogger = morgan((tokens, req, res) => {
    return [
        `[${new Date().toISOString()}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms',
        '-', tokens.res(req, res, 'content-length')
    ].join(' ');
});

const logger = {
    info: (msg) => console.log(`[${new Date().toISOString()}] INFO: ${msg}`),
    error: (msg, err) => console.error(`[${new Date().toISOString()}] ERROR: ${msg}`, err || ''),
    debug: (msg) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(`[${new Date().toISOString()}] DEBUG: ${msg}`);
        }
    }
};

module.exports = { httpLogger, logger };