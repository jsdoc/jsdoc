'use strict';

describe('jsdoc/util/logger', function() {
    var logger = require('jsdoc/util/logger');

    var loggerArgs = ['foo bar %s', 'hello'];

    it('should exist', function() {
        expect(logger).toBeDefined();
        expect(typeof logger).toBe('object');
    });

    it('should inherit from EventEmitter', function() {
        var EventEmitter = require('events').EventEmitter;

        expect(logger instanceof EventEmitter).toBe(true);
    });

    it('should export a "debug" method', function() {
        expect(logger.debug).toBeDefined();
        expect(typeof logger.debug).toBe('function');
    });

    it('should export an "error" method', function() {
        expect(logger.error).toBeDefined();
        expect(typeof logger.error).toBe('function');
    });

    it('should export a "fatal" method', function() {
        expect(logger.fatal).toBeDefined();
        expect(typeof logger.fatal).toBe('function');
    });

    it('should export a "getLevel" method', function() {
        expect(logger.getLevel).toBeDefined();
        expect(typeof logger.getLevel).toBe('function');
    });

    it('should export an "info" method', function() {
        expect(logger.info).toBeDefined();
        expect(typeof logger.info).toBe('function');
    });

    it('should export a "LEVELS" object', function() {
        expect(logger.LEVELS).toBeDefined();
        expect(typeof logger.LEVELS).toBe('object');
    });

    it('should export a "setLevel" method', function() {
        expect(logger.setLevel).toBeDefined();
        expect(typeof logger.setLevel).toBe('function');
    });

    it('should export a "verbose" method', function() {
        expect(logger.verbose).toBeDefined();
        expect(typeof logger.verbose).toBe('function');
    });

    it('should export a "warn" method', function() {
        expect(logger.warn).toBeDefined();
        expect(typeof logger.warn).toBe('function');
    });

    // helpers for testing logger methods
    function eventIsEmitted(name) {
        var called = false;

        logger.once('logger:' + name, function() {
            called = true;
        });
        logger[name]();

        expect(called).toBe(true);
    }

    function eventGetsArguments(name) {
        var args;

        logger.once('logger:' + name, function() {
            args = Array.prototype.slice.call(arguments, 0);
        });
        logger[name](loggerArgs[0], loggerArgs[1]);

        expect(args).toBeDefined();
        expect( Array.isArray(args) ).toBe(true);
        expect(args[0]).toBe(loggerArgs[0]);
        expect(args[1]).toBe(loggerArgs[1]);
    }

    describe('debug', function() {
        var methodName = 'debug';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });
    });

    describe('error', function() {
        var methodName = 'error';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });
    });

    describe('fatal', function() {
        var methodName = 'fatal';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });
    });

    describe('getLevel', function() {
        it('should return LEVELS.SILENT when we are running tests', function() {
            expect( logger.getLevel() ).toBe(logger.LEVELS.SILENT);
        });
    });

    describe('info', function() {
        var methodName = 'info';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });
    });

    describe('LEVELS', function() {
        var LEVELS = logger.LEVELS;

        it('should include the correct properties', function() {
            expect(LEVELS.VERBOSE).toBeDefined();
            expect(LEVELS.DEBUG).toBeDefined();
            expect(LEVELS.INFO).toBeDefined();
            expect(LEVELS.WARN).toBeDefined();
            expect(LEVELS.ERROR).toBeDefined();
            expect(LEVELS.SILENT).toBeDefined();
        });

        it('should weight the logging levels correctly relative to one another', function() {
            expect(LEVELS.VERBOSE).toBeGreaterThan(LEVELS.DEBUG);
            expect(LEVELS.DEBUG).toBeGreaterThan(LEVELS.INFO);
            expect(LEVELS.INFO).toBeGreaterThan(LEVELS.WARN);
            expect(LEVELS.WARN).toBeGreaterThan(LEVELS.ERROR);
            expect(LEVELS.ERROR).toBeGreaterThan(LEVELS.SILENT);
        });
    });

    describe('setLevel', function() {
        var oldLevel = logger.getLevel();

        afterEach(function() {
            logger.setLevel(oldLevel);
        });

        it('should update the log level', function() {
            logger.setLevel(logger.LEVELS.VERBOSE);
            expect( logger.getLevel() ).toBe(logger.LEVELS.VERBOSE);
        });
    });

    describe('verbose', function() {
        var methodName = 'verbose';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });
    });

    describe('warn', function() {
        var methodName = 'warn';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });
    });
});
