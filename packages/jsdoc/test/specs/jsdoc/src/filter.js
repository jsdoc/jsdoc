describe('jsdoc/src/filter', () => {
    const filter = require('jsdoc/src/filter');
    const path = require('path');

    it('should exist', () => {
        expect(filter).toBeObject();
    });

    it('should export a "Filter" class', () => {
        expect(filter.Filter).toBeFunction();
    });

    describe('Filter', () => {
        let myFilter;

        const defaultIncludePattern = /.+\.js(doc)?$/;
        const defaultExcludePattern = /(^|\/|\\)_/;

        beforeEach(() => {
            myFilter = new filter.Filter({});
        });

        it('should have an "exclude" property', () => {
            expect(myFilter.exclude).toBeDefined();
        });

        it('should have an "excludePattern" property', () => {
            expect(myFilter.excludePattern).toBeDefined();
        });

        it('should have an "includePattern" property', () => {
            expect(myFilter.includePattern).toBeDefined();
        });

        it('should have an "isIncluded" method', () => {
            expect(myFilter.isIncluded).toBeFunction();
        });

        describe('exclude', () => {
            it('should default to null', () => {
                expect(myFilter.exclude).toBeNull();
            });

            it('should be null if the value passed to the constructor was not an array',
                () => {
                    myFilter = new filter.Filter({
                        exclude: 'foo'
                    });

                    expect(myFilter.exclude).toBeNull();
                });

            it('should resolve paths relative to the user\'s working directory', () => {
                const filename = 'bar.js';

                myFilter = new filter.Filter({
                    exclude: [filename]
                });

                expect(myFilter.exclude).toEqual([path.resolve(process.cwd(), filename)]);
            });
        });

        function testRegExpProperty(name) {
            it('should default to null', () => {
                expect(myFilter[name]).toBeNull();
            });

            it('should contain the regexp passed to the constructor', () => {
                const regExp = /^foo$/;
                const options = {};

                options[name] = regExp;
                myFilter = new filter.Filter(options);

                expect(myFilter[name]).toBe(regExp);
            });

            it('should contain a regexp if a string was passed to the constructor', () => {
                const regExpString = '^foo$';
                const options = {};

                options[name] = regExpString;
                myFilter = new filter.Filter(options);

                expect(myFilter[name]).toBeRegExp();
                expect(myFilter[name].source).toBe(regExpString);
            });
        }

        describe( 'excludePattern', testRegExpProperty.bind(jasmine, 'excludePattern') );

        describe( 'includePattern', testRegExpProperty.bind(jasmine, 'includePattern') );

        describe('isIncluded', () => {
            it('should return the correct source files', () => {
                let files = [
                    'yes.js',
                    '/yes.jsdoc',
                    '/_nope.js',
                    '.ignore',
                    path.normalize(`${process.cwd()}/scratch/conf.js`)
                ];

                myFilter = new filter.Filter({
                    includePattern: defaultIncludePattern,
                    excludePattern: defaultExcludePattern,
                    exclude: ['.ignore', 'scratch/conf.js']
                });

                files = files.filter($ => myFilter.isIncluded($));

                expect(files).toBeArrayOfSize(2);
                expect( files.includes('yes.js') ).toBeTrue();
                expect( files.includes('/yes.jsdoc') ).toBeTrue();
            });

            it('should be able to exclude specific subdirectories', () => {
                let files = [
                    'yes.js',
                    'topsecret/nope.js',
                    'module/yes.js',
                    'module/topsecret/nope.js'
                ];

                myFilter = new filter.Filter({
                    includePattern: defaultIncludePattern,
                    excludePattern: defaultExcludePattern,
                    exclude: ['topsecret', 'module/topsecret']
                });

                files = files.filter($ => myFilter.isIncluded($));

                expect(files).toBeArrayOfSize(2);
                expect( files.includes('yes.js') ).toBeTrue();
                expect( files.includes('module/yes.js') ).toBeTrue();
            });

            it('should be able to exclude descendants of excluded subdirectories', () => {
                let files = [
                    'yes.js',
                    'topsecret/nested/nope.js',
                    'module/yes.js',
                    'module/topsecret/nested/nope.js'
                ];

                myFilter = new filter.Filter({
                    includePattern: defaultIncludePattern,
                    excludePattern: defaultExcludePattern,
                    exclude: ['topsecret', 'module/topsecret']
                });

                files = files.filter($ => myFilter.isIncluded($));

                expect(files).toBeArrayOfSize(2);
                expect( files.includes('yes.js') ).toBeTrue();
                expect( files.includes('module/yes.js') ).toBeTrue();
                expect( files.includes('topsecret/nested/nope.js') ).toBeFalse();
                expect( files.includes('module/topsecret/nested/nope.js') ).toBeFalse();
            });
        });
    });
});
