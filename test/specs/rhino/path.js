/*global describe: true, expect: true, it: true */
describe("path", function() {
	// TODO: more tests
	var path = require('path');

	var pathChunks = [
		"foo",
		"bar",
		"baz",
		"qux.html"
	];
	var joinedPath = path.join.apply(this, pathChunks);

	describe("basename", function() {
		it("should exist", function() {
			expect(path.basename).toBeDefined();
		});

		it("should be a function", function() {
			expect(typeof path.basename).toEqual("function");
		});

		it("should work correctly without an 'ext' parameter", function() {
			expect( path.basename(joinedPath) ).toEqual( pathChunks[pathChunks.length - 1] );
		});

		it("should work correctly with an 'ext' parameter", function() {
			var fn = pathChunks[pathChunks.length - 1],
				ext = Array.prototype.slice.call( fn, fn.indexOf(".") ).join("");
				bn = Array.prototype.slice.call( fn, 0, fn.indexOf(".") ).join("");

			expect( path.basename(joinedPath, ext) ).toEqual(bn);
		});
	});
});