(function() {

    include('templates/lib/janl/mustache.js');

    publish = function(docs, opts) {
        var out = '',
            template = readFile(BASEDIR + 'templates/default/tmpl/index.html');
        
        var summarize = function () {
            return function(text, render) {
                text = render(text);
                /^(.*?(\.|\n|\r|$))/.test(text);
                return RegExp.$1;
            }
        };
	
        out = Mustache.to_html(
            template,
            {
                docs: docs,
                summarize: summarize
            }
        );
        
        print(out);
    }

})();