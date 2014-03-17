/*global describe, expect, it, jasmine */
describe("lends", function() {
    describe("when a documented member is inside an object literal associated with a @lends tag", function() {
        function removeUndocumented($) {
            return !$.undocumented;
        }

        describe("standard case", function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/lends.js'),
                init = docSet.getByLongname('Person#initialize'),
                name = docSet.getByLongname('Person#name');

            it("The member should be documented as a member of the lendee", function() {
                expect(init.length, 1);
            });

            it("The this member should be documented as a member of the lendee", function() {
                expect(name.length, 1);
            });
        });

        describe("case containing constructor", function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/lends2.js'),
                person = docSet.getByLongname('Person').filter(function($) {
                    return ! $.undocumented;
                })[0],
                name = docSet.getByLongname('Person#name');

            it("A tag with a @constructs tag is documented as a constructor.", function() {
                expect(person.description).toEqual('Construct a Person.');
            });

            it("The member should be documented as a member of the lendee", function() {
                expect(person.length, 1);
            });

            it("The this member should be documented as a member of the lendee", function() {
                expect(name.length, 1);
            });
        });

        describe("case that uses @lends in a multiline doclet", function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/lends3.js'),
                init = docSet.getByLongname('Person#initialize'),
                name = docSet.getByLongname('Person#name');

            it("The member should be documented as a member of the lendee", function() {
                expect(init.length, 1);
            });

            it("The this member should be documented as a member of the lendee", function() {
                expect(name.length, 1);
            });
        });

        describe("case that uses @lends within a closure", function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/lends4.js');
            var person = docSet.getByLongname('Person');
            var say = docSet.getByLongname('Person#say');

            it("The class constructor should be documented with the name of the lendee", function() {
                expect(person.length).toBe(1);
                expect(person[0].name).toBe('Person');
                expect(person[0].kind).toBe('class');
            });

            it("A class' instance method should be documented as a member of the lendee", function() {
                expect(say.length).toBe(1);
            });
        });

        describe("case that uses @lends within nested function calls", function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/lends5.js');
            var person = docSet.getByLongname('Person').filter(removeUndocumented)[0];
            var say = docSet.getByLongname('Person#say').filter(removeUndocumented)[0];

            it("The class constructor should be documented with the name of the lendee", function() {
                expect(person).toBeDefined();
                expect(person.name).toBe('Person');
                expect(person.kind).toBe('class');
            });

            it("A class' instance method should be documented as a member of the lendee", function() {
                expect(say).toBeDefined();
            });
        });

        describe('case that uses @lends twice within a closure', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/lends6.js');

            it('The first class with a @lends tag should appear in the parse results', function() {
                var person = docSet.getByLongname('Person').filter(removeUndocumented)[0];
                var say = docSet.getByLongname('Person#say').filter(removeUndocumented)[0];

                expect(person).toBeDefined();
                expect(person.name).toBe('Person');
                expect(person.kind).toBe('class');

                expect(say).toBeDefined();
                expect(say.name).toBe('say');
                expect(say.kind).toBe('function');
            });

            it('The second class with a @lends tag should appear in the parse results', function() {
                var robot = docSet.getByLongname('Robot').filter(removeUndocumented)[0];
                var emote = docSet.getByLongname('Robot#emote').filter(removeUndocumented)[0];

                expect(robot).toBeDefined();
                expect(robot.name).toBe('Robot');
                expect(robot.kind).toBe('class');

                expect(emote).toBeDefined();
                expect(emote.name).toBe('emote');
                expect(emote.kind).toBe('function');
            });
        });
    });

    describe("when a documented member is inside an objlit associated with a @lends tag that has no value.", function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/lendsglobal.js'),
            testf = docSet.getByLongname('test')[0],
            test1 = docSet.getByLongname('test1')[0],
            test12 = docSet.getByLongname('test1.test2')[0];

        it("The members of the objlit are not members of any symbol", function() {
            expect(typeof testf.memberof).toEqual('undefined');
        });

        it("The members of the objlit are documented as global.", function() {
            expect(testf.longname).toEqual('test');
        });

        it("The nested members of the objlit are members of a global symbol", function() {
            expect(test12.memberof).toEqual('test1');
        });
    });
});