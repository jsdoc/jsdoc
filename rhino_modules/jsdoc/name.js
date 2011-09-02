/**
    A collection of functions relating to JSDoc symbol name manipulation.
    @module jsdoc/name
    @requires jsdoc/tag/dictionary
    @author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
    var jsdoc = {
            tagDictionary: require('jsdoc/tag/dictionary')
        };
    
    var puncToScope = { '.': 'static', '~': 'inner', '#': 'instance' },
        scopeToPunc = { 'static': '.', 'inner': '~', 'instance': '#' },
        Token  = Packages.org.mozilla.javascript.Token;
        
    /**
        Resolves the longname, memberof, variation and name values of the given doclet.
        @param {module:jsdoc/doclet.Doclet} doclet
     */
    exports.resolve = function(doclet) {

        var name = doclet.name,
            memberof = doclet.memberof || '',
            about = {},
            parentDoc;

        name = name? (''+name).replace(/\.prototype\.?/g, '#') : '';
        
        // member of a var in an outer scope?
        if (name && !memberof && doclet.meta.code && doclet.meta.code.funcscope) {
            name = doclet.longname = doclet.meta.code.funcscope + '~' + name;
        }

        if (memberof) { // @memberof tag given
            memberof = memberof.replace(/\.prototype\.?/g, '#');
            
            // the name is a fullname, like @name foo.bar, @memberof foo
            if (name && name.indexOf(memberof) === 0) {
                about = exports.shorten(name);
            }
            else if (name && /([#.~])$/.test(memberof) ) { // like @memberof foo# or @memberof foo~
                about = exports.shorten(memberof + name);
            }
            else if (name && doclet.scope ) { // like @memberof foo# or @memberof foo~
                about = exports.shorten(memberof + scopeToPunc[doclet.scope] + name);
            }
        }
        else { // no @memberof
             about = exports.shorten(name);
        }
        
        if (about.name) {
            doclet.name = about.name;
        }
        
        if (about.memberof) {
            doclet.setMemberof(about.memberof);
        }
        
        if (about.longname && !doclet.longname) {
            doclet.setLongname(about.longname);
        }
        
        if (doclet.scope === 'global') { // via @global tag?
            doclet.setLongname(doclet.name);
            delete doclet.memberof;
        }
        else if (about.scope) {
            if (about.memberof === '<global>') { // via @memberof <global> ?
                delete doclet.scope;
            }
            else {
                doclet.scope = puncToScope[about.scope];
            }
        }
        else {
            if (doclet.name && doclet.memberof && !doclet.longname) {
                doclet.scope = 'static'; // default scope when none is provided
                
                doclet.setLongname(doclet.memberof + scopeToPunc[doclet.scope] + doclet.name);
            }
        }
        
        if (about.variation) {
            doclet.variation = about.variation;
        }
    }
    
    /**
        @inner
        @memberof module:jsdoc/name
        @param {string} name
        @param {string} kind
        @returns {string} The name with unsafe names enclosed in quotes.
     */
    function quoteUnsafe(name, kind) { // docspaced names may have unsafe characters which need to be quoted by us
        if ( (jsdoc.tagDictionary.lookUp(kind).setsDocletDocspace) && /[^$_a-zA-Z0-9\/]/.test(name) ) {
            if (!/^[a-z_$-\/]+:\"/i.test(name)) {
                return '"' + name.replace(/\"/g, '"') + '"';
            }
        }
        
        return name;
    }
    
    RegExp.escape = RegExp.escape || function(str) {
        var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
        return str.replace(specials, "\\$&");
    }
    
    /**
        @method module:jsdoc/name.applyNamespace
        @param {string} longname The full longname of the symbol.
        @param {string} ns The namespace to be applied.
        @returns {string} The longname with the namespace applied.
     */
    exports.applyNamespace = function(longname, ns) {
        var nameParts = exports.shorten(longname),
            name = nameParts.name,
            longname = nameParts.longname;

        if ( !/^[a-zA-Z]+?:.+$/i.test(name) ) {
            longname = longname.replace( new RegExp(RegExp.escape(name)+'$'), ns + ':' + name );
        }
        
        return longname;
    }
    
    /**
        Given a longname like "a.b#c(2)", slice it up into ["a.b", "#", 'c', '2'],
        representing the memberof, the scope, the name, and variation.
        @param {string} longname
        @returns {object} Representing the properties of the given name.
     */
    exports.shorten = function(longname) {
        // quoted strings in a longname are atomic, convert to tokens
        var atoms = [], token; 
        
        // handle quoted names like foo["bar"]
        longname = longname.replace(/(\[?".+?"\]?)/g, function($) {
            var dot = '';
            if ( /^\[/.test($) ) {
                dot = '.';
                $ = $.replace( /^\[/g, '' ).replace( /\]$/g, '' );
            }
            
            token = '@{' + atoms.length + '}@';
            atoms.push($);

            return dot + token; // foo["bar"] => foo.@{1}@
        });

        longname = longname.replace( /\.prototype\.?/g, '#' );     
            
        var parts = longname?
                    (longname.match( /^(:?(.+)([#.~]))?(.+?)$/ ) || []).reverse()
                    : [''];
        
        var name = parts[0] || '', // ensure name is always initialised to avoid error being thrown when calling replace on undefined [gh-24]
            scope = parts[1] || '', // ., ~, or #
            memberof = parts[2] || '',
            variation;
        
        // like /** @name foo.bar(2) */
        if ( /(.+)\(([^)]+)\)$/.test(name) ) {
            name = RegExp.$1, variation = RegExp.$2;
        }
        
        //// restore quoted strings back again
        var i = atoms.length;
        while (i--) {
            longname = longname.replace('@{'+i+'}@', atoms[i]);
            memberof = memberof.replace('@{'+i+'}@', atoms[i]);
            scope    = scope.replace('@{'+i+'}@', atoms[i]);
            name     = name.replace('@{'+i+'}@', atoms[i]);
        }

        ////
        return {longname: longname, memberof: memberof, scope: scope, name: name, variation: variation};
    }
    
})();