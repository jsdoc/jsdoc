/*global describe: true, env: true, it: true */
describe("jsdoc/augment", function() {
    /*jshint evil: true */
    
    // TODO: more tests

    var lenient = !!env.opts.lenient,
        log = eval(console.log);
    
    function augmentMissingSymbol() {
    	var badDocSet = jasmine.getDocSetFromFile('test/fixtures/augmentstag2.js');
    }

    afterEach(function() {
        env.opts.lenient = lenient;
        console.log = log;
    });

    it("throws an error for missing dependencies if the lenient option is not enabled", function() {
        env.opts.lenient = false;

        expect(augmentMissingSymbol).toThrow();
    });

    it("does not throw an error for missing dependencies if the lenient option is enabled", function() {
        console.log = function() {};
        env.opts.lenient = true;

        expect(augmentMissingSymbol).not.toThrow();
    });
});
