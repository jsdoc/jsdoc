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

    // TODO: reenable the changes for https://github.com/jsdoc3/jsdoc/pull/419
    xit('When symbol has a @default tag with an object, the doclet\'s defaultValue property should contain the stringified object', function() {
        var expected_value = "{value_a: 'a', value_b: 'b'}";
        expect(obj.defaultvalue).toEqual(expected_value);
    });

    xit('When symbol has a @default tag with a multiline object, the doclet\'s defaultValue property should contain the properly stringified object', function() {
        var expected_value = "{value_a: 'a', value_b: 'b'}";
        expect(obj.defaultvalue).toEqual(expected_value);
    });

});
