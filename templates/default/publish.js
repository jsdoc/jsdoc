(function() {

    include('templates/lib/janl/mustache.js');

    publish = function(docSet, opts) {
        var out = '',
            templates = {
                index: readFile(BASEDIR + 'templates/default/tmpl/index.html')
            };
        
        function summarize () {
            return function(text, render) {
                var summary = trim(text);
                
                summary = render(text);
                summary = summary.replace(/<\/?p>/gi, ''); // text may be HTML
                
                /^(.*?(\.$|\.\s|\n|\r|$|<br>))/.test(summary);
                return RegExp.$1? RegExp.$1 : summary;
            }
        };
        
        function trim(text) {
            return text.replace(/^\s+|\s+$/g, '');
        }
	    
	    // remove undocumented symbols from the output
	    docSet.doclets = docSet.doclets.filter(function(doclet) {
	        return !doclet.undocumented;
	    });
	    
	    // add template helpers
	    docSet.doclets.forEach(function(doclet) {
	        doclet['params?'] = doclet.params && doclet.params.length > 0;
	    });
	    
	    docSet.sortByLongname();
	    
	    var partials = {
            param: readFile(BASEDIR + 'templates/default/tmpl/param.mustache'),
            returns: readFile(BASEDIR + 'templates/default/tmpl/returns.mustache')
        };
        
	    // apply template
        out = Mustache.to_html(
            templates.index,
            {
                docs: docSet.doclets,
                summarize: summarize
            },
            partials
        );

        if (opts.destination === 'console') {
            print(out);
        }
        else {
            print('The only -d destination option currently supported is "console"!');
        }
    }

})();