'use strict';

describe('jsdoc/util/logger', function() {
    var logger = require('jsdoc/util/logger');

    var loggerArgs = ['foo bar %s', 'hello'];


    beforeEach(function () {
        this.oldLogLevel = logger.getLevel();
    });

    afterEach(function () {
        logger.setLevel(this.oldLogLevel);
        logger.resetErrors();
    });

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

    function loggerMethodIsCalled(methodLevel, level) {
        var handlerSpy = spyOn(logger.handlers, methodLevel);
        logger.setLevel(level);
        logger[methodLevel.toLowerCase()](loggerArgs);
        expect(handlerSpy).toHaveBeenCalledWith(loggerArgs);
    }
    function loggerMethodIsNotCalled(methodLevel, level) {
        var handlerSpy = spyOn(logger.handlers, methodLevel);
        logger.setLevel(level);
        logger[methodLevel.toLowerCase()](loggerArgs);
        expect(handlerSpy).not.toHaveBeenCalledWith(loggerArgs);
    }

    describe('debug', function() {
        var methodName = 'debug';

        it('should cause the logger to emit the correct event', function() {
            eventIsEmitted(methodName);
        });

        it('should pass its arguments to listeners', function() {
            eventGetsArguments(methodName);
        });

        describe('Log Levels', function () {
            it("should call its handler if the log level is VERBOSE", function () {
                loggerMethodIsCalled(logger.LEVELS.DEBUG, logger.LEVELS.VERBOSE);
            });

            it("should call its handler if the log level is DEBUG", function () {
                loggerMethodIsCalled(logger.LEVELS.DEBUG, logger.LEVELS.DEBUG);
            });

            it("should not call its handler if the log level is INFO", function () {
                loggerMethodIsNotCalled(logger.LEVELS.DEBUG, logger.LEVELS.INFO);
            });

            it("should not call its handler if the log level is WARN", function () {
                loggerMethodIsNotCalled(logger.LEVELS.DEBUG, logger.LEVELS.WARN);
            });

            it("should not call its handler if the log level is ERROR", function () {
                loggerMethodIsNotCalled(logger.LEVELS.DEBUG, logger.LEVELS.ERROR);
            });

            it("should not call its handler if the log level is FATAL", function () {
                loggerMethodIsNotCalled(logger.LEVELS.DEBUG, logger.LEVELS.FATAL);
            });

            it("should not call its handler if the log level is SILENT", function () {
                loggerMethodIsNotCalled(logger.LEVELS.DEBUG, logger.LEVELS.SILENT);
            });
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

        describe('Log Levels', function () {
            it("should call its handler if the log level is VERBOSE", function () {
                loggerMethodIsCalled(logger.LEVELS.ERROR, logger.LEVELS.VERBOSE);
            });

            it("should call its handler if the log level is DEBUG", function () {
                loggerMethodIsCalled(logger.LEVELS.ERROR, logger.LEVELS.DEBUG);
            });

            it("should not call its handler if the log level is INFO", function () {
                loggerMethodIsCalled(logger.LEVELS.ERROR, logger.LEVELS.INFO);
            });

            it("should not call its handler if the log level is WARN", function () {
                loggerMethodIsCalled(logger.LEVELS.ERROR, logger.LEVELS.WARN);
            });

            it("should not call its handler if the log level is ERROR", function () {
                loggerMethodIsCalled(logger.LEVELS.ERROR, logger.LEVELS.ERROR);
            });

            it("should not call its handler if the log level is FATAL", function () {
                loggerMethodIsNotCalled(logger.LEVELS.ERROR, logger.LEVELS.FATAL);
            });

            it("should not call its handler if the log level is SILENT", function () {
                loggerMethodIsNotCalled(logger.LEVELS.ERROR, logger.LEVELS.SILENT);
            });
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

        describe('Log Levels', function () {
            it("should call its handler if the log level is VERBOSE", function () {
                loggerMethodIsCalled(logger.LEVELS.FATAL, logger.LEVELS.VERBOSE);
            });

            it("should call its handler if the log level is DEBUG", function () {
                loggerMethodIsCalled(logger.LEVELS.FATAL, logger.LEVELS.DEBUG);
            });

            it("should not call its handler if the log level is INFO", function () {
                loggerMethodIsCalled(logger.LEVELS.FATAL, logger.LEVELS.INFO);
            });

            it("should not call its handler if the log level is WARN", function () {
                loggerMethodIsCalled(logger.LEVELS.FATAL, logger.LEVELS.WARN);
            });

            it("should not call its handler if the log level is ERROR", function () {
                loggerMethodIsCalled(logger.LEVELS.FATAL, logger.LEVELS.ERROR);
            });

            it("should not call its handler if the log level is FATAL", function () {
                loggerMethodIsCalled(logger.LEVELS.FATAL, logger.LEVELS.FATAL);
            });

            it("should not call its handler if the log level is SILENT", function () {
                loggerMethodIsNotCalled(logger.LEVELS.FATAL, logger.LEVELS.SILENT);
            });
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

        describe('Log Levels', function () {
            it("should call its handler if the log level is VERBOSE", function () {
                loggerMethodIsCalled(logger.LEVELS.INFO, logger.LEVELS.VERBOSE);
            });

            it("should call its handler if the log level is DEBUG", function () {
                loggerMethodIsCalled(logger.LEVELS.INFO, logger.LEVELS.DEBUG);
            });

            it("should not call its handler if the log level is INFO", function () {
                loggerMethodIsCalled(logger.LEVELS.INFO, logger.LEVELS.INFO);
            });

            it("should not call its handler if the log level is WARN", function () {
                loggerMethodIsNotCalled(logger.LEVELS.INFO, logger.LEVELS.WARN);
            });

            it("should not call its handler if the log level is ERROR", function () {
                loggerMethodIsNotCalled(logger.LEVELS.INFO, logger.LEVELS.ERROR);
            });

            it("should not call its handler if the log level is FATAL", function () {
                loggerMethodIsNotCalled(logger.LEVELS.INFO, logger.LEVELS.FATAL);
            });

            it("should not call its handler if the log level is SILENT", function () {
                loggerMethodIsNotCalled(logger.LEVELS.INFO, logger.LEVELS.SILENT);
            });
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

        describe('Log Levels', function () {
            it("should call its handler if the log level is VERBOSE", function () {
                loggerMethodIsCalled(logger.LEVELS.VERBOSE, logger.LEVELS.VERBOSE);
            });

            it("should call its handler if the log level is DEBUG", function () {
                loggerMethodIsNotCalled(logger.LEVELS.VERBOSE, logger.LEVELS.DEBUG);
            });

            it("should not call its handler if the log level is INFO", function () {
                loggerMethodIsNotCalled(logger.LEVELS.VERBOSE, logger.LEVELS.INFO);
            });

            it("should not call its handler if the log level is WARN", function () {
                loggerMethodIsNotCalled(logger.LEVELS.VERBOSE, logger.LEVELS.WARN);
            });

            it("should not call its handler if the log level is ERROR", function () {
                loggerMethodIsNotCalled(logger.LEVELS.VERBOSE, logger.LEVELS.ERROR);
            });

            it("should not call its handler if the log level is FATAL", function () {
                loggerMethodIsNotCalled(logger.LEVELS.VERBOSE, logger.LEVELS.FATAL);
            });

            it("should not call its handler if the log level is SILENT", function () {
                loggerMethodIsNotCalled(logger.LEVELS.VERBOSE, logger.LEVELS.SILENT);
            });
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

        describe('Log Levels', function () {
            it("should call its handler if the log level is VERBOSE", function () {
                loggerMethodIsCalled(logger.LEVELS.WARN, logger.LEVELS.VERBOSE);
            });

            it("should call its handler if the log level is DEBUG", function () {
                loggerMethodIsCalled(logger.LEVELS.WARN, logger.LEVELS.DEBUG);
            });

            it("should not call its handler if the log level is INFO", function () {
                loggerMethodIsCalled(logger.LEVELS.WARN, logger.LEVELS.INFO);
            });

            it("should not call its handler if the log level is WARN", function () {
                loggerMethodIsCalled(logger.LEVELS.WARN, logger.LEVELS.WARN);
            });

            it("should not call its handler if the log level is ERROR", function () {
                loggerMethodIsNotCalled(logger.LEVELS.WARN, logger.LEVELS.ERROR);
            });

            it("should not call its handler if the log level is FATAL", function () {
                loggerMethodIsNotCalled(logger.LEVELS.WARN, logger.LEVELS.FATAL);
            });

            it("should not call its handler if the log level is SILENT", function () {
                loggerMethodIsNotCalled(logger.LEVELS.WARN, logger.LEVELS.SILENT);
            });
        });
    });

    describe('setHandler', function () {
        it('should override the default log handler', function () {
            var spy = jasmine.createSpy();
            logger.setLevel(logger.LEVELS.WARN);
            logger.setHandler(logger.LEVELS.ERROR, spy);
            logger.error(loggerArgs);
            expect(spy).toHaveBeenCalled();
            logger.mute();
        });
    });

    describe('setHandlers', function () {
        it('should override the default log handlers', function () {
            var spyInfo = jasmine.createSpy('info');
            var spyDebug = jasmine.createSpy('debug');
            var spyFatal = jasmine.createSpy('fatal');
            logger.setHandlers([
                { level: logger.LEVELS.DEBUG, handler: spyDebug },
                { level: logger.LEVELS.INFO, handler: spyInfo },
                { level: logger.LEVELS.FATAL, handler: spyFatal }
            ]);
            logger.setLevel(logger.LEVELS.VERBOSE);

            logger.info(loggerArgs);
            expect(spyInfo).toHaveBeenCalled();
            expect(spyDebug).not.toHaveBeenCalled();
            expect(spyFatal).not.toHaveBeenCalled();
            logger.debug(loggerArgs);
            expect(spyDebug).toHaveBeenCalled();
            logger.fatal(loggerArgs);
            expect(spyFatal).toHaveBeenCalled();
            logger.mute();
        });
    });

    describe('hasErrors', function () {
        it('should return false if no errors were thrown', function () {
            expect(logger.hasErrors()).toBe(false);
            logger.info(loggerArgs);
            expect(logger.hasErrors()).toBe(false);
            logger.warn(loggerArgs);
            expect(logger.hasErrors()).toBe(false);
        });

        it('should return true if an error was thrown', function () {
            logger.error(loggerArgs);
            expect(logger.hasErrors()).toBe(true);
        });

        it('should return true if a fatal error was thrown', function () {
            logger.fatal(loggerArgs);
            expect(logger.hasErrors()).toBe(true);
        });
    });

    describe('resetErrors', function () {
        it('should reset the number of errors to 0', function () {
            logger.error(loggerArgs);
            expect(logger.hasErrors()).toBe(true);
            logger.resetErrors();
            expect(logger.hasErrors()).toBe(false);
        });
    });

    describe('Fatal Event', function () {
        it('should not emit a fatal event when an error is logged', function () {
            var fatalEventSpy = jasmine.createSpy();
            logger.on('fatal', fatalEventSpy);
            logger.error(loggerArgs);
            expect(fatalEventSpy).not.toHaveBeenCalled();
        });

        it('should emit a fatal event when a fatal error is logged', function () {
            var fatalEventSpy = jasmine.createSpy();
            logger.on('fatal', fatalEventSpy);
            logger.fatal(loggerArgs);
            expect(fatalEventSpy).toHaveBeenCalled();
        });
    });

    describe('enablePedanticMode', function () {
        beforeEach(function () {
            logger.enablePedanticMode();
        });
        afterEach(function () {
            logger.disablePedanticMode();
        });
        it('should consider warnings as errors', function () {
            logger.info(loggerArgs);
            expect(logger.hasErrors()).toBe(false);
            logger.warn(loggerArgs);
            expect(logger.hasErrors()).toBe(true);
        });

        it('should consider errors as fatal errors', function () {
            var fatalEventSpy = jasmine.createSpy();
            logger.on('fatal', fatalEventSpy);
            logger.error(loggerArgs);
            expect(fatalEventSpy).toHaveBeenCalled();
        });
    });
});
