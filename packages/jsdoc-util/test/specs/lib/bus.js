describe('@jsdoc/util/lib/bus', () => {
    const EventBus = require('../../../lib/bus');
    const EventEmitter = require('events').EventEmitter;

    const ignoreCache = { cache: false };

    it('inherits from EventEmitter', () => {
        expect(new EventBus('foo', ignoreCache) instanceof EventEmitter).toBeTrue();
    });

    it('accepts a string for the ID', () => {
        function makeBus() {
            return new EventBus('foo', ignoreCache);
        }

        expect(makeBus).not.toThrow();
    });

    it('accepts a Symbol for the ID', () => {
        function makeBus() {
            return new EventBus(Symbol('foo'), ignoreCache);
        }

        expect(makeBus).not.toThrow();
    });

    it('throws on bad IDs', () => {
        function crashBus() {
            return new EventBus(true, ignoreCache);
        }

        expect(crashBus).toThrowError();
    });

    it('uses a cache by default', () => {
        let fired = false;
        const id = Symbol('cache-test');
        const bus1 = new EventBus(id);
        const bus2 = new EventBus(id);

        bus1.once('foo', () => {
            fired = true;
        });

        bus2.emit('foo');

        expect(bus1).toBe(bus2);
        expect(fired).toBeTrue();
    });

    it('ignores the cache when asked', () => {
        let fired = false;
        const id = Symbol('cache-test');
        const bus1 = new EventBus(id, ignoreCache);
        const bus2 = new EventBus(id, ignoreCache);

        bus1.once('foo', () => {
            fired = true;
        });

        bus2.emit('foo');

        expect(bus1).not.toBe(bus2);
        expect(fired).toBeFalse();
    });
});
