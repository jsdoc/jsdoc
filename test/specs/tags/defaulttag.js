/*global describe: true, expect: true, it: true, jasmine: true */
describe("@default tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/defaulttag.js');
    var request = (docSet.getByLongname('request') || [])[0];
    var response = (docSet.getByLongname('response') || [])[0];
    var rcode = (docSet.getByLongname('rcode') || [])[0];
    var rvalid = (docSet.getByLongname('rvalid') || [])[0];
    var rerrored = (docSet.getByLongname('rerrored') || [])[0];
    var win = (docSet.getByLongname('win') || [])[0];
    var header = (docSet.getByLongname('header') || [])[0];
    var obj = docSet.getByLongname('obj')[0];
    var multilineObject = docSet.getByLongname('multilineObject')[0];
    var arr = docSet.getByLongname('arr')[0];

    it('When symbol set to null has a @default tag with no text, the doclet\'s defaultValue property should be: null', function() {
        expect(request.defaultvalue).toBe('null');
    });

    it('When symbol set to a string has a @default tag with no text, the doclet\'s defaultValue property should be that string', function() {
        expect(response.defaultvalue).toBe('ok');
    });

    it('When symbol set to a number has a @default tag with no text, the doclet\'s defaultValue property should be that number.', function() {
        expect(rcode.defaultvalue).toBe('200');
    });

    it('When symbol has a @default tag with text, the doclet\'s defaultValue property should be that text.', function() {
        expect(win.defaultvalue).toBe('the parent window');
    });

    it('When symbol has a @default tag with true.', function() {
        expect(rvalid.defaultvalue).toBe('true');
    });

    it('When symbol has a @default tag with false.', function() {
        expect(rerrored.defaultvalue, 'false');
    });

    it('When symbol has a @default tag with a function call.', function() {
        expect(header.defaultvalue).toBeUndefined();
    });

    it('When symbol has a @default tag with an object, the doclet should contain the stringified object', function() {
        var testObj = { valueA: 'a', valueB: false, valueC: 7};
        expect(obj.defaultvalue).toBe( JSON.stringify(testObj) );
        expect(obj.defaultvaluetype).toBe('object');
    });

    it('When symbol has a @default tag with a multiline object, the doclet should contain the stringified object', function() {
        var testObj = {
            valueA: 'a',
            valueB: false,
            valueC: 7
        };
        expect(obj.defaultvalue).toBe( JSON.stringify(testObj) );
        expect(obj.defaultvaluetype).toBe('object');
    });

    it('When symbol has a @default tag with an array, the doclet should contain the stringified array', function() {
        var testArray = ['foo', true, 19];
        expect(arr.defaultvalue).toBe( JSON.stringify(testArray) );
        expect(arr.defaultvaluetype).toBe('array');
    });
});
