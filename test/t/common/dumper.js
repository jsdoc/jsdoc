var common = {dumper: require('common/dumper')};

test('The common/dumper module is defined.', function() {
    assert.notEqual(typeof common.dumper, 'undefined', 'The common/dumper module should be defined.');
    assert.equal(typeof common.dumper, 'object', 'The common/dumper module should be an object.');
});

test('The common/dumper module exports a "dump" function.', function() {
    assert.notEqual(typeof common.dumper.dump, 'undefined', 'The common/dumper.dump member should be defined.');
    assert.equal(typeof common.dumper.dump, 'function', 'The common/dumper.dump member should be a function.');
});

test('The common/dumper.dump function dumps string values.', function() {
    assert.equal(common.dumper.dump('hello'), '"hello"');
    assert.equal(common.dumper.dump('hello "world"'), '"hello \\"world\\""', 'Double quotes should be escaped.');
    assert.equal(common.dumper.dump('hello\nworld'), '"hello\\nworld"', 'Newlines should be escaped.');
});

test('The common/dumper.dump function dumps number values.', function() {
    assert.equal(common.dumper.dump(1), '1');
    assert.equal(common.dumper.dump(0.1), '0.1', 'Decimal numbers shuld be dumped.');
});

test('The common/dumper.dump function dumps boolean values.', function() {
    assert.equal(common.dumper.dump(true), 'true');
    assert.equal(common.dumper.dump(false), 'false');
});

test('The common/dumper.dump function dumps null values.', function() {
    assert.equal(common.dumper.dump(null), 'null');
});

test('The common/dumper.dump function dumps undefined values.', function() {
    assert.equal(common.dumper.dump(undefined), 'undefined');
});

test('The common/dumper.dump function dumps regex values.', function() {
    assert.equal(common.dumper.dump(/^[Ff]oo$/gi), '<RegExp /^[Ff]oo$/gi>');
});

test('The common/dumper.dump function dumps date values.', function() {
    assert.equal(common.dumper.dump(new Date(1901, 0, 1)), '<Date Tue Jan 01 1901 00:00:00 GMT-0000 (GMT)>');
});

test('The common/dumper.dump function dumps function values.', function() {
    assert.equal(common.dumper.dump(function myFunc(){}), '<Function myFunc>');
    assert.equal(common.dumper.dump(function(){}), '<Function>');
});

test('The common/dumper.dump function dumps array values.', function() {
    var actual = common.dumper.dump(["hello", "world"]),
    expected = '[\n    "hello",\n    "world"\n]';

    assert.equal(actual, expected);
});

test('The common/dumper.dump function dumps simple object values.', function() {
    var actual = common.dumper.dump({hello: "world"}),
    expected = '{\n    "hello": "world"\n}';

    assert.equal(actual, expected);
});

test('The common/dumper.dump function dumps constructed instance values.', function() {
    function Foo(name){ this.name = name; }
    Foo.prototype.sayHello = function(){}
    
    var actual = common.dumper.dump(new Foo('hello')),
    expected = '{\n    "name": "hello"\n}';

    assert.equal(actual, expected, 'Members of the instance should appear, but not prototype members.');
});

test('The common/dumper.dump function dumps complex mixed values.', function() {
    function Foo(){}

    var actual = common.dumper.dump(
        [undefined, null, new Foo(), 1, true, 'hello\n"world', new Error('oops'), /foo/gi, new Date(2010, 11, 26), {f: function myFunc(){}, o: {a:1}}]
    ),
    expected = '[\n    undefined,\n    null,\n    {\n    },\n    1,\n    true,\n    "hello\\n\\"world",\n    {\n        "message": "oops"\n    },\n    <RegExp /foo/gi>,\n    <Date Sun Dec 26 2010 00:00:00 GMT-0000 (GMT)>,\n    {\n        "f": <Function myFunc>,\n        "o": {\n            "a": 1\n        }\n    }\n]';

    assert.equal(actual, expected);
});
