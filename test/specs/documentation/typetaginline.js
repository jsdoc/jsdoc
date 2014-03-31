/*global beforeEach, describe, expect, it, jasmine */
describe('@type tag inline with function parameters', function() {
    var info;

    var docSet = jasmine.getDocSetFromFile('test/fixtures/typetaginline.js');

    function checkParams(doclet, paramInfo) {
        expect(doclet.params).toBeDefined();
        expect(doclet.params.length).toBe(paramInfo.length);

        doclet.params.forEach(function(param, i) {
            expect(param.name).toBe(paramInfo[i].name);
            expect(param.type.names[0]).toBe(paramInfo[i].typeName);
            if (paramInfo[i].description !== undefined) {
                expect(param.description).toBe(paramInfo[i].description);
            }
        });
    }

    beforeEach(function() {
        info = [];
    });

    it('When a function parameter has an inline @type tag, the parameter type is documented',
        function() {
        var dispense = docSet.getByLongname('dispense')[0];
        info[0] = { name: 'candy', typeName: 'string' };

        checkParams(dispense, info);
    });

    it('When a function parameter has a standard JSDoc comment and an inline @type tag, the docs ' +
        'reflect the standard JSDoc comment', function() {
        var Dispenser = docSet.getByLongname('Dispenser')[0];
        info[0] = { name: 'candyId', typeName: 'number', description: 'The candy\'s identifier.' };

        checkParams(Dispenser, info);
    });

    it('When a function accepts multiple parameters, and only the first parameter is documented ' +
        'with an inline @type tag, the function parameters are documented in the correct order',
        function() {
        var restock = docSet.getByLongname('restock')[0];
        info[0] = { name: 'dispenser', typeName: 'Dispenser' };
        info[1] = { name: 'item', typeName: 'string' };

        checkParams(restock, info);
    });

    it('When a function accepts multiple parameters, and only the last parameter is documented ' +
        'with an inline @type tag, the function parameters are documented in the correct order',
        function() {
        var clean = docSet.getByLongname('clean')[0];
        info[0] = { name: 'dispenser', typeName: 'Dispenser' };
        info[1] = { name: 'cleaner', typeName: 'string' };

        checkParams(clean, info);
    });

    it('When a function accepts multiple parameters, and a parameter in the middle is documented ' +
        'with an inline @type tag, the function parameters are documented in the correct order',
        function() {
        var paint = docSet.getByLongname('paint')[0];
        info[0] = { name: 'dispenser', typeName: 'Dispenser' };
        info[1] = { name: 'color', typeName: 'Color' };
        info[2] = { name: 'shade', typeName: 'number' };
        info[3] = { name: 'brand', typeName: 'string' };

        checkParams(paint, info);
    });
});
