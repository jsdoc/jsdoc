'use strict';

var hasOwnProp = Object.prototype.hasOwnProperty;

describe('jsdoc/package', function() {
    var emptyPackage;
    var jsdocPackage = require('jsdoc/package');
    var logger = require('jsdoc/util/logger');
    var Package = jsdocPackage.Package;

    function checkPackageProperty(name, value) {
        var myPackage;
        var obj = {};

        obj[name] = value;
        myPackage = new Package( JSON.stringify(obj) );
        // add the package object to the cached parse results, so we can validate it against the
        // doclet schema
        jasmine.addParseResults('package-property-' + name + '.js', [myPackage]);

        // use toEqual so we can test array/object values
        expect(myPackage[name]).toEqual(value);
    }

    it('should exist', function() {
        expect(jsdocPackage).toBeDefined();
        expect(typeof jsdocPackage).toBe('object');
    });

    it('should export a "Package" constructor', function() {
        expect(Package).toBeDefined();
        expect(typeof Package).toBe('function');
    });

    describe('Package', function() {
        beforeEach(function() {
            emptyPackage = new Package();
        });

        it('should accept a JSON-format string', function() {
            function newPackage() {
                return new Package('{"foo": "bar"}');
            }

            expect(newPackage).not.toThrow();
        });

        it('should work when called with no arguments', function() {
            function newPackage() {
                return new Package();
            }

            expect(newPackage).not.toThrow();
        });

        it('should log an error when called with bad input', function() {
            function newPackage() {
                return new Package('abcdefg');
            }

            spyOn(logger, 'error');

            expect(newPackage).not.toThrow();
            expect(logger.error).toHaveBeenCalled();
        });

        describe('author', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'author') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('author', { name: 'Jane Smith', email: 'jsmith@example.com' });
            });
        });

        describe('bugs', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'bugs') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('bugs', { url: 'http://example.com/bugs' });
            });
        });

        describe('contributors', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'contributors') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('contributors', [{
                    name: 'Jane Smith',
                    email: 'jsmith@example.com'
                }]);
            });
        });

        describe('dependencies', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'dependencies') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('dependencies', { bar: '~1.1.0' });
            });
        });

        describe('description', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'description') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('description', 'My package.');
            });
        });

        describe('devDependencies', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'devDependencies') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('devDependencies', { baz: '~3.4.5' });
            });
        });

        describe('engines', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'engines') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('engines', { node: '>=0.10.3' });
            });
        });

        describe('files', function() {
            it('should contain an empty array by default', function() {
                expect(emptyPackage.files).toBeDefined();
                expect(emptyPackage.files).toEqual([]);
            });

            it('should ignore the value from the package file', function() {
                var myPackage = new Package('{"files": ["foo", "bar"]}');

                expect(myPackage.files.length).toBe(0);
            });
        });

        describe('homepage', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'homepage') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('homepage', 'http://example.com/');
            });
        });

        describe('keywords', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'keywords') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('keywords', ['foo', 'bar']);
            });
        });

        describe('licenses', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'licenses') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('licenses', [{
                    type: 'My Open-Source License',
                    url: 'http://example.com/oss'
                }]);
            });

            it('should contain the value of "license" from the package file', function() {
                var myPackage = new Package('{"license": "My-OSS-License"}');

                expect(myPackage.license).not.toBeDefined();
                expect(myPackage.licenses).toBeDefined();
                expect(myPackage.licenses.length).toBe(1);
                expect(myPackage.licenses[0].type).toBe('My-OSS-License');
            });

            it('should combine the "license" and "licenses" properties', function() {
                var packageInfo = {
                    license: 'My-OSS-License',
                    licenses: [{
                        type: 'My Open-Source License',
                        url: 'http://example.com/oss'
                    }]
                };
                var myPackage = new Package( JSON.stringify(packageInfo) );

                expect(myPackage.licenses.length).toBe(2);
            });
        });

        describe('longname', function() {
            it('should default to "package:undefined"', function() {
                expect(emptyPackage.longname).toBe('package:undefined');
            });

            it('should reflect the value of the "name" property', function() {
                var myPackage = new Package('{"name": "foo"}');

                expect(myPackage.longname).toBe('package:foo');
            });
        });

        describe('main', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'main') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('main', 'foo');
            });
        });

        describe('name', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'name') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('name', 'foo');
            });
        });

        describe('repository', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'repository') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('repository', {
                    type: 'git',
                    url: 'git@example.org:foo/bar/baz.git'
                });
            });
        });

        describe('version', function() {
            it('should not exist by default', function() {
                expect( hasOwnProp.call(emptyPackage, 'version') ).toBe(false);
            });

            it('should contain the value from the package file', function() {
                checkPackageProperty('version', '0.1.2');
            });
        });
    });
});
