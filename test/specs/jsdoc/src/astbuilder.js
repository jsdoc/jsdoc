describe('jsdoc/src/astbuilder', () => {
    const astbuilder = require('jsdoc/src/astbuilder');

    it('should exist', () => {
        expect(astbuilder).toBeDefined();
        expect(typeof astbuilder).toBe('object');
    });

    it('should export an AstBuilder class', () => {
        expect(astbuilder.AstBuilder).toBeDefined();
        expect(typeof astbuilder.AstBuilder).toBe('function');
    });

    describe('AstBuilder', () => {
        // TODO: more tests
        let builder;

        beforeEach(() => {
            builder = new astbuilder.AstBuilder();
        });

        it('should provide a "build" method', () => {
            expect(builder.build).toBeDefined();
            expect(typeof builder.build).toBe('function');
        });

        describe('build', () => {
            // TODO: more tests
            const logger = require('jsdoc/util/logger');

            beforeEach(() => {
                spyOn(logger, 'error');
            });

            it('should log (not throw) an error when a file cannot be parsed', () => {
                function parse() {
                    builder.build('qwerty!!!!!', 'bad.js');
                }

                expect(parse).not.toThrow();
                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});
