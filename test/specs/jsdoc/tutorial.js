/*global describe: true, env: true, it: true */
describe("jsdoc/tutorial", function() {
    var tutorial = require('jsdoc/tutorial'),
        name = "tuteID",
        content = "Tutorial content blah blah blah & <",
        tute = new tutorial.Tutorial(name, content, tutorial.TYPES.NOTAVALUE),
        par = new tutorial.Tutorial('parent', "# This is the parent tutorial's <em>content & stuff</em> A_B X_Y",
                                    tutorial.TYPES.MARKDOWN),
        par2 = new tutorial.Tutorial('parent2', "<h2>This is the second parent tutorial</h2>",
                                    tutorial.TYPES.HTML);


    it("module should exist", function() {
        expect(tutorial).toBeDefined();
        expect(typeof tutorial).toEqual("object");
    });

    it("should export a Tutorial function", function() {
        expect(tutorial.Tutorial).toBeDefined();
        expect(typeof tutorial.Tutorial).toEqual("function");
    });

    it("should export a TYPES object", function() {
        expect(tutorial.TYPES).toBeDefined();
        expect(typeof tutorial.TYPES).toEqual("object");
    });

    describe("tutorial.TYPES", function() {
        it("should have a HTML property", function() {
            expect(tutorial.TYPES.HTML).toBeDefined();
        });

        it("should have a MARKDOWN property", function() {
            expect(tutorial.TYPES.MARKDOWN).toBeDefined();
        });
    });

    describe("Tutorial", function() {
        it("should have 'setParent' function", function() {
            expect(tutorial.Tutorial.prototype.setParent).toBeDefined();
            expect(typeof tutorial.Tutorial.prototype.setParent).toEqual("function");
        });

        it("should have 'removeChild' function", function() {
            expect(tutorial.Tutorial.prototype.removeChild).toBeDefined();
            expect(typeof tutorial.Tutorial.prototype.removeChild).toEqual("function");
        });

        it("should have 'addChild' function", function() {
            expect(tutorial.Tutorial.prototype.addChild).toBeDefined();
            expect(typeof tutorial.Tutorial.prototype.addChild).toEqual("function");
        });

        it("should have 'parse' function", function() {
            expect(tutorial.Tutorial.prototype.parse).toBeDefined();
            expect(typeof tutorial.Tutorial.prototype.parse).toEqual("function");
        });

        it("should have a 'name' property", function() {
            expect(tute.name).toBeDefined();
            expect(typeof tute.name).toEqual("string");
            expect(tute.name).toEqual(name);
        });

        it("should have a 'title' property, by default set to to the tute's name", function() {
            expect(tute.title).toBeDefined();
            expect(typeof tute.title).toEqual("string");
            expect(tute.title).toEqual(name);
            // Testing of overriding a tutorial's title in its JSON file is
            //  covered in tutorial/resolver.js tests.
        });

        it("should have a 'content' property set to the tutorial's content", function() {
            expect(tute.content).toBeDefined();
            expect(typeof tute.content).toEqual("string");
            expect(tute.content).toEqual(content);
        });

        it("should have a 'type' property set to the tutorial's type", function() {
            expect(par.type).toBeDefined();
            expect(typeof par.type).toEqual(typeof tutorial.TYPES.MARKDOWN);
            expect(par.type).toEqual(tutorial.TYPES.MARKDOWN);
        });

        it("should have a 'parent' property, initially null", function() {
            expect(tute.parent).toBeDefined();
            expect(tute.parent).toEqual(null);
        });

        it("should have a 'children' property, an empty array", function() {
            expect(tute.children).toBeDefined();
            expect(tute.children instanceof Array).toEqual(true);
            expect(tute.children.length).toEqual(0);
        });

        describe("setParent", function() {
            it("adding a parent sets the child's 'parent' property", function() {
                tute.setParent(par);
                expect(tute.parent).toEqual(par);
            });

            it("adding a parent adds the child to the parent's 'children' property", function() {
                expect(par.children.indexOf(tute)).not.toEqual(-1);
            });

            it("re-parenting removes the child from the previous parent", function() {
                tute.setParent(par2);

                expect(tute.parent).toEqual(par2);
                expect(par2.children.indexOf(tute)).not.toEqual(-1);
                expect(par.children.indexOf(tute)).toEqual(-1);
            });

            it("calling setParent with a null parent unsets the child's parent and removes the child from its previous parent", function() {
                expect(par2.children.indexOf(tute)).not.toEqual(-1);
                tute.setParent(null);

                expect(tute.parent).toEqual(null);
                expect(par2.children.indexOf(tute)).toEqual(-1);
            });
        });

        describe("addChild", function() {
            it("adding a child tutorial adds the child to the parent's 'children' property", function() {
                tute.setParent(null);
                var n = par.children.length;

                par.addChild(tute);

                expect(par.children.length).toEqual(n + 1);
                expect(par.children.indexOf(tute)).not.toEqual(-1);
            });

            it("adding a child tutorial sets the child's parent to to the parent tutorial", function() {
                expect(tute.parent).toEqual(par);
            });

            it("adding a child tutorial removes the child from its old parent", function() {
                // tue is currently owned by par; we reparent it to par2
                expect(tute.parent).toEqual(par);
                par2.addChild(tute);

                expect(tute.parent).toEqual(par2);
                expect(par.children.indexOf(tute)).toEqual(-1);
                expect(par2.children.indexOf(tute)).not.toEqual(-1);
            });
        });

        describe("removeChild", function() {
            function removeChild() {
                par2.removeChild(par);
            }

            it("removing a tutorial that is not a child silently passes", function() {
                var n = par2.children.length;
                expect(removeChild).not.toThrow();
                expect(par2.children.length).toEqual(n);
            });

            it("removing a child removes the child from the parent's 'children' property", function() {
                tute.setParent(par2);
                expect(par2.children.length).toEqual(1);

                par2.removeChild(tute);

                expect(par2.children.indexOf(tute)).toEqual(-1);
                expect(par2.children.length).toEqual(0);
            });

            it("removing a child unsets the child's 'parent' property", function() {
                expect(tute.parent).toEqual(null);
            });
        });

        describe("various inheritance tests with addChild, setParent and removeChild", function() {
            it("parenting and unparenting via addChild, setParent and removeChild makes sure inheritance is set accordingly", function() {
                // unparent everything.
                tute.setParent(null);
                par.setParent(null);
                par2.setParent(null);

                // let tute belong to par
                tute.setParent(par);
                expect(tute.parent).toEqual(par);
                expect(par2.children.length).toEqual(0);
                expect(par.children.length).toEqual(1);
                expect(par.children[0]).toEqual(tute);

                // addChild tute to par2. its parent should now be par2, and
                // it can't be the child of two parents
                par2.addChild(tute);
                expect(tute.parent).toEqual(par2);
                expect(par.children.length).toEqual(0); 
                expect(par2.children.length).toEqual(1);
                expect(par2.children[0]).toEqual(tute);

                // removeChild tute from par2. tute should now be unparented.
                par2.removeChild(tute);
                expect(tute.parent).toEqual(null);
                expect(par.children.length).toEqual(0);
                expect(par2.children.length).toEqual(0);
            });
        });

        describe("parse", function() {
            it("Tutorials with HTML type return content as-is", function() {
                expect(par2.parse()).toEqual("<h2>This is the second parent tutorial</h2>");
            });

            it("Tutorials with MARKDOWN type go through the markdown parser, respecting configuration options", function() {
                var old = env.conf.markdown;
                env.conf.markdown = {parser: 'evilstreak'};
                expect(par.parse()).toEqual("<h1>This is the parent tutorial&#39;s <em>content & stuff</em> A<em>B X</em>Y</h1>");

                env.conf.markdown = {parser: 'gfm'};
                expect(par.parse()).toEqual("<h1>This is the parent tutorial's <em>content & stuff</em> A_B X_Y</h1>");

                env.conf.markdown = old;
            });

            it("Tutorials with unrecognised type are returned as-is", function() {
                expect(tute.parse()).toEqual(content);
            });
        });
    });
});
