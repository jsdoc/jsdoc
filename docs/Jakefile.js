// see: http://howtonode.org/intro-to-jake

desc('Building the site.');
task('default', [], function (params) {
	var fs = require('fs'),
	sys = require('sys');
	
	// import the Mustache template tool
	eval(fs.readFileSync('Jake/lib/mustache.js', 'utf8'));
	
	var templates = {
		head : fs.readFileSync('Jake/templates/head.mustache', 'utf8'),
		foot : fs.readFileSync('Jake/templates/foot.mustache', 'utf8'),
		article : fs.readFileSync('Jake/templates/article.mustache', 'utf8'),
		example : fs.readFileSync('Jake/templates/example.mustache', 'utf8'),
		tagRefEntry : fs.readFileSync('Jake/templates/tagRefEntry.mustache', 'utf8')
	};
	
	var outdir = './',
	srcdir = 'Jake/articles/',
	articles = [];
	
	console.log('Building index...');
	fs.readdirSync(srcdir).forEach(function (file) {
		if (String(file)[0] === '.') {
			return;
		}
		
		var body = fs.readFileSync(srcdir + file, 'utf8'),
		meta = body.match(/^<!--(\{[\s\S]*\})-->/)[1];
		
		if (!meta) {
			return;
		}
		
		eval('meta = ' + meta);
		
		meta.body = body.split('}-->')[1];
		articles.push(meta);
	});
	
	console.log('Cleaning gh-pages...');
	fs.readdirSync(outdir).forEach(function (file) {
		if (/\.html$/.test(file)) {
			fs.unlinkSync(outdir + file);
			console.log('> removed ' + outdir + file);
		}
	});
	
	console.log('Building new gh-pages...');
	
	articles.forEach(function (article) {
		var html = Mustache.to_html(
				templates.article, {
				title : article.title,
				description : article.description,
				keywords : article.keywords,
				example : function () {
					return function (text, render) {
						return formatExample(text);
					};
				},
				tagRefEntry : function () {
					return function () {
						return generateTagsReference();
					};
				}
			}, {
				head : templates.head,
				foot : templates.foot,
				article : article.body
			});
		
		fs.writeFileSync(outdir + article.out, html, 'utf8');
		console.log('> created ' + outdir + article.out);
	});
	
	function generateTagsReference() {
		var out = '';
		articles.forEach(function (article) {
			if (article.out.indexOf('tags-') !== 0) {
				return '';
			}
			var p = article.out;
			var tr = article.title;
			var td = article.description;
			out += Mustache.to_html(
				templates.tagRefEntry, {
				href : p,
				tagRef : tr,
				tagDesc : td
			});
		});
		return out;
	}
	
	function formatExample(text) {
		// the first line of the text is the title of the example code
		var parts = text.split('\n'),
		title = parts.shift().trim(),
		code = parts.join('\n').trim();
		
		return Mustache.to_html(
			templates.example, {
			codeTitle : title,
			codeBody : code
		});
	}
	
	//console.log(sys.inspect(arguments));
});
