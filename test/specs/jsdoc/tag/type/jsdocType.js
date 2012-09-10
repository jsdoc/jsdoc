/*global describe: true, expect: true, it: true */

var hasOwnProp = Object.prototype.hasOwnProperty;

describe("jsdoc/tag/type/jsdocType", function() {
    var jsdocType = require("jsdoc/tag/type/jsdocType");
    
    it("should exist", function() {
        expect(jsdocType).toBeDefined();
        expect(typeof jsdocType).toEqual("object");
    });
    
    it("should export a parse function", function() {
        expect(jsdocType.parse).toBeDefined();
        expect(typeof jsdocType.parse).toEqual("function");
    });
    
    describe("parse", function() {
        it("should recognize optional properties without default values", function() {
            var info = jsdocType.parse( { name: "[foo]" } );
            expect(info.name).toEqual("foo");
            expect(info.optional).toEqual(true);
            expect( info.defaultvalue ).toEqual(null);
            
            info = jsdocType.parse( { name: "[ bar   ]" } );
            expect(info.name).toEqual("bar");
            expect(info.optional).toEqual(true);
            expect( info.defaultvalue ).toEqual(null);
        });
        
        it("should recognize optional properties with default values", function() {
            var info = jsdocType.parse( { name: "[foo=bar]" } );
            expect(info.name).toEqual("foo");
            expect(info.optional).toEqual(true);
            expect( info.defaultvalue ).toEqual("bar");
            
            info = jsdocType.parse( { name: "[     baz  =   qux ]" } );
            expect(info.name).toEqual("baz");
            expect(info.optional).toEqual(true);
            expect( info.defaultvalue ).toEqual("qux");
        });
        
        it("should only change the `name`, `optional`, and `defaultvalue` properties", function() {
            var obj = {
                name: "[foo=bar]",
                type: "boolean|string",
                text: "Sample text.",
                optional: null,
                nullable: null,
                variable: null,
                defaultvalue: null
            };
            var shouldChange = [ "name", "optional", "defaultvalue" ];
            
            var info = jsdocType.parse(obj);
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
