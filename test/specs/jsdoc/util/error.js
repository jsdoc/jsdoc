/*global describe: true, env: true, it: true */
describe("jsdoc/util/error", function() {
	var error = require('jsdoc/util/error'),
		handle = error.handle;

	it("should exist", function() {
		expect(error).toBeDefined();
		expect(typeof error).toEqual("object");
	});

	it("should export a 'handle' function", function() {
		expect(handle).toBeDefined();
		expect(typeof handle).toEqual("function");
	});

	describe("handle", function() {
		/*jshint evil: true */
		var lenient = !!env.opts.lenient,
			log = eval(console.log);

		function handleError() {
			handle( new Error("foo") );
		}

		function handleObject() {
			handle( { foo: "bar", baz: "qux"} );
		}

		afterEach(function() {
			env.opts.lenient = lenient;
			console.log = log;
		});

		it("should re-throw errors by default", function() {
			expect(handleError).toThrow();
		});

		it("should re-throw errors if lenient mode is not enabled", function() {
			env.opts.lenient = false;

			expect(handleError).toThrow();
		});

		it("should not re-throw errors if lenient mode is enabled", function() {
			env.opts.lenient = true;
			console.log = function() {};

			expect(handleError).not.toThrow();
		});

		it("should still work if the 'e' param is not an instanceof Error", function() {
			expect(handleObject).toThrow();
		});
	});
});
