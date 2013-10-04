/**
 * @module jsdoc/src/handlers
 */


var currentModule = null;

function getNewDoclet(comment, e) {
    var jsdoc = {doclet: require('jsdoc/doclet')};
    var util = require('util');
    var err;

    try {
        return new jsdoc.doclet.Doclet(comment, e);
    }
    catch (error) {
        err = new Error( util.format('cannot create a doclet for the comment "%s": %s',
            comment.replace(/[\r\n]/g, ''), error.message) );
        require('jsdoc/util/error').handle(err);
        return new jsdoc.doclet.Doclet('', e);
    }
}

/**
 * Attach these event handlers to a particular instance of a parser.
 * @param parser
 */
exports.attachTo = function(parser) {
    var jsdoc = {doclet: require('jsdoc/doclet'), name: require('jsdoc/name')};
    
    // handles JSDoc comments that include a @name tag -- the code is ignored in such a case
    parser.on('jsdocCommentFound', function(e) {
        var newDoclet = getNewDoclet(e.comment, e);

        if (!newDoclet.name) {
            return false; // only interested in virtual comments (with a @name) here
        }

        addDoclet.call(this, newDoclet);
        if (newDoclet.kind === 'module') {
            currentModule = newDoclet.longname;
        }
        e.doclet = newDoclet;

        //resolveProperties(newDoclet);
    });

    // handles named symbols in the code, may or may not have a JSDoc comment attached
    parser.on('symbolFound', function(e) {
        var subDoclets = e.comment.split(/@also\b/g);

        for (var i = 0, l = subDoclets.length; i < l; i++) {
            newSymbolDoclet.call(this, subDoclets[i], e);
        }
    });

    // TODO: for clarity, decompose into smaller functions
    function newSymbolDoclet(docletSrc, e) {
        var memberofName = null,
            newDoclet = getNewDoclet(docletSrc, e);

        // an undocumented symbol right after a virtual comment? rhino mistakenly connected the two
        if (newDoclet.name) { // there was a @name in comment
            // try again, without the comment
            e.comment = '@undocumented';
            newDoclet = getNewDoclet(e.comment, e);
        }

        if (newDoclet.alias) {
            if (newDoclet.alias === '{@thisClass}') {
                memberofName = this.resolveThis(e.astnode);

                // "class" refers to the owner of the prototype, not the prototype itself
                if ( /^(.+?)(\.prototype|#)$/.test(memberofName) ) {
                    memberofName = RegExp.$1;
                }
                newDoclet.alias = memberofName;
            }
            newDoclet.addTag('name', newDoclet.alias);
            newDoclet.postProcess();
        }
        else if (e.code && e.code.name) { // we need to get the symbol name from code
            newDoclet.addTag('name', e.code.name);
            if (!newDoclet.memberof && e.astnode) {
                var basename = null,
                    scope = '';
                if ( /^((module.)?exports|this)(\.|$)/.test(newDoclet.name) ) {
                    var nameStartsWith = RegExp.$1;

                    newDoclet.name = newDoclet.name.replace(/^(exports|this)(\.|$)/, '');

                    // like /** @module foo */ exports.bar = 1;
                    if (nameStartsWith === 'exports' && currentModule) {
                        memberofName = currentModule;
                        scope = 'static';
                    }
                    else if (newDoclet.name === 'module.exports' && currentModule) {
                        newDoclet.addTag('name', currentModule);
                        newDoclet.postProcess();
                    }
                    else {
                        // like /** @module foo */ exports = {bar: 1};
                        // or /** blah */ this.foo = 1;
                        memberofName = this.resolveThis(e.astnode);
                        scope = nameStartsWith === 'exports'? 'static' : 'instance';

                        // like /** @module foo */ this.bar = 1;
                        if (nameStartsWith === 'this' && currentModule && !memberofName) {
                            memberofName = currentModule;
                            scope = 'static';
                        }
                    }

                    if (memberofName) {
                        if (newDoclet.name) {
                            newDoclet.name = memberofName + (scope === 'instance'? '#' : '.') + newDoclet.name;
                        }
                        else { newDoclet.name = memberofName; }
                    }
                }
                else {
                    memberofName = this.astnodeToMemberof(e.astnode);
                    if( Array.isArray(memberofName) ) {
                        basename = memberofName[1];
                        memberofName = memberofName[0];
                    }
                }

                if (memberofName) {
                    newDoclet.addTag('memberof', memberofName);
                    if (basename) {
                        newDoclet.name = newDoclet.name.replace(new RegExp('^' + RegExp.escape(basename) + '.'), '');
                    }
                }
                else {
                    // add @inner and @memberof tags unless the current module exports only this symbol
                    if (currentModule && currentModule !== newDoclet.name) {
                        // add @inner unless the current module exports only this symbol
                        if (!newDoclet.scope) {
                            newDoclet.addTag('inner');
                        }

                        if (!newDoclet.memberof && newDoclet.scope !== 'global') {
                            newDoclet.addTag('memberof', currentModule);
                        }
                    }
                }
            }

            newDoclet.postProcess();
        }
        else {
            return false;
        }

        //resolveProperties(newDoclet);

        // set the scope to global unless a) the doclet is a memberof something or b) the current
        // module exports only this symbol
        if (!newDoclet.memberof && currentModule !== newDoclet.name) {
            newDoclet.scope = 'global';
        }

        addDoclet.call(this, newDoclet);
        e.doclet = newDoclet;
    }

    //parser.on('fileBegin', function(e) { });

    parser.on('fileComplete', function(e) {
        currentModule = null;
    });

    function addDoclet(newDoclet) {
        var e;
        if (newDoclet) {
            e = { doclet: newDoclet };
            this.emit('newDoclet', e);

            if ( !e.defaultPrevented && !filter(newDoclet) ) {                
                this.addResult(newDoclet);
            }
        }
    }

    function filter(doclet) {
        // you can't document prototypes
        if ( /#$/.test(doclet.longname) ) {
            return true;
        }
        // you can't document symbols added by the parser with a dummy name
        if (doclet.meta.code && doclet.meta.code.name === '____') {
            return true;
        }

        return false;
    }

    function resolveProperties(newDoclet) {}
};
