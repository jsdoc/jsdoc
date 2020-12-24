const flags = require('../../../lib/flags');
const {default: ow} = require('ow');

function validate(name, opts) {
    name = `--${name}`;

    if (!opts.description) {
        throw new TypeError(`${name} is missing its description`);
    }

    if (opts.array && opts.boolean) {
        throw new TypeError(`${name} can be an array or a boolean, but not both`);
    }

    if (opts.requiresArg && opts.boolean) {
        throw new TypeError(`${name} can require an argument or be a boolean, but not both`);
    }

    try {
        ow(opts.coerce, ow.optional.function);
    } catch (e) {
        throw new TypeError(`The coerce value for ${name} is not a function`);
    }

    if (opts.choices && !opts.requiresArg) {
        throw new TypeError(`${name} specifies choices, but not requiresArg`);
    }
}

describe('@jsdoc/cli/lib/flags', () => {
    it('is an object', () => {
        expect(flags).toBeObject();
    });

    it('has reasonable settings for each flag', () => {
        for (let flag of Object.keys(flags)) {
            expect(() => validate(flag, flags[flag])).not.toThrow();
        }
    });
});
