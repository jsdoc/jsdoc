const { EventBus } = require('@jsdoc/util');
const { LEVELS, Logger } = require('../../../lib/logger');

const ARGUMENT_ERROR = 'ArgumentError';
const TYPE_ERROR = 'TypeError';

describe('@jsdoc/cli/lib/logger', () => {
    describe('Logger', () => {
        let bus;
        let logger;

        beforeEach(() => {
            bus = new EventBus('loggerTest', {
                _console: console,
                cache: false
            });
            logger = new Logger({ emitter: bus });

            ['debug', 'error', 'info', 'warn'].forEach(func => spyOn(console, func));
        });

        it('exports a Logger constructor', () => {
            expect(() => new Logger({ emitter: bus })).not.toThrow();
        });

        it('exports a LEVELS enum', () => {
            expect(LEVELS).toBeNonEmptyObject();
        });

        describe('constructor', () => {
            it('throws on invalid input', () => {
                expect(() => new Logger()).toThrowErrorOfType(ARGUMENT_ERROR);
            });

            it('accepts a valid emitter', () => {
                expect(() => new Logger({ emitter: bus })).not.toThrow();
            });

            it('throws on an invalid emitter', () => {
                expect(() => new Logger({ emitter: {} })).toThrowErrorOfType(ARGUMENT_ERROR);
            });

            it('accepts a valid level', () => {
                expect(() => new Logger({
                    emitter: bus,
                    level: LEVELS.VERBOSE
                })).not.toThrow();
            });

            it('throws on an invalid level', () => {
                expect(() => new Logger({
                    emitter: bus,
                    level: LEVELS.VERBOSE + 1
                })).toThrowErrorOfType(TYPE_ERROR);
            });
        });

        describe('events', () => {
            it('passes all event arguments through', () => {
                const args = [
                    'My name is %s %s %s',
                    'foo',
                    'bar',
                    'baz'
                ];
                const eventType = 'logger:info';

                logger.level = LEVELS.VERBOSE;
                bus.emit(eventType, ...args);

                expect(console.info).toHaveBeenCalledWith(...args);
            });

            it('logs logger:fatal events by default', () => {
                bus.emit('logger:fatal');

                expect(console.error).toHaveBeenCalled();
            });

            it('does not log logger:fatal events when level is SILENT', () => {
                logger.level = LEVELS.SILENT;
                bus.emit('logger:fatal');

                expect(console.error).not.toHaveBeenCalled();
            });

            it('logs logger:error events by default', () => {
                bus.emit('logger:error');

                expect(console.error).toHaveBeenCalled();
            });

            it('does not log logger:error events when level is FATAL', () => {
                logger.level = LEVELS.FATAL;
                bus.emit('logger:error');

                expect(console.error).not.toHaveBeenCalled();
            });

            it('logs logger:warn events by default', () => {
                bus.emit('logger:warn');

                expect(console.warn).toHaveBeenCalled();
            });

            it('does not log logger:warn events when level is ERROR', () => {
                logger.level = LEVELS.ERROR;
                bus.emit('logger:warn');

                expect(console.warn).not.toHaveBeenCalled();
            });

            it('does not log logger:info events by default', () => {
                bus.emit('logger:info');

                expect(console.info).not.toHaveBeenCalled();
            });

            it('logs logger:info events when level is INFO', () => {
                logger.level = LEVELS.INFO;
                bus.emit('logger:info');

                expect(console.info).toHaveBeenCalled();
            });

            it('does not log logger:debug events by default', () => {
                bus.emit('logger:debug');

                expect(console.debug).not.toHaveBeenCalled();
            });

            it('logs logger:debug events when level is DEBUG', () => {
                logger.level = LEVELS.DEBUG;
                bus.emit('logger:debug');

                expect(console.debug).toHaveBeenCalled();
            });

            it('does not log logger:verbose events by default', () => {
                bus.emit('logger:verbose');

                expect(console.debug).not.toHaveBeenCalled();
            });

            it('logs logger:verbose events when level is VERBOSE', () => {
                logger.level = LEVELS.VERBOSE;
                bus.emit('logger:verbose');

                expect(console.debug).toHaveBeenCalled();
            });
        });

        describe('level', () => {
            it('contains the current log level', () => {
                expect(logger.level).toBe(LEVELS.WARN);
            });

            it('throws when set to an invalid value', () => {
                expect(() => {
                    logger.level = LEVELS.VERBOSE + 1;
                }).toThrowErrorOfType(TYPE_ERROR);
            });

            // The `events` tests set this property to valid values, so no need to test that
            // behavior again here.
        });
    });

    describe('LEVELS', () => {
        it('has a numeric SILENT property', () => {
            expect(LEVELS.SILENT).toBeWholeNumber();
        });

        it('has a numeric FATAL property', () => {
            expect(LEVELS.FATAL).toBeWholeNumber();
        });

        it('has a numeric ERROR property', () => {
            expect(LEVELS.ERROR).toBeWholeNumber();
        });

        it('has a numeric WARN property', () => {
            expect(LEVELS.WARN).toBeWholeNumber();
        });

        it('has a numeric INFO property', () => {
            expect(LEVELS.INFO).toBeWholeNumber();
        });

        it('has a numeric DEBUG property', () => {
            expect(LEVELS.DEBUG).toBeWholeNumber();
        });

        it('has a numeric VERBOSE property', () => {
            expect(LEVELS.VERBOSE).toBeWholeNumber();
        });

        it('orders the log levels correctly', () => {
            expect(LEVELS.SILENT).toBeLessThan(LEVELS.FATAL);
            expect(LEVELS.FATAL).toBeLessThan(LEVELS.ERROR);
            expect(LEVELS.ERROR).toBeLessThan(LEVELS.WARN);
            expect(LEVELS.WARN).toBeLessThan(LEVELS.INFO);
            expect(LEVELS.INFO).toBeLessThan(LEVELS.DEBUG);
            expect(LEVELS.DEBUG).toBeLessThan(LEVELS.VERBOSE);
        });
    });
});
