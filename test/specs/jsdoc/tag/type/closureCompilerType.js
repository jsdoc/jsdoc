/*global describe: true, expect: true, it: true */
describe('jsdoc/tag/type/closureCompilerType', function() {
    var type = require('jsdoc/tag/type/closureCompilerType');

    it('should exist', function() {
        expect(type).toBeDefined();
        expect(typeof type).toBe('object');
    });
    
    it('should export a parse function', function() {
        expect(type.parse).toBeDefined();
        expect(typeof type.parse).toBe('function');
    });
    
    describe('parse', function() {
        it('should parse optional types', function() {
            var info = type.parse({type: 'Asdf.Foobar='});
            expect(info.type).toBe('Asdf.Foobar');
            expect(info.optional).toBe(true);
        });

        it('should parse nullable types', function() {
            var info = type.parse({type: '?Asdf.Foobar'});
            expect(info.type).toBe('Asdf.Foobar');
            expect(info.nullable).toBe(true);
        });

        it('should parse non-nullable types', function() {
            var info = type.parse({type: '!Asdf.Foobar'});
            expect(info.type).toBe('Asdf.Foobar');
            expect(info.nullable).toBe(false);
        });

        it('should parse variable types', function() {
            var info = type.parse({type: '...Fdsa.Baz'});
            expect(info.type).toBe('Fdsa.Baz');
            expect(info.variable).toBe(true);
        });

        it('should correctly parse types that are both optional and nullable', function() {
            var info = type.parse( {type: '?string='} );
            expect(info.type).toBe('string');
            expect(info.optional).toBe(true);
            expect(info.nullable).toBe(true);
        });

        it('should correctly parse types that are both optional and variable', function() {
            var info = type.parse( {type: '...string='} );
            expect(info.type).toBe('string');
            expect(info.optional).toBe(true);
            expect(info.variable).toBe(true);
        });

        it("should only change the `type`, `optional`, `nullable` and `variable` properties", function() {
            var obj = {
                name: "foo",
                type: "?...number=",
                text: "Sample text.",
                optional: null,
                nullable: null,
                variable: null,
                defaultvalue: null
            };
            var shouldChange = [ "type", "optional", "nullable", "variable" ];
            
            var info = type.parse(obj);
            for (var key in info) {
                if ( hasOwnProp.call(info, key) ) {
                    if ( shouldChange.indexOf(key) !== -1 ) {
                        expect( info[key] ).not.toEqual( obj[key] );
                    }
                    else {
                        expect( info[key] ).toBe( obj[key] );
                    }
                }
            }
        });
    });
});
