(function() {

load(BASEDIR + '/templates/lib/janl/mustache.js');

publish = function(docs, opts) {
	docs.doc.filter(function($) {
		$.desc = linkify($.desc);
		$.path = "<a name='"+symbolnameToLinkname($.path)+"'>" + $.path + '</a>';
	});
	var template = readFile(BASEDIR + '/templates/vanilla/tmpl/index.html');	
	print(Mustache.to_html(template, docs));
}

function linkify(text) {
	if (typeof text === 'string') {
		return text.replace(/\{@link\s+(.+?)(:? (.+?))?\}/gi, function(str, p1, p2, offset, s) {
			return "<a href='?doc=" + encodeURIComponent(symbolnameToLinkname(p1)) + "'>" + (p2 || p1) + '</a>';
		});
	}
}

function symbolnameToLinkname(symbolName) {
	return symbolName;
}

})();