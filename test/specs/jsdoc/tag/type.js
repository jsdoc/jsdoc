/*global describe: true, expect: true, it: true */

function buildText(type, name, desc) {
    var text = '';
    if (type) {
        text += '{' + type + '}';
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

describe('jsdoc/tag/type', function() {
    var jsdoc = {
        tag: {
            type: require('jsdoc/tag/type')
        }
    };
    
    it('should exist', function() {
        expect(jsdoc.tag.type).toBeDefined();
        expect(typeof jsdoc.tag.type).toBe('object');
    });
    
    it('should export a parse function', function() {
        expect(jsdoc.tag.type.parse).toBeDefined();
        expect(typeof jsdoc.tag.type.parse).toBe('function');
    });
    
    describe('parse', function() {
        it('should return an object with name, type, and text properties', function() {
            var info = jsdoc.tag.type.parse('');
            expect(info.name).toBeDefined();
            expect(info.type).toBeDefined();
            expect(info.text).toBeDefined();
        });
        
        it('should not extract a name or type if canHaveName and canHaveType are not set', function() {
            var desc = '{number} foo The foo parameter.';
            var info = jsdoc.tag.type.parse(desc);
            expect(info.type).toEqual([]);
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });
        
        it('should extract a name, but not a type, if canHaveName === true and canHaveType === false', function() {
            var name = 'bar';
            var desc = 'The bar parameter.';
            var info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );
            expect(info.type).toEqual([]);
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });
        
        it('should extract a type, but not a name, if canHaveName === false and canHaveType === true', function() {
            var type = 'boolean';
            var desc = 'Set to true on alternate Thursdays.';
            var info = jsdoc.tag.type.parse( buildText(type, null, desc), false, true );
            expect(info.type).toEqual([type]);
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });
        
        it('should extract a name and type if canHaveName and canHaveType are true', function() {
            var type = 'string';
            var name = 'baz';
            var desc = 'The baz parameter.';
            var info = jsdoc.tag.type.parse( buildText(type, name, desc), true, true );
            expect(info.type).toEqual([type]);
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('should report optional types correctly no matter which syntax we use', function() {
            var desc = '{string} [foo]';
            var info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toBe(true);
            
            desc = '{string=} [foo]';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toBe(true);

            desc = '[foo]';
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toBe(true);
        });
        
        it('should return the types as an array', function() {
            var desc = '{string} foo';
            var info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ['string'] );
        });
        
        it('should recognize the entire list of possible types', function() {
            var desc = '{(string|number)} foo';
            var info = jsdoc.tag.type.parse(desc, true, true);
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

        it('should not find any type if there is no text in braces', function() {
            var desc = 'braceless text';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type).toEqual([]);
        });

        it('should cope with bad escapement at the end of the string', function() {
            var desc = 'bad {escapement \\';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type).toEqual([]);
            expect(info.text).toBe(desc);
        });

        it('should handle escaped braces correctly', function() {
            var desc = '{weirdObject."with\\}AnnoyingProperty"}';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type[0]).toBe('weirdObject."with}AnnoyingProperty"');
        });

        it('should work if the type expression is the entire string', function() {
            var desc = '{textInBraces}';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type[0]).toBe('textInBraces');
        });

        it('should work if the type expression is at the beginning of the string', function() {
            var desc = '{testString} ahoy';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('ahoy');
        });

        it('should work if the type expression is in the middle of the string', function() {
            var desc = 'a {testString} yay';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a  yay');
        });

        it('should work if the tag is at the end of the string', function() {
            var desc = 'a {testString}';
            var info = jsdoc.tag.type.parse(desc, false, true);
            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a');
        });

        it('should work when there are nested braces', function() {
            var desc = 'some {{double}} braces';
            var info = jsdoc.tag.type.parse(desc, false, true);
            // we currently stringify all record types as 'Object'
            expect(info.type[0]).toBe('Object');
            expect(info.text).toBe('some  braces');
        });

        it('should override the type expression if an inline @type tag is specified', function() {
            var desc = '{Object} cookie {@type Monster}';
            var info = jsdoc.tag.type.parse(desc, true, true);
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

        describe('JSDoc-style type info', function() {
            it('should parse JSDoc-style optional parameters', function() {
                var name = '[qux]';
                var desc = 'The qux parameter.';
                var info = jsdoc.tag.type.parse( buildText(null, name, desc), true, false );
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
        describe('Closure Compiler-style type info', function() {
            it('should recognize variable (repeatable) parameters', function() {
                var desc = '{...string} foo - Foo.';
                var info = jsdoc.tag.type.parse(desc, true, true);
                expect(info.type).toEqual( ['string'] );
                expect(info.variable).toBe(true);
            });
        });
    });
});
