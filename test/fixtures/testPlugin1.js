var myGlobal = require('jsdoc/util/global');
myGlobal.jsdocPluginsTest.plugin1 = {};

exports.handlers = {
    fileBegin: function() {
        myGlobal.jsdocPluginsTest.plugin1.fileBegin = true;
    },
    beforeParse: function() {
        myGlobal.jsdocPluginsTest.plugin1.beforeParse = true;
    },
    jsdocCommentFound: function() {
        myGlobal.jsdocPluginsTest.plugin1.jsdocCommentFound = true;
    },
    symbolFound: function() {
        myGlobal.jsdocPluginsTest.plugin1.symbolFound = true;
    },
    newDoclet: function() {
        myGlobal.jsdocPluginsTest.plugin1.newDoclet = true;
    },
    fileComplete: function() {
        myGlobal.jsdocPluginsTest.plugin1.fileComplete = true;
    }
};

exports.defineTags = function(dictionary) {
    dictionary.defineTag("foo", {
        canHaveName: true,
        onTagged: function(doclet, tag) {
            doclet.foo = true;
        }
    });
};

exports.nodeVisitor = {
    visitNode: function(node, e, parser, currentSourceName) {
        myGlobal.jsdocPluginsTest.plugin1.visitNode = true;
        e.stopPropagation = true;
    }
};
