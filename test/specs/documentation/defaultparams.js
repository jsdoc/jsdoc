'use strict';

// Rhino can't handle default parameters
if (jasmine.jsParser !== 'rhino') {
    describe('default parameters', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/defaultparams.js');

        var setActive = docSet.getByLongname('setActive')[0];
        var setBirthYear = docSet.getByLongname('setBirthYear')[0];
        var setDogName = docSet.getByLongname('setDogName')[0];
        var setFirstName = docSet.getByLongname('setFirstName')[0];
        var setLastName = docSet.getByLongname('setLastName')[0];
        var setManager = docSet.getByLongname('setManager')[0];
        var setName = docSet.getByLongname('setName')[0];
        var setPizzaToppings = docSet.getByLongname('setPizzaToppings')[0];

        it('should automatically add string-literal values as defaults when no default value is documented', function() {
            expect(setFirstName.params[0].defaultvalue).toBe('Buster');
        });

        it('should not automatically mark parameters with default values as optional', function() {
            expect(setFirstName.params[0].optional).toBeUndefined();
        });

        it('should not automatically mark parameters with default values as nullable', function() {
            expect(setFirstName.params[0].nullable).toBeUndefined();
        });

        it('should not override documented default values', function() {
            expect(setLastName.params[0].defaultvalue).toBe('Braun');
        });

        it('should work when some parameters have default values and others do not', function() {
            expect(setName.params[0].defaultvalue).toBeUndefined();
            expect(setName.params[1].defaultvalue).toBe('Bluster');
            expect(setName.params[2].defaultvalue).toBe('Brown');
        });

        it('should ignore empty strings', function() {
            expect(setDogName.params[0].defaultvalue).toBeUndefined();
        });

        it('should work with boolean literals', function() {
            expect(setActive.params[0].defaultvalue).toBe(true);
        });

        it('should work with numeric literals', function() {
            expect(setBirthYear.params[0].defaultvalue).toBe(3000);
        });

        it('should ignore non-literal default values, such as variable identifiers', function() {
            expect(setPizzaToppings.params[0].defaultvalue).toBeUndefined();
        });
    });
}
