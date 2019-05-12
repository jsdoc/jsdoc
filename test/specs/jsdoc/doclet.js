describe('jsdoc/doclet', () => {
    // TODO: more tests
    const _ = require('lodash');
    const doclet = require('jsdoc/doclet');
    const Doclet = doclet.Doclet;

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
                const newDoclet = new Doclet('/** Huzzah, a doclet! */');

                newDoclet.setScope(scopeName);
            }

            _.values(require('jsdoc/name').SCOPE.NAMES).forEach(scopeName => {
                expect( setScope.bind(null, scopeName) ).not.toThrow();
            });
        });

        it('should throw an error for invalid scope names', () => {
            function setScope() {
                const newDoclet = new Doclet('/** Woe betide this doclet. */');

                newDoclet.setScope('fiddlesticks');
            }

            expect(setScope).toThrow();
        });
    });

    // TODO(hegemonic): More tests.
    describe('combine', () => {
        it('overrides most properties of the secondary doclet', () => {
            const primaryDoclet = new Doclet(`
                /**
                 * New and improved!
                 * @version 2.0.0
                 */`);
            const secondaryDoclet = new Doclet(`
                /**
                 * Hello!
                 * @version 1.0.0
                 */`);
            const newDoclet = doclet.combine(primaryDoclet, secondaryDoclet);

            Object.getOwnPropertyNames(newDoclet).forEach(property => {
                expect(newDoclet[property]).toEqual(primaryDoclet[property]);
            });
        });

        it('adds properties that are missing from the secondary doclet', () => {
            const primaryDoclet = new Doclet(`
                /**
                 * Hello!
                 * @version 2.0.0
                 */`);
            const secondaryDoclet = new Doclet(`
                /**
                 * Hello!
                 */`);
            const newDoclet = doclet.combine(primaryDoclet, secondaryDoclet);

            expect(newDoclet.version).toBe('2.0.0');
        });

        it('ignores the property `undocumented`', () => {
            const primaryDoclet = new Doclet('/** Hello! */');
            const secondaryDoclet = new Doclet('/** Hello again! */');
            let newDoclet;

            primaryDoclet.undocumented = true;
            secondaryDoclet.undocumented = true;

            newDoclet = doclet.combine(primaryDoclet, secondaryDoclet);

            expect(newDoclet.undocumented).not.toBeDefined();
        });

        describe('params and properties', () => {
            const properties = [
                'params',
                'properties'
            ];

            it('uses the primary doclet\'s params and properties if present', () => {
                const primaryDoclet = new Doclet(`
                    /**
                     * @param {number} baz - The baz.
                     * @property {string} qux - The qux.
                     */`);
                const secondaryDoclet = new Doclet(`
                    /**
                     * @param {string} foo - The foo.
                     * @property {number} bar - The bar.
                     */`);
                const newDoclet = doclet.combine(primaryDoclet, secondaryDoclet);

                properties.forEach(property => {
                    expect(newDoclet[property]).toEqual(primaryDoclet[property]);
                });
            });

            it('uses the secondary doclet\'s params and properties if necessary', () => {
                const primaryDoclet = new Doclet('/** Hello! */');
                const secondaryComment = `
                    /**
                     * @param {string} foo - The foo.
                     * @property {number} bar - The bar.
                     */`;
                const secondaryDoclet = new Doclet(secondaryComment);
                const newDoclet = doclet.combine(primaryDoclet, secondaryDoclet);

                properties.forEach(property => {
                    expect(newDoclet[property]).toEqual(secondaryDoclet[property]);
                });
            });
        });
    });
});
