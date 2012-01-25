/**
    @overview This is just an test.
    @module plugins/jquery.ui.widget
    @author Jannon Frank jannonfrank.com
 */

function printFields(e, depth) {
    depth = depth || 0;
    var prefix = "";
    for(var i = 0; i < depth; i++) {
        prefix += "\t";
    }
    
    for (var f in e) {
        if (e['hasOwnProperty'] && e.hasOwnProperty(f)) {
            if (typeof e[f] != 'object') {
                console.log(prefix + f + ": " + e[f] + " (" + typeof e[f] + "),");
            } else {
                console.log(prefix + f + ": {");
                printFields(e[f], ++depth);
                console.log(prefix + "}");
            }
        }
    }
}


/**
    Make your descriptions more shoutier.
 *
exports.newDoclet = function(e) {
    console.log("----------");
    console.log("New Doclet");
    console.log("----------");
    printFields(e);
};
exports.jsdocCommentFound = function(e) {
    console.log("--------------------");
    console.log("JS Doc Comment Found");
    console.log("--------------------");
    printFields(e);
};
exports.symbolFound = function(e) {
    console.log("------------");
    console.log("Symbol Found");
    console.log("------------");
    printFields(e);
};*/
/*
exports.fileBegin = function(e) {
    console.log("----------");
    console.log("File Begin");
    console.log("----------");
    printFields(e);
};
exports.fileComplete = function(e) {
    console.log("-------------");
    console.log("File Complete");
    console.log("-------------");
    printFields(e);
};
exports.beforeParse = function(e) {
    console.log("------------");
    console.log("Before Parse");
    console.log("------------");
    printFields(e);
};
exports.sourceFileFound = function(e) {
    console.log("-----------------");
    console.log("Source File Found");
    console.log("-----------------");
    printFields(e);
};
*/