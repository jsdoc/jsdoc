/*global describe: true, env: true, it: true */
describe("jsdoc/tag", function() {
    // TODO: more tests
    
    function badTag() {
        var Tag = require("jsdoc/tag").Tag;
        var tag = new Tag("name");
        return tag;
    }

    it("is strict, not lenient, by default", function() {
        expect(badTag).toThrow();
    });

    it("throws an exception for bad tags if the lenient option is not enabled", function() {
        var lenient = !!env.opts.lenient;
        
        env.opts.lenient = false;
        expect(badTag).toThrow();
        
        env.opts.lenient = lenient;
    });
    
    it("doesn't throw an exception for bad tags if the lenient option is enabled", function() {
        /*jshint evil: true */
        var lenient = !!env.opts.lenient,
            log = eval(console.log);
        console.log = function() {};
        
        env.opts.lenient = true;
        expect(badTag).not.toThrow();
        
        env.opts.lenient = lenient;
        console.log = log;
    });
});