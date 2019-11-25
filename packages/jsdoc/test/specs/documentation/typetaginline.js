describe('@type tag inline with function parameters', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/typetaginline.js');
    let info;

    function checkParams({params}, paramInfo) {
        expect(params).toBeDefined();
        expect(params.length).toBe(paramInfo.length);

        params.forEach(({name, type, description}, i) => {
            expect(name).toBe(paramInfo[i].name);
            expect(type.names[0]).toBe(paramInfo[i].typeName);
            if (paramInfo[i].description !== undefined) {
                expect(description).toBe(paramInfo[i].description);
            }
        });
    }

    beforeEach(() => {
        info = [];
    });

    it('When a function parameter has an inline @type tag, the parameter type is documented',
        () => {
            const dispense = docSet.getByLongname('dispense')[0];

            info[0] = {
                name: 'candy',
                typeName: 'string'
            };

            checkParams(dispense, info);
        });

    it('When a function parameter has a standard JSDoc comment and an inline @type tag, the docs ' +
        'reflect the standard JSDoc comment', () => {
        const Dispenser = docSet.getByLongname('Dispenser')[0];

        info[0] = {
            name: 'candyId',
            typeName: 'number',
            description: 'The candy\'s identifier.'
        };

        checkParams(Dispenser, info);
    });

    it('When a function accepts multiple parameters, and only the first parameter is documented ' +
        'with an inline @type tag, the function parameters are documented in the correct order',
    () => {
        const restock = docSet.getByLongname('restock')[0];

        info[0] = {
            name: 'dispenser',
            typeName: 'Dispenser'
        };
        info[1] = {
            name: 'item',
            typeName: 'string'
        };

        checkParams(restock, info);
    });

    it('When a function accepts multiple parameters, and only the last parameter is documented ' +
        'with an inline @type tag, the function parameters are documented in the correct order',
    () => {
        const clean = docSet.getByLongname('clean')[0];

        info[0] = {
            name: 'dispenser',
            typeName: 'Dispenser'
        };
        info[1] = {
            name: 'cleaner',
            typeName: 'string'
        };

        checkParams(clean, info);
    });

    it('When a function accepts multiple parameters, and a parameter in the middle is documented ' +
        'with an inline @type tag, the function parameters are documented in the correct order',
    () => {
        const paint = docSet.getByLongname('paint')[0];

        info[0] = {
            name: 'dispenser',
            typeName: 'Dispenser'
        };
        info[1] = {
            name: 'color',
            typeName: 'Color'
        };
        info[2] = {
            name: 'shade',
            typeName: 'number'
        };
        info[3] = {
            name: 'brand',
            typeName: 'string'
        };

        checkParams(paint, info);
    });
});
