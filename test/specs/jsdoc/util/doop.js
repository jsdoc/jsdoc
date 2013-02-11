/*global describe: true, it: true */
describe('jsdoc/util/doop', function() {
    var doop = require('jsdoc/util/doop');

    it('should exist', function() {
        expect(doop).toBeDefined();
        expect(typeof doop).toBe('object');
    });

    it('should export a doop function', function() {
        expect(doop.doop).toBeDefined();
        expect(typeof doop.doop).toBe('function');
    });

    // deep-clones a simple object.
    describe('doop', function() {
        it("should return the input object if it's simple (boolan, string etc) or a function", function() {
            // .toBe uses === to test.

            // test a number...
            expect(doop.doop(3)).toBe(3);
            // test a string...
            expect(doop.doop('asdf')).toBe('asdf');
            // test a boolean...
            expect(doop.doop(true)).toBe(true);
            // test a function...
            var f = function () {};
            expect(doop.doop(f)).toBe(f);
        });

        it("should return a clone of an array", function() {
            var inp = [1,2,3],
                out = doop.doop(inp);
            // toEqual is a comparison on properties; toBe is === comparison.
            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
        });

        it("should return a clone of an object", function() {
            var inp = {a:1, b:2, 'asdf-fdsa': 3};
                out = doop.doop(inp);
            // toEqual is a comparison on properties; toBe is === comparison.
            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
        });

        // checks that a === b if it's not an object or array (or it's af function);
        // otherwise recurses down into keys and compares them.
        function compareForEquality(a, b) {
            if (a instanceof Object && a.constructor != Function) {
                // if it's an object and not a function, it should clone.
                var keys = Object.keys(a);
                expect(Object.keys(a)).toEqual(Object.keys(b));
                for (var i = 0; i < keys.length; ++i) {
                    compareForEquality(a[keys[i]], b[keys[i]]);
                }
            } else {
                // otherwise, it should be exactly equal.
                expect(a).toBe(b);
            }
        }

        it("should clone recursively", function() {
            var inp = {a:1, b:2, 'asdf-fdsa': {a: 'fdsa', b: [1,2,3]}};
                out = doop.doop(inp);
            // toEqual is a comparison on properties; toBe is === comparison.
            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
            // double-check
            compareForEquality(inp, out);
        });
    });
});
