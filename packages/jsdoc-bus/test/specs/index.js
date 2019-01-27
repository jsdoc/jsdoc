describe('@jsdoc/bus', () => {
    const EventBus = require('../..');
    const LibBus = require('../../lib/bus');

    it('exists', () => {
        expect(EventBus).toBeFunction();
    });

    it('is ./lib/bus', () => {
        expect(EventBus).toBe(LibBus);
    });
});
