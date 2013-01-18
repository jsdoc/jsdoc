/*global describe: true, expect: true, it: true */
describe("jsdoc/opts/args", function() {
    var args = require('jsdoc/opts/args');
    var querystring = require('querystring');

    it("should exist", function() {
        expect(args).toBeDefined();
        expect(typeof args).toEqual("object");
    });

    it("should export a 'parse' function", function() {
        expect(args.parse).toBeDefined();
        expect(typeof args.parse).toEqual("function");
    });

    it("should export a 'help' function", function() {
        expect(args.help).toBeDefined();
        expect(typeof args.help).toEqual("function");
    });

    it("should export a 'get' function", function() {
        expect(args.get).toBeDefined();
        expect(typeof args.get).toEqual("function");
    });

    describe("parse", function() {
        it("should accept a '-t' option and return an object with a 'template' property", function() {
            args.parse(['-t', 'mytemplate']);
            var r = args.get();

            expect(r.template).toEqual('mytemplate');
        });

        it("should accept a '--template' option and return an object with a 'template' property", function() {
            args.parse(['--template', 'mytemplate']);
            var r = args.get();

            expect(r.template).toEqual('mytemplate');
        });

        it("should accept a '-c' option and return an object with a 'configure' property", function() {
            args.parse(['-c', 'myconf.json']);
            var r = args.get();

            expect(r.configure).toEqual('myconf.json');
        });

        it("should accept a '--configure' option and return an object with a 'configure' property", function() {
            args.parse(['--configure', 'myconf.json']);
            var r = args.get();

            expect(r.configure).toEqual('myconf.json');
        });

        it("should accept a '-e' option and return an object with a 'encoding' property", function() {
            args.parse(['-e', 'ascii']);
            var r = args.get();

            expect(r.encoding).toEqual('ascii');
        });

        it("should accept a '--encoding' option and return an object with a 'encoding' property", function() {
            args.parse(['--encoding', 'ascii']);
            var r = args.get();

            expect(r.encoding).toEqual('ascii');
        });

        it("should accept a '-T' option and return an object with a 'test' property", function() {
            args.parse(['-T']);
            var r = args.get();

            expect(r.test).toEqual(true);
        });

        it("should accept a '--test' option and return an object with a 'test' property", function() {
            args.parse(['--test']);
            var r = args.get();

            expect(r.test).toEqual(true);
        });

        it("should accept a '-d' option and return an object with a 'destination' property", function() {
            args.parse(['-d', 'mydestination']);
            var r = args.get();

            expect(r.destination).toEqual('mydestination');
        });

        it("should accept a '--destination' option and return an object with a 'destination' property", function() {
            args.parse(['--destination', 'mydestination']);
            var r = args.get();

            expect(r.destination).toEqual('mydestination');
        });

        it("should accept a '-p' option and return an object with a 'private' property", function() {
            args.parse(['-p']);
            var r = args.get();

            expect(r['private']).toEqual(true);
        });

        it("should accept a '--private' option and return an object with a 'private' property", function() {
            args.parse(['--private']);
            var r = args.get();

            expect(r['private']).toEqual(true);
        });

        it("should accept a '-r' option and return an object with a 'recurse' property", function() {
            args.parse(['-r']);
            var r = args.get();

            expect(r.recurse).toEqual(true);
        });

        it("should accept a '--recurse' option and return an object with a 'recurse' property", function() {
            args.parse(['--recurse']);
            var r = args.get();

            expect(r.recurse).toEqual(true);
        });

        it("should accept a '-l' option and return an object with a 'lenient' property", function() {
            args.parse(['-l']);
            var r = args.get();

            expect(r.lenient).toEqual(true);
        });

        it("should accept a '--lenient' option and return an object with a 'lenient' property", function() {
            args.parse(['--lenient']);
            var r = args.get();

            expect(r.lenient).toEqual(true);
        });

        it("should accept a '-h' option and return an object with a 'help' property", function() {
            args.parse(['-h']);
            var r = args.get();

            expect(r.help).toEqual(true);
        });

        it("should accept a '--help' option and return an object with a 'help' property", function() {
            args.parse(['--help']);
            var r = args.get();

            expect(r.help).toEqual(true);
        });

        it("should accept a '-X' option and return an object with a 'explain' property", function() {
            args.parse(['-X']);
            var r = args.get();

            expect(r.explain).toEqual(true);
        });

        it("should accept a '--explain' option and return an object with a 'explain' property", function() {
            args.parse(['--explain']);
            var r = args.get();

            expect(r.explain).toEqual(true);
        });

        it("should accept a '-q' option and return an object with a 'query' property", function() {
            args.parse(['-q', 'foo=bar&fab=baz']);
            var r = args.get();

            expect(r.query).toEqual({ foo: 'bar', fab: 'baz' });
        });

        it("should accept a '--query' option and return an object with a 'query' property", function() {
            args.parse(['--query', 'foo=bar&fab=baz']);
            var r = args.get();

            expect(r.query).toEqual({ foo: 'bar', fab: 'baz' });
        });

        it("should use type coercion on the 'query' property so it has real booleans and numbers", function() {
            var obj = {
                foo: 'fab',
                bar: true,
                baz: false,
                qux: [1, -97]
            };
            args.parse(['-q', querystring.stringify(obj)]);
            var r = args.get();

            expect(r.query).toEqual(obj);
        });

        it("should accept a '-t' option and return an object with a 'tutorials' property", function() {
            args.parse(['-d', 'mytutorials']);
            var r = args.get();

            expect(r.destination).toEqual('mytutorials');
        });

        it("should accept a '--tutorials' option and return an object with a 'tutorials' property", function() {
            args.parse(['--tutorials', 'mytutorials']);
            var r = args.get();

            expect(r.tutorials).toEqual('mytutorials');
        });

        it("should accept a '--verbose' option and return an object with a 'verbose' property", function() {
            args.parse(['--verbose']);
            var r = args.get();

            expect(r.verbose).toEqual(true);
        });

        it("should accept a '--match' option and return an object with a 'match' property", function() {
            args.parse(['--match', '.*tag']);
            var r = args.get();

            expect(r.match).toEqual('.*tag');
        });

        it("should accept multiple '--match' options and return an object with a 'match' property", function() {
            args.parse(['--match', '.*tag', '--match', 'parser']);
            var r = args.get();

            expect(r.match).toEqual(['.*tag', 'parser']);
        });

        it("should accept a '--nocolor' option and return an object with a 'nocolor' property", function() {
            args.parse(['--nocolor']);
            var r = args.get();

            expect(r.nocolor).toEqual(true);
        });

        it("should accept a '-v' option and return an object with a 'version' property", function() {
            args.parse(['-v']);
            var r = args.get();

            expect(r.version).toEqual(true);
        });

        it("should accept a '--version' option and return an object with a 'version' property", function() {
            args.parse(['--version']);
            var r = args.get();

            expect(r.version).toEqual(true);
        });

        it("should accept a naked option (i.e. no '-') and return an object with a '_' property", function() {
            args.parse(['myfile1', 'myfile2']);
            var r = args.get();

            expect(r._).toEqual(['myfile1', 'myfile2']);
        });

        //TODO: tests for args that must have values
    });
});
