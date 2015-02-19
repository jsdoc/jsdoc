'use strict';

describe('jsdoc/util/dumper', function() {
    var dumper = require('jsdoc/util/dumper');

    it('should exist', function() {
        expect(dumper).toBeDefined();
        expect(typeof dumper).toBe('object');
    });

    it('should export a "dump" function', function() {
        expect(dumper.dump).toBeDefined();
        expect(typeof dumper.dump).toBe('function');
    });

    it('can dump string values', function() {
        expect(dumper.dump('hello')).toBe('"hello"');
    });

    it('escapes double quotes in string values', function() {
        expect(dumper.dump('hello "world"')).toBe('"hello \\"world\\""');
    });

    it('escapes newlines in string values', function() {
        expect(dumper.dump('hello\nworld')).toBe('"hello\\nworld"');
    });

    it('can dump number values', function() {
        expect(dumper.dump(1)).toBe('1');
        expect(dumper.dump(0.1)).toBe('0.1');
    });

    it('can dump boolean values', function() {
        expect(dumper.dump(true)).toBe('true');
        expect(dumper.dump(false)).toBe('false');
    });

    it('can dump null values', function() {
        expect(dumper.dump(null)).toBe('null');
    });

    it('can dump undefined values', function() {
        expect(dumper.dump(undefined)).toBe('null');
    });

    it('can dump regex values', function() {
        expect(dumper.dump(/^[Ff]oo$/gi)).toBe('"<RegExp /^[Ff]oo$/gi>"');
    });

    it('can dump date values', function() {
        expect(dumper.dump(new Date('January 1, 1901 GMT')))
            .toBe('"<Date Tue, 01 Jan 1901 00:00:00 GMT>"');
    });

    it('can dump function values', function() {
        expect(dumper.dump(function myFunc() {})).toBe('"<Function myFunc>"');
        expect(dumper.dump(function() {})).toBe('"<Function>"');
    });

    it('can dump array values', function() {
        var actual = dumper.dump(['hello', 'world']);
        var expected = '[\n    "hello",\n    "world"\n]';

        expect(actual).toBe(expected);
    });

    it('can dump simple object values', function() {
        var actual = dumper.dump({ hello: 'world' });
        var expected = '{\n    "hello": "world"\n}';

        expect(actual).toBe(expected);
    });

    it('can dump constructed instance values, not displaying prototype members', function() {
        var actual;
        var expected;

        function Foo(name) {
            this.name = name;
        }
        Foo.prototype.sayHello = function() {};

        actual = dumper.dump(new Foo('hello'));
        expected = '{\n    "name": "hello"\n}';

        expect(actual).toBe(expected);
    });

    it('can dump complex mixed values', function() {
        function Foo() {}

        var actual = dumper.dump([
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
                f: function myFunc() {},
                o: {
                    a: 1
                }
            }
        ]);
        var expected = '' +
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

    describe('circular references', function() {
        it('should not crash on circular references', function() {
            var a = {};
            a.b = a;

            var actual = dumper.dump(a);
            var expected = '{\n    "b": "<CircularRef>"\n}';

            expect(actual).toBe(expected);
        });

        it('should not treat references between different objects as circular refs', function() {
            var a = [
                {
                    b: {
                        c: 1
                    }
                }
            ];
            a[1] = { d: a[0].b };

            var actual = dumper.dump(a);
            var expected = '' +
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

    describe('multiple arguments', function() {
        it('should dump all of its arguments, separated by newlines', function() {
            var a = { b: 1 };
            var b = 'hello';

            var actual = dumper.dump(a, b);
            var expected = '' +
                '{\n' +
                '    "b": 1\n' +
                '}\n' +
                '"hello"';

            expect(actual).toBe(expected);
        });
    });
});
