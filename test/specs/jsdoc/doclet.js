/* global jsdoc */
describe('jsdoc/doclet', () => {
    // TODO: more tests
    const _ = require('lodash');
    const docletModule = require('jsdoc/doclet');
    const Doclet = docletModule.Doclet;

    const docSet = jsdoc.getDocSetFromFile('test/fixtures/doclet.js');
    const test1 = docSet.getByLongname('test1')[0];
    const test2 = docSet.getByLongname('test2')[0];

    const expectList = '* List item 1';
    const expectStrong = '**Strong** is strong';

    it('does not mangle Markdown in a description that uses leading asterisks', () => {
        expect(test2.description.indexOf(expectList)).toBeGreaterThan(-1);
        expect(test2.description.indexOf(expectStrong)).toBeGreaterThan(-1);
    });

    it('adds the AST node as a non-enumerable property', () => {
        const descriptor = Object.getOwnPropertyDescriptor(test1.meta.code, 'node');

        expect(descriptor.enumerable).toBe(false);
    });

    describe('setScope', () => {
        it('should accept the correct scope names', () => {
            function setScope(scopeName) {
                const doclet = new Doclet('/** Huzzah, a doclet! */');

                doclet.setScope(scopeName);
            }

            _.values(require('jsdoc/name').SCOPE.NAMES).forEach(scopeName => {
                expect( setScope.bind(null, scopeName) ).not.toThrow();
            });
        });

        it('should throw an error for invalid scope names', () => {
            function setScope() {
                const doclet = new Doclet('/** Woe betide this doclet. */');

                doclet.setScope('fiddlesticks');
            }

            expect(setScope).toThrow();
        });
    });

    describe('combine', () => {
        it('should override most properties of the secondary doclet', () => {
            const primaryDoclet = new Doclet('/** New and improved!\n@version 2.0.0 */');
            const secondaryDoclet = new Doclet('/** Hello!\n@version 1.0.0 */');
            const newDoclet = docletModule.combine(primaryDoclet, secondaryDoclet);

            Object.getOwnPropertyNames(newDoclet).forEach(property => {
                expect(newDoclet[property]).toEqual(primaryDoclet[property]);
            });
        });

        it('should add properties that are missing from the secondary doclet', () => {
            const primaryDoclet = new Doclet('/** Hello!\n@version 2.0.0 */');
            const secondaryDoclet = new Doclet('/** Hello! */');
            const newDoclet = docletModule.combine(primaryDoclet, secondaryDoclet);

            expect(newDoclet.version).toBe('2.0.0');
        });

        describe('params and properties', () => {
            const properties = [
                'params',
                'properties'
            ];

            it('should use the secondary doclet\'s params and properties if the primary doclet ' +
                'had none', () => {
                const primaryDoclet = new Doclet('/** Hello! */');
                const secondaryComment = [
                    '/**',
                    ' * @param {string} foo - The foo.',
                    ' * @property {number} bar - The bar.',
                    ' */'
                ].join('\n');
                const secondaryDoclet = new Doclet(secondaryComment);
                const newDoclet = docletModule.combine(primaryDoclet, secondaryDoclet);

                properties.forEach(property => {
                    expect(newDoclet[property]).toEqual(secondaryDoclet[property]);
                });
            });

            it('should use the primary doclet\'s params and properties if the primary doclet has ' +
                'some', () => {
                const primaryComment = [
                    '/**',
                    ' * @param {number} baz - The baz.',
                    ' * @property {string} qux - The qux.',
                    ' */'
                ].join('\n');
                const primaryDoclet = new Doclet(primaryComment);
                const secondaryComment = [
                    '/**',
                    ' * @param {string} foo - The foo.',
                    ' * @property {number} bar - The bar.',
                    ' */'
                ].join('\n');
                const secondaryDoclet = new Doclet(secondaryComment);
                const newDoclet = docletModule.combine(primaryDoclet, secondaryDoclet);

                properties.forEach(property => {
                    expect(newDoclet[property]).toEqual(primaryDoclet[property]);
                });
            });
        });
    });
});
