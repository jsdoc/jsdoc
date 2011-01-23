(function() {

    var Mustache = require('janl/mustache');
    
    /**
        @global
        @param {TAFFY} data
        @param {object} opts
     */
    publish = function(data, opts) {
        var out = '',
            templateSource = {
                index: readFile(BASEDIR + 'templates/default/tmpl/index.mustache'),
                paramsTemplate: readFile(BASEDIR + 'templates/default/tmpl/params.mustache'),
                returnsTemplate: readFile(BASEDIR + 'templates/default/tmpl/returns.mustache')
            };
        
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

	        summarize(doclet);
	    });
	    
	    data.orderBy(['longname', 'kind']);
	    
	    var partials = {
            paramsTemplate: templateSource.paramsTemplate,
            returnsTemplate: templateSource.returnsTemplate
        };
        
	    // apply template
        out = Mustache.to_html(
            templateSource.index,
            {
                docs: data.get(),
                linkTo: helpers.linkTo
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