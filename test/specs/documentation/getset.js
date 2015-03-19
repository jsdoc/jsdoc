'use strict';

describe('When a getter or setter is part of a class', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/getset.js');

    describe('in an object literal', function() {
        var name = docSet.getByLongname('Person#name');
        var age = docSet.getByLongname('Person#age');

        it('should have a doclet with the correct longname', function() {
            expect(name.length).toBe(2);
            expect(age.length).toBe(1);
        });

        it('should have a doclet with the correct name', function() {
            expect(name[0].name).toBe('name');
            expect(name[1].name).toBe('name');
            expect(age[0].name).toBe('age');
        });

        it('should have a doclet with the correct kind', function() {
            expect(name[0].kind).toBe('member');
            expect(name[1].kind).toBe('member');
            expect(age[0].kind).toBe('member');
        });

        it('should have a doclet with the correct memberof', function() {
            expect(name[0].memberof).toBe('Person');
            expect(name[1].memberof).toBe('Person');
            expect(age[0].memberof).toBe('Person');
        });
    });

    if (jasmine.jsParser !== 'rhino') {
        describe('in an ES 2015 class', function() {
            var docSet2 = jasmine.getDocSetFromFile('test/fixtures/getset2.js');
            var location = docSet2.getByLongname('Employee#location');

            it('should have a doclet with the correct longname', function() {
                expect(location.length).toBe(2);
            });

            it('should have a doclet with the correct name', function() {
                expect(location[0].name).toBe('location');
                expect(location[1].name).toBe('location');
            });

            it('should have a doclet with the correct kind', function() {
                expect(location[0].kind).toBe('member');
                expect(location[1].kind).toBe('member');
            });

            it('should have a doclet with the correct memberof', function() {
                expect(location[0].memberof).toBe('Employee');
                expect(location[1].memberof).toBe('Employee');
            });
        });
    }
});
