const ARGS = require('../../../lib/args').ARGS;
const help = require('../../../lib/help');

describe('@jsdoc/cli/lib/help', () => {
    it('is a string', () => {
        expect(help).toBeString();
    });

    it('covers all known command-line arguments', () => {
        Object.keys(ARGS).forEach(arg => {
            expect(help.includes(arg)).toBeTrue();
        });
    });
});
