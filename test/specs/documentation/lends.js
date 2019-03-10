describe('lends', () => {
    describe('when a documented member is inside an object literal associated with a @lends tag', () => {
        function removeUndocumented({undocumented}) {
            return !(undocumented);
        }

        describe('standard case', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/lends.js');
            const init = docSet.getByLongname('Person#initialize');
            const name = docSet.getByLongname('Person#name');

            it('The member should be documented as a member of the lendee', () => {
                expect(init.length, 1);
            });

            it('The this member should be documented as a member of the lendee', () => {
                expect(name.length, 1);
            });
        });

        describe('case containing constructor', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/lends2.js');
            const person = docSet.getByLongname('Person').filter(removeUndocumented)[0];
            const name = docSet.getByLongname('Person#name');

            it('A tag with a @constructs tag is documented as a constructor.', () => {
                expect(person.description).toBe('Construct a Person.');
            });

            it('The member should be documented as a member of the lendee', () => {
                expect(person.length, 1);
            });

            it('The this member should be documented as a member of the lendee', () => {
                expect(name.length, 1);
            });
        });

        describe('case that uses @lends in a multiline doclet', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/lends3.js');
            const init = docSet.getByLongname('Person#initialize');
            const name = docSet.getByLongname('Person#name');

            it('The member should be documented as a member of the lendee', () => {
                expect(init.length, 1);
            });

            it('The this member should be documented as a member of the lendee', () => {
                expect(name.length, 1);
            });
        });

        describe('case that uses @lends within a closure', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/lends4.js');
            const person = docSet.getByLongname('Person');
            const say = docSet.getByLongname('Person#say');

            it('The class constructor should be documented with the name of the lendee', () => {
                expect(person.length).toBe(1);
                expect(person[0].name).toBe('Person');
                expect(person[0].kind).toBe('class');
            });

            it('A class\' instance method should be documented as a member of the lendee', () => {
                expect(say.length).toBe(1);
            });
        });

        describe('case that uses @lends within nested function calls', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/lends5.js');
            const person = docSet.getByLongname('Person').filter(removeUndocumented)[0];
            const say = docSet.getByLongname('Person#say').filter(removeUndocumented)[0];

            it('The class constructor should be documented with the name of the lendee', () => {
                expect(person).toBeDefined();
                expect(person.name).toBe('Person');
                expect(person.kind).toBe('class');
            });

            it('A class\' instance method should be documented as a member of the lendee', () => {
                expect(say).toBeDefined();
            });
        });

        describe('case that uses @lends twice within a closure', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/lends6.js');

            it('The first class with a @lends tag should appear in the parse results', () => {
                const person = docSet.getByLongname('Person').filter(removeUndocumented)[0];
                const say = docSet.getByLongname('Person#say').filter(removeUndocumented)[0];

                expect(person).toBeDefined();
                expect(person.name).toBe('Person');
                expect(person.kind).toBe('class');

                expect(say).toBeDefined();
                expect(say.name).toBe('say');
                expect(say.kind).toBe('function');
            });

            it('The second class with a @lends tag should appear in the parse results', () => {
                const robot = docSet.getByLongname('Robot').filter(removeUndocumented)[0];
                const emote = docSet.getByLongname('Robot#emote').filter(removeUndocumented)[0];

                expect(robot).toBeDefined();
                expect(robot.name).toBe('Robot');
                expect(robot.kind).toBe('class');

                expect(emote).toBeDefined();
                expect(emote.name).toBe('emote');
                expect(emote.kind).toBe('function');
            });
        });
    });

    describe('when a documented member is inside an objlit associated with a @lends tag that has no value.', () => {
        const docSet = jasmine.getDocSetFromFile('test/fixtures/lendsglobal.js');
        const testf = docSet.getByLongname('test')[0];
        const test12 = docSet.getByLongname('test1.test2')[0];

        it('The members of the objlit are not members of any symbol', () => {
            expect(typeof testf.memberof).toBe('undefined');
        });

        it('The members of the objlit are documented as global.', () => {
            expect(testf.longname).toBe('test');
        });

        it('The nested members of the objlit are members of a global symbol', () => {
            expect(test12.memberof).toBe('test1');
        });
    });
});
