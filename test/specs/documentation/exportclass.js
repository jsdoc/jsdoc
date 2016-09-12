'use strict';

describe('export class', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/exportclass.js');
    var bar = docSet.getByLongname('module:foo.Bar')[0];

    it('should name exported classes correctly', function() {
        expect(bar).toBeDefined();
        expect(bar.name).toBe('Bar');
    });

    it('should merge the class description with the doclet for the class', function() {
        expect(bar.classdesc).toBe('Class description');
    });
});
