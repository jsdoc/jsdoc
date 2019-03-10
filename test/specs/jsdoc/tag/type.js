function buildText(type, name, desc) {
    let text = '';

    if (type) {
        text += `{${type}}`;
        if (name || desc) {
            text += ' ';
        }
    }

    if (name) {
        text += name;
        if (desc) {
            text += ' ';
        }
    }

    if (desc) {
        text += desc;
    }

    return text;
}

describe('jsdoc/tag/type', () => {
    const jsdoc = {
        tag: {
            type: require('jsdoc/tag/type')
        }
    };

    it('should exist', () => {
        expect(jsdoc.tag.type).toBeDefined();
        expect(typeof jsdoc.tag.type).toBe('object');
    });

    it('should export a parse function', () => {
        expect(jsdoc.tag.type.parse).toBeDefined();
        expect(typeof jsdoc.tag.type.parse).toBe('function');
    });

    describe('parse', () => {
        it('should return an object with name, type, and text properties', () => {
            const info = jsdoc.tag.type.parse('');

            expect(info.name).toBeDefined();
            expect(info.type).toBeDefined();
            expect(info.text).toBeDefined();
        });

        it('should not extract a name or type if canHaveName and canHaveType are not set', () => {
            const desc = '{number} foo The foo parameter.';
            const info = jsdoc.tag.type.parse(desc);

            expect(info.type).toEqual([]);
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });

        it('should extract a name, but not a type, if canHaveName === true and canHaveType === false', () => {
            const name = 'bar';
            const desc = 'The bar parameter.';
            const info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );

            expect(info.type).toEqual([]);
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('should extract a type, but not a name, if canHaveName === false and canHaveType === true', () => {
            const type = 'boolean';
            const desc = 'Set to true on alternate Thursdays.';
            const info = jsdoc.tag.type.parse( buildText(type, null, desc), false, true );

            expect(info.type).toEqual([type]);
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });

        it('should extract a name and type if canHaveName and canHaveType are true', () => {
            const type = 'string';
            const name = 'baz';
            const desc = 'The baz parameter.';
            const info = jsdoc.tag.type.parse( buildText(type, name, desc), true, true );

            expect(info.type).toEqual([type]);
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('should report optional types correctly no matter which syntax we use', () => {
            let desc = '{string} [foo]';
            let info = jsdoc.tag.type.parse(desc, true, true);

            expect(info.optional).toBe(true);

            desc = '{string=} [foo]';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toBe(true);

            desc = '[foo]';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toBe(true);
        });

        it('should return the types as an array', () => {
            const desc = '{string} foo';
            const info = jsdoc.tag.type.parse(desc, true, true);

            expect(info.type).toEqual( ['string'] );
        });

        it('should recognize the entire list of possible types', () => {
            let desc = '{(string|number)} foo';
            let info = jsdoc.tag.type.parse(desc, true, true);

            expect(info.type).toEqual( ['string', 'number'] );

            desc = '{ ( string | number ) } foo';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['string', 'number'] );

            desc = '{  (   string  | number)} foo';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['string', 'number'] );

            desc = '{(string|number|boolean|function)} foo';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['string', 'number', 'boolean', 'function'] );
        });

        it('should not find any type if there is no text in braces', () => {
            const desc = 'braceless text';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type).toEqual([]);
        });

        it('should cope with bad escapement at the end of the string', () => {
            const desc = 'bad {escapement \\';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type).toEqual([]);
            expect(info.text).toBe(desc);
        });

        it('should handle escaped braces correctly', () => {
            const desc = '{weirdObject."with\\}AnnoyingProperty"}';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type[0]).toBe('weirdObject."with}AnnoyingProperty"');
        });

        it('should work if the type expression is the entire string', () => {
            const desc = '{textInBraces}';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type[0]).toBe('textInBraces');
        });

        it('should work if the type expression is at the beginning of the string', () => {
            const desc = '{testString} ahoy';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('ahoy');
        });

        it('should work if the type expression is in the middle of the string', () => {
            const desc = 'a {testString} yay';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a  yay');
        });

        it('should work if the tag is at the end of the string', () => {
            const desc = 'a {testString}';
            const info = jsdoc.tag.type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a');
        });

        it('should work when there are nested braces', () => {
            const desc = 'some {{double}} braces';
            const info = jsdoc.tag.type.parse(desc, false, true);

            // we currently stringify all record types as 'Object'
            expect(info.type[0]).toBe('Object');
            expect(info.text).toBe('some  braces');
        });

        it('should override the type expression if an inline @type tag is specified', () => {
            let desc = '{Object} cookie {@type Monster}';
            let info = jsdoc.tag.type.parse(desc, true, true);

            expect(info.type).toEqual( ['Monster'] );
            expect(info.text).toBe('');

            desc = '{Object} cookie - {@type Monster}';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster'] );
            expect(info.text).toBe('');

            desc = '{Object} cookie - The cookie parameter. {@type Monster}';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster'] );
            expect(info.text).toBe('The cookie parameter.');

            desc = '{Object} cookie - The cookie parameter. {@type (Monster|Jar)}';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster', 'Jar'] );
            expect(info.text).toBe('The cookie parameter.');

            desc = '{Object} cookie - The cookie parameter. {@type (Monster|Jar)} Mmm, cookie.';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster', 'Jar'] );
            expect(info.text).toBe('The cookie parameter.  Mmm, cookie.');
        });

        describe('JSDoc-style type info', () => {
            it('should parse JSDoc-style optional parameters', () => {
                let name = '[qux]';
                const desc = 'The qux parameter.';
                let info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );

                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBe(true);

                name = '[ qux ]';
                info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );
                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBe(true);

                name = '[qux=hooray]';
                info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );
                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBe(true);
                expect(info.defaultvalue).toBe('hooray');

                name = '[  qux   =  hooray ]';
                info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );
                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBe(true);
                expect(info.defaultvalue).toBe('hooray');
            });
        });

        // TODO: add more tests related to how JSDoc mangles the Catharsis parse results
        describe('Closure Compiler-style type info', () => {
            it('should recognize variable (repeatable) parameters', () => {
                const desc = '{...string} foo - Foo.';
                const info = jsdoc.tag.type.parse(desc, true, true);

                expect(info.type).toEqual( ['string'] );
                expect(info.variable).toBe(true);
            });

            it('should set the type correctly for type applications that contain type unions',
                () => {
                    const desc = '{Array.<(string|number)>} foo - Foo.';
                    const info = jsdoc.tag.type.parse(desc, true, true);

                    expect(info.type).toEqual(['Array.<(string|number)>']);
                });
        });
    });
});
