describe('jsdoc/src/filter', () => {
    const env = require('jsdoc/env');
    const filter = require('jsdoc/src/filter');
    const path = require('jsdoc/path');

    it('should exist', () => {
        expect(filter).toBeDefined();
        expect(typeof filter).toBe('object');
    });

    it('should export a "Filter" class', () => {
        expect(filter.Filter).toBeDefined();
        expect(typeof filter.Filter).toBe('function');
    });

    describe('Filter', () => {
        let myFilter;

        const defaultIncludePattern = new RegExp('.+\\.js(doc)?$');
        const defaultExcludePattern = new RegExp('(^|\\/|\\\\)_');

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
            expect(myFilter.isIncluded).toBeDefined();
            expect(typeof myFilter.isIncluded).toBe('function');
        });

        describe('exclude', () => {
            it('should default to null', () => {
                expect(myFilter.exclude).toBe(null);
            });

            it('should be null if the value passed to the constructor was not an array',
                () => {
                    myFilter = new filter.Filter({
                        exclude: 'foo'
                    });

                    expect(myFilter.exclude).toBe(null);
                });

            it('should resolve paths relative to the user\'s working directory', () => {
                const filename = 'bar.js';

                myFilter = new filter.Filter({
                    exclude: [filename]
                });

                expect(myFilter.exclude).toEqual([path.resolve(env.pwd, filename)]);
            });
        });

        function testRegExpProperty(name) {
            it('should default to null', () => {
                expect(myFilter[name]).toBe(null);
            });

            it('should contain the regexp passed to the constructor', () => {
                const regExp = new RegExp('^foo$');
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

                expect(myFilter[name] instanceof RegExp).toBe(true);
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
                    path.normalize(`${env.pwd}/scratch/conf.js`)
                ];

                myFilter = new filter.Filter({
                    includePattern: defaultIncludePattern,
                    excludePattern: defaultExcludePattern,
                    exclude: ['.ignore', 'scratch/conf.js']
                });

                files = files.filter($ => myFilter.isIncluded($));

                expect(files.length).toEqual(2);
                expect( files.indexOf('yes.js') ).toBeGreaterThan(-1);
                expect( files.indexOf('/yes.jsdoc') ).toBeGreaterThan(-1);
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

                expect(files.length).toBe(2);
                expect( files.indexOf('yes.js') ).toBeGreaterThan(-1);
                expect( files.indexOf('module/yes.js') ).toBeGreaterThan(-1);
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

                expect(files.length).toBe(2);
                expect( files.indexOf('yes.js') ).toBeGreaterThan(-1);
                expect( files.indexOf('module/yes.js') ).toBeGreaterThan(-1);
                expect( files.indexOf('topsecret/nested/nope.js') ).toBe(-1);
                expect( files.indexOf('module/topsecret/nested/nope.js') ).toBe(-1);
            });
        });
    });
});
