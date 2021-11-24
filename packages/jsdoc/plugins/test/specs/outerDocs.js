/* testing for outerdocs, using global jsdoc */
describe('plugins/outerDocs', () => {
    var plugins
    try {
       plugins = require('jsdoc/plugins')
    } catch(e) {
       plugins = require('../../../lib/jsdoc/plugins');
    }    
    const path = require('path');
  
    let docSet;
    const parser = jsdoc.createParser();
    const pluginPath = path.join(__dirname, '../../outerDocs');
    plugins.installPlugins([pluginPath], parser, jsdoc.deps);

    var outerdocsConfig = {
        "Phaser": {
            "url": "https://newdocs.phaser.io/docs/3.55.2/",
            "structure": "dots",
            "appendhtml": false,
            "dropFirst": false
        },
        "BuiltIn": {
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/",
            "structure": "slashes",
            "appendhtml": false,
            "dropFirst": true

        },
        "React": {
            "url":"https://reactjs.org/docs/",
            "structure": "slashes",
            "appendhtml": true,
            "dropFirst": true
        },
        "Lodash": {
            "url":"https://lodash.com/docs/4.17.15",
            "structure": "dots",
            "appendhtml": false,
            "dropFirst": true
        },
        "Web": {
            "url":"https://developer.mozilla.org/en-US/docs/Web/",
            "structure":"slashes",
            "appendhtml": false,
            "dropFirst": true
        }
    }

    parser._conf['outerdocs'] = outerdocsConfig;
    docSet = jsdoc.getDocSetFromFile('plugins/test/fixtures/outerDocced.js', parser);

    const plugin = require(pluginPath)

    it('should exist', () => {
        expect(plugin).toBeDefined();
        expect(typeof plugin).toBe('object');
    });
    it('should define tags', ()=> {
        expect(plugin.defineTags).toBeFunction();
    });
    it('should not cause any doclets to fail to generate', ()=> {
        expect(docSet.doclets.length).toBeGreaterThanOrEqual(7);
    });
    it('should work on @external tags', ()=> {
        let ext = docSet.getByLongname('external:OuterdoccedTests')[0];
        expect(ext.see.length).toEqual(1);
        expect(ext.see[0]).toEqual('{@link https://lodash.com/docs/4.17.15#snakeCase Lodash.#snakeCase}'); 
    })
    it('should work on classes', ()=> {
        let myimg = docSet.getByLongname('myImage')[0];
        expect(myimg.see.length).toEqual(1);
        expect(myimg.see[0]).toEqual('{@link https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Image Phaser.GameObjects.Image}');
    })
    it('should work on methods and append #IDs to the end of the link', ()=> {
        let setSize = docSet.getByLongname('myImage#setSize')[0];
        expect(setSize.see.length).toEqual(1);
        expect(setSize.see[0]).toEqual('{@link https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Image#setSize Phaser.GameObjects.Image#setSize}');
    })
    it('should work on constants, not interfere with regular @see tag usage, and interpolate "/" according to configuration specs', ()=> {
        let date = docSet.getByLongname('date')[0];
        expect(date.see.length).toEqual(2);
        expect(date.see[0]).toEqual('{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date A classic JS Date Object}');
        expect(date.see[1]).toEqual('anotherref')
    })
    it('should append *.html according to config and be used multiple times on the same doclet', ()=> {
        let boxstyle = docSet.getByLongname('boxStyle')[0];
        expect(boxstyle.see.length).toEqual(2);
        expect(boxstyle.see[0]).toEqual('{@link https://reactjs.org/docs/dom-elements.html#style React docs}');
        expect(boxstyle.see[1]).toEqual('{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style MDN docs}')
    })


  });
  