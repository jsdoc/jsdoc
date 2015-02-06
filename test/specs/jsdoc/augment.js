'use strict';

describe('jsdoc/augment', function() {
    // TODO: more tests

    var augment = require('jsdoc/augment');

    it('should exist', function() {
        expect(augment).toBeDefined();
    });

    it('should have an "addImplemented" method', function() {
        expect(typeof augment.addImplemented).toBe('function');
    });

    it('should have an "addInherited" method', function() {
        expect(typeof augment.addInherited).toBe('function');
    });

    it('should have an "addMixedIn" method', function() {
        expect(typeof augment.addMixedIn).toBe('function');
    });

    it('should have an "augmentAll" method', function() {
        expect(typeof augment.augmentAll).toBe('function');
    });

    xdescribe('addImplemented', function() {
        // TODO: add some basic tests (functionality is tested via @interface and @implements tags)
    });

    xdescribe('addInherited', function() {
        // TODO: add some basic tests (functionality is tested via @augments tag)
    });

    xdescribe('addMixedIn', function() {
        // TODO: add some basic tests (functionality is tested via documentation/mixes spec)
    });

    describe('augmentAll', function() {
        it('should call all other methods that the module exports', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/mixintag2.js', null, null, false);
            var methodNames = Object.keys(augment).filter(function(name) {
                return name !== 'augmentAll';
            });

            methodNames.forEach(function(name) {
                spyOn(augment, name);
            });

            augment.augmentAll(docSet.doclets);

            methodNames.forEach(function(name) {
                expect(augment[name]).toHaveBeenCalled();
            });
        });

        it('should work when a class extends another class that implements an interface', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/augmentall.js', null, null, false);
            var open;

            augment.augmentAll(docSet.doclets);

            open = docSet.getByLongname('EncryptedSocket#open').filter(function(d) {
                return !d.ignore;
            });

            expect(open.length).toBe(1);
            expect(open[0].description).toBe('Open the connection.');
        });

        it('should work when a class implements an interface that extends another interface', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/augmentall2.js', null, null, false);
            var open;

            augment.augmentAll(docSet.doclets);

            open = docSet.getByLongname('EncryptedSocket#open').filter(function(d) {
                return !d.ignore;
            });

            expect(open.length).toBe(1);
            expect(open[0].description).toBe('Open the connection.');
        });
    });
});
