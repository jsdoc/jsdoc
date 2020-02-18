const RealEngine = require('../../../lib/engine');
const flags = require('../../../lib/flags');
const { LEVELS } = require('../../../lib/logger');

const TYPE_ERROR = 'TypeError';

// Wrapper to prevent reuse of the event bus, which leads to `MaxListenersExceededWarning` messages.
class Engine extends RealEngine {
    constructor(opts) {
        opts = opts || {};
        opts._cacheEventBus = false;

        super(opts);
    }
}

describe('@jsdoc/cli/lib/engine', () => {
    it('exists', () => {
        expect(Engine).toBeFunction();
    });

    it('works with no input', () => {
        expect(() => new Engine()).not.toThrow();
    });

    it('has a static LOG_LEVELS property', () => {
        expect(Engine.LOG_LEVELS).toBeObject();
    });

    it('has an empty array of flags by default', () => {
        expect(new Engine().flags).toBeEmptyArray();
    });

    it('has a property that contains the known flags', () => {
        expect(new Engine().knownFlags).toBe(flags);
    });

    it('has a logLevel property that defaults to LEVELS.WARN', () => {
        expect(new Engine().logLevel).toBe(LEVELS.WARN);
    });

    it('has an undefined revision property by default', () => {
        expect(new Engine().revision).toBeUndefined();
    });

    it('has an undefined version property by default', () => {
        expect(new Engine().version).toBeUndefined();
    });

    it('has a versionDetails property that is an empty string by default', () => {
        expect(new Engine().versionDetails).toBeEmptyString();
    });

    it('throws if the input is not an object', () => {
        expect(() => new Engine('hi')).toThrow();
    });

    it('sets the logLevel if provided', () => {
        const logLevel = LEVELS.VERBOSE;
        const instance = new Engine({ logLevel });

        expect(instance.logLevel).toBe(logLevel);
    });

    it('throws if the logLevel is invalid', () => {
        const logLevel = LEVELS.VERBOSE + 1;

        expect(() => new Engine({ logLevel })).toThrowErrorOfType(TYPE_ERROR);
    });

    it('sets the revision if provided', () => {
        const revision = new Date();
        const instance = new Engine({ revision });

        expect(instance.revision).toBe(revision);
    });

    it('throws if the revision is not a date', () => {
        expect(() => new Engine({ revision: '1' })).toThrow();
    });

    it('sets the version if provided', () => {
        expect(new Engine({ version: '1.2.3' }).version).toBe('1.2.3');
    });

    it('throws if the version is not a string', () => {
        expect(() => new Engine({ version: 1 })).toThrow();
    });

    describe('help', () => {
        const instance = new Engine();

        it('works with no input', () => {
            expect(() => instance.help()).not.toThrow();
        });

        it('throws on bad input', () => {
            expect(() => instance.help('hi')).toThrow();
        });

        it('returns a string', () => {
            expect(instance.help()).toBeNonEmptyString();
        });

        it('honors a reasonable maxLength option', () => {
            const max = 70;
            const help = instance.help({ maxLength: max }).split('\n');

            for (let line of help) {
                expect(line.length).toBeLessThanOrEqualTo(max);
            }
        });

        it('throws on a bad maxLength option', () => {
            expect(() => instance.help({ maxLength: 'long' })).toThrow();
        });
    });

    describe('LOG_LEVELS', () => {
        it('is lib/logger.LEVELS', () => {
            expect(Engine.LOG_LEVELS).toBe(LEVELS);
        });
    });

    describe('parseFlags', () => {
        it('throws with no input', () => {
            expect(() => new Engine().parseFlags()).toThrow();
        });

        it('throws if the input is not an array', () => {
            expect(() => new Engine().parseFlags({ foo: 'bar' })).toThrow();
        });

        it('parses flags with no values', () => {
            expect(new Engine().parseFlags(['--help']).help).toBeTrue();
        });

        it('parses flags with values', () => {
            const parsed = new Engine().parseFlags(['--configure', 'conf.json']);

            expect(parsed.configure).toBe('conf.json');
        });

        it('stores the flags in the `flags` property', () => {
            const instance = new Engine();

            instance.parseFlags(['--help']);

            expect(instance.flags.help).toBeTrue();
        });

        it('throws on unrecognized flags', () => {
            expect(() => new Engine().parseFlags(['--notarealflag'])).toThrow();
        });

        it('throws on invalid flag values', () => {
            expect(() => new Engine().parseFlags(['--access', 'maybe'])).toThrow();
        });

        it('includes the long and short name in the error if a value is invalid', () => {
            let error;

            try {
                new Engine().parseFlags(['--access', 'just-this-once']);
            } catch (e) {
                error = e;
            }

            expect(error.message).toContain('-a/--access');
        });

        it('includes the allowed values in the error if a value is invalid', () => {
            let error;

            try {
                new Engine().parseFlags(['--access', 'maybe-later']);
            } catch (e) {
                error = e;
            }

            expect(error.message).toContain(flags.access.choices.join(', '));
        });

        it('throws if a required value is missing', () => {
            expect(() => new Engine().parseFlags(['--template'])).toThrow();
        });

        it('always uses the long flag name in the parsed flags', () => {
            expect(new Engine().parseFlags(['-h']).help).toBeTrue();
        });

        it('coerces values to other types when appropriate', () => {
            const parsed = new Engine().parseFlags(['--query', 'foo=bar&baz=true']);

            expect(parsed.query).toEqual({
                foo: 'bar',
                baz: true
            });
        });
    });

    describe('versionDetails', () => {
        it('works with a version but no revision', () => {
            const instance = new Engine({ version: '1.2.3' });

            expect(instance.versionDetails).toBe('JSDoc 1.2.3');
        });

        it('contains an empty string with a revision but no version', () => {
            const revision = new Date();
            const instance = new Engine({ revision });

            expect(instance.versionDetails).toBeEmptyString();
        });

        it('works with a version and a revision', () => {
            const revision = new Date();
            const instance = new Engine({
                version: '1.2.3',
                revision
            });

            expect(instance.versionDetails).toBe(`JSDoc 1.2.3 (${revision.toUTCString()})`);
        });
    });
});
