/*global describe: true, env: true, it: true */
describe("jsdoc/tag", function() {
    /*jshint evil: true */
    
    // TODO: more tests

    var lenient = !!env.opts.lenient,
        log = eval(console.log);
    
    function badTag() {
        var Tag = require("jsdoc/tag").Tag;
        var tag = new Tag("name");
        return tag;
    }

    afterEach(function() {
        env.opts.lenient = lenient;
        console.log = log;
    });

    it("throws an exception for bad tags if the lenient option is not enabled", function() {
        env.opts.lenient = false;

        expect(badTag).toThrow();
    });
    
    it("doesn't throw an exception for bad tags if the lenient option is enabled", function() {
        console.log = function() {};
        env.opts.lenient = true;

        expect(badTag).not.toThrow();
    });
});