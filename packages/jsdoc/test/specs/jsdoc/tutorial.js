describe('jsdoc/tutorial', () => {
    const env = require('jsdoc/env');
    const tutorial = require('jsdoc/tutorial');

    const name = 'tuteID';
    const content = 'Tutorial content blah blah blah & <';
    const tute = new tutorial.Tutorial(name, content, tutorial.TYPES.NOTAVALUE);
    const par = new tutorial.Tutorial('parent',
        "# This is the parent tutorial's <em>content & stuff</em> A_B X_Y",
        tutorial.TYPES.MARKDOWN);
    const par2 = new tutorial.Tutorial('parent2', '<h2>This is the second parent tutorial</h2>',
        tutorial.TYPES.HTML);
    const markdownEntities = new tutorial.Tutorial('markdown-entities',
        '<pre>This Markdown tutorial contains HTML entities: &amp; &lt; &gt;</pre>',
        tutorial.TYPES.MARKDOWN);

    it('module should exist', () => {
        expect(tutorial).toBeObject();
    });

    it('should export a Tutorial function', () => {
        expect(tutorial.Tutorial).toBeFunction();
    });

    it('should export a RootTutorial function', () => {
        expect(tutorial.RootTutorial).toBeFunction();
    });

    it('should export a TYPES object', () => {
        expect(tutorial.TYPES).toBeObject();
    });

    describe('tutorial.TYPES', () => {
        it('should have a HTML property', () => {
            expect(tutorial.TYPES.HTML).toBeNumber();
        });

        it('should have a MARKDOWN property', () => {
            expect(tutorial.TYPES.MARKDOWN).toBeNumber();
        });
    });

    describe('Tutorial', () => {
        it('should have a "setParent" method', () => {
            expect(tutorial.Tutorial.prototype.setParent).toBeFunction();
        });

        it('should have a "removeChild" method', () => {
            expect(tutorial.Tutorial.prototype.removeChild).toBeFunction();
        });

        it('should have an "addChild" method', () => {
            expect(tutorial.Tutorial.prototype.addChild).toBeFunction();
        });

        it('should have a "parse" method', () => {
            expect(tutorial.Tutorial.prototype.parse).toBeFunction();
        });

        it('should have a "name" property', () => {
            expect(tute.name).toBe(name);
        });

        it('should have a "longname" property', () => {
            expect(tute.longname).toBe(name);
        });

        it("should have a 'title' property, by default set to to the tutorial's name", () => {
            expect(tute.title).toBe(name);
            // Testing of overriding a tutorial's title in its JSON file is
            //  covered in tutorial/resolver.js tests.
        });

        it("should have a 'content' property set to the tutorial's content", () => {
            expect(tute.content).toBe(content);
        });

        it("should have a 'type' property set to the tutorial's type", () => {
            expect(par.type).toBe(tutorial.TYPES.MARKDOWN);
        });

        it("should have a 'parent' property, initially null", () => {
            expect(tute.parent).toBeNull();
        });

        it("should have a 'children' property, an empty array", () => {
            expect(tute.children).toBeEmptyArray();
        });

        describe('setParent', () => {
            it("adding a parent sets the child's 'parent' property", () => {
                tute.setParent(par);

                expect(tute.parent).toBe(par);
            });

            it("adding a parent adds the child to the parent's 'children' property", () => {
                expect(par.children).toContain(tute);
            });

            it('re-parenting removes the child from the previous parent', () => {
                tute.setParent(par2);

                expect(tute.parent).toBe(par2);
                expect(par2.children).toContain(tute);
                expect(par.children).not.toContain(tute);
            });

            it("calling setParent with a null parent unsets the child's parent and removes the child from its previous parent", () => {
                expect(par2.children).toContain(tute);

                tute.setParent(null);

                expect(tute.parent).toBeNull();
                expect(par2.children).not.toContain(tute);
            });
        });

        describe('addChild', () => {
            it("adding a child tutorial adds the child to the parent's 'children' property", () => {
                tute.setParent(null);

                const n = par.children.length;

                par.addChild(tute);

                expect(par.children).toBeArrayOfSize(n + 1);
                expect(par.children).toContain(tute);
            });

            it("adding a child tutorial sets the child's parent to to the parent tutorial", () => {
                expect(tute.parent).toBe(par);
            });

            it('adding a child tutorial removes the child from its old parent', () => {
                // tue is currently owned by par; we reparent it to par2
                expect(tute.parent).toBe(par);

                par2.addChild(tute);

                expect(tute.parent).toBe(par2);
                expect(par.children).not.toContain(tute);
                expect(par2.children).toContain(tute);
            });
        });

        describe('removeChild', () => {
            function removeChild() {
                par2.removeChild(par);
            }

            it('removing a tutorial that is not a child silently passes', () => {
                const n = par2.children.length;

                expect(removeChild).not.toThrow();
                expect(par2.children).toBeArrayOfSize(n);
            });

            it("removing a child removes the child from the parent's 'children' property", () => {
                tute.setParent(par2);
                expect(par2.children.length).toBe(1);

                par2.removeChild(tute);

                expect(par2.children).not.toContain(tute);
                expect(par2.children).toBeEmptyArray();
            });

            it("removing a child unsets the child's 'parent' property", () => {
                expect(tute.parent).toBeNull();
            });
        });

        describe('various inheritance tests with addChild, setParent and removeChild', () => {
            it('parenting and unparenting via addChild, setParent and removeChild makes sure inheritance is set accordingly', () => {
                // unparent everything.
                tute.setParent(null);
                par.setParent(null);
                par2.setParent(null);

                // let tute belong to par
                tute.setParent(par);

                expect(tute.parent).toBe(par);
                expect(par2.children).toBeEmptyArray();
                expect(par.children).toBeArrayOfSize(1);
                expect(par.children[0]).toBe(tute);

                // addChild tute to par2. its parent should now be par2, and
                // it can't be the child of two parents
                par2.addChild(tute);

                expect(tute.parent).toBe(par2);
                expect(par.children).toBeEmptyArray();
                expect(par2.children).toBeArrayOfSize(1);
                expect(par2.children[0]).toBe(tute);

                // removeChild tute from par2. tute should now be unparented.
                par2.removeChild(tute);

                expect(tute.parent).toBe(null);
                expect(par.children).toBeEmptyArray();
                expect(par2.children).toBeEmptyArray();
            });
        });

        describe('parse', () => {
            const markdownConfig = env.conf.markdown;

            function setMarkdownConfig(config) {
                env.conf.markdown = config;
            }

            beforeEach(() => {
                setMarkdownConfig({parser: 'marked'});
            });

            afterEach(() => {
                env.conf.markdown = markdownConfig;
            });

            it('Tutorials with HTML type return content as-is', () => {
                expect(par2.parse()).toBe('<h2>This is the second parent tutorial</h2>');
            });

            it('Tutorials with MARKDOWN type go through the markdown parser, respecting configuration options', () => {
                expect(par.parse()).toBe("<h1>This is the parent tutorial's <em>content &amp; stuff</em> A_B X_Y</h1>");
            });

            it('Tutorials with MARKDOWN type preserve &amp;/&lt;/&gt; entities', () => {
                expect(markdownEntities.parse())
                    .toBe('<pre>This Markdown tutorial contains HTML entities: &amp; &lt; &gt;</pre>');
            });

            it('Tutorials with unrecognised type are returned as-is', () => {
                expect(tute.parse()).toBe(content);
            });
        });
    });

    describe('RootTutorial', () => {
        it('should inherit from Tutorial', () => {
            const root = new tutorial.RootTutorial();

            expect(root instanceof tutorial.Tutorial).toBe(true);
        });

        it('should have a "getByName" method', () => {
            expect(tutorial.RootTutorial.prototype.getByName).toBeFunction();
        });

        describe('getByName', () => {
            let root;

            beforeEach(() => {
                root = new tutorial.RootTutorial();
            });

            it('can retrieve tutorials by name', () => {
                const myTutorial = new tutorial.Tutorial('myTutorial', '', tutorial.TYPES.HTML);

                root._addTutorial(myTutorial);

                expect(root.getByName('myTutorial')).toBe(myTutorial);
            });

            it('returns nothing for non-existent tutorials', () => {
                expect(root.getByName('asdf')).toBeFalse();
            });

            it('uses hasOwnProperty when it checks for the tutorial', () => {
                expect(root.getByName('prototype')).toBeFalse();
            });
        });
    });
});
