// like: java -classpath ~/Scripts/js.jar org.mozilla.javascript.tools.shell.Main jsdoc.js examples/test1.js
//   or: node jsdoc examples/test1.js

(function() {

    // normalise rhino
    if (typeof load !== 'undefined') {
        load('lib/rhino-shim.js');
    }
    
    // global modules
    global._ = require('underscore');
    _.mixin(require('underscore.string'));
    global.signals = require('signals');

    // needed modules
    var fs = require('fs'),
        opts = require('jsdoc/options').parse( process.argv.slice(2) ),
        dumper = require('jsdoc/util/dumper');
    
    // user configuration
    try {
        var conf = JSON.parse(
            fs.readFileSync('./conf.json', 'utf-8')
        );
    }
    catch (e) {
        throw('Configuration file cannot be evaluated. '+e);
    }
    
    if (typeof conf.plugins !== 'undefined') {
        for (var i = 0, len = conf.plugins.length; i < len; i++) {
            require(conf.plugins[i]);
        }
    }
    
    if (opts.help) {
        console.log('USAGE: node main.js yourfile.js');
        process.exit(0);
    }
    
    var srcFile = opts._[0];

    var src = fs.readFileSync(srcFile, 'utf-8');
    
    var parser = require('jsdoc/parser');
    
    var docs = parser.parse(src);
    
//     docs = _.map(docs, function(doc) {
//         if (!doc.jsdoc) { doc.jsdoc = {}; }
//         doc.jsdoc.longname = doc.longname;
//         return doc.jsdoc;
//     });
    
    if (opts.expel) {
        console.log( dumper.dump(docs) );
    }
    else {
        var taffy = require('./templates/lib/taffy');
        var publisher = require('./templates/default');
        
        console.log( publisher.publish( new taffy(docs) ) );
    }
    
})();