/*
  Copyright 2011 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * Provides methods for augmenting the parse results based on their content.
 *
 * @namespace augment
 * @memberof module:@jsdoc/doclet
 */

import { fromParts, SCOPE, toParts } from '@jsdoc/name';

import { Doclet } from './doclet.js';

const DEPENDENCY_KINDS = ['class', 'external', 'interface', 'mixin'];

function mapDependencies(docletsByLongname, propertyName) {
  const dependencies = {};
  let doclets;
  let len = 0;

  if (!docletsByLongname) {
    return dependencies;
  }

  for (const indexName of docletsByLongname.keys()) {
    doclets = docletsByLongname.get(indexName);
    for (const doc of doclets) {
      if (DEPENDENCY_KINDS.includes(doc.kind)) {
        dependencies[indexName] = {};
        if (Object.hasOwn(doc, propertyName)) {
          len = doc[propertyName]?.length;
          for (let j = 0; j < len; j++) {
            dependencies[indexName][doc[propertyName][j]] = true;
          }
        }
      }
    }
  }

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
        Object.keys(this.dependencies[key]).forEach((path) => {
          this.visit(path);
        });
      }

      this.sorted.push(key);
    }
  }

  sort() {
    Object.keys(this.dependencies).forEach((key) => {
      this.visit(key);
    });

    return this.sorted;
  }
}

function sort(dependencies) {
  const sorter = new Sorter(dependencies);

  return sorter.sort();
}

function getMembers(longname, docletStore, scopes) {
  const memberof = Array.from(docletStore.docletsByMemberof.get(longname) || []);
  const members = [];

  memberof.forEach((candidate) => {
    if (scopes.includes(candidate.scope)) {
      members.push(candidate);
    }
  });

  return members;
}

function getDocumentedLongname(longname, docletStore) {
  const doclets = Array.from(docletStore.docletsByLongname.get(longname) || []);

  return doclets[doclets.length - 1];
}

function addDocletProperty(doclets, propName, value) {
  for (const doclet of doclets) {
    doclet[propName] = value;
  }
}

function reparentDoclet({ longname }, child) {
  const parts = toParts(child.longname);

  parts.memberof = longname;
  child.memberof = longname;
  child.longname = fromParts(parts);
}

function parentIsClass({ kind }) {
  return kind === 'class';
}

function staticToInstance(doclet) {
  const parts = toParts(doclet.longname);

  // Check the member's own meta information to determine if it's an ES6 class static member
  // ES6 class static members have specific meta.code.type values
  const memberIsES6ClassStatic =
    doclet.meta?.code?.type === 'ClassProperty' || doclet.meta?.code?.type === 'MethodDefinition';

  // If this member was originally defined with ES6 class syntax and is static, preserve it
  if (
    memberIsES6ClassStatic &&
    parts.scope === SCOPE.PUNC.STATIC &&
    doclet.scope === SCOPE.NAMES.STATIC
  ) {
    return;
  }

  // Convert to instance (traditional behavior for object mixins and ES6 instance members)
  parts.scope = SCOPE.PUNC.INSTANCE;
  doclet.longname = fromParts(parts);
  doclet.scope = SCOPE.NAMES.INSTANCE;
}

/**
 * Updates the list of doclets to be added to another symbol.
 *
 * We add only one doclet per longname. For example: If `ClassA` inherits from two classes that both
 * use the same method name, `ClassA` gets docs for one method rather than two.
 *
 * Also, the last symbol wins for any given longname. For example: If you write `@extends Class1
 * @extends Class2`, and both classes have an instance method called `myMethod`, you get the docs
 * from `Class2#myMethod`.
 *
 * @private
 * @param {module:@jsdoc/doclet.Doclet} doclet - The doclet to be added.
 * @param {Array.<module:@jsdoc/doclet.Doclet>} additions - An array of doclets that will be added to
 * another symbol.
 * @param {Object.<string, number>} indexes - A dictionary of indexes into the `additions` array.
 * Each key is a longname, and each value is the index of the longname's doclet.
 * @return {void}
 */
function updateAddedDoclets(doclet, additions, indexes) {
  if (typeof indexes[doclet.longname] !== 'undefined') {
    // replace the existing doclet
    additions[indexes[doclet.longname]] = doclet;
  } else {
    // add the doclet to the array, and track its index
    additions.push(doclet);
    indexes[doclet.longname] = additions.length - 1;
  }
}

function explicitlyInherits(doclets) {
  let inherits = false;

  for (const doclet of doclets) {
    if (typeof doclet.inheritdoc !== 'undefined' || typeof doclet.override !== 'undefined') {
      inherits = true;
      break;
    }
  }

  return inherits;
}

function changeMemberof(longname, newMemberof) {
  const parts = toParts(longname);

  parts.memberof = newMemberof;

  return fromParts(parts);
}

// TODO: try to reduce overlap with similar methods
function getInheritedAdditions(depDoclets, docletStore) {
  let additionIndexes;
  const additions = [];
  let childDoclet;
  let childLongname;
  let documented = docletStore.docletsByLongname;
  let parentMembers;
  let parents;
  let member;
  let parts;

  // doclets will be undefined if the inherited symbol isn't documented
  depDoclets = depDoclets || [];

  for (const doc of depDoclets) {
    parents = doc.augments;

    if (parents && (doc.kind === 'class' || doc.kind === 'interface')) {
      // reset the lookup table of added doclet indexes by longname
      additionIndexes = {};

      for (const parent of parents) {
        parentMembers = getMembers(parent, docletStore, ['instance']);

        for (const parentDoclet of parentMembers) {
          // We only care about symbols that are documented.
          if (parentDoclet.undocumented) {
            continue;
          }

          childLongname = changeMemberof(parentDoclet.longname, doc.longname);
          childDoclet = getDocumentedLongname(childLongname, docletStore) || {};

          // We don't want to fold in properties from the child doclet if it had an
          // `@inheritdoc` tag.
          if (Object.hasOwn(childDoclet, 'inheritdoc')) {
            childDoclet = {};
          }

          member = Doclet.combineDoclets(childDoclet, parentDoclet);

          if (!member.inherited) {
            member.inherits = member.longname;
          }
          member.inherited = true;

          member.memberof = doc.longname;
          parts = toParts(member.longname);
          parts.memberof = doc.longname;
          member.longname = fromParts(parts);

          // Indicate what the descendant is overriding. (We only care about the closest
          // ancestor. For classes A > B > C, if B#a overrides A#a, and C#a inherits B#a,
          // we don't want the doclet for C#a to say that it overrides A#a.)
          if (docletStore.docletsByLongname.has(member.longname)) {
            member.overrides = parentDoclet.longname;
          } else {
            delete member.overrides;
          }

          // Add the ancestor's docs unless the descendant overrides the ancestor AND
          // documents the override.
          if (!documented.has(member.longname)) {
            updateAddedDoclets(member, additions, additionIndexes);
          }
          // If the descendant used an @inheritdoc or @override tag, add the ancestor's
          // docs, and ignore the existing doclets.
          else if (explicitlyInherits(documented.get(member.longname))) {
            // Ignore any existing doclets. (This is safe because we only get here if
            // `member.longname` is an own property of `documented`.)
            addDocletProperty(documented.get(member.longname), 'ignore', true);

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

            updateAddedDoclets(member, additions, additionIndexes);
          }
          // If the descendant overrides the ancestor and documents the override,
          // update the doclets to indicate what the descendant is overriding.
          else {
            addDocletProperty(documented.get(member.longname), 'overrides', parentDoclet.longname);
          }
        }
      }
    }
  }

  return additions;
}

function updateMixes(mixedDoclet, mixedLongname) {
  let idx;
  let mixedName;
  let names;

  // take the fast path if there's no array of mixed-in longnames
  if (!mixedDoclet.mixes) {
    mixedDoclet.mixes = [mixedLongname];
  } else {
    // find the short name of the longname we're mixing in
    mixedName = toParts(mixedLongname).name;
    // find the short name of each previously mixed-in symbol
    // TODO: why do we run a map if we always shorten the same value? this looks like a bug...
    names = mixedDoclet.mixes.map(() => toParts(mixedDoclet.longname).name);

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
function getMixedInAdditions(mixinDoclets, docletStore) {
  let additionIndexes;
  const additions = [];
  let mixedDocletNew;
  let mixedDoclets;
  let mixes;

  // mixinDoclets will be undefined if the mixed-in symbol isn't documented
  mixinDoclets = mixinDoclets || [];

  for (const doclet of mixinDoclets) {
    mixes = doclet.mixes;

    if (mixes) {
      // reset the lookup table of added doclet indexes by longname
      additionIndexes = {};

      for (const mixed of mixes) {
        mixedDoclets = getMembers(mixed, docletStore, ['static']);

        for (const mixedDocletOriginal of mixedDoclets) {
          // We only care about symbols that are documented.
          if (mixedDocletOriginal.undocumented) {
            continue;
          }

          mixedDocletNew = Doclet.clone(mixedDocletOriginal);
          updateMixes(mixedDocletNew, mixedDocletNew.longname);
          mixedDocletNew.mixed = true;

          reparentDoclet(doclet, mixedDocletNew);

          // if we're mixing into a class, treat the mixed-in symbol as an instance member
          if (parentIsClass(doclet)) {
            staticToInstance(mixedDocletNew);
          }

          updateAddedDoclets(mixedDocletNew, additions, additionIndexes);
        }
      }
    }
  }

  return additions;
}

function updateImplements(implDoclets, implementedLongname) {
  if (!Array.isArray(implDoclets)) {
    implDoclets = [implDoclets];
  }

  implDoclets.forEach((implDoclet) => {
    implDoclet.implements ??= [];

    if (!implDoclet.implements.includes(implementedLongname)) {
      implDoclet.implements.push(implementedLongname);
    }
  });
}

// TODO: try to reduce overlap with similar methods
function getImplementedAdditions(implDoclets, docletStore) {
  let additionIndexes;
  const additions = [];
  let childDoclet;
  let childLongname;
  let docletsWithImplLongname;
  let implementations;
  let implementationDoclet;
  let interfaceDoclets;

  // interfaceDoclets will be undefined if the implemented symbol isn't documented
  implDoclets = implDoclets || [];

  for (const doclet of implDoclets) {
    implementations = doclet.implements;

    if (implementations) {
      // reset the lookup table of added doclet indexes by longname
      additionIndexes = {};

      for (const implementation of implementations) {
        interfaceDoclets = getMembers(implementation, docletStore, ['instance']);

        for (const parentDoclet of interfaceDoclets) {
          // We only care about symbols that are documented.
          if (parentDoclet.undocumented) {
            continue;
          }

          childLongname = changeMemberof(parentDoclet.longname, doclet.longname);
          childDoclet = getDocumentedLongname(childLongname, docletStore) || {};

          // We don't want to fold in properties from the child doclet if it had an
          // `@inheritdoc` tag.
          if (Object.hasOwn(childDoclet, 'inheritdoc')) {
            childDoclet = {};
          }

          implementationDoclet = Doclet.combineDoclets(childDoclet, parentDoclet);

          reparentDoclet(doclet, implementationDoclet);
          updateImplements(implementationDoclet, parentDoclet.longname);

          // If there's no implementation, documented or undocumented, then move along.
          if (!docletStore.allDocletsByLongname.get(implementationDoclet.longname)) {
            continue;
          }

          docletsWithImplLongname = docletStore.docletsByLongname.get(
            implementationDoclet.longname
          );
          // Add the interface's docs unless the implementation is already documented.
          if (!docletsWithImplLongname) {
            updateAddedDoclets(implementationDoclet, additions, additionIndexes);
          }
          // If the implementation used an @inheritdoc or @override tag, ignore the existing
          // doclets, and add the interface's docs.
          else if (explicitlyInherits(docletsWithImplLongname)) {
            addDocletProperty(docletsWithImplLongname, 'ignore', true);
            updateAddedDoclets(implementationDoclet, additions, additionIndexes);

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
            for (const docletWithImplLongname of docletsWithImplLongname) {
              docletWithImplLongname.implements = implementationDoclet.implements.slice();
            }
          }
        }
      }
    }
  }

  return additions;
}

function augment(docletStore, propertyName, docletFinder, env) {
  const dependencies = sort(mapDependencies(docletStore.docletsByLongname, propertyName));

  dependencies.forEach((depName) => {
    const depDoclets = Array.from(docletStore.docletsByLongname.get(depName) || []);
    const additions = docletFinder(depDoclets, docletStore, env);

    additions.forEach((addition) => {
      docletStore.add(addition);
    });
  });
}

/**
 * Adds doclets to reflect class inheritance.
 *
 * For example, if `ClassA` has the instance method `myMethod`, and `ClassB` inherits from `ClassA`,
 * calling this method creates a new doclet for `ClassB#myMethod`.
 *
 * @alias module:@jsdoc/doclet.augment.addInherited
 * @param {!module:@jsdoc/doclet.DocletStore} docletStore - The doclet store to update.
 */
export function addInherited(docletStore) {
  augment(docletStore, 'augments', getInheritedAdditions);
}

/**
 * Adds doclets to reflect mixins. When a symbol is mixed into a class, the class' version of the
 * mixed-in symbol is treated as an instance member.
 *
 * For example:
 *
 * + If `MixinA` has the static method `myMethod`, and `MixinB` mixes `MixinA`, calling this method
 * creates a new doclet for the static method `MixinB.myMethod`.
 * + If `MixinA` has the static method `myMethod`, and `ClassA` mixes `MixinA`, calling this method
 * creates a new doclet for the instance method `ClassA#myMethod`.
 *
 * @alias module:@jsdoc/doclet.augment.addMixedIn
 * @param {!module:@jsdoc/doclet.DocletStore} docletStore - The doclet store to update.
 */
export function addMixedIn(docletStore) {
  augment(docletStore, 'mixes', getMixedInAdditions);
}

/**
 * Adds and updates doclets to reflect implementations of interfaces.
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
 * @alias module:@jsdoc/doclet.augment.addImplemented
 * @param {!module:@jsdoc/doclet.DocletStore} docletStore - The doclet store to update.
 */
export function addImplemented(docletStore) {
  augment(docletStore, 'implements', getImplementedAdditions);
}

/**
 * Adds and updates doclets to reflect all of the following:
 *
 * + Inherited classes
 * + Mixins
 * + Interface implementations
 *
 * Calling this method is equivalent to calling all other methods exported by this module.
 *
 * @alias module:@jsdoc/doclet.augment.augmentAll
 * @param {!module:@jsdoc/doclet.DocletStore} docletStore - The doclet store to update.
 */
export function augmentAll(docletStore) {
  addMixedIn(docletStore);
  addImplemented(docletStore);
  addInherited(docletStore);
  // look for implemented doclets again, in case we inherited an interface
  addImplemented(docletStore);
}
