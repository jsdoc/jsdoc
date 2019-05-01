describe('jsdoc/util/dumper', () => {
    const dumper = require('../../../lib/jsdoc/util/dumper');

    it('should exist', () => {
        expect(dumper).toBeDefined();
        expect(typeof dumper).toBe('object');
    });

    it('should export a "dump" function', () => {
        expect(dumper.dump).toBeDefined();
        expect(typeof dumper.dump).toBe('function');
    });

    it('can dump string values', () => {
        expect(dumper.dump('hello')).toBe('"hello"');
    });

    it('escapes double quotes in string values', () => {
        expect(dumper.dump('hello "world"')).toBe('"hello \\"world\\""');
    });

    it('escapes newlines in string values', () => {
        expect(dumper.dump('hello\nworld')).toBe('"hello\\nworld"');
    });

    it('can dump number values', () => {
        expect(dumper.dump(1)).toBe('1');
        expect(dumper.dump(0.1)).toBe('0.1');
    });

    it('can dump boolean values', () => {
        expect(dumper.dump(true)).toBe('true');
        expect(dumper.dump(false)).toBe('false');
    });

    it('can dump null values', () => {
        expect(dumper.dump(null)).toBe('null');
    });

    it('can dump undefined values', () => {
        expect(dumper.dump(undefined)).toBe('null');
    });

    it('can dump regex values', () => {
        expect(dumper.dump(/^[Ff]oo$/gi)).toBe('"<RegExp /^[Ff]oo$/gi>"');
    });

    it('can dump date values', () => {
        expect(dumper.dump(new Date('January 1, 1901 GMT')))
            .toBe('"<Date Tue, 01 Jan 1901 00:00:00 GMT>"');
    });

    it('can dump function values', () => {
        /* eslint-disable no-empty-function */
        expect(dumper.dump(function myFunc() {})).toBe('"<Function myFunc>"');
        expect(dumper.dump(() => {})).toBe('"<Function>"');
        /* eslint-enable no-empty-function */
    });

    it('can dump array values', () => {
        const actual = dumper.dump(['hello', 'world']);
        const expected = '[\n    "hello",\n    "world"\n]';

        expect(actual).toBe(expected);
    });

    it('can dump simple object values', () => {
        const actual = dumper.dump({ hello: 'world' });
        const expected = '{\n    "hello": "world"\n}';

        expect(actual).toBe(expected);
    });

    it('can dump constructed instance values, not displaying prototype members', () => {
        let actual;
        let expected;

        function Foo(name) {
            this.name = name;
        }
        /* eslint-disable no-empty-function */
        Foo.prototype.sayHello = () => {};
        /* eslint-enable no-empty-function */

        actual = dumper.dump(new Foo('hello'));
        expected = '{\n    "name": "hello"\n}';

        expect(actual).toBe(expected);
    });

    it('can dump complex mixed values', () => {
        /* eslint-disable no-empty-function */
        function Foo() {}
        /* eslint-enable no-empty-function */

        const actual = dumper.dump([
            undefined,
            null,
            new Foo(),
            1,
            true,
            'hello\n"world',
            new Error('oops'),
            /foo/gi,
            new Date('December 26, 2010 GMT'),
            {
                /* eslint-disable func-name-matching, no-empty-function */
                f: function myFunc() {},
                /* eslint-enable func-name-matching, no-empty-function */
                o: {
                    a: 1
                }
            }
        ]);
        const expected = '' +
            '[\n' +
            '    null,\n' +
            '    null,\n' +
            '    {},\n' +
            '    1,\n' +
            '    true,\n' +
            '    "hello\\n\\"world",\n' +
            '    {\n' +
            '        "message": "oops"\n' +
            '    },\n' +
            '    "<RegExp /foo/gi>",\n' +
            '    "<Date Sun, 26 Dec 2010 00:00:00 GMT>",\n' +
            '    {\n' +
            '        "f": "<Function myFunc>",\n' +
            '        "o": {\n' +
            '            "a": 1\n' +
            '        }\n' +
            '    }\n' +
            ']';

        expect(actual).toBe(expected);
    });

    describe('circular references', () => {
        it('should not crash on circular references', () => {
            const a = {};
            let actual;
            let expected;

            a.b = a;
            actual = dumper.dump(a);
            expected = '{\n    "b": "<CircularRef>"\n}';

            expect(actual).toBe(expected);
        });

        it('should not treat references between different objects as circular refs', () => {
            const a = [
                {
                    b: {
                        c: 1
                    }
                }
            ];
            let actual;
            let expected;

            a[1] = { d: a[0].b };
            actual = dumper.dump(a);
            expected = '' +
                '[\n' +
                '    {\n' +
                '        "b": {\n' +
                '            "c": 1\n' +
                '        }\n' +
                '    },\n' +
                '    {\n' +
                '        "d": {\n' +
                '            "c": 1\n' +
                '        }\n' +
                '    }\n' +
                ']';

            expect(actual).toBe(expected);
        });
    });

    describe('multiple arguments', () => {
        it('should dump all of its arguments, separated by newlines', () => {
            const a = { b: 1 };
            const b = 'hello';
            const actual = dumper.dump(a, b);
            const expected = '' +
                '{\n' +
                '    "b": 1\n' +
                '}\n' +
                '"hello"';

            expect(actual).toBe(expected);
        });
    });
});
