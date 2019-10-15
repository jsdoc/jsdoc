/**
 * Provides methods for augmenting the parse results based on their content.
 *
 * @module jsdoc/augment
 */

const _ = require('lodash');
const jsdoc = {
    doclet: require('jsdoc/doclet')
};
const name = require('jsdoc/name');

const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Maps dependencies for `propertyName` in `index`.
 *
 * @param {object} index - FIXME
 * @param {string} propertyName - The name of the property to look up in `index`.
 * @returns {object} A map of dependencies.
 */
function mapDependencies(index, propertyName) {
    const dependencies = {};
    let doc;
    let doclets;
    const kinds = ['class', 'external', 'interface', 'mixin'];
    let len = 0;

    Object.keys(index).forEach(indexName => {
        doclets = index[indexName];
        for (let i = 0, ii = doclets.length; i < ii; i++) {
            doc = doclets[i];
            if (kinds.includes(doc.kind)) {
                dependencies[indexName] = {};
                if (hasOwnProp.call(doc, propertyName)) {
                    len = doc[propertyName].length;
                    for (let j = 0; j < len; j++) {
                        dependencies[indexName][doc[propertyName][j]] = true;
                    }
                }
            }
        }
    });

    return dependencies;
}

class Sorter {
    constructor(dependencies) {
        this.dependencies = dependencies;
        this.visited = {};
        this.sorted = [];
    }

    visit(key) {
        if (!(key in this.visited)) {
            this.visited[key] = true;

            if (this.dependencies[key]) {
                Object.keys(this.dependencies[key]).forEach(path => {
                    this.visit(path);
                });
            }

            this.sorted.push(key);
        }
    }

    sort() {
        Object.keys(this.dependencies).forEach(key => {
            this.visit(key);
        });

        return this.sorted;
    }
}

/**
 * Sort `dependencies` using a `Sorter`.
 *
 * @param {*} dependencies - FIXME
 * @returns {Array} A sorted listed of `dependencies`.
 */
function sort(dependencies) {
    const sorter = new Sorter(dependencies);

    return sorter.sort();
}

/**
 * FIXME
 *
 * @param {string} longname - FIXME
 * @param {object.index}    - FIXME
 * @param {*} scopes        - FIXME
 * @returns {Array} A list of members.
 */
function getMembers(longname, {index}, scopes) {
    const memberof = index.memberof[longname] || [];
    const members = [];

    memberof.forEach(candidate => {
        if (scopes.includes(candidate.scope)) {
            members.push(candidate);
        }
    });

    return members;
}

/**
 * Return the documented `longname` from `{index}`.
 *
 * @param {string} longname - FIXME
 * @param {object} - FIXME
 * @returns {string} The long name.
 */
function getDocumentedLongname(longname, {index}) {
    const doclets = index.documented[longname] || [];

    return doclets[doclets.length - 1];
}

/**
 * Add a `propName:value` to each doclet in `doclets`.
 *
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - A list of doclets to update.
 * @param {string} propName - The property name to add to each doclet.
 * @param {*} value         - The property value to add to each doclet.
 * @returns {void}
 */
function addDocletProperty(doclets, propName, value) {
    for (let i = 0, l = doclets.length; i < l; i++) {
        doclets[i][propName] = value;
    }
}

/**
 * FIXME
 *
 * @param {object} - FIXME
 * @param {object} child - FIXME
 * @returns {void}
 */
function reparentDoclet({longname}, child) {
    const parts = name.shorten(child.longname);

    parts.memberof = longname;
    child.memberof = longname;
    child.longname = name.combine(parts);
}

/**
 * Return whether a parent is a class.
 *
 * @param {object} - FIXME
 * @returns {boolean} Whether `kind` is a class.
 */
function parentIsClass({kind}) {
    return kind === 'class';
}

/**
 * Update `doclet` to instance type.
 *
 * @param {module:jsdoc/doclet.Doclet} doclet - FIXME
 * @returns {void}
 */
function staticToInstance(doclet) {
    const parts = name.shorten(doclet.longname);

    parts.scope = name.SCOPE.PUNC.INSTANCE;
    doclet.longname = name.combine(parts);
    doclet.scope = name.SCOPE.NAMES.INSTANCE;
}

/**
 * Update the list of doclets to be added to another symbol.
 *
 * Only one doclet is added per longname. For example: If `ClassA` inherits from two classes that both
 * use the same method name, `ClassA` gets docs for one method rather than two.
 *
 * Also, the last symbol wins for any given longname. For example, if you write the following:
 *
 * <pre><code>
 *
 * @augments Class1
 * @augments Class2
 * </code></pre>
 *
 * ...and both classes have an instance method called `myMethod()`, you get the docs from
 * `Class2#myMethod`.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to be added.
 * @param {Array.<module:jsdoc/doclet.Doclet>} additions - An array of doclets that will be added to
 * another symbol.
 * @param {object.<string, number>} indexes - A dictionary of indexes into the `additions` array.
 * Each key is a longname, and each value is the index of the longname's doclet.
 * @returns {void}
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
 * @param {object.<string, Array.<module:jsdoc/doclet.Doclet>>} documented - The index of doclets
 * whose `undocumented` property is not `true`.
 * @returns {void}
 */
function updateDocumentedDoclets(doclet, documented) {
    if ( !hasOwnProp.call(documented, doclet.longname) ) {
        documented[doclet.longname] = [];
    }

    documented[doclet.longname].push(doclet);
}

/**
 * Update the index of doclets with a `memberof` value.
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet to be added to the index.
 * @param {object.<string, Array.<module:jsdoc/doclet.Doclet>>} memberof - The index of doclets
 * with a `memberof` value.
 * @returns {void}
 */
function updateMemberofDoclets(doclet, memberof) {
    if (doclet.memberof) {
        if ( !hasOwnProp.call(memberof, doclet.memberof) ) {
            memberof[doclet.memberof] = [];
        }

        memberof[doclet.memberof].push(doclet);
    }
}

/**
 * Returns whether any items in `doclets` inherits or overrides.
 *
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - A list of doclets to search.
 * @returns {boolean} True if any doclet inherits or overrides.
 */
function explicitlyInherits(doclets) {
    let doclet;
    let inherits = false;

    for (let i = 0, l = doclets.length; i < l; i++) {
        doclet = doclets[i];
        if (typeof doclet.inheritdoc !== 'undefined' || typeof doclet.override !== 'undefined') {
            inherits = true;
            break;
        }
    }

    return inherits;
}

/**
 * Updates the `memberof` value for `longname`.
 *
 * @param {string} longname - The member’s longname.
 * @param {*} newMemberof   - FIXME
 * @returns {*} FIXME
 */
function changeMemberof(longname, newMemberof) {
    const atoms = name.shorten(longname);

    atoms.memberof = newMemberof;

    return name.combine(atoms);
}


/**
 * FIXME
 *
 * @todo - try to reduce overlap with similar methods
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - A list of doclets.
 * @param {*} docs - FIXME
 * @param {object} - FIXME
 * @returns {Array} A list of inherited additions.
 */
function getInheritedAdditions(doclets, docs, {documented, memberof}) {
    let additionIndexes;
    const additions = [];
    let childDoclet;
    let childLongname;
    let doc;
    let parentDoclet;
    let parentMembers;
    let parents;
    let member;
    let parts;

    // doclets will be undefined if the inherited symbol isn't documented
    doclets = doclets || [];

    for (let i = 0, ii = doclets.length; i < ii; i++) {
        doc = doclets[i];
        parents = doc.augments;

        if ( parents && (doc.kind === 'class' || doc.kind === 'interface') ) {
            // reset the lookup table of added doclet indexes by longname
            additionIndexes = {};

            for (let j = 0, jj = parents.length; j < jj; j++) {
                parentMembers = getMembers(parents[j], docs, ['instance']);

                for (let k = 0, kk = parentMembers.length; k < kk; k++) {
                    parentDoclet = parentMembers[k];

                    // We only care about symbols that are documented.
                    if (parentDoclet.undocumented) {
                        continue;
                    }

                    childLongname = changeMemberof(parentDoclet.longname, doc.longname);
                    childDoclet = getDocumentedLongname(childLongname, docs) || {};

                    // We don't want to fold in properties from the child doclet if it had an
                    // `@inheritdoc` tag.
                    if (hasOwnProp.call(childDoclet, 'inheritdoc')) {
                        childDoclet = {};
                    }

                    member = jsdoc.doclet.combine(childDoclet, parentDoclet);

                    if (!member.inherited) {
                        member.inherits = member.longname;
                    }
                    member.inherited = true;

                    member.memberof = doc.longname;
                    parts = name.shorten(member.longname);
                    parts.memberof = doc.longname;
                    member.longname = name.combine(parts);

                    // Indicate what the descendant is overriding. (We only care about the closest
                    // ancestor. For classes A > B > C, if B#a overrides A#a, and C#a inherits B#a,
                    // we don't want the doclet for C#a to say that it overrides A#a.)
                    if ( hasOwnProp.call(docs.index.longname, member.longname) ) {
                        member.overrides = parentDoclet.longname;
                    }
                    else {
                        delete member.overrides;
                    }

                    // Add the ancestor's docs unless the descendant overrides the ancestor AND
                    // documents the override.
                    if ( !hasOwnProp.call(documented, member.longname) ) {
                        updateAddedDoclets(member, additions, additionIndexes);
                        updateDocumentedDoclets(member, documented);
                        updateMemberofDoclets(member, memberof);
                    }
                    // If the descendant used an @inheritdoc or @override tag, add the ancestor's
                    // docs, and ignore the existing doclets.
                    else if ( explicitlyInherits(documented[member.longname]) ) {
                        // Ignore any existing doclets. (This is safe because we only get here if
                        // `member.longname` is an own property of `documented`.)
                        addDocletProperty(documented[member.longname], 'ignore', true);

                        updateAddedDoclets(member, additions, additionIndexes);
                        updateDocumentedDoclets(member, documented);
                        updateMemberofDoclets(member, memberof);

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
                            parentDoclet.longname);
                    }
                }
            }
        }
    }

    return additions;
}

/**
 * FIXME
 *
 * @param {*} mixedDoclet   - FIXME
 * @param {*} mixedLongname - FIXME
 * @returns {void}
 */
function updateMixes(mixedDoclet, mixedLongname) {
    let idx;
    let mixedName;
    let names;

    // take the fast path if there's no array of mixed-in longnames
    if (!mixedDoclet.mixes) {
        mixedDoclet.mixes = [mixedLongname];
    }
    else {
        // find the short name of the longname we're mixing in
        mixedName = name.shorten(mixedLongname).name;
        // find the short name of each previously mixed-in symbol
        // TODO: why do we run a map if we always shorten the same value? this looks like a bug...
        names = mixedDoclet.mixes.map(() => name.shorten(mixedDoclet.longname).name);

        // if we're mixing `myMethod` into `MixinC` from `MixinB`, and `MixinB` had the method mixed
        // in from `MixinA`, don't show `MixinA.myMethod` in the `mixes` list
        idx = names.indexOf(mixedName);
        if (idx !== -1) {
            mixedDoclet.mixes.splice(idx, 1);
        }

        mixedDoclet.mixes.push(mixedLongname);
    }
}

/**
 * FIXME
 *
 * @todo - try to reduce overlap with similar methods
 * @param {Array.<module:jsdoc/doclet.Doclet>} mixinDoclets - FIXME
 * @param {Array.<module:jsdoc/doclet.Doclet>} allDoclets - FIXME
 * @param {object} - FIXME
 * @returns {Array} A list of mixed in additions.
 */
function getMixedInAdditions(mixinDoclets, allDoclets, {documented, memberof}) {
    let additionIndexes;
    const additions = [];
    const commentedDoclets = documented;
    let doclet;
    let mixedDoclet;
    let mixedDoclets;
    let mixes;

    // mixinDoclets will be undefined if the mixed-in symbol isn't documented
    mixinDoclets = mixinDoclets || [];

    for (let i = 0, ii = mixinDoclets.length; i < ii; i++) {
        doclet = mixinDoclets[i];
        mixes = doclet.mixes;

        if (mixes) {
            // reset the lookup table of added doclet indexes by longname
            additionIndexes = {};

            for (let j = 0, jj = mixes.length; j < jj; j++) {
                mixedDoclets = getMembers(mixes[j], allDoclets, ['static']);

                for (let k = 0, kk = mixedDoclets.length; k < kk; k++) {
                    // We only care about symbols that are documented.
                    if (mixedDoclets[k].undocumented) {
                        continue;
                    }

                    mixedDoclet = _.cloneDeep(mixedDoclets[k]);

                    updateMixes(mixedDoclet, mixedDoclet.longname);
                    mixedDoclet.mixed = true;

                    reparentDoclet(doclet, mixedDoclet);

                    // if we're mixing into a class, treat the mixed-in symbol as an instance member
                    if (parentIsClass(doclet)) {
                        staticToInstance(mixedDoclet);
                    }

                    updateAddedDoclets(mixedDoclet, additions, additionIndexes);
                    updateDocumentedDoclets(mixedDoclet, commentedDoclets);
                    updateMemberofDoclets(mixedDoclet, memberof);
                }
            }
        }
    }

    return additions;
}

/**
 * FIXME
 *
 * @param {Array.<module:jsdoc/doclet.Doclet>} implDoclets - FIXME
 * @param {*} implementedLongname - FIXME
 * @returns {void}
 */
function updateImplements(implDoclets, implementedLongname) {
    if ( !Array.isArray(implDoclets) ) {
        implDoclets = [implDoclets];
    }

    implDoclets.forEach(implDoclet => {
        if ( !hasOwnProp.call(implDoclet, 'implements') ) {
            implDoclet.implements = [];
        }

        if (!implDoclet.implements.includes(implementedLongname)) {
            implDoclet.implements.push(implementedLongname);
        }
    });
}

/**
 * FIXME
 *
 * @todo - try to reduce overlap with similar methods
 * @param {Array.<module:jsdoc/doclet.Doclet>} implDoclets - FIXME
 * @param {Array.<module:jsdoc/doclet.Doclet>} allDoclets - FIXME
 * @param {object} - FIXME
 * @returns {Array} A list of mixed in additions.
 */
function getImplementedAdditions(implDoclets, allDoclets, {documented, memberof}) {
    let additionIndexes;
    const additions = [];
    let childDoclet;
    let childLongname;
    const commentedDoclets = documented;
    let doclet;
    let implementations;
    let implExists;
    let implementationDoclet;
    let interfaceDoclets;
    let parentDoclet;

    // interfaceDoclets will be undefined if the implemented symbol isn't documented
    implDoclets = implDoclets || [];

    for (let i = 0, ii = implDoclets.length; i < ii; i++) {
        doclet = implDoclets[i];
        implementations = doclet.implements;

        if (implementations) {
            // reset the lookup table of added doclet indexes by longname
            additionIndexes = {};

            for (let j = 0, jj = implementations.length; j < jj; j++) {
                interfaceDoclets = getMembers(implementations[j], allDoclets, ['instance']);

                for (let k = 0, kk = interfaceDoclets.length; k < kk; k++) {
                    parentDoclet = interfaceDoclets[k];

                    // We only care about symbols that are documented.
                    if (parentDoclet.undocumented) {
                        continue;
                    }

                    childLongname = changeMemberof(parentDoclet.longname, doclet.longname);
                    childDoclet = getDocumentedLongname(childLongname, allDoclets) || {};

                    // We don't want to fold in properties from the child doclet if it had an
                    // `@inheritdoc` tag.
                    if (hasOwnProp.call(childDoclet, 'inheritdoc')) {
                        childDoclet = {};
                    }

                    implementationDoclet = jsdoc.doclet.combine(childDoclet, parentDoclet);

                    reparentDoclet(doclet, implementationDoclet);
                    updateImplements(implementationDoclet, parentDoclet.longname);

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
                        updateMemberofDoclets(implementationDoclet, memberof);
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
                        updateMemberofDoclets(implementationDoclet, memberof);

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
                            parentDoclet.longname);
                    }
                }
            }
        }
    }

    return additions;
}

/**
 * FIXME
 *
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - FIXME
 * @param {string} propertyName - FIXME
 * @param {*} docletFinder      - FIXME
 * @returns {void}
 */
function augment(doclets, propertyName, docletFinder) {
    const index = doclets.index.longname;
    const dependencies = sort( mapDependencies(index, propertyName) );

    dependencies.forEach(depName => {
        const additions = docletFinder(index[depName], doclets, doclets.index);

        additions.forEach(addition => {
            const longname = addition.longname;

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
 * @param {!object} doclets.index - The doclet index.
 * @returns {void}
 */
exports.addInherited = doclets => {
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
 * @param {!object} doclets.index - The doclet index.
 * @returns {void}
 */
exports.addMixedIn = doclets => {
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
 * @param {!Array.<module:jsdoc/doclet.Doclet>} doclets - The doclets generated by JSDoc.
 * @param {!object} doclets.index - The doclet index.
 * @returns {void}
 */
exports.addImplemented = doclets => {
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
 * @param {!Array.<module:jsdoc/doclet.Doclet>} doclets - The doclets to augment.
 * @returns {void}
 */
exports.augmentAll = doclets => {
    exports.addMixedIn(doclets);
    exports.addImplemented(doclets);
    exports.addInherited(doclets);
    // look for implemented doclets again, in case we inherited an interface
    exports.addImplemented(doclets);
};
