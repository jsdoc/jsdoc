/*global describe: true, expect: true, it: true */

function buildText(type, name, desc) {
    var text = '';
    if (type) {
        text += "{" + type + "}";
        if (name || desc) {
            text += " ";
        }
    }
    
    if (name) {
        text += name;
        if (desc) {
            text += " ";
        }
    }
    
    if (desc) {
        text += desc;
    }
    
    return text;
}

describe("jsdoc/tag/type", function() {
    var jsdoc = {
        tag: {
            type: require('jsdoc/tag/type')
        }
    };
    
    it("should exist", function() {
        expect(jsdoc.tag.type).toBeDefined();
        expect(typeof jsdoc.tag.type).toEqual("object");
    });
    
    it("should export a getTagInfo function", function() {
        expect(jsdoc.tag.type.getTagInfo).toBeDefined();
        expect(typeof jsdoc.tag.type.getTagInfo).toEqual("function");
    });
    
    it("should export a parse function", function() {
        expect(jsdoc.tag.type.parse).toBeDefined();
        expect(typeof jsdoc.tag.type.parse).toEqual("function");
    });
    
    describe("getTagInfo", function() {
        it("should return an object with name, type, and text properties", function() {
            var info = jsdoc.tag.type.getTagInfo("");
            expect(info.name).toBeDefined();
            expect(info.type).toBeDefined();
            expect(info.text).toBeDefined();
        });
        
        it("should not extract a name or type if canHaveName and canHaveType are not set", function() {
            var desc = "{number} foo The foo parameter.";
            var info = jsdoc.tag.type.getTagInfo(desc);
            expect(info.type).toEqual('');
            expect(info.name).toEqual('');
            expect(info.text).toEqual(desc);
        });
        
        it("should extract a name, but not a type, if canHaveName === true and canHaveType === false", function() {
            var name = "bar";
            var desc = "The bar parameter.";
            var info = jsdoc.tag.type.getTagInfo( buildText(null, name, desc), true, false );
            expect(info.type).toEqual('');
            expect(info.name).toEqual(name);
            expect(info.text).toEqual(desc);
        });
        
        it("should extract a type, but not a name, if canHaveName === false and canHaveType === true", function() {
            var type = "boolean";
            var desc = "Set to true on alternate Thursdays.";
            var info = jsdoc.tag.type.getTagInfo( buildText(type, null, desc), false, true );
            expect(info.type).toEqual(type);
            expect(info.name).toEqual('');
            expect(info.text).toEqual(desc);
        });
        
        it("should extract a name and type if canHaveName and canHaveType are true", function() {
            var type = "string";
            var name = "baz";
            var desc = "The baz parameter.";
            var info = jsdoc.tag.type.getTagInfo( buildText(type, name, desc), true, true );
            expect(info.type).toEqual(type);
            expect(info.name).toEqual(name);
            expect(info.text).toEqual(desc);
        });
        
        it("should work with JSDoc-style optional parameters", function() {
            var name = "[qux]";
            var desc = "The qux parameter.";
            var info = jsdoc.tag.type.getTagInfo( buildText(null, name, desc), true, false );
            expect(info.name).toEqual(name);
            expect(info.text).toEqual(desc);
            
            name = "[ qux ]";
            info = jsdoc.tag.type.getTagInfo( buildText(null, name, desc), true, false );
            expect(info.name).toEqual(name);
            expect(info.text).toEqual(desc);
            
            name = "[qux=hooray]";
            info = jsdoc.tag.type.getTagInfo( buildText(null, name, desc), true, false );
            expect(info.name).toEqual(name);
            expect(info.text).toEqual(desc);
            
            name = "[  qux   =  hooray ]";
            info = jsdoc.tag.type.getTagInfo( buildText(null, name, desc), true, false );
            expect(info.name).toEqual(name);
            expect(info.text).toEqual(desc);
        });
    });
    
    describe("parse", function() {
        it("should report optional types correctly no matter which syntax we use", function() {
            var desc = "{string} [foo]";
            var info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toEqual(true);
            
            desc = "{string=} [foo]";
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.optional).toEqual(true);
        });
        
        it("should return the types as an array", function() {
            var desc = "{string} foo";
            var info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ["string"] );
        });
        
        it("should recognize the entire list of possible types", function() {
            var desc = "{string|number} foo";
            var info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ["string", "number"] );
            
            desc = "{ string | number } foo";
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ["string", "number"] );
            
            desc = "{  (   string  | number)} foo";
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ["string", "number"] );
            
            desc = "{(string|number|boolean|function)} foo";
            info = jsdoc.tag.type.parse(desc, true, true);
            expect(info.type).toEqual( ["string", "number", "boolean", "function"] );
        });
    });
});
