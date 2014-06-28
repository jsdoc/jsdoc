/*global afterEach, beforeEach, describe, env, expect, it, spyOn */
'use strict';

var hasOwnProp = Object.prototype.hasOwnProperty;

describe('jsdoc/tag', function() {
    var jsdoc = {
        tag: require('jsdoc/tag'),
        dictionary: require('jsdoc/tag/dictionary'),
        type: require('jsdoc/tag/type')
    };
    var logger = require('jsdoc/util/logger');

    it('should exist', function() {
        expect(jsdoc.tag).toBeDefined();
        expect(typeof jsdoc.tag).toBe('object');
    });

    it('should export a Tag function', function() {
        expect(jsdoc.tag.Tag).toBeDefined();
        expect(typeof jsdoc.tag.Tag).toBe('function');
    });

    describe('Tag', function() {
        var meta = {lineno: 1, filename: 'asdf.js'};
        var desc = 'lalblakd lkjasdlib\n  lija';
        var text = '{!number} [foo=1] - ' + desc;
        var exampleRaw = [
            '<caption>Asdf</caption>\n',
            ' myFunction(1, 2); // returns 3\n',
            ' myFunction(3, 4); // returns 7\n'
        ];
        var textExample = exampleRaw.join('');
        var exampleIndentedRaw = [
            '     var firstLine;\n',
            '     function secondLine() {\n',
            '         // comment\n',
            '     }\n'
        ];
        var textExampleIndented = exampleIndentedRaw.join('');

        // synonym for @param; space in the title
        var tagArg = new jsdoc.tag.Tag('arg  ', text, meta);
        // @param with no type, but with optional and defaultvalue
        var tagParam = new jsdoc.tag.Tag('param', '[foo=1]', meta);
        // @example that does not need indentation to be removed
        var tagExample  = new jsdoc.tag.Tag('example', textExample, meta);
        // @example that needs indentation to be removed
        var tagExampleIndented = new jsdoc.tag.Tag('example', textExampleIndented, meta);
        // for testing that onTagText is run when necessary
        var tagType = new jsdoc.tag.Tag('type', 'MyType ', meta);

        it("should have a 'originalTitle' property, a string", function() {
            expect(tagArg.originalTitle).toBeDefined();
            expect(typeof tagArg.originalTitle).toBe('string');
        });

        it("'originalTitle' property should be the initial tag title, trimmed of whitespace", function() {
            expect(tagArg.originalTitle).toBe('arg');
            expect(tagExample.originalTitle).toBe('example');
        });

        it("should have a 'title' property, a string", function() {
            expect(tagArg.title).toBeDefined();
            expect(typeof tagArg.title).toBe('string');
        });

        it("'title' property should be the normalised tag title", function() {
            expect(tagArg.title).toBe(jsdoc.dictionary.normalise(tagArg.originalTitle));
            expect(tagExample.title).toBe(jsdoc.dictionary.normalise(tagExample.originalTitle));
        });

        it("should have a 'text' property, a string", function() {
            expect(tagArg.text).toBeDefined();
            expect(typeof tagArg.text).toBe('string');
        });

        it("should have a 'value' property", function() {
            expect(tagArg.value).toBeDefined();
            expect(tagExample.value).toBeDefined();
            expect(tagType.value).toBeDefined();
        });

        describe("'text' property", function() {
            it("'text' property should be the trimmed tag text, with all leading and trailing space removed unless tagDef.keepsWhitespace", function() {
                // @example has keepsWhitespace and removesIndent, @param doesn't
                expect(tagArg.text).toBe( text.replace(/^\s+|\n$/g, '') );
                expect(tagExample.text).toBe( textExample.replace(/\n$/, '') );
                expect(tagExampleIndented.text).toBe( textExampleIndented.replace(/^ {5}/gm, '')
                    .replace(/\n$/, '') );
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
                expect(typeof tagExample.value).toBe('string');
                expect(tagExample.value).toBe(tagExample.text);
            });

            it("'value' property should be an object if tagDef can have type or name", function () {
                expect(typeof tagType.value).toBe('object');
                expect(typeof tagArg.value).toBe('object');
            });

            function verifyTagType(tag) {
                var def = jsdoc.dictionary.lookUp(tag.title);
                expect(def).not.toBe(false);
                var info = jsdoc.type.parse(tag.text, def.canHaveName, def.canHaveType);

                ['optional', 'nullable', 'variable', 'defaultvalue'].forEach(function(prop) {
                    if (hasOwnProp.call(info, prop)) {
                        expect(tag.value[prop]).toBe(info[prop]);
                    }
                });

                if (info.type && info.type.length) {
                    expect(tag.value.type).toBeDefined();
                    expect(typeof tag.value.type).toBe('object');
                    expect(tag.value.type.names).toBeDefined();
                    expect(tag.value.type.names).toEqual(info.type);
                }
            }
            it('if the tag has a type, tag.value should contain the type information', function() {
                // we assume jsdoc/tag/type.parse works (it has its own tests to verify this);
                verifyTagType(tagType);
                verifyTagType(tagArg);
                verifyTagType(tagParam);
            });

            it('if the tag has a description beyond the name/type, this should be in tag.value.description', function() {
                expect(tagType.value.description).not.toBeDefined();

                expect(tagArg.value.description).toBeDefined();
                expect(tagArg.value.description).toBe(desc);
            });

            it('if the tag can have a name, it should be stored in tag.value.name', function() {
                expect(tagArg.value.name).toBeDefined();
                expect(tagArg.value.name).toBe('foo');

                expect(tagType.value.name).not.toBeDefined();
            });
        });

        // further tests for this sort of thing are in jsdoc/tag/validator.js tests.
        describe('tag validating', function() {
            beforeEach(function() {
                spyOn(logger, 'error');
            });

            it('logs an error for bad tags', function() {
                var tag = new jsdoc.tag.Tag('param', '{!*!*!*!} foo');

                expect(logger.error).toHaveBeenCalled();
            });

            it('validates tags with no text', function() {
                var tag = new jsdoc.tag.Tag('copyright');

                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});
