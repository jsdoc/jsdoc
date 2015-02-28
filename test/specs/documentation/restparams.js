'use strict';

// Rhino can't handle rest parameters
if (jasmine.jsParser !== 'rhino') {
    describe('rest parameters', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/restparams.js');
        var setAdmins = docSet.getByLongname('setAdmins')[0];
        var setWidgetAccess = docSet.getByLongname('setWidgetAccess')[0];

        it('should automatically mark standalone rest parameters as repeatable', function() {
            var restParam = setAdmins.params[0];

            expect(restParam.name).toBe('users');
            expect(restParam.variable).toBe(true);
        });

        it('should automatically mark rest parameters as repeatable when they are mixed with other params', function() {
            var restParam = setWidgetAccess.params[1];

            expect(restParam.name).toBe('users');
            expect(restParam.variable).toBe(true);
        });
    });
}
