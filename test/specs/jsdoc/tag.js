describe('jsdoc/tag', () => {
    const jsdoc = {
        env: require('jsdoc/env'),
        tag: require('jsdoc/tag'),
        dictionary: require('jsdoc/tag/dictionary'),
        type: require('jsdoc/tag/type')
    };
    const logger = require('@jsdoc/logger');

    const hasOwnProp = Object.prototype.hasOwnProperty;

    it('should exist', () => {
        expect(jsdoc.tag).toBeDefined();
        expect(typeof jsdoc.tag).toBe('object');
    });

    it('should export a Tag function', () => {
        expect(jsdoc.tag.Tag).toBeDefined();
        expect(typeof jsdoc.tag.Tag).toBe('function');
    });

    describe('Tag', () => {
        const meta = {
            lineno: 1,
            filename: 'asdf.js'
        };
        const desc = 'lalblakd lkjasdlib\n  lija';
        const text = `{!number} [foo=1] - ${desc}`;
        const exampleRaw = [
            '<caption>Asdf</caption>\n',
            ' myFunction(1, 2); // returns 3\n',
            ' myFunction(3, 4); // returns 7\n'
        ];
        const textExample = exampleRaw.join('');
        const exampleIndentedRaw = [
            '     var firstLine;\n',
            '     function secondLine() {\n',
            '         // comment\n',
            '     }\n'
        ];
        const textExampleIndented = exampleIndentedRaw.join('');

        let tagArg;
        let tagExample;
        let tagExampleIndented;
        let tagParam;
        let tagParamWithType;
        let tagType;

        // allow each test to recreate the tags (for example, after enabling debug mode)
        function createTags() {
            // synonym for @param; space in the title
            tagArg = new jsdoc.tag.Tag('arg  ', text, meta);
            // @param with no type, but with optional and defaultvalue
            tagParam = new jsdoc.tag.Tag('param', '[foo=1]', meta);
            // @param with type and no type modifiers (such as optional)
            tagParamWithType = new jsdoc.tag.Tag('param', '{string} foo', meta);
            // @example that does not need indentation to be removed
            tagExample = new jsdoc.tag.Tag('example', textExample, meta);
            // @example that needs indentation to be removed
            tagExampleIndented = new jsdoc.tag.Tag('example', textExampleIndented, meta);
            // for testing that onTagText is run when necessary
            tagType = new jsdoc.tag.Tag('type', 'MyType ', meta);
        }

        beforeEach(() => {
            createTags();
        });

        it("should have a 'originalTitle' property, a string", () => {
            expect(tagArg.originalTitle).toBeDefined();
            expect(typeof tagArg.originalTitle).toBe('string');
        });

        it("'originalTitle' property should be the initial tag title, trimmed of whitespace", () => {
            expect(tagArg.originalTitle).toBe('arg');
            expect(tagExample.originalTitle).toBe('example');
        });

        it("should have a 'title' property, a string", () => {
            expect(tagArg.title).toBeDefined();
            expect(typeof tagArg.title).toBe('string');
        });

        it("'title' property should be the normalized tag title", () => {
            expect(tagArg.title).toBe(jsdoc.dictionary.normalize(tagArg.originalTitle));
            expect(tagExample.title).toBe(jsdoc.dictionary.normalize(tagExample.originalTitle));
        });

        it("should have a 'text' property, a string", () => {
            expect(tagArg.text).toBeDefined();
            expect(typeof tagArg.text).toBe('string');
        });

        it("should have a 'value' property", () => {
            expect(tagArg.value).toBeDefined();
            expect(tagExample.value).toBeDefined();
            expect(tagType.value).toBeDefined();
        });

        describe("'text' property", () => {
            it("'text' property should be the trimmed tag text, with all leading and trailing space removed unless tagDef.keepsWhitespace", () => {
                // @example has keepsWhitespace and removesIndent, @param doesn't
                expect(tagArg.text).toBe( text.replace(/^\s+|\n$/g, '') );
                expect(tagExample.text).toBe( textExample.replace(/\n$/, '') );
                expect(tagExampleIndented.text).toBe( textExampleIndented.replace(/^ {5}/gm, '')
                    .replace(/\n$/, '') );
            });

            it("'text' property should have onTagText run on it if it has it.", () => {
                const def = jsdoc.dictionary.lookUp('type');

                expect(def.onTagText).toBeDefined();
                expect(typeof def.onTagText).toBe('function');

                // @type adds {} around the type if necessary.
                expect(tagType.text).toBeDefined();
                expect(tagType.text).toBe(def.onTagText('MyType'));
            });

            it('should be enclosed in quotes, with no whitespace trimming, if it is a symbol name with leading or trailing whitespace', () => {
                let wsBoth;
                let wsLeading;
                let wsOnly;
                let wsTrailing;

                spyOn(logger, 'error');

                wsOnly = new jsdoc.tag.Tag('name', ' ', { code: { name: ' ' } });
                wsLeading = new jsdoc.tag.Tag('name', '  foo', { code: { name: '  foo' } });
                wsTrailing = new jsdoc.tag.Tag('name', 'foo  ', { code: { name: 'foo  ' } });
                wsBoth = new jsdoc.tag.Tag('name', '  foo  ', { code: { name: '  foo  ' } });

                expect(logger.error).not.toHaveBeenCalled();
                expect(wsOnly.text).toBe('" "');
                expect(wsLeading.text).toBe('"  foo"');
                expect(wsTrailing.text).toBe('"foo  "');
                expect(wsBoth.text).toBe('"  foo  "');
            });
        });

        describe("'value' property", () => {
            it("'value' property should equal tag text if tagDef.canHaveType and canHaveName are both false", () => {
                // @example can't have type or name
                expect(typeof tagExample.value).toBe('string');
                expect(tagExample.value).toBe(tagExample.text);
            });

            it("'value' property should be an object if tagDef can have type or name", () => {
                expect(typeof tagType.value).toBe('object');
                expect(typeof tagArg.value).toBe('object');
            });

            function verifyTagType(tag) {
                let def;
                let descriptor;
                let info;

                def = jsdoc.dictionary.lookUp(tag.title);
                expect(def).not.toBe(false);

                info = jsdoc.type.parse(tag.text, def.canHaveName, def.canHaveType);

                ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(prop => {
                    if (hasOwnProp.call(info, prop)) {
                        expect(tag.value[prop]).toBe(info[prop]);
                    }
                });

                if (info.type && info.type.length) {
                    expect(tag.value.type).toBeDefined();
                    expect(typeof tag.value.type).toBe('object');
                    expect(tag.value.type.names).toBeDefined();
                    expect(tag.value.type.names).toEqual(info.type);

                    expect(tag.value.type.parsedType).toBeDefined();
                    expect(typeof tag.value.type.parsedType).toBe('object');

                    descriptor = Object.getOwnPropertyDescriptor(tag.value.type, 'parsedType');
                    expect(descriptor.enumerable).toBe( Boolean(jsdoc.env.opts.debug) );
                }
            }

            it('if the tag has a type, tag.value should contain the type information', () => {
                // we assume jsdoc/tag/type.parse works (it has its own tests to verify this);
                const debug = Boolean(jsdoc.env.opts.debug);

                [true, false].forEach(bool => {
                    jsdoc.env.opts.debug = bool;
                    createTags();

                    verifyTagType(tagType);
                    verifyTagType(tagArg);
                    verifyTagType(tagParam);
                });

                jsdoc.env.opts.debug = debug;
            });

            it('if the tag has a description beyond the name/type, this should be in tag.value.description', () => {
                expect(tagType.value.description).not.toBeDefined();

                expect(tagArg.value.description).toBeDefined();
                expect(tagArg.value.description).toBe(desc);
            });

            it('if the tag can have a name, it should be stored in tag.value.name', () => {
                expect(tagArg.value.name).toBeDefined();
                expect(tagArg.value.name).toBe('foo');

                expect(tagType.value.name).not.toBeDefined();
            });

            it('if the tag has a type without modifiers, tag.value should not include properties for the modifiers', () => {
                ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(modifier => {
                    expect(hasOwnProp.call(tagParamWithType.value, modifier)).toBe(false);
                });
            });
        });

        // further tests for this sort of thing are in jsdoc/tag/validator.js tests.
        describe('tag validating', () => {
            beforeEach(() => {
                spyOn(logger, 'error');
            });

            it('logs an error for tags with bad type expressions', () => {
                /* eslint-disable no-unused-vars */
                const tag = new jsdoc.tag.Tag('param', '{!*!*!*!} foo');
                /* eslint-enable no-unused-vars */

                expect(logger.error).toHaveBeenCalled();
            });

            it('validates tags with no text', () => {
                /* eslint-disable no-unused-vars */
                const tag = new jsdoc.tag.Tag('copyright');
                /* eslint-enable no-unused-vars */

                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});
