'use strict';

describe('@hideconstructor tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/hideconstructortag.js');
    var toaster = docSet.getByLongname('Toaster')[0];
    var waffleIron = docSet.getByLongname('WaffleIron').filter(function($) {
        return !$.undocumented;
    })[0];

    it('should add a `hideconstructor` attribute to pre-ES2015 classes', function() {
        expect(toaster.hideconstructor).toBe(true);
    });

    it('should add a `hideconstructor` attribute to ES2015 classes when the constructor is tagged',
        function() {
            expect(waffleIron.hideconstructor).toBe(true);
        });
});
