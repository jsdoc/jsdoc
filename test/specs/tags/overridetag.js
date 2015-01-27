'use strict';

describe('@override tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/overridetag.js');

    function ignored($) {
        return $.ignore !== true;
    }

    it('should cause the symbol to be documented', function() {
        var open = docSet.getByLongname('Socket#open');

        expect(open.length).toBe(2);
        expect(open[0].ignore).toBe(true);
        expect(open[1].ignore).not.toBeDefined();
        expect(open[1].description).toBe('Open the connection.');
    });

    it('should cause all other tags to be ignored', function() {
        var close = docSet.getByLongname('Socket#close').filter(ignored)[0];

        expect(close.description).toBe('Close the connection.');
        expect(close.params).not.toBeDefined();
    });

    it('should not say that the child symbol is abstract', function() {
        var open = docSet.getByLongname('Socket#open').filter(ignored)[0];
        var parentOpen = docSet.getByLongname('Connection#open')[0];

        expect(parentOpen.virtual).toBe(true);
        expect(open.virtual).not.toBeDefined();
    });

    it('should work with interface members whose names are specified in the comment', function() {
        var connectionRead = docSet.getByLongname('Connection#read').filter(ignored)[0];
        var socketRead = docSet.getByLongname('Socket#read').filter(ignored)[0];

        expect(socketRead).toBeDefined();
        expect(socketRead.description).toBe(connectionRead.description);
    });

    xit('should only be available if the Closure dictionary is enabled', function() {
        // TODO
    });
});
