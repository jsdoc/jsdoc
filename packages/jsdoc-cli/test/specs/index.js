const cli = require('../../index');

describe('@jsdoc/cli', () => {
    it('is an object', () => {
        expect(cli).toBeObject();
    });

    it('has an args object', () => {
        expect(cli.args).toBeObject();
    });

    it('has a help string', () => {
        expect(cli.help).toBeString();
    });

    describe('args', () => {
        it('is ./lib/args', () => {
            const args = require('../../lib/args');

            expect(cli.args).toBe(args);
        });
    });

    describe('help', () => {
        it('is ./lib/help', () => {
            const help = require('../../lib/help');

            expect(cli.help).toBe(help);
        });
    });
});
