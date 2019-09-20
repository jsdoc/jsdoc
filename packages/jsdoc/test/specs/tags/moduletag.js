function filter({undocumented}) {
    return !undocumented;
}

describe('@module tag', () => {
    describe("using 'this'", () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag.js');
        const book = docSet.getByLongname('module:bookshelf.Book')[0];
        const title = docSet.getByLongname('module:bookshelf.Book#title')[0];

        it('When a global symbol starts with "this" and is in a file with a @module tag, the symbol is documented as a member of that module.', () => {
            expect(book).toBeObject();
            expect(book.memberof).toBe('module:bookshelf');
        });

        it('When an inner symbol starts with "this" and is in a file with a @module tag, the symbol is documented as a member of its enclosing constructor.', () => {
            expect(title).toBeObject();
            expect(title.memberof).toBe('module:bookshelf.Book');
        });
    });

    describe('misc', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag2.js');
        const mixer = docSet.getByLongname('module:color/mixer').filter(filter)[0];
        const blend = docSet.getByLongname('module:color/mixer.blend')[0];
        const darken = docSet.getByLongname('module:color/mixer.darken')[0];

        it('When a @module tag defines a module, a symbol of kind "module" is documented', () => {
            expect(mixer).toBeObject();
            expect(mixer.kind).toBe('module');
        });

        it('When a @module tag defines a module, the module doclet does not have a "scope" property', () => {
            expect(mixer.scope).toBeUndefined();
        });

        it('When an object literal is lent to a module with a @lends tag, a member of that object literal is documented as a member of the module', () => {
            expect(blend).toBeObject();
            expect(blend.kind).toBe('function');
        });

        it('When a documented symbol is a member of a namespace "exports", it is documented as a member of the module', () => {
            expect(darken).toBeObject();
            expect(darken.kind).toBe('function');
        });
    });

    describe('virtual comments', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag4.js');
        const clickProperties = docSet.getByLongname('module:M1~ClickProperties')[0];
        const virtFunc = docSet.getByLongname('module:M1.VirtualComment')[0];
        const virtFunc2 = docSet.getByLongname('module:M1#VirtualComment2')[0];

        it('When a virtual comment typedef is inside a module, the typedef is a memberof the module', () => {
            expect(clickProperties.memberof).toBe('module:M1');
        });

        it('When a virtual comment typedef is inside a module, the typedef longname contains the module name', () => {
            expect(clickProperties.longname).toBe('module:M1~ClickProperties');
        });

        it('When a virtual comment typedef is inside a module, the typedef scope is "inner"', () => {
            expect(clickProperties.scope).toBe('inner');
        });

        it('When a virtual comment function is inside a module with a static scope, the function has the correct memberof and longname', () => {
            expect(virtFunc.longname).toBe('module:M1.VirtualComment');
            expect(virtFunc.memberof).toBe('module:M1');
        });

        it('When a virtual comment function is inside a module with an instance scope, the function has the correct memberof and longname', () => {
            expect(virtFunc2.longname).toBe('module:M1#VirtualComment2');
            expect(virtFunc2.memberof).toBe('module:M1');
        });
    });

    describe('"module:" namespace included in the name', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag5.js');
        const bookshelf = docSet.getByLongname('module:bookshelf')[0];

        it('When the name for a @module tag begins with the "module:" namespace, we remove the namespace', () => {
            expect(bookshelf).toBeObject();
            expect(bookshelf.name).toBe('bookshelf');
        });
    });

    describe('ES 2015 modules', () => {
        describe('that export a default', () => {
            describe('value type', () => {
                const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag6.js');
                const exports = docSet.getByLongname('module:appname').filter(({kind}) => kind === 'member')[0];

                it('When a value type is exported, it has the same name as the module longname', () => {
                    expect(exports.name).toBe('module:appname');
                });
            });

            describe('object', () => {
                const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag7.js');
                const blend = docSet.getByLongname('module:color/mixer.blend')[0];

                it('When an object is exported, its members have the correct name, memberof, and kind', () => {
                    expect(blend.name).toBe('blend');
                    expect(blend.memberof).toBe('module:color/mixer');
                    expect(blend.kind).toBe('function');
                });
            });
        });

        describe('that export named values', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag8.js');
            const blend = docSet.getByLongname('module:color/mixer.blend')[0];
            const lastColor = docSet.getByLongname('module:color/mixer.lastColor')[0];
            const name = docSet.getByLongname('module:color/mixer.name')[0];
            const toRgb = docSet.getByLongname('module:color/mixer.toRgb')[0];

            it('When a method is exported, it has the correct name, memberof, and kind', () => {
                expect(blend.name).toBe('blend');
                expect(blend.memberof).toBe('module:color/mixer');
                expect(blend.kind).toBe('function');
            });

            it('When a variable is exported, it has the correct name, memberof, and kind', () => {
                expect(lastColor.name).toBe('lastColor');
                expect(lastColor.memberof).toBe('module:color/mixer');
                expect(lastColor.kind).toBe('member');
            });

            it('When a constant is exported, it has the correct name, memberof, and kind', () => {
                expect(name.name).toBe('name');
                expect(name.memberof).toBe('module:color/mixer');
                expect(name.kind).toBe('constant');
            });

            it('When a symbol is exported under a different name, it has the correct name, memberof, and kind', () => {
                expect(toRgb.name).toBe('toRgb');
                expect(toRgb.memberof).toBe('module:color/mixer');
                expect(toRgb.kind).toBe('function');
            });
        });

        describe('that export another module in its entirety', () => {
            it('should not crash JSDoc', () => {
                function getDocSet() {
                    jsdoc.getDocSetFromFile('test/fixtures/moduletag9.js');
                }

                expect(getDocSet).not.toThrow();
            });
        });

        describe('that export an unnamed default function', () => {
            it('should not crash JSDoc', () => {
                function getDocSet() {
                    jsdoc.getDocSetFromFile('test/fixtures/moduletag10.js');
                }

                expect(getDocSet).not.toThrow();
            });
        });

        describe('that export a class', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/moduletag11.js');
            const foo = docSet.getByLongname('module:foo.Foo').filter(filter)[0];
            const testMethod = docSet.getByLongname('module:foo.Foo#testMethod')[0];

            it('should identify the correct scope for the exported class', () => {
                expect(foo).toBeObject();
            });

            it('should merge the doclet for the constructor with the doclet for the ' +
                'class', () => {
                expect(foo.description).toBe('Test class constructor.');
            });

            it('should identify the correct scope for the exported class\'s methods', () => {
                expect(testMethod).toBeObject();
            });
        });
    });
});
