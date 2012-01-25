/**
 * @module jsdoc/src/defaultvisitor
 */

var Token = Packages.org.mozilla.javascript.Token,
    parser = require("jsdoc/src/parser").Parser,
    tkn = parser.tkn;

/**
 * Contains functions that do the bulk of the parsing work, visiting each of the
 * nodes in the ast and finding those nodes relevant to documentation.  It can 
 * be extended or overridden to support additional documentation requirements.
 * For instance, to handle the "$.widget()" calls of the jQuery UI widget paradigm.
 * 
 */
exports.NodeVisitor = {
    
    visitScriptNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();
    
        // note: ALL comments are seen in this block...
        for each(var comment in node.comments.toArray()) {
            if (comment.commentType !== Token.CommentType.JSDOC) {
                continue;
            }
            
            if (commentSrc = ''+comment.toSource()) {
    
                e = {
                    comment: commentSrc,
                    lineno: comment.getLineno(),
                    filename: currentSourceName
                };
                
                if ( visitor.isValidJsdoc(commentSrc) ) {
                    currentParser.fire('jsdocCommentFound', e, currentParser);
                }
            }
        }
    },

    visitAssignNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();
        e = {
            id: 'astnode'+node.hashCode(), // the id of the ASSIGN node
            comment: String(node.jsDoc||'@undocumented'),
            lineno: node.left.getLineno(),
            filename: currentSourceName,
            astnode: node,
            code: visitor.aboutNode(node)
        };
        
        var basename = e.code.name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
        
        if (basename !== 'this') e.code.funcscope = currentParser.resolveVar(node, basename);
    
        if ( visitor.isValidJsdoc(e.comment) ) {
            currentParser.fire('symbolFound', e, currentParser);
        }
        
        if (e.doclet) {
            currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
        }
    },
    
    visitColonNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();
        e = {
            id: 'astnode'+node.hashCode(), // the id of the COLON node
            comment: String(node.left.jsDoc||'@undocumented'),
            lineno: node.left.getLineno(),
            filename: currentSourceName,
            astnode: node,
            code: visitor.aboutNode(node)
        };
        
        if ( visitor.isValidJsdoc(e.comment) ) {
            currentParser.fire('symbolFound', e, currentParser);
        }
        
        if (e.doclet) {
            currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
        }
        
        var parent = currentParser.resolvePropertyParent(node);
        if (parent && parent.doclet.isEnum) {
            if (!parent.doclet.properties) { parent.doclet.properties = []; }
            // members of an enum inherit the enum's type
            if (parent.doclet.type && !e.doclet.type) { e.doclet.type = parent.doclet.type; }
            delete e.doclet.undocumented;
            e.doclet.defaultvalue = e.doclet.meta.code.value;
            parent.doclet.properties.push(e.doclet);
        }
    },
    
    visitVarNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();
        if (node.variables) {
            return true; // we'll get each var separately on future visits
        }
        
        if (node.parent.variables.toArray()[0] === node) { // like /** blah */ var a=1, b=2, c=3;
            // the first var assignment gets any jsDoc before the whole var series
            node.jsDoc = node.parent.jsDoc;
        }
    
        e = {
            id: 'astnode'+node.hashCode(), // the id of the VARIABLE node
            comment: String(node.jsDoc||'@undocumented'),
            lineno: node.getLineno(),
            filename: currentSourceName,
            astnode: node,
            code: visitor.aboutNode(node)
        };
    
        // keep track of vars in a function scope
        if (node.enclosingFunction) {
            var func = 'astnode'+node.enclosingFunction.hashCode(),
            funcDoc = currentParser.refs[func];
    
            if (funcDoc) {
                funcDoc.meta.vars = funcDoc.meta.vars || [];
                funcDoc.meta.vars.push(e.code.name);
            }
        }
    
        if ( visitor.isValidJsdoc(e.comment) ) {
            currentParser.fire('symbolFound', e, currentParser);
        }
        
        if (e.doclet) {
            currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
        }
    },
    
    visitFunctionNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();
        e = {
            id: 'astnode'+node.hashCode(), // the id of the FUNCTION node
            comment: String(node.jsDoc||'@undocumented'),
            lineno: node.getLineno(),
            filename: currentSourceName,
            astnode: node,
            code: visitor.aboutNode(node)
        };
        
        e.code.name = (node.type == tkn.NAMEDFUNCTIONTATEMENT)? '' : String(node.name) || '';
    //console.log(':: e.code.name is '+e.code.name);        
        // keep track of vars in a function scope
        if (node.enclosingFunction) {
            var func = 'astnode'+node.enclosingFunction.hashCode(),
            funcDoc = currentParser.refs[func];
    
            if (funcDoc) {
                funcDoc.meta.vars = funcDoc.meta.vars || [];
                funcDoc.meta.vars.push(e.code.name);
            }
        }
        
        var basename = e.code.name.replace(/^([$a-z_][$a-z_0-9]*).*?$/i, '$1');
        e.code.funcscope = currentParser.resolveVar(node, basename);
    
        if ( visitor.isValidJsdoc(e.comment) ) {
            currentParser.fire('symbolFound', e, currentParser);
        }
    
        if (e.doclet) {
            currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
        }
        else if (!currentParser.refs['astnode'+e.code.node.hashCode()]) { // keep references to undocumented anonymous functions too as they might have scoped vars
            currentParser.refs['astnode'+e.code.node.hashCode()] = {
                longname: '<anonymous>',
                meta: { code: e.code }
            };
        }
    },
    
    visitOtherNode: function(node) {
        //no-op
    },
    
    visitNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();

        // look for stand-alone doc comments
        if (node.type === Token.SCRIPT && node.comments) {
            visitor.visitScriptNode(node);
        }
        else if (node.type === Token.ASSIGN) {
            visitor.visitAssignNode(node);
        }
        else if (node.type === Token.COLON) { // assignment within an object literal
            visitor.visitColonNode(node);
        }
        else if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {
            visitor.visitVarNode(node);
        }
        else if (node.type == Token.FUNCTION || node.type == tkn.NAMEDFUNCTIONTATEMENT) {
            visitor.visitFunctionNode(node);
        }
        else  {
            visitor.visitOtherNode(node);
        }

        return true;
    },
    isValidJsdoc: function(commentSrc) {
        return commentSrc.indexOf('/***') !== 0; /*** ignore comments that start with many stars ***/
    },
    /**
     * Attempts to find the name and type of the given node.
     */
    aboutNode: function(node) {
        about = {};
        
        if (node.type == Token.FUNCTION || node.type == tkn.NAMEDFUNCTIONTATEMENT) {
            about.name = node.type == tkn.NAMEDFUNCTIONTATEMENT? '' : '' + node.name;
            about.type = 'function';
            about.node = node;
        }
        else if (node.type == Token.VAR || node.type == Token.LET || node.type == Token.CONST) {
            about.name = nodeToString(node.target);
            if (node.initializer) {  // like var i = 0;
                about.node = node.initializer;
                about.value = nodeToString(about.node);
                about.type = getTypeName(node.initializer);
                if (about.type === 'FUNCTION' && about.node.name) {
                    about.node.type = tkn.NAMEDFUNCTIONTATEMENT;
                }
            }
            else { // like var i;
                about.node = node.target;
                about.value = nodeToString(about.node);
                about.type = 'undefined';
            }
        }
        else if (node.type === Token.ASSIGN || node.type === Token.COLON) {
            about.name = nodeToString(node.left);
            if (node.type === Token.COLON) {
    
                 // objlit keys with unsafe variable-name characters must be quoted
                if (!/^[$_a-z][$_a-z0-9]*$/i.test(about.name) ) {
                    about.name = '"'+about.name.replace(/"/g, '\\"')+'"';
                }
            }
            about.node = node.right;
            about.value = nodeToString(about.node);
            about.type = getTypeName(node.right);
            
            if (about.type === 'FUNCTION' && about.node.name) {
                about.node.type = tkn.NAMEDFUNCTIONTATEMENT;
            }
        }
        else {
            // type 39 (NAME)
            var string = nodeToString(node);
            if (string) {
                about.name = string;
            }
        }
        
        // get names of the formal parameters declared for this function
        if (about.node && about.node.getParamCount) {
            var paramCount = about.node.getParamCount();
            if (typeof paramCount === 'number') {
                about.node.flattenSymbolTable(true);
                var paramNames = [];
                for (var i = 0, len = paramCount; i < len; i++) {
                    paramNames.push(''+about.node.getParamOrVarName(i));
                }
                about.paramnames = paramNames;
            }
        }
            
        return about;
    }
}



/** @private
 *  @memberof module:src/defaultvisitor.NodeVisitor
 */
function nodeToString(node) {
    var str;
    
    if (!node) return;
    
    if (node.type === Token.GETPROP) {
        str = [nodeToString(node.target), node.property.string].join('.');
    }
    else if (node.type === Token.VAR) {
        str = nodeToString(node.target)
    }
    else if (node.type === Token.NAME) {
        str = node.string;
    }
    else if (node.type === Token.STRING) {
        str = node.value;
    }
    else if (node.type === Token.NUMBER) {
        str = node.value;
    }
    else if (node.type === Token.THIS) {
        str = 'this';
    }
    else if (node.type === Token.GETELEM) {
        str = node.toSource(); // like: Foo['Bar']
    }
    else if (node.type === Token.NEG || node.type === Token.TRUE || node.type === Token.FALSE) {
        str = node.toSource(); // like -1
    }
    else {
        str = getTypeName(node);
    }
    
    return '' + str;
};

/** @private
 *    @memberof module:src/defaultvisitor.NodeVisitor
 */
function getTypeName(node) {
    var type = '';
    
    if (node) {
        type = ''+ Packages.org.mozilla.javascript.Token.typeToName(node.getType());
    }
    
    return type;
}