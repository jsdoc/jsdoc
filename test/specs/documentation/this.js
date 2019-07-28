describe('this', () => {
    describe('attaching members to "this"', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this.js');
        const found1 = docSet.getByLongname('Singer#tralala');
        const found2 = docSet.getByLongname('Singer#isSinging');

        describe('in a contructor', () => {
            it('should have a longname like Constructor#member', () => {
                expect(found1).toBeArrayOfSize(1);
            });

            it('should have a correct short name', () => {
                expect(found1[0].name).toBe('tralala');
            });

            it('should have a correct memberof', () => {
                expect(found1[0].memberof).toBe('Singer');
            });

            it('should default to an "instance" scope', () => {
                expect(found1[0].scope).toBe('instance');
            });
        });

        describe('in a method of a constructor', () => {
            it('should have a longname like Constructor#member', () => {
                expect(found2).toBeArrayOfSize(1);
            });

            it('should have a correct short name', () => {
                expect(found2[0].name).toBe('isSinging');
            });

            it('should have a correct memberof', () => {
                expect(found2[0].memberof).toBe('Singer');
            });

            it('should default to an "instance" scope', () => {
                expect(found2[0].scope).toBe('instance');
            });
        });
    });

    describe('when a contructor is nested inside another constructor', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this2.js');
        const found = docSet.getByLongname('TemplateBuilder#Template#rendered');

        it('should have a longname like Constructor#Constructor#member', () => {
            expect(found).toBeArrayOfSize(1);
        });

        it('should have a correct short name', () => {
            expect(found[0].name).toBe('rendered');
        });

        it('should have a correct memberof', () => {
            expect(found[0].memberof).toBe('TemplateBuilder#Template');
        });

        it('should default to an "instance" scope', () => {
            expect(found[0].scope).toBe('instance');
        });
    });

    describe('When a this is assigned to inside a non-constructor function', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this3.js');
        const found = docSet.getByLongname('position');

        it('should have a global member name like "member"', () => {
            expect(found).toBeArrayOfSize(1);
        });

        it('should have a correct short name', () => {
            expect(found[0].name).toBe('position');
        });

        it('should have a correct memberof', () => {
            expect(found[0].memberof).toBeUndefined();
        });
    });

    describe('When "this" is assigned inside an explicit definition of the class constructor', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this4.js');
        const found = docSet.getByLongname('Template#render');

        it('should have a longname like Constructor#member', () => {
            expect(found).toBeArrayOfSize(1);
        });

        it('should have the correct name', () => {
            expect(found[0].name).toBe('render');
        });

        it('should have the correct memberof', () => {
            expect(found[0].memberof).toBe('Template');
        });
    });

    describe('When "this" is assigned in a chained declaration in a module', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this5.js');
        const found = docSet.getByLongname('module:template.Template#view');

        it('should have a longname like Constructor#member', () => {
            expect(found).toBeArrayOfSize(1);
        });

        it('should have the correct name', () => {
            expect(found[0].name).toBe('view');
        });

        it('should have the correct memberof', () => {
            expect(found[0].memberof).toBe('module:template.Template');
        });
    });

    describe('When `this` is within the constructor in a class that has an `@alias` tag within a module', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this6.js');
        const someProperty = docSet.getByLongname('module:example#_someProperty')[0];

        it('should have the correct longname, name, and scope', () => {
            expect(someProperty).toBeObject();
            expect(someProperty.name).toBe('_someProperty');
            expect(someProperty.scope).toBe('instance');
        });
    });

    describe('When a member is nested inside an objectlit "this" property inside a constructor', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/this-and-objectlit.js');
        const found = docSet.getByLongname('Page#parts.body.heading');

        it('should have a longname like Constructor#objlit.member', () => {
            expect(found).toBeArrayOfSize(1);
        });

        it('should have a correct short name', () => {
            expect(found[0].name).toBe('heading');
        });

        it('should have a correct memberof', () => {
            expect(found[0].memberof).toBe('Page#parts.body');
        });

        it('should default to a "static" scope', () => {
            expect(found[0].scope).toBe('static');
        });
    });
});
