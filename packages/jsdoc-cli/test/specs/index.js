const Engine = require('../../index');

describe('@jsdoc/cli', () => {
    it('is lib/engine', () => {
        const engine = require('../../lib/engine');

        expect(Engine).toBe(engine);
    });
});
