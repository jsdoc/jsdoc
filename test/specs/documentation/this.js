'use strict';

describe('this', function() {
    describe('attaching members to "this"', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/this.js');
        var found1 = docSet.getByLongname('Singer#tralala');
        var found2 = docSet.getByLongname('Singer#isSinging');

        describe('in a contructor', function() {
            it('should have a longname like Constructor#member', function() {
                expect(found1.length).toBe(1);
            });

            it('should have a correct short name', function() {
                expect(found1[0].name).toBe('tralala');
            });

            it('should have a correct memberof', function() {
                expect(found1[0].memberof).toBe('Singer');
            });

            it('should default to an "instance" scope', function() {
                expect(found1[0].scope).toBe('instance');
            });
        });

        describe('in a method of a constructor', function() {
            it('should have a longname like Constructor#member', function() {
                expect(found2.length).toBe(1);
            });

            it('should have a correct short name', function() {
                expect(found2[0].name).toBe('isSinging');
            });

            it('should have a correct memberof', function() {
                expect(found2[0].memberof).toBe('Singer');
            });

            it('should default to an "instance" scope', function() {
                expect(found2[0].scope).toBe('instance');
            });
        });
    });

    describe('when a contructor is nested inside another constructor', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/this2.js');
        var found = docSet.getByLongname('TemplateBuilder#Template#rendered');

        it('should have a longname like Constructor#Constructor#member', function() {
            expect(found.length).toBe(1);
        });

        it('should have a correct short name', function() {
            expect(found[0].name).toBe('rendered');
        });

        it('should have a correct memberof', function() {
            expect(found[0].memberof).toBe('TemplateBuilder#Template');
        });

        it('should default to an "instance" scope', function() {
            expect(found[0].scope).toBe('instance');
        });
    });

    describe('When a this is assigned to inside a non-constructor function', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/this3.js');
        var found = docSet.getByLongname('position');

        it('should have a global member name like "member"', function() {
            expect(found.length).toBe(1);
        });

        it('should have a correct short name', function() {
            expect(found[0].name).toBe('position');
        });

        it('should have a correct memberof', function() {
            expect(found[0].memberof).toBeUndefined();
        });
    });

    describe('When "this" is assigned inside an explicit definition of the class constructor', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/this4.js');
        var found = docSet.getByLongname('Template#render');

        it('should have a longname like Constructor#member', function() {
            expect(found.length).toBe(1);
        });

        it('should have the correct name', function() {
            expect(found[0].name).toBe('render');
        });

        it('should have the correct memberof', function() {
            expect(found[0].memberof).toBe('Template');
        });
    });

    describe('When "this" is assigned in a chained declaration in a module', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/this5.js');
        var found = docSet.getByLongname('module:template.Template#view');

        it('should have a longname like Constructor#member', function() {
            expect(found.length).toBe(1);
        });

        it('should have the correct name', function() {
            expect(found[0].name).toBe('view');
        });

        it('should have the correct memberof', function() {
            expect(found[0].memberof).toBe('module:template.Template');
        });
    });

    describe('When a member is nested inside an objectlit "this" property inside a constructor', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/this-and-objectlit.js');
        var found = docSet.getByLongname('Page#parts.body.heading');

        it('should have a longname like Constructor#objlit.member', function() {
            expect(found.length).toBe(1);
        });

        it('should have a correct short name', function() {
            expect(found[0].name).toBe('heading');
        });

        it('should have a correct memberof', function() {
            expect(found[0].memberof).toBe('Page#parts.body');
        });

        it('should default to a "static" scope', function() {
            expect(found[0].scope).toBe('static');
        });
    });
});
