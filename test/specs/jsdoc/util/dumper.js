describe('jsdoc/util/dumper', () => {
    const dumper = require('jsdoc/util/dumper');

    it('should exist', () => {
        expect(dumper).toBeObject();
    });

    it('should export a "dump" function', () => {
        expect(dumper.dump).toBeFunction();
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
        const dumped = dumper.dump(['hello', 'world']);

        expect(dumped).toBe('[\n    "hello",\n    "world"\n]');
    });

    it('can dump simple object values', () => {
        const dumped = dumper.dump({ hello: 'world' });

        expect(dumped).toBe('{\n    "hello": "world"\n}');
    });

    it('can dump constructed instance values, not displaying prototype members', () => {
        let dumped;

        function Foo(name) {
            this.name = name;
        }
        /* eslint-disable no-empty-function */
        Foo.prototype.sayHello = () => {};
        /* eslint-enable no-empty-function */

        dumped = dumper.dump(new Foo('hello'));

        expect(dumped).toBe('{\n    "name": "hello"\n}');
    });

    it('can dump complex mixed values', () => {
        /* eslint-disable no-empty-function */
        function Foo() {}
        /* eslint-enable no-empty-function */

        const dumped = dumper.dump([
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

        expect(dumped).toBe(expected);
    });

    describe('circular references', () => {
        it('should not crash on circular references', () => {
            const a = {};
            let dumped;

            a.b = a;
            dumped = dumper.dump(a);

            expect(dumped).toBe('{\n    "b": "<CircularRef>"\n}');
        });

        it('should not treat references between different objects as circular refs', () => {
            const a = [
                {
                    b: {
                        c: 1
                    }
                }
            ];
            let dumped;
            let expected;

            a[1] = { d: a[0].b };
            dumped = dumper.dump(a);
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

            expect(dumped).toBe(expected);
        });
    });

    describe('multiple arguments', () => {
        it('should dump all of its arguments, separated by newlines', () => {
            const a = { b: 1 };
            const b = 'hello';
            const dumped = dumper.dump(a, b);
            const expected = '' +
                '{\n' +
                '    "b": 1\n' +
                '}\n' +
                '"hello"';

            expect(dumped).toBe(expected);
        });
    });
});
