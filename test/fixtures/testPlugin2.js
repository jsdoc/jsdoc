var myGlobal = require('jsdoc/util/global');
myGlobal.jsdocPluginsTest.plugin2 = {};

exports.handlers = {
    fileBegin: function() {
        myGlobal.jsdocPluginsTest.plugin2.fileBegin = true;
    },
    beforeParse: function() {
        myGlobal.jsdocPluginsTest.plugin2.beforeParse = true;
    },
    jsdocCommentFound: function() {
        myGlobal.jsdocPluginsTest.plugin2.jsdocCommentFound = true;
    },
    symbolFound: function() {
        myGlobal.jsdocPluginsTest.plugin2.symbolFound = true;
    },
    newDoclet: function() {
        myGlobal.jsdocPluginsTest.plugin2.newDoclet = true;
    },
    fileComplete: function() {
        myGlobal.jsdocPluginsTest.plugin2.fileComplete = true;
    }
};
