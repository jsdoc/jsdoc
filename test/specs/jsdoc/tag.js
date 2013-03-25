/*global describe: true, env: true, it: true */
describe("jsdoc/tag", function() {
    var jsdoc = {
        tag: require('jsdoc/tag'),
        dictionary: require('jsdoc/tag/dictionary'),
        type: require('jsdoc/tag/type')
    };

    it('should exist', function() {
        expect(jsdoc.tag).toBeDefined();
        expect(typeof jsdoc.tag).toBe('object');
    });

    it('should export a Tag function', function() {
        expect(jsdoc.tag.Tag).toBeDefined();
        expect(typeof jsdoc.tag.Tag).toBe('function');
    });

    describe('Tag', function() {
        var meta = {lineno: 1, filename: 'asdf.js'},
            desc = 'lalblakd lkjasdlib\n  lija',
            text = '{!number} [foo=1] - ' + desc,
            textEg = '<caption>Asdf</caption>\n' +
                     ' * myFunction(1, 2); // returns 3\n' +
                     ' * myFunction(3, 4); // returns 7\n';
        var tagArg = new jsdoc.tag.Tag('arg  ', text, meta), // <-- a symonym of param, space in the title.
            tagParam = new jsdoc.tag.Tag('param', '[foo=1]', meta), // no type, but has optional and defaultvalue.
            tagEg  = new jsdoc.tag.Tag('example', textEg, meta), // <-- for keepsWhitespace
            tagType = new jsdoc.tag.Tag('type', 'MyType ', meta); // <-- for onTagText

        it("should have a 'originalTitle' property, a string", function() {
            expect(tagArg.originalTitle).toBeDefined();
            expect(typeof tagArg.originalTitle).toBe('string');
        });

        it("'originalTitle' property should be the initial tag title, trimmed of whitespace", function() {
            expect(tagArg.originalTitle).toBe('arg');
            expect(tagEg.originalTitle).toBe('example');
        });

        it("should have a 'title' property, a string", function() {
            expect(tagArg.title).toBeDefined();
            expect(typeof tagArg.title).toBe('string');
        });

        it("'title' property should be the normalised tag title", function() {
            expect(tagArg.title).toBe(jsdoc.dictionary.normalise(tagArg.originalTitle));
            expect(tagEg.title).toBe(jsdoc.dictionary.normalise(tagEg.originalTitle));
        });

        it("should have a 'text' property. a string", function () {
            expect(tagArg.text).toBeDefined();
            expect(typeof tagArg.text).toBe('string');
        });

        it("should have a 'value' property", function () {
            expect(tagArg.value).toBeDefined();
            expect(tagEg.value).toBeDefined();
            expect(tagType.value).toBeDefined();
        });

        describe("'text' property", function() {
            it("'text' property should be the trimmed tag text, with all leading and trailing space removed unless tagDef.keepsWhitespace", function() {
                // @example has keepsWhitespace, @param doesn't.
                // should realy use module:jsdoc/tag~trim here but it's private.
                expect(tagArg.text).toBe(text.replace(/^\s+|\s+$/g, ''));
                expect(tagEg.text).toBe(textEg.replace(/^[\n\r\f]+|[\n\r\f]+$/g, ''));
            });

            it("'text' property should have onTagText run on it if it has it.", function() {
                var def = jsdoc.dictionary.lookUp('type');
                expect(def.onTagText).toBeDefined();
                expect(typeof def.onTagText).toBe('function');

                // @type adds {} around the type if necessary.
                expect(tagType.text).toBeDefined();
                expect(tagType.text).toBe(def.onTagText('MyType'));
            });
        });

        describe("'value' property", function() {
            it("'value' property should equal tag text if tagDef.canHaveType and canHaveName are both false", function() {
                // @example can't have type or name
                expect(typeof tagEg.value).toBe('string');
                expect(tagEg.value).toBe(tagEg.text);
            });

            it("'value' property should be an object if tagDef can have type or name", function () {
                expect(typeof tagType.value).toBe('object');
                expect(typeof tagArg.value).toBe('object');
            });

            function verifyTagType(tag) {
                var def = jsdoc.dictionary.lookUp(tag.title);
                expect(def).not.toBe(false);
                var info = jsdoc.type.parse(tag.text, def.canHaveName, def.canHaveType);

                var props_that_should_be_copied = ['optional', 'nullable', 'variable', 'defaultvalue'];
                for (var i = 0; i < props_that_should_be_copied.length; ++i) {
                    var prop = props_that_should_be_copied[i];
                    if (info.hasOwnProperty(prop)) {
                        expect(tag.value[prop]).toBe(info[prop]);
                    }
                }
                if (info.type && info.type.length) {
                    expect(tag.value.type).toBeDefined();
                    expect(typeof tag.value.type).toBe('object');
                    expect(tag.value.type.names).toBeDefined();
                    expect(tag.value.type.names).toEqual(info.type);
                }
            }
            it("if the tag has a type, tag.value should contain the type information", function() {
                // we assume jsdoc/tag/type.parse works (it has its own tests to verify this);
                verifyTagType(tagType);
                verifyTagType(tagArg);
                verifyTagType(tagParam);
            });

            it("if the tag has a description beyond the name/type, this should be in tag.value.description", function() {
                expect(tagType.value.description).not.toBeDefined();

                expect(tagArg.value.description).toBeDefined();
                expect(tagArg.value.description).toBe(desc);
            });

            it("if the tag can have a name, it should be stored in tag.value.name", function() {
                expect(tagArg.value.name).toBeDefined();
                expect(tagArg.value.name).toBe('foo');

                expect(tagType.value.name).not.toBeDefined();
            });
        });

        // further tests for this sort of thing are in jsdoc/tag/validator.js tests.
        describe("tag validating", function() {
            /*jshint evil: true */
            var lenient = !!env.opts.lenient;
            
            function badTag() {
                var tag = new jsdoc.tag.Tag("name");
                return tag;
            }

            afterEach(function() {
                env.opts.lenient = lenient;
            });

            it("throws an exception for bad tags if the lenient option is not enabled", function() {
                env.opts.lenient = false;

                expect(badTag).toThrow();
            });
            
            it("doesn't throw an exception for bad tags if the lenient option is enabled", function() {
                spyOn(console, 'log');
                env.opts.lenient = true;

                expect(badTag).not.toThrow();
            });
        });
    });
});
