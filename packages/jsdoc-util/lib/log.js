const EventBus = require('./bus');

const bus = new EventBus('jsdoc');
const loggerFuncs = {};

['debug', 'error', 'info', 'fatal', 'verbose', 'warn'].forEach(fn => {
    loggerFuncs[fn] = (...args) => bus.emit(`logger:${fn}`, ...args);
});

module.exports = loggerFuncs;
