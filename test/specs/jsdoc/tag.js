/*global describe: true, env: true, it: true */
describe("jsdoc/tag", function() {
    var jsdoc = {
        tag: require('jsdoc/tag'),
        dictionary: require('jsdoc/tag/dictionary'),
        type: require('jsdoc/tag/type')
    };

    it('should exist', function() {
        expect(jsdoc.tag).toBeDefined();
        expect(typeof jsdoc.tag).toEqual('object');
    });

    it('should export a Tag function', function() {
        expect(jsdoc.tag.Tag).toBeDefined();
        expect(typeof jsdoc.tag.Tag).toEqual('function');
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
            expect(typeof tagArg.originalTitle).toEqual('string');
        });

        it("'originalTitle' property should be the initial tag title, trimmed of whitespace", function() {
            expect(tagArg.originalTitle).toEqual('arg');
            expect(tagEg.originalTitle).toEqual('example');
        });

        it("should have a 'title' property, a string", function() {
            expect(tagArg.title).toBeDefined();
            expect(typeof tagArg.title).toEqual('string');
        });

        it("'title' property should be the normalised tag title", function() {
            expect(tagArg.title).toEqual(jsdoc.dictionary.normalise(tagArg.originalTitle));
            expect(tagEg.title).toEqual(jsdoc.dictionary.normalise(tagEg.originalTitle));
        });

        it("should have a 'text' property. a string", function () {
            expect(tagArg.text).toBeDefined();
            expect(typeof tagArg.text).toEqual('string');
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
                expect(tagArg.text).toEqual(text.replace(/^\s+|\s+$/g, ''));
                expect(tagEg.text).toEqual(textEg.replace(/^[\n\r\f]+|[\n\r\f]+$/g, ''));
            });

            it("'text' property should have onTagText run on it if it has it.", function() {
                var def = jsdoc.dictionary.lookUp('type');
                expect(def.onTagText).toBeDefined();
                expect(typeof def.onTagText).toEqual('function');

                // @type adds {} around the type if necessary.
                expect(tagType.text).toBeDefined();
                expect(tagType.text).toEqual(def.onTagText('MyType'));
            });
        });

        describe("'value' property", function() {
            it("'value' property should equal tag text if tagDef.canHaveType and canHaveName are both false", function() {
                // @example can't have type or name
                expect(typeof tagEg.value).toEqual('string');
                expect(tagEg.value).toEqual(tagEg.text);
            });

            it("'value' property should be an object if tagDef can have type or name", function () {
                expect(typeof tagType.value).toEqual('object');
                expect(typeof tagArg.value).toEqual('object');
            });

            function verifyTagType(tag) {
                var def = jsdoc.dictionary.lookUp(tag.title);
                expect(def).not.toEqual(false);
                var info = jsdoc.type.parse(tag.text, def.canHaveName, def.canHaveType);

                var props_that_should_be_copied = ['optional', 'nullable', 'variable', 'defaultvalue'];
                for (var i = 0; i < props_that_should_be_copied.length; ++i) {
                    var prop = props_that_should_be_copied[i];
                    if (info.hasOwnProperty(prop)) {
                        expect(tag.value[prop]).toEqual(info[prop]);
                    }
                }
                if (info.type && info.type.length) {
                    expect(tag.value.type).toBeDefined();
                    expect(typeof tag.value.type).toEqual('object');
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
                expect(tagArg.value.description).toEqual(desc);
            });

            it("if the tag can have a name, it should be stored in tag.value.name", function() {
                expect(tagArg.value.name).toBeDefined();
                expect(tagArg.value.name).toEqual('foo');

                expect(tagType.value.name).not.toBeDefined();
            });
        });

        // further tests for this sort of thing are in jsdoc/tag/validator.js tests.
        describe("tag validating", function() {
            /*jshint evil: true */
            var lenient = !!env.opts.lenient,
                log = eval(console.log);
            
            function badTag() {
                var tag = new jsdoc.tag.Tag("name");
                return tag;
            }

            afterEach(function() {
                env.opts.lenient = lenient;
                console.log = log;
            });

            it("throws an exception for bad tags if the lenient option is not enabled", function() {
                env.opts.lenient = false;

                expect(badTag).toThrow();
            });
            
            it("doesn't throw an exception for bad tags if the lenient option is enabled", function() {
                console.log = function() {};
                env.opts.lenient = true;

                expect(badTag).not.toThrow();
            });
        });
    });
});
