'use strict';

describe('export default class', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/exportdefaultclass.js');
    var klass = docSet.getByLongname('module:test')[2];

    it('should combine the classdesc and constructor description into a single doclet', function() {
        expect(klass.classdesc).toBe('Test class');
        expect(klass.description).toBe('Test constructor');
    });
});
