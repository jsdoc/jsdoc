/**
 * @module jsdoc/src/jquery.ui.widget.visitor
 */

function extend(obj, extObj) {
    if (arguments.length > 2) {
        for (var a = 1; a < arguments.length; a++) {
            extend(obj, arguments[a]);
        }
    } else {
        for (var field in extObj) {
            obj[field] = extObj[field];
        }
    }
    return obj;
};

var base = require("jsdoc/src/defaultvisitor").NodeVisitor,
    Token = Packages.org.mozilla.javascript.Token,
    parser = require("jsdoc/src/parser").Parser;

exports.NodeVisitor = extend({}, base, {
    visitOtherNode: function(node) {
        var e,
            commentSrc,
            currentParser = parser.currentParser,
            currentSourceName = parser.currentSourceName,
            visitor = currentParser.getVisitor();
        if (node.type == Token.GETPROP) {
            var src = node.toSource(),
                parent = node.getParent();
            if (src == "$.widget" && parent && parent.type == Token.CALL) {
                e = {
                    id: 'astnode'+parent.hashCode(), // the id of the call node
                    comment: String(parent.jsDoc||'@undocumented'),
                    lineno: parent.getLineno(),
                    filename: currentSourceName,
                    astnode: parent,
                    code: aboutWidgetNode(parent)
                };
                //debugPrintNode(node);
                //debugPrintNodeEnclosure(node);
                if ( visitor.isValidJsdoc(e.comment) ) {
                    currentParser.fire('symbolFound', e, currentParser);
                }
                    
                if (e.doclet) {
                    currentParser.refs['astnode'+e.code.node.hashCode()] = e.doclet; // allow lookup from value => doclet
                }
            }
        }
    }
});

/**
 * Gets the name and type of the widget.
 * @private
 * @memberof module:plugins/jquery.ui.widget.visitor.NodeVisitor
 */
function aboutWidgetNode(node) {
    var name = node.getArguments().get(0).toSource(),
        about = {
            "name": "" + name.substring(1, name.length() - 1),
            "type": "widget",
            "node": node
        };
    return about;
}

function debugPrintNode(node, printSource) {
    try {
        if (printSource) {
            console.log(node.getLineno() + ": " + Token.typeToName(node.type) + "- " + node.toSource());    
        } else {
            console.log(node.getLineno() + ": " + Token.typeToName(node.type));
        }
    } catch(e) {
        console.log("ERROR on line " + node.getLineno() + " - type: " + node.type);
    }
}

function debugPrintNodeEnclosure(node) {
    console.log("Function: " + (node.getEnclosingFunction() && node.getEnclosingFunction().getName()));
    console.log("Scope: " + node.getEnclosingScope());
    console.log("Parent: " + (node.getParent() && Token.typeToName(node.getParent().type)));
    console.log("Left: " + Token.typeToName(node.left.type) + " - " + node.left.toSource());
    console.log("Right: " + Token.typeToName(node.right.type) + " - " + node.right.toSource());
    console.log("jsdoc: " + node.jsdoc);
}
