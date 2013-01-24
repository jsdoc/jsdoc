/*global describe: true, expect: true, it: true, jasmine: true */
describe('callback tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/callbacktag.js');

    function callbackTests(callback) {
        expect(callback).toBeDefined();

        expect(callback.type).toBeDefined();
        expect(typeof callback.type).toEqual('object');

        expect(callback.type.names).toBeDefined();
        expect(callback.type.names instanceof Array).toEqual(true);
        expect(callback.type.names.length).toEqual(1);

        expect(callback.type.names[0]).toEqual('function');
    }

    it('correctly handles callbacks that do not define a {type}', function() {
        var callback = docSet.getByLongname('requestResponseCallback')[0];
        callbackTests(callback);
    });

    it('correctly handles callbacks that define an incorrect {type}', function() {
        var callback = docSet.getByLongname('wrongTypeCallback')[0];
        callbackTests(callback);
    });
});
