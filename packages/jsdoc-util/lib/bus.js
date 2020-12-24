const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const {default: ow} = require('ow');

let cache = {};
const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * An event bus that works the same way as a standard Node.js event emitter, with a few key
 * differences:
 *
 * + When you create an event bus, you must specify its name. Consider using your package's name.
 * + Event buses are cached and shared by default. If module A and module B both create an event bus
 * called `foo`, both modules get the same event bus. This behavior makes it easier to share one
 * event bus among all of the modules in your package.
 *
 *     To prevent a new event bus from being cached and shared, set the `opts.cache` property to
 *     `false` when you create the event bus. Setting this property to `false` also forces a new
 *     event bus to be created, even if there's a cached event bus with the same name.
 *
 * @alias module:@jsdoc/util.EventBus
 * @extends module:events.EventEmitter
 */
class EventBus extends EventEmitter {
    /**
     * Create a new event bus, or retrieve the cached event bus for the ID you specify.
     *
     * @param {(string|Symbol)} id - The ID for the event bus.
     * @param {Object} opts - Options for the event bus.
     * @param {boolean} [opts.cache=true] - Set to `false` to prevent the event bus from being
     * cached, and to return a new event bus even if there is already an event bus with the same ID.
     */
    constructor(id, opts = {}) {
        super();

        ow(id, ow.any(ow.string, ow.symbol));

        const shouldCache = _.isBoolean(opts.cache) ? opts.cache : true;

        if (hasOwnProp.call(cache, id) && shouldCache) {
            return cache[id];
        }

        this._id = id;

        if (shouldCache) {
            cache[id] = this;
        }
    }
}

module.exports = EventBus;
