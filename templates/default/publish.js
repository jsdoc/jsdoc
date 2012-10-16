/*global env: true */
var template = require('jsdoc/template'),
    fs = require('fs'),
    path = require('path'),
    taffy = require('taffydb').taffy,
    helper = require('jsdoc/util/templateHelper'),
    scopeToPunc = helper.scopeToPunc,
    hasOwnProp = Object.prototype.hasOwnProperty,
    data,
    view,
    outdir = env.opts.destination;


function find(spec) {
    return helper.find(data, spec);
}

function tutoriallink(tutorial) {
    return helper.toTutorial(tutorial, null, { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
}

function getAncestorLinks(doclet) {
    return helper.getAncestorLinks(data, doclet);
}

var linkto = helper.linkto;

var htmlsafe = helper.htmlsafe;

function hashToLink(doclet, hash) {
    if ( !/^(#.+)/.test(hash) ) { return hash; }
    
    var url = helper.createLink(doclet);
    
    url = url.replace(/(#.+|$)/, hash);
    return '<a href="' + url + '">' + hash + '</a>';
}

function addSignatureParams(f) {
    var params = helper.getSignatureParams(f, 'optional');
    
    f.signature = (f.signature || '') + '('+params.join(', ')+')';
}

function addSignatureReturns(f) {
    var returnTypes = helper.getSignatureReturns(f);
    
    f.signature = '<span class="signature">'+(f.signature || '') + '</span>' + '<span class="type-signature">'+(returnTypes.length? ' &rarr; {'+returnTypes.join('|')+'}' : '')+'</span>';
}

function addSignatureTypes(f) {
    var types = helper.getSignatureTypes(f);
    
    f.signature = (f.signature || '') + '<span class="type-signature">'+(types.length? ' :'+types.join('|') : '')+'</span>';
}

function addAttribs(f) {
    var attribs = helper.getAttribs(f);
    
    f.attribs = '<span class="type-signature">'+htmlsafe(attribs.length? '<'+attribs.join(', ')+'> ' : '')+'</span>';
}
    
function generate(title, docs, filename) {
    var docData = {
        title: title,
        docs: docs
    };
    
    var outpath = path.join(outdir, filename),
        html = view.render('container.tmpl', docData);
    
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
    
    fs.writeFileSync(outpath, html);
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members) {
    var nav = '<h2><a href="index.html">Index</a></h2>',
        seen = {};

    if (members.modules.length) {
        nav += '<h3>Modules</h3><ul>';
        members.modules.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>'+linkto(m.longname, m.name)+'</li>';
            }
            seen[m.longname] = true;
        });
        
        nav += '</ul>';
    }
    
    if (members.externals.length) {
        nav += '<h3>Externals</h3><ul>';
        members.externals.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                nav += '<li>'+linkto( e.longname, e.name.replace(/(^"|"$)/g, '') )+'</li>';
            }
            seen[e.longname] = true;
        });
        
        nav += '</ul>';
    }

    if (members.classes.length) {
        var moduleClasses = 0;
        members.classes.forEach(function(c) {
            var moduleSameName = find({kind: 'module', longname: c.longname});
            if (moduleSameName.length) {
                c.name = c.name.replace('module:', 'require("')+'")';
                moduleClasses++;
                moduleSameName[0].module = c;
            }
            if (moduleClasses !== -1 && moduleClasses < members.classes.length) {
                nav += '<h3>Classes</h3><ul>';
                moduleClasses = -1;
            }
            if ( !hasOwnProp.call(seen, c.longname) ) {
                nav += '<li>'+linkto(c.longname, c.name)+'</li>';
            }
            seen[c.longname] = true;
        });
        
        nav += '</ul>';
    }
    
    if (members.namespaces.length) {
        nav += '<h3>Namespaces</h3><ul>';
        members.namespaces.forEach(function(n) {
            if ( !hasOwnProp.call(seen, n.longname) ) {
                nav += '<li>'+linkto(n.longname, n.name)+'</li>';
            }
            seen[n.longname] = true;
        });
        
        nav += '</ul>';
    }
    
    if (members.mixins.length) {
        nav += '<h3>Mixins</h3><ul>';
        members.mixins.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>'+linkto(m.longname, m.name)+'</li>';
            }
            seen[m.longname] = true;
        });
        
        nav += '</ul>';
    }

    if (members.tutorials.length) {
        nav += '<h3>Tutorials</h3><ul>';
        members.tutorials.forEach(function(t) {
            nav += '<li>'+tutoriallink(t.name)+'</li>';
        });
        
        nav += '</ul>';
    }
    
    if (members.globals.length) {
        nav += '<h3>Global</h3><ul>';
        members.globals.forEach(function(g) {
            if ( g.kind !== 'typedef' && !hasOwnProp.call(seen, g.longname) ) {
                nav += '<li>'+linkto(g.longname, g.name)+'</li>';
            }
            seen[g.longname] = true;
        });
        
        nav += '</ul>';
    }

    return nav;
}


/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
    data = taffyData;

    var templatePath = opts.template;
    view = new template.Template(templatePath + '/tmpl');
    
    // set up templating
    view.layout = 'layout.tmpl';

    // set up tutorials for helper
    helper.setTutorials(tutorials);

    data = helper.prune(data);
    data.sort('longname, version, since');

    data().each(function(doclet) {
         doclet.attribs = '';
        
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
        if (doclet.see) {
            doclet.see.forEach(function(seeItem, i) {
                doclet.see[i] = hashToLink(doclet, seeItem);
            });
        }
    });
    
    // update outdir if necessary, then create outdir
    var packageInfo = ( find({kind: 'package'}) || [] ) [0];
    if (packageInfo && packageInfo.name) {
        outdir = path.join(outdir, packageInfo.name, packageInfo.version);
    }
    fs.mkPath(outdir);

    // copy static files to outdir
    var fromDir = path.join(templatePath, 'static'),
        staticFiles = fs.ls(fromDir, 3);
        
    staticFiles.forEach(function(fileName) {
        var toDir = fs.toDir( fileName.replace(fromDir, outdir) );
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
    });
    
    data().each(function(doclet) {
        var url = helper.createLink(doclet);
        helper.registerLink(doclet.longname, url);
    });
    
    data().each(function(doclet) {
        var url = helper.longnameToUrl[doclet.longname];

        if (url.indexOf('#') > -1) {
            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
        }
        else {
            doclet.id = doclet.name;
        }
        
        if (doclet.kind === 'function' || doclet.kind === 'class') {
            addSignatureParams(doclet);
            addSignatureReturns(doclet);
            addAttribs(doclet);
        }
    });
    
    // do this after the urls have all been generated
    data().each(function(doclet) {
        doclet.ancestors = getAncestorLinks(doclet);

        doclet.signature = '';
        
        if (doclet.kind === 'member') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
        }
        
        if (doclet.kind === 'constant') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
            doclet.kind = 'member';
        }
    });
    
    var members = helper.getMembers(data);
    members.tutorials = tutorials.children;

    // add template helpers
    view.find = find;
    view.linkto = linkto;
    view.tutoriallink = tutoriallink;
    view.htmlsafe = htmlsafe;

    // once for all
    view.nav = buildNav(members);

    for (var longname in helper.longnameToUrl) {
        if ( hasOwnProp.call(helper.longnameToUrl, longname) ) {
            // reuse 'members', which speeds things up a bit
            var classes = taffy(members.classes);
            classes = helper.find(classes, {longname: longname});
            if (classes.length) {
                generate('Class: ' + classes[0].name, classes, helper.longnameToUrl[longname]);
            }
    
            var modules = taffy(members.modules);
            modules = helper.find(modules, {longname: longname});
            if (modules.length) {
                generate('Module: ' + modules[0].name, modules, helper.longnameToUrl[longname]);
            }
        
            var namespaces = taffy(members.namespaces);
            namespaces = helper.find(namespaces, {longname: longname});
            if (namespaces.length) {
                generate('Namespace: ' + namespaces[0].name, namespaces, helper.longnameToUrl[longname]);
            }
        
            var mixins = taffy(members.mixins);
            mixins = helper.find(mixins, {longname: longname});
            if (mixins.length) {
                generate('Mixin: ' + mixins[0].name, mixins, helper.longnameToUrl[longname]);
            }
    
            var externals = taffy(members.externals);
            externals = helper.find(externals, {longname: longname});
            if (externals.length) {
                generate('External: ' + externals[0].name, externals, helper.longnameToUrl[longname]);
            }
        }
    }

    if (members.globals.length) { generate('Global', members.globals, 'global.html'); }
    
    // index page displays information from package.json and lists files
    var files = find({kind: 'file'}),
        packages = find({kind: 'package'});

    generate('Index',
		packages.concat(
            [{kind: 'mainpage', readme: opts.readme, longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page'}]
		).concat(files),
	'index.html');
    
    // TODO: move the tutorial functions to templateHelper.js
    function generateTutorial(title, tutorial, filename) {
        var tutorialData = {
            title: title,
            header: tutorial.title,
            content: tutorial.parse(),
            children: tutorial.children
        };
        
        var tutorialPath = path.join(outdir, filename),
            html = view.render('tutorial.tmpl', tutorialData);
        
        // yes, you can use {@link} in tutorials too!
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
        
        fs.writeFileSync(tutorialPath, html);
    }
    
    // tutorials can have only one parent so there is no risk for loops
    function saveChildren(node) {
        node.children.forEach(function(child) {
            generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
            saveChildren(child);
        });
    }
    saveChildren(tutorials);
};
