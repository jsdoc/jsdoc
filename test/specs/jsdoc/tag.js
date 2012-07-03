/*global describe: true, env: true, it: true */
describe("jsdoc/tag", function() {
    // TODO: more tests
    
    function badTag() {
        var Tag = require("jsdoc/tag").Tag;
        var tag = new Tag("name");
        return tag;
    }

    it("has strict validation enabled by default", function() {
        expect(badTag).toThrow();
    });

    it("throws an exception for bad tags if strict validation is enabled", function() {
        var strict = !!env.opts.strict;
        
        env.opts.strict = true;
        
        expect(badTag).toThrow();
        
        env.opts.strict = strict;
    });
    
    it("doesn't throw an exception for bad tags if strict validation is disabled", function() {
        /*jshint evil: true */
        var strict = !!env.opts.strict,
            log = new Function(console.log);
        
        console.log = function() {};
        env.opts.strict = false;
        
        expect(badTag).not.toThrow();
        
        env.opts.strict = strict;
        console.log = log;
    });
});