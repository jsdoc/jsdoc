// see: http://howtonode.org/intro-to-jake

desc('Updating package.json revision.');
task('default', [], function (params) {
    var fs = require('fs'),
        sys = require('sys');
    
    // import the Mustache template tool
    eval(fs.readFileSync('Jake/lib/mustache.js', 'utf8'));
    
    var templates = {
        packagejson: fs.readFileSync('Jake/templates/package.json.tmpl', 'utf8')
    };
    
    var metadata = {
        appname: 'JSDoc',
        appversion: '3.0.0alpha',
        timestamp: ''+new Date().getTime()
    };
    
    var outdir = './';
    
    var rendered = Mustache.to_html(
        templates.packagejson,
        metadata
    );
    
    fs.writeFileSync(outdir + 'package.json', rendered, 'utf8');
    
    process.exit(0);
 
});