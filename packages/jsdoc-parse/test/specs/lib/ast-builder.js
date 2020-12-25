/* global jsdoc */
describe('@jsdoc/parse/lib/ast-builder', () => {
    const astBuilder = require('../../../lib/ast-builder');

    it('is an object', () => {
        expect(astBuilder).toBeObject();
    });

    it('exports an AstBuilder class', () => {
        expect(astBuilder.AstBuilder).toBeFunction();
    });

    it('exports a parserOptions object', () => {
        expect(astBuilder.parserOptions).toBeObject();
    });

    describe('AstBuilder', () => {
        const { AstBuilder } = astBuilder;

        // TODO: more tests
        it('has a "build" static method', () => {
            expect(AstBuilder.build).toBeFunction();
        });

        describe('build', () => {
            // TODO: more tests
            it('logs (not throws) an error when a file cannot be parsed', () => {
                function parse() {
                    AstBuilder.build('qwerty!!!!!', 'bad.js');
                }

                expect(parse).not.toThrow();
                expect(jsdoc.didLog(parse, 'error')).toBeTrue();
            });
        });
    });

    describe('parserOptions', () => {
        // TODO: tests
    });
});
