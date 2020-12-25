const hasOwnProp = Object.prototype.hasOwnProperty;

describe('jsdoc/tag', () => {
    const env = require('jsdoc/env');
    const jsdocDictionary = require('jsdoc/tag/dictionary');
    const jsdocTag = require('jsdoc/tag');
    const parseType = require('@jsdoc/tag').type.parse;

    it('should exist', () => {
        expect(jsdocTag).toBeObject();
    });

    it('should export a Tag function', () => {
        expect(jsdocTag.Tag).toBeFunction();
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
            tagArg = new jsdocTag.Tag('arg  ', text, meta);
            // @param with no type, but with optional and defaultvalue
            tagParam = new jsdocTag.Tag('param', '[foo=1]', meta);
            // @param with type and no type modifiers (such as optional)
            tagParamWithType = new jsdocTag.Tag('param', '{string} foo', meta);
            // @example that does not need indentation to be removed
            tagExample = new jsdocTag.Tag('example', textExample, meta);
            // @example that needs indentation to be removed
            tagExampleIndented = new jsdocTag.Tag('example', textExampleIndented, meta);
            // for testing that onTagText is run when necessary
            tagType = new jsdocTag.Tag('type', 'MyType ', meta);
        }

        beforeEach(() => {
            createTags();
        });

        it("should have a 'originalTitle' property, a string", () => {
            expect(tagArg.originalTitle).toBeString();
        });

        it("'originalTitle' property should be the initial tag title, trimmed of whitespace", () => {
            expect(tagArg.originalTitle).toBe('arg');
            expect(tagExample.originalTitle).toBe('example');
        });

        it("should have a 'title' property, a string", () => {
            expect(tagArg.title).toBeString();
        });

        it("'title' property should be the normalized tag title", () => {
            expect(tagArg.title).toBe(jsdocDictionary.normalize(tagArg.originalTitle));
            expect(tagExample.title).toBe(jsdocDictionary.normalize(tagExample.originalTitle));
        });

        it("should have a 'text' property, a string", () => {
            expect(tagArg.text).toBeString();
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
                const def = jsdocDictionary.lookUp('type');

                expect(def.onTagText).toBeFunction();

                // @type adds {} around the type if necessary.
                expect(tagType.text).toBe(def.onTagText('MyType'));
            });

            it('should be enclosed in quotes, with no whitespace trimming, if it is a symbol name with leading or trailing whitespace', () => {
                let wsBoth;
                let wsLeading;
                let wsOnly;
                let wsTrailing;

                function newTags() {
                    wsOnly = new jsdocTag.Tag('name', ' ', { code: { name: ' ' } });
                    wsLeading = new jsdocTag.Tag('name', '  foo', { code: { name: '  foo' } });
                    wsTrailing = new jsdocTag.Tag('name', 'foo  ', { code: { name: 'foo  ' } });
                    wsBoth = new jsdocTag.Tag('name', '  foo  ', { code: { name: '  foo  ' } });
                }

                expect(jsdoc.didLog(newTags, 'error')).toBeFalse();
                expect(wsOnly.text).toBe('" "');
                expect(wsLeading.text).toBe('"  foo"');
                expect(wsTrailing.text).toBe('"foo  "');
                expect(wsBoth.text).toBe('"  foo  "');
            });
        });

        describe("'value' property", () => {
            const debug = Boolean(env.opts.debug);

            afterEach(() => {
                env.opts.debug = debug;
            });

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

                def = jsdocDictionary.lookUp(tag.title);

                expect(def).toBeObject();

                info = parseType(tag.text, def.canHaveName, def.canHaveType);

                ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(prop => {
                    if (hasOwnProp.call(info, prop)) {
                        expect(tag.value[prop]).toBe(info[prop]);
                    }
                });

                if (info.type && info.type.length) {
                    expect(tag.value.type).toBeObject();
                    expect(tag.value.type.names).toEqual(info.type);

                    expect(tag.value.type.parsedType).toBeObject();

                    descriptor = Object.getOwnPropertyDescriptor(tag.value.type, 'parsedType');
                    expect(descriptor.enumerable).toBe( Boolean(env.opts.debug) );
                }
            }

            it('if the tag has a type, tag.value should contain the type information', () => {
                [true, false].forEach(bool => {
                    env.opts.debug = bool;
                    createTags();

                    verifyTagType(tagType);
                    verifyTagType(tagArg);
                    verifyTagType(tagParam);
                });
            });

            it('if the tag has a description beyond the name/type, this should be in tag.value.description', () => {
                expect(tagType.value.description).toBeUndefined();
                expect(tagArg.value.description).toBe(desc);
            });

            it('if the tag can have a name, it should be stored in tag.value.name', () => {
                expect(tagArg.value.name).toBe('foo');
                expect(tagType.value.name).toBeUndefined();
            });

            it('if the tag has a type without modifiers, tag.value should not include properties for the modifiers', () => {
                ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(modifier => {
                    expect( hasOwnProp.call(tagParamWithType.value, modifier) ).toBeFalse();
                });
            });
        });

        // further tests for this sort of thing are in jsdoc/tag/validator.js tests.
        describe('tag validating', () => {
            it('logs an error for tags with bad type expressions', () => {
                function newTag() {
                    return new jsdocTag.Tag('param', '{!*!*!*!} foo');
                }

                expect(jsdoc.didLog(newTag, 'error')).toBeTrue();
            });

            it('validates tags with no text', () => {
                function newTag() {
                    return new jsdocTag.Tag('copyright');
                }

                expect(jsdoc.didLog(newTag, 'error')).toBeTrue();
            });
        });
    });
});
