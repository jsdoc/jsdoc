'use strict';

describe('jsdoc/util/doop', function() {
    var doop = require('jsdoc/util/doop');

    it('should exist', function() {
        expect(doop).toBeDefined();
        expect(typeof doop).toBe('function');
    });

    it('should export a doop function for backwards compatibility', function() {
        expect(doop.doop).toBeDefined();
        expect(typeof doop.doop).toBe('function');
    });

    // deep-clones a simple object.
    describe('doop', function() {
        it("should return the input object if it's a value type or a function", function() {
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

        it('should return a clone of an array', function() {
            var inp = [1, 2, 3];
            var out = doop.doop(inp);
            // toEqual is a comparison on properties; toBe is === comparison.
            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
        });

        it('should return a clone of an object', function() {
            var inp = {a: 1, b: 2, 'asdf-fdsa': 3};
            var out = doop.doop(inp);
            // toEqual is a comparison on properties; toBe is === comparison.
            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
        });

        it('should return an object with the same prototype as the original object', function() {
            function Foo() {}

            var foo = new Foo();
            var bar = doop(foo);
            expect( Object.getPrototypeOf(foo) ).toBe( Object.getPrototypeOf(bar) );
        });

        // checks that a === b if it's not an object or array (or it's af function);
        // otherwise recurses down into keys and compares them.
        function compareForEquality(a, b) {
            if (a instanceof Object && a.constructor !== Function) {
                // if it's an object and not a function, it should clone.
                var keysA = Object.keys(a).sort();
                var keysB = Object.keys(b).sort();
                expect(keysA).toEqual(keysB);
                for (var i = 0; i < keysA.length; ++i) {
                    compareForEquality(a[keysA[i]], b[keysB[i]]);
                }
            } else {
                // otherwise, it should be exactly equal.
                expect(a).toBe(b);
            }
        }

        it('should clone recursively', function() {
            var inp = {a: 1, b: 2, 'asdf-fdsa': {a: 'fdsa', b: [1, 2, 3]}};
            var out = doop.doop(inp);
            // toEqual is a comparison on properties; toBe is === comparison.
            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
            // double-check
            compareForEquality(inp, out);
        });

        it('should not clone non-enumerable properties', function() {
            var clone;
            var obj = { a: 1 };

            Object.defineProperty(obj, 'foo', {
                value: 2
            });

            clone = doop(obj);

            expect(clone.foo).not.toBeDefined();
        });

        it('should not create a circular reference if an object is seen more than once', function() {
            var input = { a: {} };
            var output;

            function stringify() {
                return JSON.stringify(output);
            }

            input.a.circular = input.a;
            output = doop(input);

            expect(stringify).not.toThrow();
        });
    });
});
