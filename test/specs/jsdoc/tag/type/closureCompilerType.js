/*global describe: true, expect: true, it: true */
describe('jsdoc/tag/type/closureCompilerType', function() {
    var type = require('jsdoc/tag/type/closureCompilerType');

    it('should exist', function() {
        expect(type).toBeDefined();
        expect(typeof type).toEqual('object');
    });
    
    it('should export a parse function', function() {
        expect(type.parse).toBeDefined();
        expect(typeof type.parse).toEqual('function');
    });
    
    describe('parse', function() {
        it('should parse optional types', function() {
            var info = type.parse({type: 'Asdf.Foobar='});
            expect(info.type).toEqual('Asdf.Foobar');
            expect(info.optional).toEqual(true);
        });

        it('should parse nullable types', function() {
            var info = type.parse({type: '?Asdf.Foobar'});
            expect(info.type).toEqual('Asdf.Foobar');
            expect(info.nullable).toEqual(true);
        });

        it('should parse non-nullable types', function() {
            var info = type.parse({type: '!Asdf.Foobar'});
            expect(info.type).toEqual('Asdf.Foobar');
            expect(info.nullable).toEqual(false);
        });

        it('should parse variable types', function() {
            var info = type.parse({type: '...Fdsa.Baz'});
            expect(info.type).toEqual('Fdsa.Baz');
            expect(info.variable).toEqual(true);
        });

        it('should correctly parse types that are both optional and nullable', function() {
            var info = type.parse( {type: '?string='} );
            expect(info.type).toEqual('string');
            expect(info.optional).toEqual(true);
            expect(info.nullable).toEqual(true);
        });

        it('should correctly parse types that are both optional and variable', function() {
            var info = type.parse( {type: '...string='} );
            expect(info.type).toEqual('string');
            expect(info.optional).toEqual(true);
            expect(info.variable).toEqual(true);
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
                        expect( info[key] ).toEqual( obj[key] );
                    }
                }
            }
        });
    });
});
