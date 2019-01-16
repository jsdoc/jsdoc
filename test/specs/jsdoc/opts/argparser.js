describe('jsdoc/opts/argparser', () => {
    const ArgParser = require('jsdoc/opts/argparser');
    let argParser;
    let ourOptions;

    function trueFalse(v) {
        let r = false;

        if (v) {
            if (v === 'true') { r = true; }
            else if (v === 'false') { r = false; }
            else { v = Boolean(r); }
        }

        return r;
    }

    beforeEach(() => {
        argParser = new ArgParser()
            .addOption('s', 'strict', true, 'Throw error on invalid input.', false, trueFalse)
            .addOption('n', 'name', true, 'The name of the project.', false);

        ourOptions = argParser.parse(['-s', 'true', '-n', 'true']);
    });

    it('should exist', () => {
        expect(ArgParser).toBeDefined();
    });

    it('should be a constructor', () => {
        expect(typeof ArgParser).toBe('function');
        expect(new ArgParser() instanceof ArgParser).toBe(true);
    });

    describe('ArgParser', () => {
        it('should provide an "addIgnoredOption" method', () => {
            expect(argParser.addIgnoredOption).toBeDefined();
            expect(typeof argParser.addIgnoredOption).toBe('function');
        });

        it('should provide an "addOption" method', () => {
            expect(argParser.addOption).toBeDefined();
            expect(typeof argParser.addOption).toBe('function');
        });

        it('should provide a "help" method', () => {
            expect(argParser.help).toBeDefined();
            expect(typeof argParser.help).toBe('function');
        });

        it('should provide a "parse" method', () => {
            expect(argParser.parse).toBeDefined();
            expect(typeof argParser.parse).toBe('function');
        });

        describe('addIgnoredOption', () => {
            it('should be chainable', () => {
                expect(argParser.addIgnoredOption({})).toBe(argParser);
            });
        });

        describe('addOption', () => {
            it('should be chainable', () => {
                expect(argParser.addOption('a', null, false, 'Option')).toBe(argParser);
            });
        });

        describe('help', () => {
            const columns = process.stdout.columns;

            beforeEach(() => {
                process.stdout.columns = 80;
            });

            afterEach(() => {
                process.stdout.columns = columns;
            });

            it('should format the help text correctly', () => {
                const helpText = [
                    'Options:',
                    '    --noshortname                               Just a long name.',
                    '    -o <value>                                  Only a short name.',
                    '    -s, --supercalifragilisticexpialidocious    If you say it loud enough,',
                    "                                                you'll always sound",
                    '                                                precocious.'
                ].join('\n');

                argParser = new ArgParser()
                    .addIgnoredOption('m', 'meh', false, 'Ignore me.')
                    .addOption(null, 'noshortname', false, 'Just a long name.')
                    .addOption('o', null, true, 'Only a short name.')
                    .addOption('s', 'supercalifragilisticexpialidocious', false,
                        "If you say it loud enough, you'll always sound precocious.");

                expect(argParser.help()).toBe(helpText);
            });
        });

        describe('parse', () => {
            it('should return an object with information about the options', () => {
                expect(typeof ourOptions).toBe('object');
                expect(ourOptions.strict).toBe(true);
                expect(ourOptions.name).toBe('true');
            });

            it('should merge the defaults into the command-line options', () => {
                const defaults = {
                    strict: false,
                    name: 'Hello world!'
                };

                ourOptions = argParser.parse(['-s', true], defaults);

                expect(ourOptions.strict).toBe(true);
                expect(ourOptions.name).toBe(defaults.name);
            });

            it('should recognize options that can be used more than once', () => {
                argParser.addOption(null, 'multi', true, '', true);

                ourOptions = argParser.parse(['--multi', 'value1', '--multi', 'value2',
                    '--multi', 'value3']);
                expect(Array.isArray(ourOptions.multi)).toBe(true);
                expect(ourOptions.multi.length).toBe(3);
                expect(ourOptions.multi[0]).toBe('value1');
                expect(ourOptions.multi[1]).toBe('value2');
                expect(ourOptions.multi[2]).toBe('value3');
            });

            it('should throw an error if an unrecognized short option is used', () => {
                function badShortOption() {
                    argParser.parse(['-w']);
                }

                expect(badShortOption).toThrow();
            });

            it('should throw an error if an unrecognized long option is used', () => {
                function badLongOption() {
                    argParser.parse(['--whatever']);
                }

                expect(badLongOption).toThrow();
            });

            it('should throw an error if a required value is missing', () => {
                function missingValue() {
                    argParser.parse(['--requires-value']);
                }

                argParser.addOption(null, 'requires-value', true, '');

                expect(missingValue).toThrow();
            });

            it('should coerce a true value if a coercer is provided', () => {
                expect(ourOptions.strict).toBeDefined();
                expect(ourOptions.strict).toBe(true);
            });

            it('should coerce a string value if no coercer is provided', () => {
                expect(ourOptions.name).toBeDefined();
                expect(ourOptions.name).toBe('true');
            });
        });
    });
});
