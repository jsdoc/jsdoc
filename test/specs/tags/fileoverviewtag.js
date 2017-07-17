'use strict';

describe('@fileoverview tag', function() {
    describe('JSDoc tags', function() {
        // @fileoverview is a synonym of @file, so this is covered by the @file tag tests
    });

    describe('Closure Compiler tags', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/fileoverviewtag.js');
        var fileDoc = docSet.getByLongname('[[string0]]')[0];

        it('should set the doclet\'s name and longname to the file name', function() {
            expect(fileDoc.name).toBe('[[string0]]');
        });

        it('should set the doclet\'s kind to `file`', function() {
            expect(fileDoc.kind).toBe('file');
        });

        it('should use the value as a description', function() {
            expect(fileDoc.description).toBe('Overview of this file.');
        });

        it('should set `preserveName` to `true`', function() {
            expect(fileDoc.preserveName).toBe(true);
        });
    });
});
