const args = require('../../../lib/args');
const ARGS = args.ARGS;

describe('@jsdoc/cli/lib/args', () => {
    it('exists', () => {
        expect(args).toBeObject();
    });

    it('has an `ARGS` object', () => {
        expect(args.ARGS).toBeObject();
    });

    it('has a `parse` function', () => {
        expect(args.parse).toBeFunction();
    });

    describe('ARGS', () => {
        // No need to test this object directly.
    });

    describe('parse', () => {
        it('accepts an array and returns an object', () => {
            const parsed = args.parse([]);

            expect(parsed).toBeObject();
        });

        it('parses all known options', () => {
            const argv = [];

            Object.keys(ARGS).forEach(arg => {
                argv.push(`--${arg}`);

                if (ARGS[arg].requiresArg) {
                    argv.push(ARGS[arg].choices ? ARGS[arg].choices[0] : `value-for-${arg}`);
                }
            });

            const parsed = args.parse(argv);

            expect(Object.keys(parsed).sort())
                .toEqual(Object.keys(ARGS).concat(['_']).sort());
        });

        it('puts extra arguments in the `_` array', () => {
            const parsed = args.parse(['foo.js']);

            expect(parsed._).toEqual(['foo.js']);
        });

        it('ignores unknown options', () => {
            const parsed = args.parse(['--foo']);

            expect(parsed.foo).toBeUndefined();
        });

        describe('--access', () => {
            it('is returned as an array even when specified only once', () => {
                const parsed = args.parse(['--access', 'public']);

                expect(parsed.access).toEqual(['public']);
            });

            it('accepts the argument more than once', () => {
                const parsed = args.parse([
                    '--access',
                    'protected',
                    '--access',
                    'public'
                ]);

                expect(parsed.access.sort()).toEqual(['protected', 'public']);
            });

            it('throws on unknown values', () => {
                function badArg() {
                    return args.parse(['--access', 'ibility']);
                }

                expect(badArg).toThrowError();
            });
        });

        describe('--query', () => {
            it('is returned as an object', () => {
                const parsed = args.parse(['--query', 'foo=bar']);

                expect(parsed.query).toEqual({foo: 'bar'});
            });

            it('coerces values to the appropriate types', () => {
                const parsed = args.parse(['--query', 'foo=true&bar=17']);

                expect(parsed.query.foo).toBeTrue();
                expect(parsed.query.bar).toBe(17);
            });
        });
    });
});
