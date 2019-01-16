describe('jsdoc/opts/args', () => {
    const args = require('jsdoc/opts/args');
    const querystring = require('querystring');

    it('should exist', () => {
        expect(args).toBeDefined();
        expect(typeof args).toBe('object');
    });

    it('should export a "parse" function', () => {
        expect(args.parse).toBeDefined();
        expect(typeof args.parse).toBe('function');
    });

    it('should export a "help" function', () => {
        expect(args.help).toBeDefined();
        expect(typeof args.help).toBe('function');
    });

    it('should export a "get" function', () => {
        expect(args.get).toBeDefined();
        expect(typeof args.get).toBe('function');
    });

    describe('parse', () => {
        it('should accept a "-t" option and return an object with a "template" property', () => {
            args.parse(['-t', 'mytemplate']);
            const r = args.get();

            expect(r.template).toBe('mytemplate');
        });

        it('should accept a "--template" option and return an object with a "template" property', () => {
            args.parse(['--template', 'mytemplate']);
            const r = args.get();

            expect(r.template).toBe('mytemplate');
        });

        it('should accept a "-c" option with a JSON file and return an object with a "configure" property', () => {
            args.parse(['-c', 'myconf.json']);
            const r = args.get();

            expect(r.configure).toBe('myconf.json');
        });

        it('should accept a "-c" option with a JS file and return an object with a "configure" property', () => {
            args.parse(['-c', 'myconf.js']);
            const r = args.get();

            expect(r.configure).toBe('myconf.js');
        });

        it('should accept a "--configure" option with a JSON file and return an object with a "configure" property', () => {
            args.parse(['--configure', 'myconf.json']);
            const r = args.get();

            expect(r.configure).toBe('myconf.json');
        });

        it('should accept a "--configure" option with a JS file and return an object with a "configure" property', () => {
            args.parse(['--configure', 'myconf.js']);
            const r = args.get();

            expect(r.configure).toBe('myconf.js');
        });

        it('should accept an "-e" option and return an object with a "encoding" property', () => {
            args.parse(['-e', 'ascii']);
            const r = args.get();

            expect(r.encoding).toBe('ascii');
        });

        it('should accept an "--encoding" option and return an object with an "encoding" property', () => {
            args.parse(['--encoding', 'ascii']);
            const r = args.get();

            expect(r.encoding).toBe('ascii');
        });

        it('should accept a "-T" option and return an object with a "test" property', () => {
            args.parse(['-T']);
            const r = args.get();

            expect(r.test).toBe(true);
        });

        it('should accept a "--test" option and return an object with a "test" property', () => {
            args.parse(['--test']);
            const r = args.get();

            expect(r.test).toBe(true);
        });

        it('should accept a "-d" option and return an object with a "destination" property', () => {
            args.parse(['-d', 'mydestination']);
            const r = args.get();

            expect(r.destination).toBe('mydestination');
        });

        it('should accept a "--destination" option and return an object with a "destination" property', () => {
            args.parse(['--destination', 'mydestination']);
            const r = args.get();

            expect(r.destination).toBe('mydestination');
        });

        it('should accept a "-p" option and return an object with a "private" property', () => {
            args.parse(['-p']);
            const r = args.get();

            expect(r.private).toBe(true);
        });

        it('should accept a "--private" option and return an object with a "private" property', () => {
            args.parse(['--private']);
            const r = args.get();

            expect(r.private).toBe(true);
        });

        it('should accept a "-a" option and return an object with an "access" property', () => {
            args.parse(['-a', 'public']);
            const r = args.get();

            expect(r.access).toBe('public');
        });

        it('should accept a "--access" option and return an object with an "access" property', () => {
            args.parse(['--access', 'public']);
            const r = args.get();

            expect(r.access).toBe('public');
        });

        it('should accept multiple "--access" options and return an object with an "access" property', () => {
            args.parse(['--access', 'public', '--access', 'protected']);
            const r = args.get();

            expect(r.access).toContain('public');
            expect(r.access).toContain('protected');
        });

        it('should accept a "-r" option and return an object with a "recurse" property', () => {
            args.parse(['-r']);
            const r = args.get();

            expect(r.recurse).toBe(true);
        });

        it('should accept a "--recurse" option and return an object with a "recurse" property', () => {
            args.parse(['--recurse']);
            const r = args.get();

            expect(r.recurse).toBe(true);
        });

        it('should accept a "-l" option and ignore it', () => {
            args.parse(['-l']);
            const r = args.get();

            expect(r.lenient).not.toBeDefined();
        });

        it('should accept a "--lenient" option and ignore it', () => {
            args.parse(['--lenient']);
            const r = args.get();

            expect(r.lenient).not.toBeDefined();
        });

        it('should accept a "-h" option and return an object with a "help" property', () => {
            args.parse(['-h']);
            const r = args.get();

            expect(r.help).toBe(true);
        });

        it('should accept a "--help" option and return an object with a "help" property', () => {
            args.parse(['--help']);
            const r = args.get();

            expect(r.help).toBe(true);
        });

        it('should accept an "-X" option and return an object with an "explain" property', () => {
            args.parse(['-X']);
            const r = args.get();

            expect(r.explain).toBe(true);
        });

        it('should accept an "--explain" option and return an object with an "explain" property', () => {
            args.parse(['--explain']);
            const r = args.get();

            expect(r.explain).toBe(true);
        });

        it('should accept a "-q" option and return an object with a "query" property', () => {
            args.parse(['-q', 'foo=bar&fab=baz']);
            const r = args.get();

            expect(r.query).toEqual({
                foo: 'bar',
                fab: 'baz'
            });
        });

        it('should accept a "--query" option and return an object with a "query" property', () => {
            args.parse(['--query', 'foo=bar&fab=baz']);
            const r = args.get();

            expect(r.query).toEqual({
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
            let r;

            args.parse(['-q', querystring.stringify(obj)]);
            r = args.get();

            expect(r.query).toEqual(obj);
        });

        it('should accept a "-u" option and return an object with a "tutorials" property', () => {
            args.parse(['-u', 'mytutorials']);
            const r = args.get();

            expect(r.tutorials).toBe('mytutorials');
        });

        it('should accept a "--tutorials" option and return an object with a "tutorials" property', () => {
            args.parse(['--tutorials', 'mytutorials']);
            const r = args.get();

            expect(r.tutorials).toBe('mytutorials');
        });

        it('should accept a "--debug" option and return an object with a "debug" property', () => {
            args.parse(['--debug']);
            const r = args.get();

            expect(r.debug).toBe(true);
        });

        it('should accept a "--verbose" option and return an object with a "verbose" property', () => {
            args.parse(['--verbose']);
            const r = args.get();

            expect(r.verbose).toBe(true);
        });

        it('should accept a "--pedantic" option and return an object with a "pedantic" property', () => {
            args.parse(['--pedantic']);
            const r = args.get();

            expect(r.pedantic).toBe(true);
        });

        it('should accept a "--match" option and return an object with a "match" property', () => {
            args.parse(['--match', '.*tag']);
            const r = args.get();

            expect(r.match).toBe('.*tag');
        });

        it('should accept multiple "--match" options and return an object with a "match" property', () => {
            args.parse(['--match', '.*tag', '--match', 'parser']);
            const r = args.get();

            expect(r.match).toEqual(['.*tag', 'parser']);
        });

        it('should accept a "--nocolor" option and return an object with a "nocolor" property', () => {
            args.parse(['--nocolor']);
            const r = args.get();

            expect(r.nocolor).toBe(true);
        });

        it('should accept a "-P" option and return an object with a "package" property', () => {
            args.parse(['-P', 'path/to/package/file.json']);
            const r = args.get();

            expect(r.package).toBe('path/to/package/file.json');
        });

        it('should accept a "--package" option and return an object with a "package" property', () => {
            args.parse(['--package', 'path/to/package/file.json']);
            const r = args.get();

            expect(r.package).toBe('path/to/package/file.json');
        });

        it('should accept a "-R" option and return an object with a "readme" property', () => {
            args.parse(['-R', 'path/to/readme/file.md']);
            const r = args.get();

            expect(r.readme).toBe('path/to/readme/file.md');
        });

        it('should accept a "--readme" option and return an object with a "readme" property', () => {
            args.parse(['--readme', 'path/to/readme/file.md']);
            const r = args.get();

            expect(r.readme).toBe('path/to/readme/file.md');
        });

        it('should accept a "-v" option and return an object with a "version" property', () => {
            args.parse(['-v']);
            const r = args.get();

            expect(r.version).toBe(true);
        });

        it('should accept a "--version" option and return an object with a "version" property', () => {
            args.parse(['--version']);
            const r = args.get();

            expect(r.version).toBe(true);
        });

        it('should accept a naked option (with no "-") and return an object with a "_" property', () => {
            args.parse(['myfile1', 'myfile2']);
            const r = args.get();

            expect(r._).toEqual(['myfile1', 'myfile2']);
        });

        // TODO: tests for args that must have values
    });
});
