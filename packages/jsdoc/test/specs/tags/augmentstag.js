describe('@augments tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/augmentstag.js');
    const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/augmentstag2.js');
    const docSet3 = jsdoc.getDocSetFromFile('test/fixtures/augmentstag3.js');
    const docSet4 = jsdoc.getDocSetFromFile('test/fixtures/augmentstag4.js');
    const docSet5 = jsdoc.getDocSetFromFile('test/fixtures/augmentstag5.js');
    const docSet6 = jsdoc.getDocSetFromFile('test/fixtures/augmentstag6.js');

    it('When a symbol has an @augments tag, the doclet has a augments property that includes that value.', () => {
        const bar = docSet.getByLongname('Bar')[0];

        expect(bar.augments).toBeArray();
        expect(bar.augments[0]).toBe('Foo');
    });

    it('When an object is extended, the original is not modified', () => {
        const fooProp3 = docSet.getByLongname('Foo#prop3')[0];

        expect(fooProp3).toBeUndefined();
    });

    it('When an object is extended, it inherits properties set in parent constructor', () => {
        const fooProp1 = docSet.getByLongname('Foo#prop1')[0];
        const barProp1 = docSet.getByLongname('Bar#prop1')[0];

        expect(fooProp1.memberof).toBe('Foo');
        expect(barProp1.memberof).toBe('Bar');
        expect(barProp1.description).toBe(fooProp1.description);
    });

    it('When an object is extended, it inherits properties set on parent prototype', () => {
        const fooProp2 = docSet.getByLongname('Foo#prop2')[0];
        const barProp2 = docSet.getByLongname('Bar#prop2')[0];

        expect(fooProp2.memberof).toBe('Foo');
        expect(barProp2.memberof).toBe('Bar');
        expect(barProp2.description).toBe(fooProp2.description);
    });

    it('When an object is extended, it inherits methods set on parent prototype', () => {
        const fooMethod1 = docSet.getByLongname('Foo#method1')[0];
        const barMethod1 = docSet.getByLongname('Bar#method1')[0];

        expect(fooMethod1.memberof).toBe('Foo');
        expect(barMethod1.memberof).toBe('Bar');
        expect(barMethod1.description).toBe(fooMethod1.description);
    });

    it('When an object is extended, it may override methods set on parent prototype', () => {
        const fooMethod2 = docSet.getByLongname('Foo#method2')[0];
        const barMethod2 = docSet.getByLongname('Bar#method2')[0];

        expect(fooMethod2.memberof).toBe('Foo');
        expect(fooMethod2.description).toBe('Second parent method.');
        expect(barMethod2.memberof).toBe('Bar');
        expect(barMethod2.description).toBe('Second child method.');
    });

    it('When an object is extended, and it overrides an ancestor method, the child does not include docs for the ancestor method.', () => {
        const barMethod2All = docSet.getByLongname('Bar#method2');

        expect(barMethod2All).toBeArrayOfSize(1);
    });

    it('When an object is extended, and it overrides an ancestor, the child has an "overrides" property', () => {
        const barMethod2 = docSet.getByLongname('Bar#method2')[0];

        expect(barMethod2.overrides).toBe('Foo#method2');
    });

    it('When an object is extended, it inherits properties set on grandparent prototype', () => {
        const fooProp1 = docSet.getByLongname('Foo#prop1')[0];
        const barProp1 = docSet.getByLongname('Bar#prop1')[0];
        const bazProp1 = docSet.getByLongname('Baz#prop1')[0];
        const bazMethod1 = docSet.getByLongname('Baz#method1')[0];

        expect(fooProp1.memberof).toBe('Foo');
        expect(barProp1.memberof).toBe('Bar');
        expect(bazProp1.memberof).toBe('Baz');
        expect(bazProp1.description).toBe('Override prop1');
        expect(bazMethod1.memberof).toBe('Baz');
    });

    it('(Grand)children correctly identify the original source of inherited members', () => {
        const fooProp1 = docSet.getByLongname('Foo#prop1')[0];
        const barProp1 = docSet.getByLongname('Bar#prop1')[0];
        const barProp3 = docSet.getByLongname('Bar#prop3')[0];
        const bazProp2 = docSet.getByLongname('Baz#prop2')[0];
        const bazProp3 = docSet.getByLongname('Baz#prop3')[0];
        const bazMethod1 = docSet.getByLongname('Baz#method1')[0];
        const bazMethod2 = docSet.getByLongname('Baz#method2')[0];

        expect(fooProp1.inherits).toBeUndefined();
        expect(barProp3.inherits).toBeUndefined();
        expect(barProp1.inherits).toBe('Foo#prop1');
        expect(bazProp2.inherits).toBe('Foo#prop2');
        expect(bazProp3.inherits).toBe('Bar#prop3');
        expect(bazMethod1.inherits).toBe('Foo#method1');
        expect(bazMethod2.inherits).toBe('Bar#method2');
    });

    it('When the grandparent has a method, the parent overrides it, and the child inherits it, the child should not say it overrides anything', () => {
        const bazMethod2 = docSet.getByLongname('Baz#method2')[0];

        expect(bazMethod2.overrides).toBeUndefined();
    });

    it('When the grandparent has a method, the parent inherits it, and the child overrides it, the child should say it overrides the parent', () => {
        const bazMethod3 = docSet.getByLongname('Baz#method3')[0];

        expect(bazMethod3.overrides).toBe('Bar#method3');
    });

    it('When an object is extended, and it overrides an ancestor property, the child does not include docs for the ancestor property.', () => {
        const bazProp1All = docSet.getByLongname('Baz#prop1');

        expect(bazProp1All).toBeArrayOfSize(1);
    });

    it('When a symbol has an @augments tag, and the parent is not documented, the doclet still has an augments property', () => {
        const qux = docSet2.getByLongname('Qux')[0];

        expect(qux.augments).toBeArray();
        expect(qux.augments[0]).toBe('UndocumentedThing');
    });

    it('When a symbol @augments multiple parents, it inherits methods from all parents', () => {
        const fooMethod1 = docSet3.getByLongname('Foo#method1')[0];
        const barMethod2 = docSet3.getByLongname('Bar#method2')[0];
        const fooBarMethod1 = docSet3.getByLongname('FooBar#method1')[0];
        const fooBarMethod2 = docSet3.getByLongname('FooBar#method2')[0];

        expect(fooBarMethod1).toBeDefined();
        expect(fooBarMethod2).toBeDefined();
        expect(fooBarMethod1.description).toBe(fooMethod1.description);
        expect(fooBarMethod2.description).toBe(barMethod2.description);
    });

    it('When a symbol overrides an inherited method without documenting the method, it uses the parent\'s docs', () => {
        const baseMethod1 = docSet4.getByLongname('Base#test1')[0];
        const derivedMethod1All = docSet4.getByLongname('Derived#test1');
        const derivedMethod1 = derivedMethod1All[1];

        expect(derivedMethod1All).toBeArrayOfSize(2);
        expect(derivedMethod1.undocumented).toBeUndefined();
        expect(derivedMethod1.description).toBe(baseMethod1.description);
    });

    it('When a symbol inherits an explicitly named symbol, the inherited symbol is documented', () => {
        const baseMethod3 = docSet4.getByLongname('Base#test3')[0];
        const derivedMethod3 = docSet4.getByLongname('Derived#test3')[0];

        expect(derivedMethod3).toBeObject();
        expect(derivedMethod3.comment).toBe(baseMethod3.comment);
    });

    // https://github.com/jsdoc3/jsdoc/issues/911
    xit('When a symbol inherits two methods that would both have the same longname, the last one wins', () => {
        const base1CommonMethod = docSet5.getByLongname('Base1#methodOfBaseCommon')[0];
        const classCommonMethod = docSet5.getByLongname('Class#methodOfBaseCommon');

        expect(classCommonMethod).toBeArrayOfSize(1);
        expect(classCommonMethod[0].description).toBe(base1CommonMethod.description);
    });

    it('Interfaces can augment other interfaces', () => {
        const connectionOpen = docSet6.getByLongname('IConnection#open')[0];
        const closableConnectionOpen = docSet6.getByLongname('IClosableConnection#open')[0];

        expect(closableConnectionOpen).toBeObject();
        expect(closableConnectionOpen.description).toBe(connectionOpen.description);
    });
});
