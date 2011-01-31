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
            propertiesTemplate: fs.read(BASEDIR + 'templates/default/tmpl/properties.mustache'),
            namespacesTemplate: fs.read(BASEDIR + 'templates/default/tmpl/namespaces.mustache'),
            
            classesTemplate:    fs.read(BASEDIR + 'templates/default/tmpl/classes.mustache'),
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
	    
	    var modules = data.get( data.find({kind: 'module'}) ),
	        classes = data.get( data.find({kind: 'class'}) ),
	        namespaces = data.get( data.find({kind: 'namespace'}) );
	        
        modules.forEach(function(m) {
            m.methods = data.get( data.find({kind: 'function', memberof: m.longname}) );
            m.hasMethods = (m.methods && m.methods.length > 0);
            m.methods.forEach(prepareFunc);
            
            m.properties = data.get( data.find({kind: 'property', memberof: m.longname}) );
            m.hasProperties = (m.properties && m.properties.length > 0);
            m.properties.forEach(prepareProp);
            
            m.namespaces = data.get( data.find({kind: 'namespace', memberof: m.longname}) );
            m.hasNamespaces = (m.namespaces && m.namespaces.length > 0);
            m.namespaces.forEach(prepareNs);
            
            m.classes = data.get( data.find({kind: 'class', memberof: m.longname}) );
            m.hasClasses = (m.classes && m.classes.length > 0);
            
            // TODO: namespaces
        });
        
        classes.forEach(function(c) {
            c.methods = data.get( data.find({kind: 'function', memberof: c.longname}) );
            c.hasMethods = (c.methods && c.methods.length > 0);
            prepareFunc(c);
            c.hasConstructor = true;
            c.methods.forEach(prepareFunc);
            
            c.properties = data.get( data.find({kind: 'property', memberof: c.longname}) );
            c.hasProperties = (c.properties && c.properties.length > 0);
            c.properties.forEach(prepareProp);
            
            c.namespaces = data.get( data.find({kind: 'namespace', memberof: c.longname}) );
            c.hasNamespaces = (c.namespaces && c.namespaces.length > 0);
            c.namespaces.forEach(prepareNs);

            c.classes = data.get( data.find({kind: 'class', memberof: c.longname}) );
            c.hasClasses = (c.classes && c.classes.length > 0);
        });
        
        namespaces.forEach(function(n) {
            
            n.methods = data.get( data.find({kind: 'function', memberof: n.longname}) );
            n.hasMethods = (n.methods && n.methods.length > 0);
            //prepareNs(n);
            n.methods.forEach(prepareFunc);
            
            n.properties = data.get( data.find({kind: 'property', memberof: n.longname}) );
            n.hasProperties = (n.properties && n.properties.length > 0);
            n.properties.forEach(prepareProp);
            
            n.namespaces = data.get( data.find({kind: 'namespace', memberof: n.longname}) );
            n.hasNamespaces = (n.namespaces && n.namespaces.length > 0);
            n.namespaces.forEach(prepareNs);
            
            n.classes = data.get( data.find({kind: 'class', memberof: n.longname}) );
            n.hasClasses = (n.classes && n.classes.length > 0);
        });
        
        function prepareFunc(f) {
            var pnames = [];
            if (f.params) {
                f.params.forEach(function(p) {
                    if (p.name && p.name.indexOf('.') === -1) { pnames.push(p.name); }
                });
            }
            f.synopsis = (f.kind === 'class'? 'new ' : '') + f.name+'('+pnames.join(', ')+')'
            f.hasParams = (f.params && f.params.length > 0);
            f.hasReturns = (f.returns && f.returns.length > 0);
        }
        
        function prepareProp(p) {
        }
        
        function prepareNs(p) {
        }
        
        var outdir = opts.destination;
        fs.mkPath(outdir);
        
        // containers
        generate('Modules', modules, 'modules.html');
        generate('Classes', classes, 'classes.html');
        generate('Namespaces', namespaces, 'namespaces.html');
        
        function generate(title, docs, filename) {
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