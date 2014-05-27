/*global describe: true, expect: true, it: true, jasmine: true */
'use strict';

describe('jsdoc/tag/inline', function() {
    var jsdoc = {
        tag: {
            inline: require('jsdoc/tag/inline')
        }
    };

    it('should exist', function() {
        expect(jsdoc.tag.inline).toBeDefined();
        expect(typeof jsdoc.tag.inline).toBe('object');
    });

    it('should export an isInlineTag function', function() {
        expect(jsdoc.tag.inline.isInlineTag).toBeDefined();
        expect(typeof jsdoc.tag.inline.isInlineTag).toBe('function');
    });

    it('should export a replaceInlineTag function', function() {
        expect(jsdoc.tag.inline.replaceInlineTag).toBeDefined();
        expect(typeof jsdoc.tag.inline.replaceInlineTag).toBe('function');
    });

    it('should export an extractInlineTag function', function() {
        expect(jsdoc.tag.inline.extractInlineTag).toBeDefined();
        expect(typeof jsdoc.tag.inline.replaceInlineTag).toBe('function');
    });

    describe('isInlineTag', function() {
        var isInlineTag = jsdoc.tag.inline.isInlineTag;

        it('should correctly identify an inline tag', function() {
            expect( isInlineTag('{@mytag hooray}', 'mytag') ).toBe(true);
        });

        it('should correctly identify a non-inline tag', function() {
            expect( isInlineTag('mytag hooray', 'mytag') ).toBe(false);
        });

        it('should report that a string containing an inline tag is not an inline tag', function() {
            expect( isInlineTag('this is {@mytag hooray}', 'mytag') ).toBe(false);
        });

        it('should default to allowing any inline tag', function() {
            expect( isInlineTag('{@anyoldtag will do}') ).toBe(true);
        });

        it('should still identify non-inline tags when a tag name is not provided', function() {
            expect( isInlineTag('mytag hooray') ).toBe(false);
        });

        it('should allow regexp characters in the tag name', function() {
            expect( isInlineTag('{@mytags hooray}', 'mytag\\S') ).toBe(true);
        });

        it('should return false (rather than throwing) with invalid input', function() {
            function badInput() {
                return isInlineTag();
            }

            expect(badInput).not.toThrow();
            expect( badInput() ).toBe(false);
        });
    });

    describe('replaceInlineTag', function() {
        it('should throw if the tag is matched and the replacer is invalid', function() {
            function badReplacerUndefined() {
                jsdoc.tag.inline.replaceInlineTag('{@foo tag}', 'foo');
            }

            function badReplacerString() {
                jsdoc.tag.inline.replaceInlineTag('{@foo tag}', 'foo', 'hello');
            }

            expect(badReplacerUndefined).toThrow();
            expect(badReplacerString).toThrow();
        });

        it('should not find anything if there is no text in braces', function() {
            var replacer = jasmine.createSpy('replacer');
            var result = jsdoc.tag.inline.replaceInlineTag('braceless text', 'foo', replacer);
            expect(replacer).not.toHaveBeenCalled();
        });

        it('should cope with bad escapement at the end of the string', function() {
            var replacer = jasmine.createSpy('replacer');
            var result = jsdoc.tag.inline.replaceInlineTag('bad {@foo escapement \\', 'foo',
                replacer);
            expect(replacer).not.toHaveBeenCalled();
        });

        it('should work if the tag is the entire string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('{@foo text in braces}');
                expect(tagInfo.completeTag).toBe('{@foo text in braces}');
                expect(tagInfo.text).toBe('text in braces');

                return tagInfo.completeTag;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('{@foo text in braces}', 'foo',
                replacer);
            expect(result.tags[0]).toBeDefined();
            expect(typeof result.tags[0]).toBe('object');
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('text in braces');
            expect(result.newString).toBe('{@foo text in braces}');
        });

        it('should work if the tag is at the beginning of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('{@foo test string} ahoy');
                expect(tagInfo.completeTag).toBe('{@foo test string}');
                expect(tagInfo.text).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('{@foo test string} ahoy', 'foo',
                replacer);
            expect(result.tags[0]).toBeDefined();
            expect(typeof result.tags[0]).toBe('object');
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('test string');
            expect(result.newString).toBe('{@foo test string} ahoy');
        });

        it('should work if the tag is in the middle of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('a {@foo test string} yay');
                expect(tagInfo.completeTag).toBe('{@foo test string}');
                expect(tagInfo.text).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {@foo test string} yay', 'foo',
                replacer);
            expect(result.tags[0]).toBeDefined();
            expect(typeof result.tags[0]).toBe('object');
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('test string');
            expect(result.newString).toBe('a {@foo test string} yay');
        });

        it('should work if the tag is at the end of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('a {@foo test string}');
                expect(tagInfo.completeTag).toBe('{@foo test string}');
                expect(tagInfo.text).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {@foo test string}', 'foo', replacer);
            expect(result.tags[0]).toBeDefined();
            expect(typeof result.tags[0]).toBe('object');
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('test string');
            expect(result.newString).toBe('a {@foo test string}');
        });

        it('should replace the string with the specified value', function() {
            function replacer() {
                return 'REPLACED!';
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {@foo test string}', 'foo', replacer);
            expect(result.newString).toBe('REPLACED!');
        });

        it('should process all occurrences of a tag', function() {
            function replacer(string, tagInfo) {
                return string.replace(tagInfo.completeTag, 'stuff');
            }

            var result = jsdoc.tag.inline.replaceInlineTag('some {@foo text} with multiple ' +
                '{@foo tags}', 'foo', replacer);

            expect(result.tags[0]).toBeDefined();
            expect(typeof result.tags[0]).toBe('object');
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('text');

            expect(result.tags[1]).toBeDefined();
            expect(typeof result.tags[1]).toBe('object');
            expect(result.tags[1].tag).toBe('foo');
            expect(result.tags[1].text).toBe('tags');

            expect(result.newString).toBe('some stuff with multiple stuff');
        });

    });

    // largely covered by the replaceInlineTag tests
    describe('replaceInlineTags', function() {
        it('should work with an empty replacer object', function() {
            var replacers = {};
            var text = 'some {@foo text} to parse';

            var result = jsdoc.tag.inline.replaceInlineTags(text, replacers);
            expect(result.newString).toBe(text);
        });

        it('should work with an object with one replacer', function() {
            var text = 'some {@foo text} with {@bar multiple} tags';
            var replacers = {
                foo: function(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@foo text}');
                    expect(tagInfo.text).toBe('text');
                    return string.replace(tagInfo.completeTag, 'stuff');
                }
            };

            var result = jsdoc.tag.inline.replaceInlineTags(text, replacers);
            expect(result.newString).toBe('some stuff with {@bar multiple} tags');

        });

        it('should work with an object with multiple replacers', function() {
            var text = 'some {@foo text} with {@bar multiple} tags';
            var replacers = {
                foo: function(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@foo text}');
                    expect(tagInfo.text).toBe('text');
                    return string.replace(tagInfo.completeTag, 'stuff');
                },
                bar: function(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@bar multiple}');
                    expect(tagInfo.text).toBe('multiple');
                    return string.replace(tagInfo.completeTag, 'awesome');
                }
            };

            var result = jsdoc.tag.inline.replaceInlineTags(text, replacers);
            expect(result.newString).toBe('some stuff with awesome tags');
        });
    });

    // largely covered by the replaceInlineTag tests
    describe('extractInlineTag', function() {
        it('should work when a tag is specified', function() {
            var result = jsdoc.tag.inline.extractInlineTag('some {@tagged text}', 'tagged');
            expect(result.tags[0]).toBeDefined();
            expect(typeof result.tags[0]).toBe('object');
            expect(result.tags[0].tag).toBe('tagged');
            expect(result.tags[0].text).toBe('text');
            expect(result.newString).toBe('some');
        });
    });
});
