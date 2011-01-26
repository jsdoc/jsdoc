(function() {

    var Mustache = require('janl/mustache'),
        fs = require('fs');
    
    /**
        @global
        @param {TAFFY} data See <http://taffydb.com/>.
        @param {object} opts
     */
    publish = function(data, opts) {
        var out = '';
        
        var helpers = {
            linkTo: function() {
                return function(text, render) {
                    var linkTo,
                        text = render(text);
    
                    if ( !data.find({longname: text}).length ) { return text; }
                    
                    linkTo = text.replace(/#/g, '%23');
                    return '<a href="#' + linkTo + '">' + text + '</a>';
                }
            }
        };
        
        function summarize(doclet) {
            var desc = doclet.description || '';
            
            desc = desc.replace(/<\/?p>/gi, ''); // full text may be HTML, remove P wrapper
            desc = trim(desc);
            
            var m;

            if ( m = /^([\s\S]+?)(?:\n|\r|\f|<br>|$)+([\s\S]*)$/.exec(desc) ) {
                doclet.summary = m[1];
                doclet.description = m[2]? m[2] : '';
            }
        }
        
        function trim(text) {
            return text.replace(/^\s+|\s+$/g, '');
        }
	    
	    data.remove({undocumented: true});
	    
	    // add template helpers
	    data.forEach(function(doclet) {
	        doclet.hasParams   = doclet.params   && doclet.params.length > 0;
	        doclet.hasReturns  = doclet.returns  && doclet.returns.length > 0;
	        doclet.hasBorrowed = doclet.borrowed && doclet.borrowed.length > 0;
	        doclet.hasExceptions = doclet.exceptions && doclet.exceptions.length > 0;

	        summarize(doclet);
	    });
	    
	    data.orderBy(['longname', 'kind']);
	    
	    var containerTemplate = fs.read(BASEDIR + 'templates/default/tmpl/container.mustache');
	    var partials = {
            paramsTemplate:     fs.read(BASEDIR + 'templates/default/tmpl/params.mustache'),
            returnsTemplate:    fs.read(BASEDIR + 'templates/default/tmpl/returns.mustache'),
            methodsTemplate:    fs.read(BASEDIR + 'templates/default/tmpl/methods.mustache'),
            exceptionsTemplate: fs.read(BASEDIR + 'templates/default/tmpl/exceptions.mustache')
        };
        
        var topLevels = {
	        projects: [],
	        globals: [],
	        modules: [],
	        namespaces: [],
	        classes: [],
	        mixins: []
	    };
	    
	    topLevels.globals = data.get( data.find({memberof: {isUndefined: true}}) );
	    
	    var modules = data.get( data.find({kind: 'module'}) );
        modules.forEach(function(m) {
            m.methods = data.get( data.find({kind: 'function', memberof: m.longname}) );
            m.hasMethods = (m.methods && m.methods.length > 0);
            
            m.methods.forEach(function(f) {
                var pnames = [];
                if (f.params) {
                    f.params.forEach(function(p) {
                        if (p.name && p.name.indexOf('.') === -1) { pnames.push(p.name); }
                    });
                }
                f.synopsis = 'require("'+m.name+'").'+f.name+'('+pnames.join(', ')+');'
                f.hasParams = (f.params && f.params.length > 0);
                f.hasReturns = (f.returns && f.returns.length > 0);
            });
        });
        
       
        
        var outdir = opts.destination;
        fs.mkPath(outdir);
        
        generate('Modules', modules, 'modules.html');
        
        function generate(title, docs, filename) {
//dump(docs); exit();
            var path = outdir + '/' + filename,
                html = Mustache.to_html(
                    containerTemplate,
                    {
                        title: title,
                        docs: docs,
                        linkTo: helpers.linkTo
                    },
                    partials
                );
            fs.write(path, html)
        }

    }
    
    
    

})();