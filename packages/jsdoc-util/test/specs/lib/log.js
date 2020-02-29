describe('@jsdoc/util/lib/log', () => {
    const EventBus = require('../../../lib/bus');
    const log = require('../../../lib/log');

    const fns = ['debug', 'error', 'info', 'fatal', 'verbose', 'warn'];

    it('is an object', () => {
        expect(log).toBeObject();
    });

    it('provides the expected functions', () => {
        fns.forEach(fn => {
            expect(log[fn]).toBeFunction();
        });
    });

    describe('functions', () => {
        const bus = new EventBus('jsdoc');

        it('sends events to the event bus', () => {
            fns.forEach(fn => {
                let event;

                bus.once(`logger:${fn}`, e => {
                    event = e;
                });
                log[fn]('testing');

                expect(event).toBe('testing');
            });
        });
    });
});
