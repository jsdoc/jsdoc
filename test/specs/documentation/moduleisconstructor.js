'use strict';

describe('module that exports a constructor', function() {
    describe('pre-ES2015 module', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduleisconstructor.js');
        var modules = docSet.doclets.filter(function(doclet) {
            return doclet.kind === 'module';
        });
        var classes = docSet.doclets.filter(function(doclet) {
            return doclet.kind === 'class';
        });
        var getId = docSet.getByLongname('module:mymodule/config#getId')[0];
        var id = docSet.getByLongname('module:mymodule/config#id')[0];

        it('should include one doclet whose kind is "module"', function() {
            expect(modules.length).toBe(1);
            expect(modules[0].kind).toBe('module');
        });

        it('should include one doclet whose kind is "class"', function() {
            expect(classes.length).toBe(1);
            expect(classes[0].kind).toBe('class');
        });

        describe('class doclet', function() {
            it('should include a "description" property that contains the constructor description', function() {
                expect(classes[0].description).toEqual('Create a new configuration.');
            });

            it('should include a "classdesc" property', function() {
                expect(classes[0].classdesc).toEqual('Describe the class here.');
            });
        });

        describe('module doclet', function() {
            it('should include a "description" property that contains the module description', function() {
                expect(modules[0].description).toEqual('Describe the module here.');
            });
        });

        describe('instance members', function() {
            it('should use the correct longname for instance properties', function() {
                expect(id.description).toBe('Document me.');
            });

            it('should use the correct longname for instance methods', function() {
                expect(getId.description).toBe('Get the configuration ID.');
            });
        });
    });

    describe('ES2015 module', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduleisconstructor2.js');
        var modules = docSet.doclets.filter(function(doclet) {
            return doclet.kind === 'module';
        });
        var classes = docSet.doclets.filter(function(doclet) {
            return doclet.kind === 'class' && doclet.classdesc && doclet.description;
        });
        var getId = docSet.getByLongname('module:mymodule/config#getId')[0];
        var id = docSet.getByLongname('module:mymodule/config#id')[0];

        it('should include one doclet whose kind is "module"', function() {
            expect(modules.length).toBe(1);
            expect(modules[0].kind).toBe('module');
        });

        it('should include one complete class doclet', function() {
            expect(classes.length).toBe(1);
            expect(classes[0].kind).toBe('class');
        });

        describe('class doclet', function() {
            it('should include a "description" property that contains the constructor description', function() {
                expect(classes[0].description).toEqual('Create a new configuration.');
            });

            it('should include a "classdesc" property', function() {
                expect(classes[0].classdesc).toEqual('Describe the class here.');
            });
        });

        describe('module doclet', function() {
            it('should include a "description" property that contains the module description', function() {
                expect(modules[0].description).toEqual('Describe the module here.');
            });
        });

        describe('instance members', function() {
            it('should use the correct longname for instance properties', function() {
                expect(id.description).toBe('Document me.');
            });

            it('should use the correct longname for instance methods', function() {
                expect(getId.description).toBe('Get the configuration ID.');
            });
        });
    });
});
