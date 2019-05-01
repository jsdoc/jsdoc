describe('jsdoc/util/doop', () => {
    const doop = require('../../../lib/jsdoc/util/doop');

    it('should exist', () => {
        expect(doop).toBeDefined();
        expect(typeof doop).toBe('function');
    });

    it('should export a doop function for backwards compatibility', () => {
        expect(doop.doop).toBeDefined();
        expect(typeof doop.doop).toBe('function');
    });

    // deep-clones a simple object.
    describe('doop', () => {
        it("should return the input object if it's a value type or a function", () => {
            /* eslint-disable no-empty-function */
            const f = () => {};
            /* eslint-enable no-empty-function */

            // test a number...
            expect(doop.doop(3)).toBe(3);
            // test a string...
            expect(doop.doop('asdf')).toBe('asdf');
            // test a boolean...
            expect(doop.doop(true)).toBe(true);
            // test a function...
            expect(doop.doop(f)).toBe(f);
        });

        it('should return a clone of an array', () => {
            const inp = [1, 2, 3];
            const out = doop.doop(inp);

            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
        });

        it('should return a clone of an object', () => {
            const inp = {
                a: 1,
                b: 2,
                'asdf-fdsa': 3
            };
            const out = doop.doop(inp);

            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
        });

        it('should return an object with the same prototype as the original object', () => {
            /* eslint-disable no-empty-function */
            function Foo() {}
            /* eslint-enable no-empty-function */

            const foo = new Foo();
            const bar = doop(foo);

            expect( Object.getPrototypeOf(foo) ).toBe( Object.getPrototypeOf(bar) );
        });

        // checks that a === b if it's not an object or array (or it's af function);
        // otherwise recurses down into keys and compares them.
        function compareForEquality(a, b) {
            if (a instanceof Object && a.constructor !== Function) {
                // if it's an object and not a function, it should clone.
                const keysA = Object.keys(a).sort();
                const keysB = Object.keys(b).sort();

                expect(keysA).toEqual(keysB);

                for (let i = 0; i < keysA.length; ++i) {
                    compareForEquality(a[keysA[i]], b[keysB[i]]);
                }
            } else {
                // otherwise, it should be exactly equal.
                expect(a).toBe(b);
            }
        }

        it('should clone recursively', () => {
            const inp = {
                a: 1,
                b: 2,
                'asdf-fdsa': {
                    a: 'fdsa',
                    b: [1, 2, 3]
                }
            };
            const out = doop.doop(inp);

            expect(inp).toEqual(out);
            expect(inp).not.toBe(out);
            // double-check
            compareForEquality(inp, out);
        });

        it('should not clone non-enumerable properties', () => {
            let clone;
            const obj = {
                a: 1
            };

            Object.defineProperty(obj, 'foo', {
                value: 2
            });

            clone = doop(obj);

            expect(clone.foo).not.toBeDefined();
        });

        it('should not create a circular reference if an object is seen more than once', () => {
            const input = {
                a: {}
            };
            let output;

            function stringify() {
                return JSON.stringify(output);
            }

            input.a.circular = input.a;
            output = doop(input);

            expect(stringify).not.toThrow();
        });
    });
});
