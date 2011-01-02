(function() {

    include('templates/lib/janl/mustache.js');

    publish = function(docs, opts) {
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
	    
	    
	    docs = docs.filter(function(doc) {
	        return !doc.undocumented;
	    });
	    
        out = Mustache.to_html(
            templates.index,
            {
                docs: docs,
                summarize: summarize
            }
        );

        if (opts.destination === 'console') {
            print(out);
        }
        else {
            print('The only -d destination option currently supported is "console"!');
        }
    }

})();