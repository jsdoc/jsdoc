describe("common/args", function() {
    var common = {args: require('common/args')},
        argParser = new common.args.ArgParser(),
        ourOptions;
        
    function trueFalse(v) {
        var r = false;
        if (v) {
            if (v === 'true') { r = true; }
            else if (v === 'false') { r = false; }
            else { v = !!r; }
        }
        
        return r;
    }
    
    argParser.addOption('s', 'strict', true,  'Throw error on invalid input.', false, trueFalse);
    argParser.addOption('n', 'name', true,  'The name of the project.', false);
    
    ourOptions = argParser.parse(['-s', 'true', '-n', 'true']);

    it('should corece a true value if a coercer is provided', function() {
        expect(ourOptions.strict).toBeDefined();
        expect(ourOptions.strict).toEqual(true);
    });
    
    it('should corece a string value if a no coercer is provided', function() {
        expect(ourOptions.name).toBeDefined();
        expect(ourOptions.name).toEqual('true');
    });
});