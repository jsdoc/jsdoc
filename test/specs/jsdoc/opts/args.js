describe('jsdoc/opts/args', () => {
    const args = require('jsdoc/opts/args');
    const querystring = require('querystring');

    it('should exist', () => {
        expect(args).toBeObject();
    });

    it('should export a "parse" function', () => {
        expect(args.parse).toBeFunction();
    });

    it('should export a "help" function', () => {
        expect(args.help).toBeFunction();
    });

    it('should export a "get" function', () => {
        expect(args.get).toBeFunction();
    });

    describe('parse', () => {
        it('should accept a "-t" option and return an object with a "template" property', () => {
            args.parse(['-t', 'mytemplate']);

            expect(args.get().template).toBe('mytemplate');
        });

        it('should accept a "--template" option and return an object with a "template" property', () => {
            args.parse(['--template', 'mytemplate']);

            expect(args.get().template).toBe('mytemplate');
        });

        it('should accept a "-c" option with a JSON file and return an object with a "configure" property', () => {
            args.parse(['-c', 'myconf.json']);

            expect(args.get().configure).toBe('myconf.json');
        });

        it('should accept a "-c" option with a JS file and return an object with a "configure" property', () => {
            args.parse(['-c', 'myconf.js']);

            expect(args.get().configure).toBe('myconf.js');
        });

        it('should accept a "--configure" option with a JSON file and return an object with a "configure" property', () => {
            args.parse(['--configure', 'myconf.json']);

            expect(args.get().configure).toBe('myconf.json');
        });

        it('should accept a "--configure" option with a JS file and return an object with a "configure" property', () => {
            args.parse(['--configure', 'myconf.js']);

            expect(args.get().configure).toBe('myconf.js');
        });

        it('should accept an "-e" option and return an object with a "encoding" property', () => {
            args.parse(['-e', 'ascii']);

            expect(args.get().encoding).toBe('ascii');
        });

        it('should accept an "--encoding" option and return an object with an "encoding" property', () => {
            args.parse(['--encoding', 'ascii']);

            expect(args.get().encoding).toBe('ascii');
        });

        it('should accept a "-T" option and return an object with a "test" property', () => {
            args.parse(['-T']);

            expect(args.get().test).toBe(true);
        });

        it('should accept a "--test" option and return an object with a "test" property', () => {
            args.parse(['--test']);

            expect(args.get().test).toBe(true);
        });

        it('should accept a "-d" option and return an object with a "destination" property', () => {
            args.parse(['-d', 'mydestination']);

            expect(args.get().destination).toBe('mydestination');
        });

        it('should accept a "--destination" option and return an object with a "destination" property', () => {
            args.parse(['--destination', 'mydestination']);

            expect(args.get().destination).toBe('mydestination');
        });

        it('should accept a "-p" option and return an object with a "private" property', () => {
            args.parse(['-p']);

            expect(args.get().private).toBe(true);
        });

        it('should accept a "--private" option and return an object with a "private" property', () => {
            args.parse(['--private']);

            expect(args.get().private).toBe(true);
        });

        it('should accept a "-a" option and return an object with an "access" property', () => {
            args.parse(['-a', 'public']);

            expect(args.get().access).toBe('public');
        });

        it('should accept a "--access" option and return an object with an "access" property', () => {
            args.parse(['--access', 'public']);

            expect(args.get().access).toBe('public');
        });

        it('should accept multiple "--access" options and return an object with an "access" property', () => {
            let r;

            args.parse(['--access', 'public', '--access', 'protected']);
            r = args.get();

            expect(r.access).toContain('public');
            expect(r.access).toContain('protected');
        });

        it('should accept a "-r" option and return an object with a "recurse" property', () => {
            args.parse(['-r']);

            expect(args.get().recurse).toBeTrue();
        });

        it('should accept a "--recurse" option and return an object with a "recurse" property', () => {
            args.parse(['--recurse']);

            expect(args.get().recurse).toBeTrue();
        });

        it('should accept a "-l" option and ignore it', () => {
            args.parse(['-l']);

            expect(args.get().lenient).toBeUndefined();
        });

        it('should accept a "--lenient" option and ignore it', () => {
            args.parse(['--lenient']);

            expect(args.get().lenient).toBeUndefined();
        });

        it('should accept a "-h" option and return an object with a "help" property', () => {
            args.parse(['-h']);

            expect(args.get().help).toBeTrue();
        });

        it('should accept a "--help" option and return an object with a "help" property', () => {
            args.parse(['--help']);

            expect(args.get().help).toBeTrue();
        });

        it('should accept an "-X" option and return an object with an "explain" property', () => {
            args.parse(['-X']);

            expect(args.get().explain).toBeTrue();
        });

        it('should accept an "--explain" option and return an object with an "explain" property', () => {
            args.parse(['--explain']);

            expect(args.get().explain).toBeTrue();
        });

        it('should accept a "-q" option and return an object with a "query" property', () => {
            args.parse(['-q', 'foo=bar&fab=baz']);

            expect(args.get().query).toEqual({
                foo: 'bar',
                fab: 'baz'
            });
        });

        it('should accept a "--query" option and return an object with a "query" property', () => {
            args.parse(['--query', 'foo=bar&fab=baz']);

            expect(args.get().query).toEqual({
                foo: 'bar',
                fab: 'baz'
            });
        });

        it('should use type coercion on the "query" property so it has real booleans and numbers', () => {
            const obj = {
                foo: 'fab',
                bar: true,
                baz: false,
                qux: [1, -97]
            };

            args.parse(['-q', querystring.stringify(obj)]);

            expect(args.get().query).toEqual(obj);
        });

        it('should accept a "-u" option and return an object with a "tutorials" property', () => {
            args.parse(['-u', 'mytutorials']);

            expect(args.get().tutorials).toBe('mytutorials');
        });

        it('should accept a "--tutorials" option and return an object with a "tutorials" property', () => {
            args.parse(['--tutorials', 'mytutorials']);

            expect(args.get().tutorials).toBe('mytutorials');
        });

        it('should accept a "--debug" option and return an object with a "debug" property', () => {
            args.parse(['--debug']);

            expect(args.get().debug).toBeTrue();
        });

        it('should accept a "--verbose" option and return an object with a "verbose" property', () => {
            args.parse(['--verbose']);
            const r = args.get();

            expect(r.verbose).toBe(true);
        });

        it('should accept a "--pedantic" option and return an object with a "pedantic" property', () => {
            args.parse(['--pedantic']);

            expect(args.get().pedantic).toBeTrue();
        });

        it('should accept a "--match" option and return an object with a "match" property', () => {
            args.parse(['--match', '.*tag']);

            expect(args.get().match).toBe('.*tag');
        });

        it('should accept multiple "--match" options and return an object with a "match" property', () => {
            args.parse(['--match', '.*tag', '--match', 'parser']);

            expect(args.get().match).toEqual(['.*tag', 'parser']);
        });

        it('should accept a "--nocolor" option and return an object with a "nocolor" property', () => {
            args.parse(['--nocolor']);

            expect(args.get().nocolor).toBeTrue();
        });

        it('should accept a "-P" option and return an object with a "package" property', () => {
            args.parse(['-P', 'path/to/package/file.json']);

            expect(args.get().package).toBe('path/to/package/file.json');
        });

        it('should accept a "--package" option and return an object with a "package" property', () => {
            args.parse(['--package', 'path/to/package/file.json']);

            expect(args.get().package).toBe('path/to/package/file.json');
        });

        it('should accept a "-R" option and return an object with a "readme" property', () => {
            args.parse(['-R', 'path/to/readme/file.md']);

            expect(args.get().readme).toBe('path/to/readme/file.md');
        });

        it('should accept a "--readme" option and return an object with a "readme" property', () => {
            args.parse(['--readme', 'path/to/readme/file.md']);

            expect(args.get().readme).toBe('path/to/readme/file.md');
        });

        it('should accept a "-v" option and return an object with a "version" property', () => {
            args.parse(['-v']);

            expect(args.get().version).toBeTrue();
        });

        it('should accept a "--version" option and return an object with a "version" property', () => {
            args.parse(['--version']);

            expect(args.get().version).toBeTrue();
        });

        it('should accept a naked option (with no "-") and return an object with a "_" property', () => {
            args.parse(['myfile1', 'myfile2']);

            expect(args.get()._).toEqual(['myfile1', 'myfile2']);
        });

        // TODO: tests for args that must have values
    });
});
