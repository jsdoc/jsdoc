/* -*- Mode: JS; tab-width: 4; indent-tabs-mode: nil; -*-
 * vim: set sw=4 ts=4 et tw=78:
 * ***** BEGIN LICENSE BLOCK *****
 *
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
 * Portions created by the Initial Developer are Copyright (C) 2004
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Dave Herman <dherman@mozilla.com>
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
 * Static variable and module resolution for Harmony.
 */

Narcissus.resolver = (function() {
    const definitions = Narcissus.definitions;
    const parser = Narcissus.parser;

    const StringMap = definitions.StringMap;
    const Module = parser.Module;

    // Set constants in the local scope.
    eval(definitions.consts);

    const PRE_DEF = 0, VAR_DEF = 1, FUN_DEF = 2, ARG_DEF = 3, CATCH_DEF = 4;
    const MODULE_DEF = 5, IMPORT_DEF = 6;
    // BUG 620816: const CONST_DEF = 7, LET_DEF = 8;

    const DEF_TYPE_NAMES = ["global", "var", "function", "argument", "catch", "module", "import"];

    function Def(type, binding) {
        this.type = type || PRE_DEF;
        this.binding = binding || null;
    }

    Def.prototype = {
        toString: function() {
            return "[object Def[" + DEF_TYPE_NAMES[this.type] + "]]";
        }
    };

    const GLOBAL_FRAME = 0, MODULE_FRAME = 1, FUNCTION_FRAME = 2, CATCH_FRAME = 3;
    // BUG 620816: const BLOCK_FRAME = 4, REST_FRAME = 5;

    function StaticEnv(parent, type, frame) {
        this.parent = parent || null;
        this.type = type || GLOBAL_FRAME;
        this.frame = frame || new StringMap();
        // cache the nearest enclosing script frame
        this.scriptFrame = this.isScriptFrame() ? this : parent.scriptFrame;
    }

    StaticEnv.prototype = {
        isScriptFrame: function() {
            // global, module, or function frame
            return this.type < CATCH_FRAME;
        },

        bind: function(x, def) {
            this.frame.set(x, def);
        },

        bindUnique: function(x, def) {
            if (this.frame.has(x))
                throw new ReferenceError("duplicate definitions for binding " + x);
            this.frame.set(x, def);
        },

        lookup: function(x) {
            let env = this;
            while (env && !env.frame.has(x))
                env = env.parent;
            let def = env && env.frame.get(x);
            if (!def)
                throw new ReferenceError("unbound reference to " + x);
            return def;
        },

        hoistBarrier: function(x) {
            let env = this;
            while (!env.isScriptFrame()) {
                if (env.frame.has(x))
                    return env.frame.get(x);
            }
            return null;
        },

        copy: function() {
            return new StaticEnv(this.parent, this.type, this.frame.copy());
        },

        dump: function() {
            var s = "[";
            for (var env = this; env; env = env.parent) {
                if (env !== this)
                    s += ", ";
                env += "[" + Object.keys(env.frame.table) + "]";
            }
            s += "]";
            return s;
        }
    };

    // resolve :: (SCRIPT node, StaticEnv) -> void
    function resolve(node, env) {
        resolveScript(node, env);
        node.modDefns.forEach(function(_, defn) {
            link(defn.module);
        });
    }

    // resolveScript :: (SCRIPT node, StaticEnv) -> void
    function resolveScript(node, env) {
        let funDecls = node.funDecls;
        for (let i = 0; i < funDecls.length; i++) {
            let decl = funDecls[i];
            env.bind(decl.name, new Def(FUN_DEF, decl));
        }

        let varDecls = node.varDecls;
        for (let i = 0; i < varDecls.length; i++) {
            let decl = varDecls[i];
            env.bind(decl.name, new Def(VAR_DEF, decl));
        }

        if (env.type !== FUNCTION_FRAME) {
            node.modDefns.forEach(function(id, defn) {
                env.bindUnique(id, new Def(MODULE_DEF, defn.module));
            });

            bindModuleRedeclarations(node.modDecls, env);
            bindModuleAssignments(node.modAssns, env);
            bindModuleLoads(node.modLoads, env);

            bindImports(node.impDecls, env);
        }

        resolveStatements(node, env);
    }

    // link :: (Module) -> void
    // link module exports to their bindings and parent/child relationships
    function link(mod) {
        // linkExport :: (Module, Export, Array[{ mod: Module, exp: Export }]) -> void
        function linkExport(mod, exp, visited) {
            if (exp.resolved)
                return exp.resolved;

            visited.push({ mod: mod, exp: exp });

            if (exp.node.type === IDENTIFIER) {
                resolvePath(exp.node, mod.env);
                exp.resolved = { module: mod, internalID: exp.node.value };
                return exp.resolved;
            }
            if (exp.isDefinition) {
                exp.resolved = { module: mod, internalID: exp.node.name };
                return exp.resolved;
            }

            var mod2 = resolveModulePath(mod.env, exp.node.children[0]);
            var exp2 = mod2.exports.get(exp.node.children[1].value);

            // BUG 620824: better error message
            if (visited.some(function(x) { return x.mod === mod2 && x.exp === exp2 }))
                throw new ReferenceError("cycle in module exports");

            exp.resolved = linkExport(mod2, exp2, visited);
            return exp.resolved;
        }

        mod.exports.forEach(function(_, exp) {
            linkExport(mod, exp, []);
        });

        var children = new StringMap();
        mod.node.body.modDefns.forEach(function(modID, defn) {
            var child = defn.module;
            children.set(modID, child);
            child.parent = mod;
            link(child);
        });
    }

    function resolveCatch(node, env) {
        let env2 = new StaticEnv(env, CATCH_FRAME);

        // BUG 620819: handle destructuring
        env2.bind(node.varName, new Def(CATCH_DEF, node));
        if (node.guard)
            resolveExpression(node.guard, env2);
        resolveStatement(node.block, env2);
    }

    // resolveModulePath :: (env, (IDENTIFIER | DOT) node) -> Module
    function resolveModulePath(env, path) {
        if (path.type === IDENTIFIER) {
            var def = env.lookup(path.value);
            if (def.type !== MODULE_DEF)
                throw new ReferenceError(path.value + " is not a module");
            path.denotedModule = def.binding;
            return def.binding;
        }

        var mod = resolveModulePath(env, path.children[0]);
        var name = path.children[1].value;
        // BUG 620824: better error message
        if (!mod.exportedModules.has(name))
            throw new ReferenceError("no exported module '" + name + "'");

        var mod2 = mod.exportedModules.get(name).module;
        path.denotedModule = mod2;
        return mod2;
    }

    function bindImports(impDecls, env) {
        for (let i = 0; i < impDecls.length; i++) {
            let list = impDecls[i].pathList;
            for (let j = 0; j < list.length; j++)
                bindImport(list[j], env);
        }
    }

    // bindImport :: (DOT node, env) -> void
    function bindImport(decl, env) {
        var m = resolveModulePath(env, decl.children[0]);
        var rhs = decl.children[1];

        function bind(importID, exportID) {
            if (m.exportedModules.has(exportID))
                throw new ReferenceError("'import' cannot bind modules; use 'module' instead");
            if (!m.exports.has(exportID))
                throw new ReferenceError("export " + exportID + " not found in " + m.displayName);
            env.bindUnique(importID, new Def(IMPORT_DEF, { module: m, id: exportID }));
        }

        if (rhs.type === IDENTIFIER) {
            if (rhs.value === "*") {
                m.exports.forEach(function(exportID, exp) {
                    if (!m.exportedModules.has(exportID))
                        env.bindUnique(exportID, new Def(IMPORT_DEF, { module: m, id: exportID }));
                });
            } else {
                bind(rhs.value, rhs.value);
            }
            return;
        }

        for (var i = 0; i < rhs.children.length; i++) {
            var pair = rhs.children[i];
            bind(pair.children[1].value, pair.children[0].value);
        }
    }

    // pathHead :: (module path node) -> string
    function pathHead(path) {
        while (path.type === DOT)
            path = path.children[0];
        return path.value;
    }

    function cycleToString(map) {
        var s = "";
        map.forEach(function(key) {
            if (s !== "")
                s += ", ";
            s += key;
        });
        return s;
    }

    function bindModuleRedeclarations(modDecls, env) {
        modDecls.forEach(function(name, node) {
            let def = env.lookup(name);
            if (def.type !== MODULE_DEF)
                throw new ReferenceError("attempt to redeclare variable " + name + " as a module");
            env.bindUnique(name, def);
        });
    }

    function bindModuleAssignments(modAssns, env) {
        var workSet = modAssns.copy();

        function bindAssn(assn, dependents) {
            let localID = assn.value;

            if (!assn.initializer) {
                env.bindUnique(localID, new Def(MODULE_DEF, resolveModulePath(env, localID)));
                return;
            }

            let headID = pathHead(assn.initializer);
            if (dependents.has(headID))
                throw new ReferenceError("cyclic dependency in module expression: " +
                                         cycleToString(dependents));
            if (workSet.has(headID)) {
                let assn2 = workSet.get(headID);
                workSet.remove(headID);
                dependents.set(headID, true);
                bindAssn(assn2, dependents);
            }

            env.bindUnique(localID, new Def(MODULE_DEF, resolveModulePath(env, assn.initializer)));
        }

        while (workSet.size > 0) {
            let id = workSet.choose();
            let assn = workSet.get(id);
            workSet.remove(id);
            let dependents = new StringMap();
            dependents.set(id, true);
            bindAssn(assn, dependents);
        }
    }

    function bindModuleLoads(modLoads, env) {
        modLoads.forEach(function(name, mrl) {
            throw new Error("NYI: bindModuleLoads");
        });
    }

    // resolveModule :: (MODULE node, StaticEnv) -> void
    function resolveModule(node, env) {
        if (node.body) {
            let env2 = new StaticEnv(env, MODULE_FRAME);
            node.module.env = env2;
            resolveScript(node.body, env2);
        }
    }

    // resolveFunction :: (FUNCTION node, StaticEnv) -> void
    function resolveFunction(node, env) {
        let env2 = new StaticEnv(env, FUNCTION_FRAME);
        if (node.name && node.functionForm === parser.EXPRESSED_FORM)
            env2.bind(node.name, new Def(FUN_DEF, node));

        // BUG 620819: handle destructuring
        for (let i = 0; i < node.params.length; i++)
            env2.bind(node.params[i], new Def(ARG_DEF));

        resolveScript(node.body, env2);
    }

    // resolveLHS :: (EXPR node, StaticEnv) -> void
    function resolveLHS(node, env) {
        // BUG 620819: handle destructuring
        if (node.type !== DOT && node.type !== INDEX && node.type !== IDENTIFIER)
            throw new SyntaxError("assignment to computed expression");

        var def = resolvePath(node, env);
        if (def)
            throw new SyntaxError("assignment to imported variable: " + def);
    }

    function isDirectEval(node) {
        return node.type === IDENTIFIER && node.value === "eval";
    }

    // resolveExpression :: (EXPR node, StaticEnv) -> void
    function resolveExpression(node, env) {
        if (!node)
            return;

        switch (node.type) {
          case FUNCTION:
            resolveFunction(node, env);
            break;

          case ASSIGN:
            resolveLHS(node.children[0], env);
            resolveExpression(node.children[1], env);
            break;

          case INCREMENT:
          case DECREMENT:
            resolveLHS(node.children[0], env);
            break;

          case IDENTIFIER:
          case DOT:
          case INDEX:
            resolvePath(node, env);
            break;

          case HOOK:
            resolveExpression(node.children[0], env);
            resolveExpression(node.children[1], env);
            resolveExpression(node.children[2], env);
            break;

          case OR:
          case AND:
          case BITWISE_OR:
          case BITWISE_XOR:
          case BITWISE_AND:
          case EQ:
          case NE:
          case STRICT_EQ:
          case STRICT_NE:
          case LT:
          case LE:
          case GT:
          case GE:
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
            resolveExpression(node.children[0], env);
            resolveExpression(node.children[1], env);
            break;

          case DELETE:
            switch (node.children[0].type) {
              case IDENTIFIER:
                throw new SyntaxError("deleting a variable is deprecated");

              case DOT:
              case INDEX:
              {
                let def = resolvePath(node, env);
                if (def)
                    throw new SyntaxError("attempt to delete module import");
                break;
              }

              default:
                resolveExpression(node.children[0], env);
            }
            break;

          case VOID:
          case TYPEOF:
          case NOT:
          case BITWISE_NOT:
          case UNARY_PLUS:
          case UNARY_MINUS:
            resolveExpression(node.children[0], env);
            break;

          case COMMA:
          case LIST:
            for (let i in node.children)
                resolveExpression(node.children[i], env);
            break;

          case NEW:
            resolveExpression(node.children[0], env);
            break;

          case CALL:
            // save the static env so direct eval can resolve its argument program
            if (isDirectEval(node.children[0]))
                node.staticEnv = env;
            // FALL THROUGH

          case NEW_WITH_ARGS:
            resolveExpression(node.children[0], env);
            resolveExpression(node.children[1], env);
            break;

          case ARRAY_INIT:
            for (let i in node.children) {
                let elt = node.children[i];
                if (elt)
                    resolveExpression(elt, env);
            }
            break;

          case OBJECT_INIT:
            for (let i in node.children)
                resolveExpression(node.children[i].children[1], env);
            break;

          case NULL:
          case THIS:
          case TRUE:
          case FALSE:
          case NUMBER:
          case STRING:
          case REGEXP:
            break;

          default:
            throw new Error("NYI: " + definitions.tokens[node.type]);
        }
    }

    // resolvePath :: ((DOT | INDEX | IDENTIFIER) node, StaticEnv) -> (IMPORT_DEF | MODULE_DEF) Def | null
    // returns a Def only if the path resolves to a module or import
    function resolvePath(node, env) {
        if (node.type === IDENTIFIER) {
            var def = env.lookup(node.value);
            if (def.type === MODULE_DEF) {
                node.denotedModule = def.binding;
                return def;
            }
            return (def.type === IMPORT_DEF) ? def : null;
        }

        if (node.type === DOT) {
            var lhs = node.children[0];
            if (lhs.type !== DOT && lhs.type !== INDEX && lhs.type !== IDENTIFIER)
                return null;

            var def = resolvePath(lhs, env);
            if (!def || def.type !== MODULE_DEF)
                return null;

            var id = node.children[1].value;
            var mod = def.binding;

            if (mod.exportedModules.has(id)) {
                var mod2 = mod.exportedModules.get(id).module;
                node.denotedModule = mod2;
                return new Def(MODULE_DEF, mod2);
            }

            // BUG 620824: better error message
            if (!mod.exports.has(id))
                throw new ReferenceError("no export '" + id + "'");

            return new Def(IMPORT_DEF, { module: mod, id: id });
        }

        resolvePath(node.children[0], env);
        resolveExpression(node.children[1], env);
        return null;
    }

    // resolveVariables :: (VAR node, StaticEnv) -> void
    function resolveVariables(node, env) {
        // BUG 620819: handle destructuring
        let children = node.children;

        for (let i = 0; i < children.length; i++) {
            let name = children[i].name;
            if (env.hoistBarrier(name))
                throw new Error("illegal redeclaration of local variable " + name);
            let init = children[i].initializer;
            if (init)
                resolveExpression(init, env);
        }
    }

    function resolveStatements(node, env) {
        let children = node.children;
        for (let i = 0; i < children.length; i++)
            resolveStatement(children[i], env);
    }

    // resolveStatement :: (STMT node, StaticEnv) -> void
    function resolveStatement(node, env) {
        switch (node.type) {
          case FUNCTION:
            resolveFunction(node, env);
            return;

          case VAR:
            resolveVariables(node, env);
            return;

          case CONST:
          case LET:
            throw new Error("NYI: " + definitions.tokens[node.type]);

          case MODULE:
            resolveModule(node, env);
            break;

          // imports and exports have already been dealt with at script top-level
          case EXPORT:
          case IMPORT:
            break;

          case BREAK:
          case CONTINUE:
            return;

          case THROW:
            resolveExpression(node.exception, env);
            return;

          case RETURN:
            if (node.value)
                resolveExpression(node.value, env);
            return;

          case IF:
            resolveExpression(node.condition, env);
            resolveStatement(node.thenPart, env);
            if (node.elsePart)
                resolveStatement(node.elsePart, env);
            return;

          case BLOCK:
            resolveStatements(node, env);
            return;

          case WHILE:
            resolveExpression(node.condition, env);
            resolveStatement(node.body, env);
            return;

          case DO:
            resolveStatement(node.body, env);
            resolveExpression(node.condition, env);
            return;

          case SWITCH:
            resolveExpression(node.discriminant, env);
            for (let i = 0; i < node.cases.length; i++) {
                let caseNode = node.cases[i];
                if (caseNode.caseLabel)
                    resolveExpression(caseNode.caseLabel, env);
                resolveStatement(caseNode.statements, env);
            }
            break;

          case FOR:
            if (node.setup) {
                switch (node.setup.type) {
                  case LET:
                    throw new Error("NYI: let");

                  case VAR:
                    resolveVariables(node.setup, env);
                    break;

                  default:
                    resolveExpression(node.setup, env);
                    break;
                }
            }
            if (node.condition)
                resolveExpression(node.condition, env);
            if (node.update)
                resolveExpression(node.update, env);
            resolveStatement(node.body, env);
            break;

          case FOR_IN:
            if (node.varDecl)
                resolveVariables(node.varDecl, env);
            else
                resolveLHS(node.iterator, env);

            resolveExpression(node.object, env);
            break;

          case TRY:
            resolveStatement(node.tryBlock, env);
            for (let i = 0; i < node.catchClauses.length; i++)
                resolveCatch(node.catchClauses[i], env);
            if (node.finallyBlock)
                resolveStatement(node.finallyBlock, env);
            return;

          case DEBUGGER:
            return;

          case SEMICOLON:
            resolveExpression(node.expression, env);
            return;

          case LABEL:
            resolveStatement(node.statement, env);
            return;

          default:
            throw new Error("NYI: " + definitions.tokens[node.type]);
        }
    }

    return {
        Def: Def,
        StaticEnv: StaticEnv,
        resolve: resolve
    };
}());
