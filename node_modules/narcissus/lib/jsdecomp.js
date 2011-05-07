/* vim: set sw=4 ts=4 et tw=78: */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is the Narcissus JavaScript engine.
 *
 * The Initial Developer of the Original Code is
 * Brendan Eich <brendan@mozilla.org>.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Shu-Yu Guo <shu@rfrn.org>
 *   Bruno Jouhier
 *   Gregor Richards
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/*
 * Narcissus - JS implemented in JS.
 *
 * Decompiler and pretty-printer.
 */

Narcissus.decompiler = (function() {

    const parser = Narcissus.parser;
    const definitions = Narcissus.definitions;
    const tokens = definitions.tokens;

    // Set constants in the local scope.
    eval(definitions.consts);

    function indent(n, s) {
        var ss = "", d = true;

        for (var i = 0, j = s.length; i < j; i++) {
            if (d)
                for (var k = 0; k < n; k++)
                    ss += " ";
            ss += s[i];
            d = s[i] === '\n';
        }

        return ss;
    }

    function isBlock(n) {
        return n && (n.type === BLOCK);
    }

    function isNonEmptyBlock(n) {
        return isBlock(n) && n.children.length > 0;
    }

    function nodeStr(n) {
        return '"' +
               n.value.replace(/\\/g, "\\\\")
                      .replace(/"/g, "\\\"")
                      .replace(/\n/g, "\\n")
                      .replace(/\r/g, "\\r") +
               '"';
    }

    function pp(n, d, inLetHead) {
        var topScript = false;

        if (!n)
            return "";
        if (!(n instanceof Object))
            return n;
        if (!d) {
            topScript = true;
            d = 1;
        }

        var p = "";

        if (n.parenthesized)
            p += "(";

        switch (n.type) {
          case FUNCTION:
          case GETTER:
          case SETTER:
            if (n.type === FUNCTION)
                p += "function";
            else if (n.type === GETTER)
                p += "get";
            else
                p += "set";

            p += (n.name ? " " + n.name : "") + "(";
            for (var i = 0, j = n.params.length; i < j; i++)
                p += (i > 0 ? ", " : "") + pp(n.params[i], d);
            p += ") " + pp(n.body, d);
            break;

          case SCRIPT:
          case BLOCK:
            var nc = n.children;
            if (topScript) {
                // No indentation.
                for (var i = 0, j = nc.length; i < j; i++) {
                    if (i > 0)
                        p += "\n";
                    p += pp(nc[i], d);
                    var eoc = p[p.length - 1];
                    if (eoc != ";")
                        p += ";";
                }

                break;
            }

            p += "{";
            if (n.id !== undefined)
                p += " /* " + n.id + " */";
            p += "\n";
            for (var i = 0, j = nc.length; i < j; i++) {
                if (i > 0)
                    p += "\n";
                p += indent(4, pp(nc[i], d));
                var eoc = p[p.length - 1];
                if (eoc != ";")
                    p += ";";
            }
            p += "\n}";
            break;

          case LET_BLOCK:
            p += "let (" + pp(n.variables, d, true) + ") ";
            if (n.expression)
                p += pp(n.expression, d);
            else
                p += pp(n.block, d);
            break;

          case IF:
            p += "if (" + pp(n.condition, d) + ") ";

            var tp = n.thenPart, ep = n.elsePart;
            var b = isBlock(tp) || isBlock(ep);
            if (!b)
                p += "{\n";
            p += (b ? pp(tp, d) : indent(4, pp(tp, d))) + "\n";

            if (ep) {
                if (!b)
                    p += "} else {\n";
                else
                    p += " else ";

                p += (b ? pp(ep, d) : indent(4, pp(ep, d))) + "\n";
            }
            if (!b)
                p += "}";
            break;

          case SWITCH:
            p += "switch (" + pp(n.discriminant, d) + ") {\n";
            for (var i = 0, j = n.cases.length; i < j; i++) {
                var ca = n.cases[i];
                if (ca.type === CASE)
                    p += "  case " + pp(ca.caseLabel, d) + ":\n";
                else
                    p += "  default:\n";
                ps = pp(ca.statements, d);
                p += ps.slice(2, ps.length - 2) + "\n";
            }
            p += "}";
            break;

          case FOR:
            p += "for (" + pp(n.setup, d) + "; "
                         + pp(n.condition, d) + "; "
                         + pp(n.update, d) + ") ";

            var pb = pp(n.body, d);
            if (!isBlock(n.body))
                p += "{\n" + indent(4, pb) + ";\n}";
            else if (n.body)
                p += pb;
            break;

          case WHILE:
            p += "while (" + pp(n.condition, d) + ") ";

            var pb = pp(n.body, d);
            if (!isBlock(n.body))
                p += "{\n" + indent(4, pb) + ";\n}";
            else
                p += pb;
            break;

          case FOR_IN:
            var u = n.varDecl;
            p += n.isEach ? "for each (" : "for (";
            p += (u ? pp(u, d) : pp(n.iterator, d)) + " in " +
                 pp(n.object, d) + ") ";

            var pb = pp(n.body, d);
            if (!isBlock(n.body))
                p += "{\n" + indent(4, pb) + ";\n}";
            else if (n.body)
                p += pb;
            break;

          case DO:
            p += "do " + pp(n.body, d);
            p += " while (" + pp(n.condition, d) + ");";
            break;

          case BREAK:
            p += "break" + (n.label ? " " + n.label : "") + ";";
            break;

          case CONTINUE:
            p += "continue" + (n.label ? " " + n.label : "") + ";";
            break;

          case TRY:
            p += "try ";
            p += pp(n.tryBlock, d);
            for (var i = 0, j = n.catchClauses.length; i < j; i++) {
                var t = n.catchClauses[i];
                p += " catch (" + pp(t.varName, d) +
                                (t.guard ? " if " + pp(t.guard, d) : "") +
                                ") ";
                p += pp(t.block, d);
            }
            if (n.finallyBlock) {
                p += " finally ";
                p += pp(n.finallyBlock, d);
            }
            break;

          case THROW:
            p += "throw " + pp(n.exception, d);
            break;

          case RETURN:
            p += "return";
            if (n.value)
              p += " " + pp(n.value, d);
            break;

          case YIELD:
            p += "yield";
            if (n.value.type)
              p += " " + pp(n.value, d);
            break;

          case GENERATOR:
            p += pp(n.expression, d) + " " + pp(n.tail, d);
            break;

          case WITH:
            p += "with (" + pp(n.object, d) + ") ";
            p += pp(n.body, d);
            break;

          case LET:
          case VAR:
          case CONST:
            var nc = n.children;
            if (!inLetHead) {
                p += tokens[n.type] + " ";
            }
            for (var i = 0, j = nc.length; i < j; i++) {
                if (i > 0)
                    p += ", ";
                var u = nc[i];
                p += pp(u.name, d);
                if (u.initializer)
                    p += " = " + pp(u.initializer, d);
            }
            break;

          case DEBUGGER:
            p += "debugger NYI\n";
            break;

          case SEMICOLON:
            if (n.expression) {
                p += pp(n.expression, d) + ";";
            }
            break;

          case LABEL:
            p += n.label + ":\n" + pp(n.statement, d);
            break;

          case COMMA:
          case LIST:
            var nc = n.children;
            for (var i = 0, j = nc.length; i < j; i++) {
                if (i > 0)
                    p += ", ";
                p += pp(nc[i], d);
            }
            break;

          case ASSIGN:
            var nc = n.children;
            var t = n.assignOp;
            p += pp(nc[0], d) + " " + (t ? tokens[t] : "") + "="
                              + " " + pp(nc[1], d);
            break;

          case HOOK:
            var nc = n.children;
            p += "(" + pp(nc[0], d) + " ? "
                     + pp(nc[1], d) + " : "
                     + pp(nc[2], d);
            p += ")";
            break;

          case OR:
          case AND:
            var nc = n.children;
            p += "(" + pp(nc[0], d) + " " + tokens[n.type] + " "
                     + pp(nc[1], d);
            p += ")";
            break;

          case BITWISE_OR:
          case BITWISE_XOR:
          case BITWISE_AND:
          case EQ:
          case NE:
          case STRICT_EQ:
          case STRICT_NE:
          case LT:
          case LE:
          case GE:
          case GT:
          case IN:
          case INSTANCEOF:
          case LSH:
          case RSH:
          case URSH:
          case PLUS:
          case MINUS:
          case MUL:
          case DIV:
          case MOD:
            var nc = n.children;
            p += "(" + pp(nc[0], d) + " " + tokens[n.type] + " "
                     + pp(nc[1], d) + ")";
            break;

          case DELETE:
          case VOID:
          case TYPEOF:
            p += tokens[n.type] + " "  + pp(n.children[0], d);
            break;

          case NOT:
          case BITWISE_NOT:
            p += tokens[n.type] + pp(n.children[0], d);
            break;

          case UNARY_PLUS:
            p += "+" + pp(n.children[0], d);
            break;

          case UNARY_MINUS:
            p += "-" + pp(n.children[0], d);
            break;

          case INCREMENT:
          case DECREMENT:
            if (n.postfix) {
                p += pp(n.children[0], d) + tokens[n.type];
            } else {
                p += tokens[n.type] + pp(n.children[0], d);
            }
            break;

          case DOT:
            var nc = n.children;
            p += pp(nc[0], d) + "." + pp(nc[1], d);
            break;

          case INDEX:
            var nc = n.children;
            p += pp(nc[0], d) + "[" + pp(nc[1], d) + "]";
            break;

          case CALL:
            var nc = n.children;
            p += pp(nc[0], d) + "(" + pp(nc[1], d) + ")";
            break;

          case NEW:
          case NEW_WITH_ARGS:
            var nc = n.children;
            p += "new " + pp(nc[0], d);
            if (nc[1])
                p += "(" + pp(nc[1], d) + ")";
            break;

          case ARRAY_INIT:
            p += "[";
            var nc = n.children;
            for (var i = 0, j = nc.length; i < j; i++) {
                if(nc[i])
                    p += pp(nc[i], d);
                p += ","
            }
            p += "]";
            break;

          case ARRAY_COMP:
            p += "[" + pp (n.expression, d) + " ";
            p += pp(n.tail, d);
            p += "]";
            break;

          case COMP_TAIL:
            var nc = n.children;
            for (var i = 0, j = nc.length; i < j; i++) {
                if (i > 0)
                    p += " ";
                p += pp(nc[i], d);
            }
            if (n.guard)
                p += " if (" + pp(n.guard, d) + ")";
            break;

          case OBJECT_INIT:
            var nc = n.children;
            if (nc[0] && nc[0].type === PROPERTY_INIT)
                p += "{\n";
            else
                p += "{";
            for (var i = 0, j = nc.length; i < j; i++) {
                if (i > 0) {
                    p += ",\n";
                }

                var t = nc[i];
                if (t.type === PROPERTY_INIT) {
                    var tc = t.children;
                    var l;
                    // see if the left needs to be a string
                    if (tc[0].value === "" || /[^A-Za-z0-9_$]/.test(tc[0].value)) {
                        l = nodeStr(tc[0]);
                    } else {
                        l = pp(tc[0], d);
                    }
                    p += indent(4, l) + ": " +
                         indent(4, pp(tc[1], d)).substring(4);
                } else {
                    p += indent(4, pp(t, d));
                }
            }
            p += "\n}";
            break;

          case NULL:
            p += "null";
            break;

          case THIS:
            p += "this";
            break;

          case TRUE:
            p += "true";
            break;

          case FALSE:
            p += "false";
            break;

          case IDENTIFIER:
          case NUMBER:
          case REGEXP:
            p += n.value;
            break;

          case STRING:
            p += nodeStr(n);
            break;

          case GROUP:
            p += "(" + pp(n.children[0], d) + ")";
            break;

          default:
            throw "PANIC: unknown operation " + tokens[n.type] + " " + n.toSource();
        }

        if (n.parenthesized)
            p += ")";

        return p;
    }

    return {
        pp: pp
    };

}());
