/*global afterEach: true, describe: true, env: true, expect: true, it: true */
describe("jsdoc/tutorial/resolver", function() {
    /*jshint evil: true */
    
    // TODO: more tests

    var resolver = require('jsdoc/tutorial/resolver'),
        lenient = !!env.opts.lenient,
        log = eval(console.log);

    function missingTutorial() {
        resolver.load(__dirname + "/test/tutorials/incomplete");
        resolver.resolve();
    }

    afterEach(function() {
        env.opts.lenient = lenient;
        console.log = log;
    });

    it("throws an exception for missing tutorials if the lenient option is not enabled", function() {
        env.opts.lenient = false;

        expect(missingTutorial).toThrow();
    });

    it("doesn't throw an exception for missing tutorials if the lenient option is enabled", function() {
        console.log = function() {};
        env.opts.lenient = true;

        expect(missingTutorial).not.toThrow();
    });
});