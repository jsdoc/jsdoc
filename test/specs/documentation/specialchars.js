'use strict';

describe('longnames with special characters', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/specialchars.js');
    var portNumber = docSet.getByLongname('Socket#\'port#number\'')[0];
    var open = docSet.getByLongname('Socket#\'open~a.connection#now\'')[0];

    it('should use the correct longname for instance members of "this" whose names contain ' +
        'scope punctuation', function() {
        expect(portNumber).toBeDefined();
    });

    it('should use the correct longname for instance members of the prototype whose names ' +
        'contain scope punctuation', function() {
        expect(open).toBeDefined();
    });
});
