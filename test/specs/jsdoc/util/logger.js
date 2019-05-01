describe('jsdoc/util/logger', () => {
    const logger = require('../../../lib/jsdoc/util/logger');

    const loggerArgs = ['foo bar %s', 'hello'];

    it('should exist', () => {
        expect(logger).toBeDefined();
        expect(typeof logger).toBe('object');
    });

    it('should inherit from EventEmitter', () => {
        const EventEmitter = require('events').EventEmitter;

        expect(logger instanceof EventEmitter).toBe(true);
    });

    it('should export a "debug" method', () => {
        expect(logger.debug).toBeDefined();
        expect(typeof logger.debug).toBe('function');
    });

    it('should export an "error" method', () => {
        expect(logger.error).toBeDefined();
        expect(typeof logger.error).toBe('function');
    });

    it('should export a "fatal" method', () => {
        expect(logger.fatal).toBeDefined();
        expect(typeof logger.fatal).toBe('function');
    });

    it('should export a "getLevel" method', () => {
        expect(logger.getLevel).toBeDefined();
        expect(typeof logger.getLevel).toBe('function');
    });

    it('should export an "info" method', () => {
        expect(logger.info).toBeDefined();
        expect(typeof logger.info).toBe('function');
    });

    it('should export a "LEVELS" object', () => {
        expect(logger.LEVELS).toBeDefined();
        expect(typeof logger.LEVELS).toBe('object');
    });

    it('should export a "setLevel" method', () => {
        expect(logger.setLevel).toBeDefined();
        expect(typeof logger.setLevel).toBe('function');
    });

    it('should export a "verbose" method', () => {
        expect(logger.verbose).toBeDefined();
        expect(typeof logger.verbose).toBe('function');
    });

    it('should export a "warn" method', () => {
        expect(logger.warn).toBeDefined();
        expect(typeof logger.warn).toBe('function');
    });

    // helpers for testing logger methods
    function eventIsEmitted(name) {
        let called = false;

        logger.once(`logger:${name}`, () => {
            called = true;
        });
        logger[name]();

        expect(called).toBe(true);
    }

    function eventGetsArguments(name) {
        let capturedArgs;

        logger.once(`logger:${name}`, (...args) => {
            capturedArgs = args.slice();
        });
        logger[name](loggerArgs[0], loggerArgs[1]);

        expect(capturedArgs).toBeDefined();
        expect( Array.isArray(capturedArgs) ).toBe(true);
        expect(capturedArgs[0]).toBe(loggerArgs[0]);
        expect(capturedArgs[1]).toBe(loggerArgs[1]);
    }

    describe('debug', () => {
        const methodName = 'debug';

        it('should cause the logger to emit the correct event', () => {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', () => {
            eventGetsArguments(methodName);
        });
    });

    describe('error', () => {
        const methodName = 'error';

        it('should cause the logger to emit the correct event', () => {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', () => {
            eventGetsArguments(methodName);
        });
    });

    describe('fatal', () => {
        const methodName = 'fatal';

        it('should cause the logger to emit the correct event', () => {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', () => {
            eventGetsArguments(methodName);
        });
    });

    describe('getLevel', () => {
        it('should return LEVELS.SILENT when we are running tests', () => {
            expect( logger.getLevel() ).toBe(logger.LEVELS.SILENT);
        });
    });

    describe('info', () => {
        const methodName = 'info';

        it('should cause the logger to emit the correct event', () => {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', () => {
            eventGetsArguments(methodName);
        });
    });

    describe('LEVELS', () => {
        const LEVELS = logger.LEVELS;

        it('should include the correct properties', () => {
            expect(LEVELS.VERBOSE).toBeDefined();
            expect(LEVELS.DEBUG).toBeDefined();
            expect(LEVELS.INFO).toBeDefined();
            expect(LEVELS.WARN).toBeDefined();
            expect(LEVELS.ERROR).toBeDefined();
            expect(LEVELS.SILENT).toBeDefined();
        });

        it('should weight the logging levels correctly relative to one another', () => {
            expect(LEVELS.VERBOSE).toBeGreaterThan(LEVELS.DEBUG);
            expect(LEVELS.DEBUG).toBeGreaterThan(LEVELS.INFO);
            expect(LEVELS.INFO).toBeGreaterThan(LEVELS.WARN);
            expect(LEVELS.WARN).toBeGreaterThan(LEVELS.ERROR);
            expect(LEVELS.ERROR).toBeGreaterThan(LEVELS.SILENT);
        });
    });

    describe('setLevel', () => {
        const oldLevel = logger.getLevel();

        afterEach(() => {
            logger.setLevel(oldLevel);
        });

        it('should update the log level', () => {
            logger.setLevel(logger.LEVELS.VERBOSE);
            expect( logger.getLevel() ).toBe(logger.LEVELS.VERBOSE);
        });
    });

    describe('verbose', () => {
        const methodName = 'verbose';

        it('should cause the logger to emit the correct event', () => {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', () => {
            eventGetsArguments(methodName);
        });
    });

    describe('warn', () => {
        const methodName = 'warn';

        it('should cause the logger to emit the correct event', () => {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', () => {
            eventGetsArguments(methodName);
        });
    });
});
