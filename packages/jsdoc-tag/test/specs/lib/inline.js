describe('@jsdoc/tag/lib/inline', () => {
    const inline = require('../../../lib/inline');

    it('is an object', () => {
        expect(inline).toBeObject();
    });

    it('exports an isInlineTag function', () => {
        expect(inline.isInlineTag).toBeFunction();
    });

    it('exports a replaceInlineTag function', () => {
        expect(inline.replaceInlineTag).toBeFunction();
    });

    it('exports an extractInlineTag function', () => {
        expect(inline.extractInlineTag).toBeFunction();
    });

    describe('isInlineTag', () => {
        const isInlineTag = inline.isInlineTag;

        it('identifies an inline tag', () => {
            expect(isInlineTag('{@mytag hooray}', 'mytag')).toBeTrue();
        });

        it('identifies when something is not an inline tag', () => {
            expect(isInlineTag('mytag hooray', 'mytag')).toBeFalse();
        });

        it('reports that a string containing an inline tag is not an inline tag', () => {
            expect(isInlineTag('this is {@mytag hooray}', 'mytag')).toBeFalse();
        });

        it('allows any inline tag by default', () => {
            expect(isInlineTag('{@anyoldtag will do}')).toBeTrue();
        });

        it('identifies things that are not inline tags when a tag name is not provided', () => {
            expect(isInlineTag('mytag hooray')).toBeFalse();
        });

        it('allows regexp characters in the tag name', () => {
            expect( isInlineTag('{@mytags hooray}', 'mytag\\S') ).toBeTrue();
        });

        it('returns false (rather than throwing) with invalid input', () => {
            function badInput() {
                return isInlineTag();
            }

            expect(badInput).not.toThrow();
            expect(badInput()).toBeFalse();
        });
    });

    describe('replaceInlineTag', () => {
        it('throws if the tag is matched and the replacer is invalid', () => {
            function badReplacerUndefined() {
                inline.replaceInlineTag('{@foo tag}', 'foo');
            }

            function badReplacerString() {
                inline.replaceInlineTag('{@foo tag}', 'foo', 'hello');
            }

            expect(badReplacerUndefined).toThrow();
            expect(badReplacerString).toThrow();
        });

        it('does not find anything if there is no text in braces', () => {
            const replacer = jasmine.createSpy('replacer');

            inline.replaceInlineTag('braceless text', 'foo', replacer);

            expect(replacer).not.toHaveBeenCalled();
        });

        it('copes with bad escapement at the end of the string', () => {
            const replacer = jasmine.createSpy('replacer');

            inline.replaceInlineTag('bad {@foo escapement \\', 'foo', replacer);

            expect(replacer).not.toHaveBeenCalled();
        });

        it('works if the tag is the entire string', () => {
            function replacer(string, {completeTag, text}) {
                expect(string).toBe('{@foo text in braces}');
                expect(completeTag).toBe('{@foo text in braces}');
                expect(text).toBe('text in braces');

                return completeTag;
            }

            const result = inline.replaceInlineTag('{@foo text in braces}', 'foo',
                replacer);

            expect(result.tags[0]).toBeObject();
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('text in braces');
            expect(result.newString).toBe('{@foo text in braces}');
        });

        it('works if the tag is at the beginning of the string', () => {
            function replacer(string, {completeTag, text}) {
                expect(string).toBe('{@foo test string} ahoy');
                expect(completeTag).toBe('{@foo test string}');
                expect(text).toBe('test string');

                return string;
            }

            const result = inline.replaceInlineTag('{@foo test string} ahoy', 'foo',
                replacer);

            expect(result.tags[0]).toBeObject();
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('test string');
            expect(result.newString).toBe('{@foo test string} ahoy');
        });

        it('works if the tag is in the middle of the string', () => {
            function replacer(string, {completeTag, text}) {
                expect(string).toBe('a {@foo test string} yay');
                expect(completeTag).toBe('{@foo test string}');
                expect(text).toBe('test string');

                return string;
            }

            const result = inline.replaceInlineTag('a {@foo test string} yay', 'foo',
                replacer);

            expect(result.tags[0]).toBeObject();
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('test string');
            expect(result.newString).toBe('a {@foo test string} yay');
        });

        it('works if the tag is at the end of the string', () => {
            function replacer(string, {completeTag, text}) {
                expect(string).toBe('a {@foo test string}');
                expect(completeTag).toBe('{@foo test string}');
                expect(text).toBe('test string');

                return string;
            }

            const result = inline.replaceInlineTag('a {@foo test string}', 'foo', replacer);

            expect(result.tags[0]).toBeObject();
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('test string');
            expect(result.newString).toBe('a {@foo test string}');
        });

        it('replaces the string with the specified value', () => {
            function replacer() {
                return 'REPLACED!';
            }

            const result = inline.replaceInlineTag('a {@foo test string}', 'foo', replacer);

            expect(result.newString).toBe('REPLACED!');
        });

        it('processes all occurrences of a tag', () => {
            function replacer(string, {completeTag}) {
                return string.replace(completeTag, 'stuff');
            }

            const result = inline.replaceInlineTag('some {@foo text} with multiple ' +
                '{@foo tags}, {@foo like} {@foo this}', 'foo', replacer);

            expect(result.tags.length).toBe(4);

            expect(result.tags[0]).toBeObject();
            expect(result.tags[0].tag).toBe('foo');
            expect(result.tags[0].text).toBe('text');

            expect(result.tags[1]).toBeObject();
            expect(result.tags[1].tag).toBe('foo');
            expect(result.tags[1].text).toBe('tags');

            expect(result.tags[2]).toBeObject();
            expect(result.tags[2].tag).toBe('foo');
            expect(result.tags[2].text).toBe('like');

            expect(result.tags[3]).toBeObject();
            expect(result.tags[3].tag).toBe('foo');
            expect(result.tags[3].text).toBe('this');

            expect(result.newString).toBe('some stuff with multiple stuff, stuff stuff');
        });
    });

    // Largely covered by the `replaceInlineTag()` tests.
    describe('replaceInlineTags', () => {
        it('works with an empty replacer object', () => {
            const replacers = {};
            const text = 'some {@foo text} to parse';
            const result = inline.replaceInlineTags(text, replacers);

            expect(result.newString).toBe(text);
        });

        it('works with one replacer', () => {
            const text = 'some {@foo text} with {@bar multiple} tags';
            const replacers = {
                foo(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@foo text}');
                    expect(tagInfo.text).toBe('text');

                    return string.replace(tagInfo.completeTag, 'stuff');
                }
            };
            const result = inline.replaceInlineTags(text, replacers);

            expect(result.newString).toBe('some stuff with {@bar multiple} tags');
        });

        it('works with multiple replacers', () => {
            const text = 'some {@foo text} with {@bar multiple} tags';
            const replacers = {
                foo(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@foo text}');
                    expect(tagInfo.text).toBe('text');

                    return string.replace(tagInfo.completeTag, 'stuff');
                },
                bar(string, tagInfo) {
                    expect(tagInfo.completeTag).toBe('{@bar multiple}');
                    expect(tagInfo.text).toBe('multiple');

                    return string.replace(tagInfo.completeTag, 'awesome');
                }
            };
            const result = inline.replaceInlineTags(text, replacers);

            expect(result.newString).toBe('some stuff with awesome tags');
        });
    });

    // Largely covered by the `replaceInlineTag()` tests.
    describe('extractInlineTag', () => {
        it('works when a tag is specified', () => {
            const result = inline.extractInlineTag('some {@tagged text}', 'tagged');

            expect(result.tags[0]).toBeObject();
            expect(result.tags[0].tag).toBe('tagged');
            expect(result.tags[0].text).toBe('text');
            expect(result.newString).toBe('some');
        });
    });
});
