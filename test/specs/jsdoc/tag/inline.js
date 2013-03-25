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
                jsdoc.tag.inline.replaceInlineTag('foo', '@bar');
            }

            function badReplacerString() {
                jsdoc.tag.inline.replaceInlineTag('foo', '@bar', 'hello');
            }

            expect(badReplacerUndefined).toThrow();
            expect(badReplacerString).toThrow();
        });

        it('should not find anything if there is no text in braces', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('braceless text');
                expect(completeTag).toBe('');
                expect(tagText).toBe('');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('braceless text', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('');
            expect(result.newString).toBe('braceless text');
        });

        it('should cope with bad escapement at the end of the string', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('bad {escapement \\');
                expect(completeTag).toBe('');
                expect(tagText).toBe('');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('bad {escapement \\', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('');
            expect(result.newString).toBe('bad {escapement \\');
        });

        it('should handle escaped braces correctly', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('a {braces \\} test}');
                expect(completeTag).toBe('{braces \\} test}');
                expect(tagText).toBe('braces \\} test');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {braces \\} test}', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('braces } test');
            expect(result.newString).toBe('a {braces \\} test}');
        });

        it('should work if the tag is the entire string', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('{text in braces}');
                expect(completeTag).toBe('{text in braces}');
                expect(tagText).toBe('text in braces');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('{text in braces}', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('text in braces');
            expect(result.newString).toBe('{text in braces}');
        });

        it('should work if the tag is at the beginning of the string', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('{test string} ahoy');
                expect(completeTag).toBe('{test string}');
                expect(tagText).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('{test string} ahoy', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('test string');
            expect(result.newString).toBe('{test string} ahoy');
        });

        it('should work if the tag is in the middle of the string', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('a {test string} yay');
                expect(completeTag).toBe('{test string}');
                expect(tagText).toBe('test string');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {test string} yay', null, replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('test string');
            expect(result.newString).toBe('a {test string} yay');
        });

        it('should work if the tag is at the end of the string', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('a {test string}');
                expect(completeTag).toBe('{test string}');
                expect(tagText).toBe('test string');

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
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('some {{double}} braces');
                expect(completeTag).toBe('{{double}}');
                expect(tagText).toBe('{double}');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('some {{double}} braces', null,
                replacer);
            expect(result.tag).toBe(null);
            expect(result.text).toBe('{double}');
            expect(result.newString).toBe('some {{double}} braces');
        });

        it('should work when a tag is specified', function() {
            function replacer(string, completeTag, tagText) {
                expect(string).toBe('a {@foo tag} test');
                expect(completeTag).toBe('{@foo tag}');
                expect(tagText).toBe('tag');

                return string;
            }

            var result = jsdoc.tag.inline.replaceInlineTag('a {@foo tag} test', '@foo', replacer);
            expect(result.tag).toBe('@foo');
            expect(result.text).toBe('tag');
            expect(result.newString).toBe('a {@foo tag} test');
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
            var result = jsdoc.tag.inline.extractInlineTag('some {@tagged text}', '@tagged');
            expect(result.tag).toBe('@tagged');
            expect(result.text).toBe('text');
            expect(result.newString).toBe('some');
        });
    });
});
