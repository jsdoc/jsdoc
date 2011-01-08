(function() {

    include('templates/lib/janl/mustache.js');
    
    /**
        @param {TAFFY} db
        @param {object} opts
     */
    publish = function(db, opts) {
        var out = '',
            templateSource = {
                index: readFile(BASEDIR + 'templates/default/tmpl/index.mustache'),
                param: readFile(BASEDIR + 'templates/default/tmpl/param.mustache'),
                returns: readFile(BASEDIR + 'templates/default/tmpl/returns.mustache')
            };
        
        var helpers = {
            linkTo: function() {
                return function(text, render) {
                    var linkTo,
                        text = render(text);
    
                    if ( !db.find({longname: text}).length ) { return text; }
                    
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
	    
	    db.remove({undocumented: true});
	    
	    // add template helpers
	    db.forEach(function(doclet) {
	        doclet.hasParams   = doclet.params   && doclet.params.length > 0;
	        doclet.hasBorrowed = doclet.borrowed && doclet.borrowed.length > 0;
	        
	        summarize(doclet);
	    });
	    
	    db.orderBy(['longname', 'kind']);
	    
	    var partials = {
            param: templateSource.param,
            returns: templateSource.returns
        };
        
	    // apply template
        out = Mustache.to_html(
            templateSource.index,
            {
                docs: db.get(),
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