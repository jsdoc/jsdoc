'use strict';

/**
 * Provides methods for augmenting the parse results based on their content.
 * @module jsdoc/augment
 */

var doop = require('jsdoc/util/doop');
var name = require('jsdoc/name');

var hasOwnProp = Object.prototype.hasOwnProperty;

function mapDependencies(index, propertyName) {
    var dependencies = {};
    var doc;
    var doclets;
    var kinds = ['class', 'external', 'interface', 'mixin'];
    var len = 0;

    Object.keys(index).forEach(function(indexName) {
        doclets = index[indexName];
        for (var i = 0, ii = doclets.length; i < ii; i++) {
            doc = doclets[i];
            if (kinds.indexOf(doc.kind) !== -1) {
                dependencies[indexName] = {};
                if (hasOwnProp.call(doc, propertyName)) {
                    len = doc[propertyName].length;
                    for (var j = 0; j < len; j++) {
                        dependencies[indexName][doc[propertyName][j]] = true;
                    }
                }
            }
        }
    });

    return dependencies;
}

function Sorter(dependencies) {
    this.dependencies = dependencies;
    this.visited = {};
    this.sorted = [];
}

Sorter.prototype.visit = function(key) {
    var self = this;

    if (!(key in this.visited)) {
        this.visited[key] = true;

        if (this.dependencies[key]) {
            Object.keys(this.dependencies[key]).forEach(function(path) {
                self.visit(path);
            });
        }

        this.sorted.push(key);
    }
};

Sorter.prototype.sort = function() {
    var self = this;

    Object.keys(this.dependencies).forEach(function(key) {
        self.visit(key);
    });

    return this.sorted;
};

function sort(dependencies) {
    var sorter = new Sorter(dependencies);
    return sorter.sort();
}

function getMembers(longname, docs, scopes) {
    var candidate;
    var members = [];

    for (var i = 0, l = docs.length; i < l; i++) {
        candidate = docs[i];

        if (candidate.memberof === longname &&
            (!scopes || !scopes.length || scopes.indexOf(candidate.scope) !== -1)) {
            members.push(candidate);
        }
    }

    return members;
}

function addDocletProperty(doclets, propName, value) {
    for (var i = 0, l = doclets.length; i < l; i++) {
        doclets[i][propName] = value;
    }
}

function reparentDoclet(parent, child) {
    var parts = name.shorten(child.longname);

    parts.memberof = parent.longname;
    child.memberof = parent.longname;
    child.longname = name.combine(parts);
}

function parentIsClass(parent) {
    return parent.kind === 'class';
}

function staticToInstance(doclet) {
    var parts = name.shorten(doclet.longname);

    parts.scope = name.SCOPE.PUNC.INSTANCE;
    doclet.longname = name.combine(parts);
    doclet.scope = name.SCOPE.NAMES.INSTANCE;
}

/**
 * Update the list of doclets to be added to another symbol.
 *
 * We add only one doclet per longname. For example: If `ClassA` inherits from two classes that both
 * use the same method name, `ClassA` gets docs for one method rather than two.
 *
 * Also, the last symbol wins for any given longname. For example: If you write `@extends Class1
 * @extends Class2`, and both classes have an instance method called `myMethod`, you get the docs
 * from `Class2#myMethod`.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to be added.
 * @param {Array.<module:jsdoc/doclet.Doclet>} additions - An array of doclets that will be added to
 * another symbol.
 * @param {Object.<string, number>} indexes - A dictionary of indexes into the `additions` array.
 * Each key is a longname, and each value is the index of the longname's doclet.
 * @return {void}
 */
function updateAddedDoclets(doclet, additions, indexes) {
    if (typeof indexes[doclet.longname] !== 'undefined') {
        // replace the existing doclet
        additions[indexes[doclet.longname]] = doclet;
    }
    else {
        // add the doclet to the array, and track its index
        additions.push(doclet);
        indexes[doclet.longname] = additions.length - 1;
    }
}

/**
 * Update the index of doclets whose `undocumented` property is not `true`.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to be added to the index.
 * @param {Object.<string, Array.<module:jsdoc/doclet.Doclet>>} documented - The index of doclets
 * whose `undocumented` property is not `true`.
 * @return {void}
 */
function updateDocumentedDoclets(doclet, documented) {
    if ( !hasOwnProp.call(documented, doclet.longname) ) {
        documented[doclet.longname] = [];
    }

    documented[doclet.longname].push(doclet);
}

function explicitlyInherits(doclets) {
    var doclet;
    var inherits = false;

    for (var i = 0, l = doclets.length; i < l; i++) {
        doclet = doclets[i];
        if (typeof doclet.inheritdoc !== 'undefined' || typeof doclet.override !== 'undefined') {
            inherits = true;
            break;
        }
    }

    return inherits;
}

// TODO: try to reduce overlap with similar methods
function getInheritedAdditions(doclets, docs, documented) {
    var additionIndexes;
    var additions = [];
    var doc;
    var parents;
    var members;
    var member;
    var parts;

    // doclets will be undefined if the inherited symbol isn't documented
    doclets = doclets || [];

    for (var i = 0, ii = doclets.length; i < ii; i++) {
        doc = doclets[i];
        parents = doc.augments;

        if ( parents && (doc.kind === 'class' || doc.kind === 'interface') ) {
            // reset the lookup table of added doclet indexes by longname
            additionIndexes = {};

            for (var j = 0, jj = parents.length; j < jj; j++) {
                members = getMembers(parents[j], docs, ['instance']);

                for (var k = 0, kk = members.length; k < kk; k++) {
                    // We only care about symbols that are documented.
                    if (members[k].undocumented) {
                        continue;
                    }

                    member = doop(members[k]);

                    if (!member.inherited) {
                        member.inherits = member.longname;
                    }
                    member.inherited = true;

                    // TODO: this will fail on longnames like: MyClass#"quoted#Longname"
                    // and nested instance members like: MyClass#MyOtherClass#myMethod;
                    // switch to updateLongname()!
                    member.memberof = doc.longname;
                    parts = member.longname.split('#');
                    parts[0] = doc.longname;
                    member.longname = parts.join('#');

                    // Indicate what the descendant is overriding. (We only care about the closest
                    // ancestor. For classes A > B > C, if B#a overrides A#a, and C#a inherits B#a,
                    // we don't want the doclet for C#a to say that it overrides A#a.)
                    if ( hasOwnProp.call(docs.index.longname, member.longname) ) {
                        member.overrides = members[k].longname;
                    }
                    else {
                        delete member.overrides;
                    }

                    // Add the ancestor's docs unless the descendant overrides the ancestor AND
                    // documents the override.
                    if ( !hasOwnProp.call(documented, member.longname) ) {
                        updateAddedDoclets(member, additions, additionIndexes);
                        updateDocumentedDoclets(member, documented);
                    }
                    // If the descendant used an @inheritdoc or @override tag, add the ancestor's
                    // docs, and ignore the existing doclets.
                    else if ( explicitlyInherits(documented[member.longname]) ) {
                        // Ignore any existing doclets. (This is safe because we only get here if
                        // `member.longname` is an own property of `documented`.)
                        addDocletProperty(documented[member.longname], 'ignore', true);

                        updateAddedDoclets(member, additions, additionIndexes);
                        updateDocumentedDoclets(member, documented);

                        // Remove property that's no longer accurate.
                        if (member.virtual) {
                            delete member.virtual;
                        }
                        // Remove properties that we no longer need.
                        if (member.inheritdoc) {
                            delete member.inheritdoc;
                        }
                        if (member.override) {
                            delete member.override;
                        }
                    }
                    // If the descendant overrides the ancestor and documents the override,
                    // update the doclets to indicate what the descendant is overriding.
                    else {
                        addDocletProperty(documented[member.longname], 'overrides',
                            members[k].longname);
                    }
                }
            }
        }
    }

    return additions;
}

function updateMixes(mixedDoclet, mixedLongname) {
    var idx;
    var mixedName;
    var names;

    // take the fast path if there's no array of mixed-in longnames
    if (!mixedDoclet.mixes) {
        mixedDoclet.mixes = [mixedLongname];
    }
    else {
        // find the short name of the longname we're mixing in
        mixedName = name.shorten(mixedLongname).name;
        // find the short name of each previously mixed-in symbol
        names = mixedDoclet.mixes.map(function(m) {
            return name.shorten(mixedDoclet.longname).name;
        });

        // if we're mixing `myMethod` into `MixinC` from `MixinB`, and `MixinB` had the method mixed
        // in from `MixinA`, don't show `MixinA.myMethod` in the `mixes` list
        idx = names.indexOf(mixedName);
        if (idx !== -1) {
            mixedDoclet.mixes.splice(idx, 1);
        }

        mixedDoclet.mixes.push(mixedLongname);
    }
}

// TODO: try to reduce overlap with similar methods
function getMixedInAdditions(mixinDoclets, allDoclets, commentedDoclets) {
    var additionIndexes;
    var additions = [];
    var doclet;
    var idx;
    var mixedDoclet;
    var mixedDoclets;
    var mixes;

    // mixinDoclets will be undefined if the mixed-in symbol isn't documented
    mixinDoclets = mixinDoclets || [];

    for (var i = 0, ii = mixinDoclets.length; i < ii; i++) {
        doclet = mixinDoclets[i];
        mixes = doclet.mixes;

        if (mixes) {
            // reset the lookup table of added doclet indexes by longname
            additionIndexes = {};

            for (var j = 0, jj = mixes.length; j < jj; j++) {
                mixedDoclets = getMembers(mixes[j], allDoclets, ['static']);

                for (var k = 0, kk = mixedDoclets.length; k < kk; k++) {
                    // We only care about symbols that are documented.
                    if (mixedDoclets[k].undocumented) {
                        continue;
                    }

                    mixedDoclet = doop(mixedDoclets[k]);

                    updateMixes(mixedDoclet, mixedDoclet.longname);
                    mixedDoclet.mixed = true;

                    reparentDoclet(doclet, mixedDoclet);

                    // if we're mixing into a class, treat the mixed-in symbol as an instance member
                    if (parentIsClass(doclet)) {
                        staticToInstance(mixedDoclet);
                    }

                    updateAddedDoclets(mixedDoclet, additions, additionIndexes);
                    updateDocumentedDoclets(mixedDoclet, commentedDoclets);
                }
            }
        }
    }

    return additions;
}

function updateImplements(implDoclets, implementedLongname) {
    if ( !Array.isArray(implDoclets) ) {
        implDoclets = [implDoclets];
    }

    implDoclets.forEach(function(implDoclet) {
        if ( !hasOwnProp.call(implDoclet, 'implements') ) {
            implDoclet.implements = [];
        }

        if (implDoclet.implements.indexOf(implementedLongname) === -1) {
            implDoclet.implements.push(implementedLongname);
        }
    });
}

// TODO: try to reduce overlap with similar methods
function getImplementedAdditions(implDoclets, allDoclets, commentedDoclets) {
    var additionIndexes;
    var additions = [];
    var doclet;
    var idx;
    var implementations;
    var implExists;
    var implementationDoclet;
    var interfaceDoclets;

    // interfaceDoclets will be undefined if the implemented symbol isn't documented
    implDoclets = implDoclets || [];

    for (var i = 0, ii = implDoclets.length; i < ii; i++) {
        doclet = implDoclets[i];
        implementations = doclet.implements;

        if (implementations) {
            // reset the lookup table of added doclet indexes by longname
            additionIndexes = {};

            for (var j = 0, jj = implementations.length; j < jj; j++) {
                interfaceDoclets = getMembers(implementations[j], allDoclets, ['instance']);

                for (var k = 0, kk = interfaceDoclets.length; k < kk; k++) {
                    // We only care about symbols that are documented.
                    if (interfaceDoclets[k].undocumented) {
                        continue;
                    }

                    implementationDoclet = doop(interfaceDoclets[k]);

                    reparentDoclet(doclet, implementationDoclet);
                    updateImplements(implementationDoclet, interfaceDoclets[k].longname);

                    // If there's no implementation, move along.
                    implExists = hasOwnProp.call(allDoclets.index.longname,
                        implementationDoclet.longname);
                    if (!implExists) {
                        continue;
                    }

                    // Add the interface's docs unless the implementation is already documented.
                    if ( !hasOwnProp.call(commentedDoclets, implementationDoclet.longname) ) {
                        updateAddedDoclets(implementationDoclet, additions, additionIndexes);
                        updateDocumentedDoclets(implementationDoclet, commentedDoclets);
                    }
                    // If the implementation used an @inheritdoc or @override tag, add the
                    // interface's docs, and ignore the existing doclets.
                    else if ( explicitlyInherits(commentedDoclets[implementationDoclet.longname]) ) {
                        // Ignore any existing doclets. (This is safe because we only get here if
                        // `implementationDoclet.longname` is an own property of
                        // `commentedDoclets`.)
                        addDocletProperty(commentedDoclets[implementationDoclet.longname], 'ignore',
                            true);

                        updateAddedDoclets(implementationDoclet, additions, additionIndexes);
                        updateDocumentedDoclets(implementationDoclet, commentedDoclets);

                        // Remove property that's no longer accurate.
                        if (implementationDoclet.virtual) {
                            delete implementationDoclet.virtual;
                        }
                        // Remove properties that we no longer need.
                        if (implementationDoclet.inheritdoc) {
                            delete implementationDoclet.inheritdoc;
                        }
                        if (implementationDoclet.override) {
                            delete implementationDoclet.override;
                        }
                    }
                    // If there's an implementation, and it's documented, update the doclets to
                    // indicate what the implementation is implementing.
                    else {
                        updateImplements(commentedDoclets[implementationDoclet.longname],
                            interfaceDoclets[k].longname);
                    }
                }
            }
        }
    }

    return additions;
}

function augment(doclets, propertyName, docletFinder) {
    var index = doclets.index.longname;
    var dependencies = sort( mapDependencies(index, propertyName) );

    dependencies.forEach(function(depName) {
        var additions = docletFinder(index[depName], doclets, doclets.index.documented);

        additions.forEach(function(addition) {
            var longname = addition.longname;

            if ( !hasOwnProp.call(index, longname) ) {
                index[longname] = [];
            }
            index[longname].push(addition);
            doclets.push(addition);
        });
    });
}

/**
 * Add doclets to reflect class inheritance.
 *
 * For example, if `ClassA` has the instance method `myMethod`, and `ClassB` inherits from `ClassA`,
 * calling this method creates a new doclet for `ClassB#myMethod`.
 *
 * @param {!Array.<module:jsdoc/doclet.Doclet>} doclets - The doclets generated by JSDoc.
 * @param {!Object} doclets.index - The doclet index added by {@link module:jsdoc/borrow.indexAll}.
 * @return {void}
 */
exports.addInherited = function(doclets) {
    augment(doclets, 'augments', getInheritedAdditions);
};

/**
 * Add doclets to reflect mixins. When a symbol is mixed into a class, the class' version of the
 * mixed-in symbol is treated as an instance member.
 *
 * For example:
 *
 * + If `MixinA` has the static method `myMethod`, and `MixinB` mixes `MixinA`, calling this method
 * creates a new doclet for the static method `MixinB.myMethod`.
 * + If `MixinA` has the static method `myMethod`, and `ClassA` mixes `MixinA`, calling this method
 * creates a new doclet for the instance method `ClassA#myMethod`.
 *
 * @param {!Array.<module:jsdoc/doclet.Doclet>} doclets - The doclets generated by JSDoc.
 * @param {!Object} doclets.index - The doclet index added by {@link module:jsdoc/borrow.indexAll}.
 * @return {void}
 */
exports.addMixedIn = function(doclets) {
    augment(doclets, 'mixes', getMixedInAdditions);
};

/**
 * Add and update doclets to reflect implementations of interfaces.
 *
 * For example, if `InterfaceA` has the instance method `myMethod`, and `ClassA` implements
 * `InterfaceA`, calling this method does the following:
 *
 * + Updates `InterfaceA` to indicate that it is implemented by `ClassA`
 * + Updates `InterfaceA#myMethod` to indicate that it is implemented by `ClassA#myMethod`
 * + Updates `ClassA#myMethod` to indicate that it implements `InterfaceA#myMethod`
 *
 * If `ClassA#myMethod` used the `@override` or `@inheritdoc` tag, calling this method would also
 * generate a new doclet that reflects the interface's documentation for `InterfaceA#myMethod`.
 *
 * @param {!Array.<module:jsdoc/doclet.Doclet>} docs - The doclets generated by JSDoc.
 * @param {!Object} doclets.index - The doclet index added by {@link module:jsdoc/borrow.indexAll}.
 * @return {void}
 */
exports.addImplemented = function(doclets) {
    augment(doclets, 'implements', getImplementedAdditions);
};

/**
 * Add and update doclets to reflect all of the following:
 *
 * + Inherited classes
 * + Mixins
 * + Interface implementations
 *
 * Calling this method is equivalent to calling all other methods exported by this module.
 *
 * @return {void}
 */
exports.augmentAll = function(doclets) {
    exports.addMixedIn(doclets);
    exports.addImplemented(doclets);
    exports.addInherited(doclets);
    // look for implemented doclets again, in case we inherited an interface
    exports.addImplemented(doclets);
};
