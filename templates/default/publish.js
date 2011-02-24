(function() {

    var template = require('underscore/template'),
        fs = require('fs');
        
        template.settings.evaluate    = /<\?js([\s\S]+?)\?>/g;
        template.settings.interpolate = /<\?js=([\s\S]+?)\?>/g;
    
    /**
        @global
        @param {TAFFY} data See <http://taffydb.com/>.
        @param {object} opts
     */
    publish = function(data, opts) {
        var out = '',
            containerTemplate = template.render(fs.read(BASEDIR + 'templates/default/tmpl/container.tmpl'));
        
        function render(tmpl, partialData) {
            var renderFunction = arguments.callee.cache[tmpl];
            if (!renderFunction) {
                renderFunction = arguments.callee.cache[tmpl] = template.render(fs.read(BASEDIR + 'templates/default/tmpl/'+tmpl));
            }
            partialData.render = arguments.callee;
            partialData.find = find;
            partialData.htmlsafe = htmlsafe;
            
            return renderFunction.call(partialData, partialData);
        }
        render.cache = {};
        
        function find(spec) {
            return data.get( data.find(spec) );
        }
        
        function htmlsafe(str) {
            return str.replace(/</g, '&lt;');
        }
        
//         var helpers = {
//             linkTo: function() {
//                 return function(text, render) {
//                     var linkTo,
//                         text = render(text);
//     
//                     if ( !data.find({longname: text}).length ) { return text; }
//                     
//                     linkTo = text.replace(/#/g, '%23');
//                     return '<a href="#' + linkTo + '">' + text + '</a>';
//                 }
//             }
//         };
        
        function summarize(doclet) {
            var desc = doclet.description || '';
            
            desc = desc.replace(/<\/?p>/gi, ''); // full text may be HTML, remove P wrapper
            desc = desc.trim();
            
            var m;

            if ( m = /^([\s\S]+?)(?:\n|\r|\f|<br>|$)+([\s\S]*)$/.exec(desc) ) {
                doclet.summary = m[1];
                doclet.description = m[2]? m[2] : '';
            }
            
            doclet.signature = '';
            doclet.attribs = '';
        }
        
        function addSignatureParams(f) {
            var pnames = [];
            if (f.params) {
                f.params.forEach(function(p) {
                    if (p.name && p.name.indexOf('.') === -1) {
                        if (p.optional) { pnames.push('['+p.name+']'); }
                        else { pnames.push(p.name); }
                    }
                });
            }
            
            f.signature = (f.signature || '') + '('+pnames.join(', ')+')';
        }
        
        function addSignatureReturns(f) {
            var returnTypes = [];
            
            if (f.returns) {
                f.returns.forEach(function(r) {
                    if (r.type && r.type.names) {
                        returnTypes = r.type.names;
                    }
                });
            }
            
            f.signature = (f.signature || '') + '<span class="type-signature">'+htmlsafe(returnTypes.length? ' &#8658; '+returnTypes.join('|') : '')+'</span>';
        }
        
        function addSignatureType(f) {
            var types = [];
            
            if (f.type && f.type.names) {
                types = f.type.names;
            }
            
            f.signature = (f.signature || '') + '<span class="type-signature">'+htmlsafe(types.length? ' :'+types.join('|') : '')+'</span>';
        }
        
        function addAttribs(f) {
            var attribs = [];
            
            if (f.access && f.access !== 'public') {
                attribs.push(f.access);
            }
            
            if (f.scope && f.scope !== 'instance') {
                if (f.kind == 'function' || f.kind == 'property') attribs.push(f.scope);
            }
            
            if (f.readonly === true) {
                if (f.kind == 'property') attribs.push('readonly');
            }
            
            f.attribs = '<span class="type-signature">'+htmlsafe(attribs.length? '<'+attribs.join(', ')+'> ' : '')+'</span>';
        }
        
        data.remove({undocumented: true});
	    
	    var packageInfo = (data.get( data.find({kind: 'package'}) ) || []) [0];

	    data.forEach(function(doclet) {
	        summarize(doclet);
	        if (doclet.kind === 'function' || doclet.kind === 'class') {
	            addSignatureParams(doclet);
	            addSignatureReturns(doclet);
	            addAttribs(doclet);
	        }
	        
	        if (doclet.kind === 'property') {
	            addSignatureType(doclet);
	            addAttribs(doclet)
	        }
	        
	        if (doclet.examples) {
	            doclet.examples = doclet.examples.map(function(example) {
	                var caption, code;
	                
	                if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
	                    caption = RegExp.$1;
	                    code    = RegExp.$3;
	                }
	                
                    return {
                        caption: caption || '',
                        code: code || example
                    };
                });
	        }
	    });
	    
	    data.orderBy(['longname', 'kind', 'version', 'since']);
        
        // kinds of containers
        var globals = data.get( data.find({kind: ['property', 'function'], memberof: {isUndefined: true}}) ),
            modules = data.get( data.find({kind: 'module'}) ),
	        namespaces = data.get( data.find({kind: 'namespace'}) );
        
        var outdir = opts.destination;
        if (packageInfo) {
            outdir += '/' + packageInfo.name + '/' + packageInfo.version + '/';
        }
        fs.mkPath(outdir);
        
        // copy static files to outdir
        var fromDir = BASEDIR + 'templates/default/static',
            staticFiles = fs.ls(fromDir, 3);
            
        staticFiles.forEach(function(fileName) {
            var toDir = fs.toDir(fileName.replace(fromDir, outdir));
            fs.mkPath(toDir);
            fs.copyFile(fileName, toDir);
        });
        
        // containers
        //generate('Globals', globals, 'globals.html');
        //generate('Modules', modules, 'modules.html');
        //generate('Classes', classes, 'classes.html');
        //generate('Namespaces', namespaces, 'namespaces.html');
        
        var urlToLongname = {},
            longnameToUrl = {};
        
        var classes = data.get(data.find({kind: 'class'}));
        for (var i = 0, len = classes.length; i < len; i++) {
            var longname = classes[i].longname,
                urlSafe = longname.replace(/[^$a-z0-9._-]/gi, '_');
            
            // bidirectional lookups: url <=> longname
            urlToLongname[urlSafe]  = longname;
            longnameToUrl[longname] = urlSafe;
        }
        
        for (var longname in longnameToUrl) {
            var classes = data.get( data.find({kind: 'class', longname: longname}) );
            generate(classes[0].kind+': '+classes[0].name, classes, longnameToUrl[longname]+'.html');
        }
         
        function generate(title, docs, filename) {
            var data = {
                title: title,
                docs: docs,
                
                // helpers
                render: render,
                find: find,
                htmlsafe: htmlsafe
            };
            
            var path = outdir + '/' + filename,
                html = containerTemplate.call(data, data);
                
            fs.write(path, html)
        }
    }
    
})();