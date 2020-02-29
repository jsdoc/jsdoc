const hasOwnProp = Object.prototype.hasOwnProperty;

describe('jsdoc/package', () => {
    let emptyPackage;
    const jsdocPackage = require('jsdoc/package');
    const Package = jsdocPackage.Package;

    function checkPackageProperty(name, value) {
        let myPackage;
        const obj = {};

        obj[name] = value;
        myPackage = new Package( JSON.stringify(obj) );
        // add the package object to the cached parse results, so we can validate it against the
        // doclet schema
        jsdoc.addParseResults(`package-property-${name}.js`, [myPackage]);

        expect(myPackage[name]).toEqual(value);
    }

    it('should exist', () => {
        expect(jsdocPackage).toBeObject();
    });

    it('should export a "Package" constructor', () => {
        expect(Package).toBeFunction();
    });

    describe('Package', () => {
        beforeEach(() => {
            emptyPackage = new Package();
        });

        it('should accept a JSON-format string', () => {
            function newPackage() {
                return new Package('{"foo": "bar"}');
            }

            expect(newPackage).not.toThrow();
        });

        it('should accept a JSON-format string with a leading BOM', () => {
            function newPackage() {
                return new Package('\uFEFF{}');
            }

            expect(newPackage).not.toThrow();
        });

        it('should work when called with no arguments', () => {
            function newPackage() {
                return new Package();
            }

            expect(newPackage).not.toThrow();
        });

        it('should log an error when called with bad input', () => {
            function newPackage() {
                return new Package('abcdefg');
            }

            expect(newPackage).not.toThrow();
            expect(jsdoc.didLog(newPackage, 'error')).toBeTrue();
        });

        describe('author', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'author') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('author', {
                    name: 'Jane Smith',
                    email: 'jsmith@example.com'
                });
            });
        });

        describe('bugs', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'bugs') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('bugs', { url: 'http://example.com/bugs' });
            });
        });

        describe('contributors', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'contributors') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('contributors', [{
                    name: 'Jane Smith',
                    email: 'jsmith@example.com'
                }]);
            });
        });

        describe('dependencies', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'dependencies') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('dependencies', { bar: '~1.1.0' });
            });
        });

        describe('description', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'description') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('description', 'My package.');
            });
        });

        describe('devDependencies', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'devDependencies') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('devDependencies', { baz: '~3.4.5' });
            });
        });

        describe('engines', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'engines') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('engines', { node: '>=0.10.3' });
            });
        });

        describe('files', () => {
            it('should contain an empty array by default', () => {
                expect(emptyPackage.files).toBeEmptyArray();
            });

            it('should ignore the value from the package file', () => {
                const myPackage = new Package('{"files": ["foo", "bar"]}');

                expect(myPackage.files).toBeEmptyArray();
            });
        });

        describe('homepage', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'homepage') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('homepage', 'http://example.com/');
            });
        });

        describe('keywords', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'keywords') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('keywords', ['foo', 'bar']);
            });
        });

        describe('licenses', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'licenses') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('licenses', [{
                    type: 'My Open-Source License',
                    url: 'http://example.com/oss'
                }]);
            });

            it('should contain the value of "license" from the package file', () => {
                const myPackage = new Package('{"license": "My-OSS-License"}');

                expect(myPackage.license).toBeUndefined();
                expect(myPackage.licenses).toBeArrayOfSize(1);
                expect(myPackage.licenses[0].type).toBe('My-OSS-License');
            });

            it('should combine the "license" and "licenses" properties', () => {
                const packageInfo = {
                    license: 'My-OSS-License',
                    licenses: [{
                        type: 'My Open-Source License',
                        url: 'http://example.com/oss'
                    }]
                };
                const myPackage = new Package( JSON.stringify(packageInfo) );

                expect(myPackage.licenses).toBeArrayOfSize(2);
            });
        });

        describe('longname', () => {
            it('should default to "package:undefined"', () => {
                expect(emptyPackage.longname).toBe('package:undefined');
            });

            it('should reflect the value of the "name" property', () => {
                const myPackage = new Package('{"name": "foo"}');

                expect(myPackage.longname).toBe('package:foo');
            });
        });

        describe('main', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'main') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('main', 'foo');
            });
        });

        describe('name', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'name') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('name', 'foo');
            });
        });

        describe('repository', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'repository') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('repository', {
                    type: 'git',
                    url: 'git@example.org:foo/bar/baz.git'
                });
            });
        });

        describe('version', () => {
            it('should not exist by default', () => {
                expect( hasOwnProp.call(emptyPackage, 'version') ).toBeFalse();
            });

            it('should contain the value from the package file', () => {
                checkPackageProperty('version', '0.1.2');
            });
        });
    });
});
