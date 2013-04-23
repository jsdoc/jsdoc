/*global describe: true, expect: true, it: true */

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

    it('should export a replaceInlineTag function', function() {
        expect(jsdoc.tag.inline.replaceInlineTag).toBeDefined();
        expect(typeof jsdoc.tag.inline.replaceInlineTag).toBe('function');
    });

    it('should export an extractInlineTag function', function() {
        expect(jsdoc.tag.inline.extractInlineTag).toBeDefined();
        expect(typeof jsdoc.tag.inline.replaceInlineTag).toBe('function');
    });

    describe('replaceInlineTag', function() {
        it('should throw if the replacer parameter is invalid', function() {
            function badReplacerUndefined() {
                jsdoc.tag.inline.replaceInlineTag('foo', 'bar');
            }

            function badReplacerString() {
                jsdoc.tag.inline.replaceInlineTag('foo', 'bar', 'hello');
            }

            expect(badReplacerUndefined).toThrow();
            expect(badReplacerString).toThrow();
        });

        it('should not find anything if there is no text in braces', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('braceless text');
                expect(tagInfo.completeTag).toBe('');
                expect(tagInfo.text).toBe('');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('braceless text', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('');
            expect(result.newString).toBe('braceless text');
        });

        it('should cope with bad escapement at the end of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('bad {escapement \\');
                expect(tagInfo.completeTag).toBe('');
                expect(tagInfo.text).toBe('');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('bad {escapement \\', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('');
            expect(result.newString).toBe('bad {escapement \\');
        });

        it('should handle escaped braces correctly', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('a {braces \\} test}');
                expect(tagInfo.completeTag).toBe('{braces \\} test}');
                expect(tagInfo.text).toBe('braces \\} test');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {braces \\} test}', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('braces } test');
            expect(result.newString).toBe('a {braces \\} test}');
        });

        it('should work if the tag is the entire string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('{text in braces}');
                expect(tagInfo.completeTag).toBe('{text in braces}');
                expect(tagInfo.text).toBe('text in braces');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('{text in braces}', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('text in braces');
            expect(result.newString).toBe('{text in braces}');
        });

        it('should work if the tag is at the beginning of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('{test string} ahoy');
                expect(tagInfo.completeTag).toBe('{test string}');
                expect(tagInfo.text).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('{test string} ahoy', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('test string');
            expect(result.newString).toBe('{test string} ahoy');
        });

        it('should work if the tag is in the middle of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('a {test string} yay');
                expect(tagInfo.completeTag).toBe('{test string}');
                expect(tagInfo.text).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {test string} yay', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('test string');
            expect(result.newString).toBe('a {test string} yay');
        });

        it('should work if the tag is at the end of the string', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('a {test string}');
                expect(tagInfo.completeTag).toBe('{test string}');
                expect(tagInfo.text).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {test string}', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('test string');
            expect(result.newString).toBe('a {test string}');
        });

        it('should replace the string with the specified value', function() {
            function replacer() {
                return 'REPLACED!';
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {test string}', null, replacer);
            expect(result.newString).toBe('REPLACED!');
        });

        it('should work when there are nested braces', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('some {{double}} braces');
                expect(tagInfo.completeTag).toBe('{{double}}');
                expect(tagInfo.text).toBe('{double}');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('some {{double}} braces', null,
                replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('{double}');
            expect(result.newString).toBe('some {{double}} braces');
        });

        it('should work when a tag is specified', function() {
            function replacer(string, tagInfo) {
                expect(string).toBe('a {@foo tag} test');
                expect(tagInfo.completeTag).toBe('{@foo tag}');
                expect(tagInfo.text).toBe('tag');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {@foo tag} test', 'foo', replacer);
            expect(result.tag).toBe('foo');
            expect(result.text).toBe('tag');
            expect(result.newString).toBe('a {@foo tag} test');
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
            var text = 'some {@foo text} with multiple tags';
            var replacers = {
                foo: function(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@foo text}');
                    expect(tagInfo.text).toBe('text');
                    return string.replace(tagInfo.completeTag, 'stuff');
                }
            };

            var result = jsdoc.tag.inline.replaceInlineTags(text, replacers);
            expect(result.newString).toBe('some stuff with multiple tags');

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
        it('should work when there is no tag specified', function() {
            var result = jsdoc.tag.inline.extractInlineTag('some {braced text}');
            expect(result.tag).toBe(null);
            expect(result.text).toBe('braced text');
            expect(result.newString).toBe('some');
        });

        it('should work when a tag is specified', function() {
            var result = jsdoc.tag.inline.extractInlineTag('some {@tagged text}', 'tagged');
            expect(result.tag).toBe('tagged');
            expect(result.text).toBe('text');
            expect(result.newString).toBe('some');
        });
    });
});
