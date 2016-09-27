'use strict';

var env = require('jsdoc/env');
var path = require('jsdoc/path');

describe('specs', function () {
    var pluginPath = 'plugins/specs';
    var pluginPathResolved = path.join(env.dirname, pluginPath);
    var plugin = require(pluginPathResolved);
    var docSet = jasmine.getDocSetFromFile('plugins/test/fixtures/specs.js');

    it('should export handlers', function () {
        expect(plugin.handlers).toBeDefined();
        expect(typeof plugin.handlers).toBe('object');
    });

    it('should export a newDoclet handler', function () {
        expect(plugin.handlers.newDoclet).toBeDefined();
        expect(typeof plugin.handlers.newDoclet).toBe('function');
    });

    describe('#handler.doclet', function () {

        var fixturesPath = path.join(env.dirname, 'plugins/test/fixtures');
        var doclet = plugin.handlers.newDoclet;
        var docs = {
            spec: {doclet: docSet.getByLongname('module:spec')[0]},
            fun0: {doclet: docSet.getByLongname('module:spec~fun0')[0]},
            variable0: {doclet: docSet.getByLongname('module:spec~variable0')[0]},
            Klass: {doclet: docSet.getByLongname('module:spec~Klass')[0]},
            variable1: {doclet: docSet.getByLongname('module:spec~Klass#variable1')[0]},
            fun1: {doclet: docSet.getByLongname('module:spec~Klass#fun1')[0]}
        };
        for (var i in docs) {
            docs[i].doclet.meta.filename = 'specs.js';
            docs[i].doclet.meta.path = path.join(fixturesPath);
        }

        it('should not spec module', function () {
            expect(docs.spec.doclet.description).toEqual('spec');
            doclet(docs.spec);
            expect(docs.spec.doclet.description).toEqual('spec');
        });

        it('should spec fun0', function () {
            expect(docs.fun0.doclet.description).toEqual('fun0');
            doclet(docs.fun0);
            expect(docs.fun0.doclet.description).toEqual([
                'fun0',
                '<b>Specs:</b>',
                '<ol>',
                '<li>Line0</li>',
                '<li>Line1</li>',
                '<li>Line2</li>',
                '</ol>'
            ].join('\n'));
        });

        it('should not spec variable0', function () {
            expect(docs.variable0.doclet.description).toEqual('variable0');
            doclet(docs.variable0);
            expect(docs.variable0.doclet.description).toEqual('variable0');
        });

        it('should spec Klass', function () {
            expect(docs.Klass.doclet.description).toEqual('Klass');
            doclet(docs.Klass);
            expect(docs.Klass.doclet.description).toEqual([
                'Klass',
                '<b>Specs:</b>',
                '<ol>',
                '<li>Line7</li>',
                '<li>Line4</li>',
                '<li>Line8</li>',
                '</ol>'
            ].join('\n'));
        });

        it('should not spec variable1', function () {
            expect(docs.variable1.doclet.description).toEqual('variable1');
            doclet(docs.variable1);
            expect(docs.variable1.doclet.description).toEqual('variable1');
        });

        it('should spec fun1', function () {
            expect(docs.fun1.doclet.description).toEqual('fun1');
            doclet(docs.fun1);
            expect(docs.fun1.doclet.description).toEqual([
                'fun1',
                '<b>Specs:</b>',
                '<ol>',
                '<li>Line5</li>',
                '<li>Line6</li>',
                '</ol>'
            ].join('\n'));
        });
    });
});
