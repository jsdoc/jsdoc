/*
  Copyright 2023 the JSDoc Authors.

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

import { dirname, join } from 'node:path';

import { LONGNAMES } from '@jsdoc/name';
import commonPathPrefix from 'common-path-prefix';
import _ from 'lodash';

const ANONYMOUS_LONGNAME = LONGNAMES.ANONYMOUS;

function addToSet(targetMap, key, value) {
  if (!targetMap.has(key)) {
    targetMap.set(key, new Set());
  }

  targetMap.get(key).add(value);
}

function diffArrays(value, previousValue = []) {
  return {
    added: _.difference(value, previousValue),
    removed: _.difference(previousValue, value),
  };
}

function getSourcePath({ meta }) {
  return meta?.path ? join(meta.path, meta.filename) : meta?.filename;
}

function removeFromSet(targetMap, key, value) {
  const set = targetMap.get(key);

  if (set) {
    set.delete(value);
    // If the set is now empty, delete it from the map.
    if (set.size === 0) {
      targetMap.delete(key);
    }
  }
}

/**
 * Stores and classifies the doclets that JSDoc creates as it parses your source files.
 *
 * A doclet store categorizes doclets based on their properties, so that the JSDoc template can
 * efficiently retrieve the doclets that it needs. For example, when the template generates
 * documentation for a class, it can retrieve all of the doclets that represent members of that
 * class.
 *
 * To retrieve the doclets that you need, use the doclet store's instance properties. For example,
 * {@link module:@jsdoc/doclet.DocletStore#docletsByLongname} maps longnames to the doclets with
 * that longname.
 *
 * After you add a doclet to the store, the store automatically tracks changes to a doclet's
 * properties and recategorizes the doclet as needed. For example, if a doclet's `kind` property
 * changes from `class` to `interface`, then the doclet store automatically recategorizes the doclet
 * as an interface.
 *
 * Doclets can be _visible_, meaning that they should be used to generate output, or _hidden_,
 * meaning that they're ignored when generating output. Except as noted, the doclet store exposes
 * only visible doclets.
 *
 * @alias module:@jsdoc/doclet.DocletStore
 */
export class DocletStore {
  #commonPathPrefix;
  #docletChangedHandler;
  #emitter;
  #isListening;
  #newDocletHandler;
  #sourcePaths;

  static #propertiesWithMaps = ['kind', 'longname', 'memberof'];
  static #propertyToMapName = new Map(
    DocletStore.#propertiesWithMaps.map((prop) => [prop, 'docletsBy' + _.capitalize(prop)])
  );

  static #propertiesWithSets = ['augments', 'borrowed', 'implements', 'mixes'];
  static #propertyToSetName = new Map(
    DocletStore.#propertiesWithSets.map((prop) => [prop, 'docletsWith' + _.capitalize(prop)])
  );

  /**
   * Creates a doclet store.
   *
   * When you create a doclet store, you provide a JSDoc environment object. The doclet store
   * listens for new doclets that are created in that environment. When a new doclet is created, the
   * doclet store adds it automatically and tracks updates to the doclet.
   *
   * @param {module:@jsdoc/core.Env} env - The JSDoc environment to use.
   */
  constructor(env) {
    this.#commonPathPrefix = null;
    this.#emitter = env.emitter;
    this.#isListening = false;
    this.#sourcePaths = new Map();

    /**
     * Map of all doclet longnames to a `Set` of all doclets with that longname. Includes both
     * visible and hidden doclets.
     *
     * @type Map<string, Set<module:@jsdoc/doclet.Doclet>>
     */
    this.allDocletsByLongname = new Map();
    /**
     * All visible doclets.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.doclets = new Set();
    /**
     * Map from a doclet kind to a `Set` of doclets with that kind.
     *
     * @type Map<string, Set<module:@jsdoc/doclet.Doclet>>
     */
    this.docletsByKind = new Map();
    /**
     * Map from a doclet longname to a `Set` of doclets with that longname.
     *
     * @type Map<string, Set<module:@jsdoc/doclet.Doclet>>
     */
    this.docletsByLongname = new Map();
    /**
     * Map from a doclet `memberof` value to a `Set` of doclets with that `memberof`.
     *
     * @type Map<string, Set<module:@jsdoc/doclet.Doclet>>
     */
    this.docletsByMemberof = new Map();
    /**
     * Map from an AST node ID, generated during parsing, to a `Set` of doclets for that node ID.
     *
     * @type Map<string, Set<module:@jsdoc/doclet.Doclet>>
     */
    this.docletsByNodeId = new Map();
    /**
     * Doclets that have an `augments` property.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.docletsWithAugments = new Set();
    /**
     * Doclets that have a `borrowed` property.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.docletsWithBorrowed = new Set();
    /**
     * Doclets that have an `implements` property.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.docletsWithImplements = new Set();
    /**
     * Doclets that have a `mixes` property.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.docletsWithMixes = new Set();
    /**
     * Doclets that belong to the global scope.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.globals = new Set();
    /**
     * Map from an event's longname to a `Set` of doclets that listen to that event.
     *
     * @type Map<string, Set<module:@jsdoc/doclet.Doclet>>
     */
    this.listenersByListensTo = new Map();

    /**
     * Doclets that are hidden and shouldn't be used to generate output.
     *
     * @type Set<module:@jsdoc/doclet.Doclet>
     */
    this.unusedDoclets = new Set();

    this.#docletChangedHandler = (e) => this.#handleDocletChanged(e, {});
    this.#newDocletHandler = (e) => this.#handleDocletChanged(e, { newDoclet: true });

    this.startListening();
  }

  #handleDocletChanged({ doclet, property, oldValue, newValue }, opts) {
    const isVisible = doclet.isVisible();
    const newDoclet = opts.newDoclet ?? false;
    const wasVisible = newDoclet ? false : this.doclets.has(doclet);
    const visibilityChanged = newDoclet || wasVisible !== isVisible;
    const docletInfo = {
      isGlobal: doclet.isGlobal(),
      isVisible,
      newDoclet,
      newValue,
      oldValue,
      property,
      setFnName: isVisible ? 'add' : 'delete',
      visibilityChanged,
      wasVisible,
    };

    if (newDoclet) {
      this.#trackAllDocletsByLongname(doclet, {});
      this.#trackDocletByNodeId(doclet);
    }

    if (visibilityChanged) {
      this.#toggleVisibility(doclet, docletInfo);
    }

    // In the following cases, there's nothing more to do:
    //
    // + The doclet isn't visible, and we're seeing it for the first time.
    // + The doclet isn't visible, and its visibility didn't change.
    if (!isVisible && (newDoclet || !visibilityChanged)) {
      return;
    }

    // Update all watchable properties.
    this.#updateWatchableProperties(doclet, docletInfo);

    // Update list of source paths for visible doclets.
    if (visibilityChanged) {
      this.#updateSourcePaths(doclet, docletInfo);
    }
  }

  #toggleGlobal(doclet, { isGlobal, isVisible }) {
    if (isGlobal && isVisible) {
      this.globals.add(doclet);
    } else {
      this.globals.delete(doclet);
    }
  }

  #toggleVisibility(doclet, { isVisible, setFnName }) {
    const action = isVisible ? 'delete' : 'add';

    this.doclets[setFnName](doclet);
    this.unusedDoclets[action](doclet);
  }

  // Updates `this.allDocletsByLongname` _only_.
  #trackAllDocletsByLongname(doclet, { property, oldValue, newValue }) {
    newValue ??= doclet.longname;

    if (property && property !== 'longname') {
      return;
    }

    if (oldValue) {
      removeFromSet(this.allDocletsByLongname, oldValue, doclet);
    }
    if (newValue) {
      addToSet(this.allDocletsByLongname, newValue, doclet);
    }
  }

  #trackDocletByNodeId(doclet) {
    const nodeId = doclet.meta?.code?.node?.nodeId;

    if (nodeId) {
      addToSet(this.docletsByNodeId, nodeId, doclet);
    }
  }

  #updateMapProperty(
    requestedProp,
    doclet,
    { property: eventProp, oldValue: oldKey, newValue: newKey, isVisible, wasVisible }
  ) {
    const mapName = DocletStore.#propertyToMapName.get(requestedProp);
    const map = this[mapName];

    // If the event didn't specify the property name that we're interested in, then ignore the new
    // key; it doesn't apply to this property. Instead, get the key from the doclet.
    if (requestedProp !== eventProp) {
      newKey = doclet[requestedProp];
    }

    // If the doclet is no longer visible, we must always remove it from the set, using whatever key
    // we have.
    if (wasVisible && !isVisible) {
      removeFromSet(map, oldKey ?? newKey, doclet);
    } else if (wasVisible && oldKey) {
      removeFromSet(map, oldKey, doclet);
    }
    if (isVisible && newKey) {
      addToSet(map, newKey, doclet);
    }
  }

  #updateSetProperty(prop, value, { setFnName }) {
    const set = this[DocletStore.#propertyToSetName.get(prop)];

    if (Object.hasOwn(value, prop) && value[prop]?.length) {
      set[setFnName](value);
    } else {
      set.delete(value);
    }
  }

  #updateSourcePaths(doclet, { isVisible }) {
    const sourcePath = getSourcePath(doclet);

    if (!sourcePath || !isVisible) {
      this.#sourcePaths.delete(doclet);
    } else if (sourcePath) {
      this.#sourcePaths.set(doclet, sourcePath);
    }

    // Invalidate the cached common prefix for source paths.
    this.#commonPathPrefix = null;
  }

  #updateWatchableProperties(doclet, docletInfo) {
    const { isVisible, newDoclet, newValue, oldValue, property, visibilityChanged, wasVisible } =
      docletInfo;

    // `access` only affects visibility, which is handled above, so we ignore it here.
    if (visibilityChanged || property === 'augments') {
      this.#updateSetProperty('augments', doclet, docletInfo);
    }
    if (visibilityChanged || property === 'borrowed') {
      this.#updateSetProperty('borrowed', doclet, docletInfo);
    }
    // `ignore` only affects visibility, which is handled above, so we ignore it here.
    if (visibilityChanged || property === 'implements') {
      this.#updateSetProperty('implements', doclet, docletInfo);
    }
    if (visibilityChanged || property === 'kind') {
      this.#toggleGlobal(doclet, docletInfo);
      this.#updateMapProperty('kind', doclet, docletInfo);
    }
    if (visibilityChanged || property === 'listens') {
      let added;
      let diff;
      let removed;

      if (newDoclet) {
        added = doclet.listens;
        removed = [];
      } else {
        diff = diffArrays(newValue, oldValue);
        added = diff.added;
        removed = diff.removed;
      }

      if (added && isVisible) {
        added.forEach((listensTo) => addToSet(this.listenersByListensTo, listensTo, doclet));
      }
      if (removed && wasVisible) {
        removed.forEach((listensTo) => removeFromSet(this.listenersByListensTo, listensTo, doclet));
      }
    }
    if (visibilityChanged || property === 'longname') {
      this.#updateMapProperty('longname', doclet, docletInfo);
      this.#trackAllDocletsByLongname(doclet, docletInfo);
    }
    if (visibilityChanged || property === 'memberof') {
      this.#updateMapProperty('memberof', doclet, docletInfo);
    }
    if (visibilityChanged || property === 'mixes') {
      this.#updateSetProperty('mixes', doclet, docletInfo);
    }
    if (visibilityChanged || property === 'scope') {
      this.#toggleGlobal(doclet, docletInfo);
    }
    // `undocumented` only affects visibility, which is handled above, so we ignore it here.
  }

  /**
   * Adds a doclet to the store directly, rather than by listening to events from the JSDoc
   * environment.
   *
   * Use this method if you need to track a doclet that's generated outside of JSDoc's parsing
   * process.
   *
   * @param {module:@jsdoc/doclet.Doclet} doclet - The doclet to add.
   */
  add(doclet) {
    let doclets;
    let nodeId;

    // Doclets with the `<anonymous>` longname are used only to track variables in the AST node's
    // scope. Just track the doclet by node ID so the parser can look it up by node ID.
    if (doclet.longname === ANONYMOUS_LONGNAME) {
      nodeId = doclet.meta?.code?.node?.nodeId;
      if (nodeId) {
        doclets = this.docletsByNodeId.get(nodeId) ?? new Set();
        doclets.add(doclet);
        this.docletsByNodeId.set(nodeId, doclets);
      }
    } else {
      this.#newDocletHandler({ doclet });
    }
  }

  /**
   * All known doclets, including both visible and hidden doclets.
   *
   * @type Set<module:@jsdoc/doclet.Doclet>
   */
  get allDoclets() {
    return new Set([...this.doclets, ...this.unusedDoclets]);
  }

  /**
   * The longest filepath prefix that's shared by the source files that were parsed.
   *
   * +  If there's only one source file, then the prefix is the source file's directory name.
   * +  If the source files don't have a common prefix, then the prefix is an empty string.
   *
   * If a doclet is hidden, then its source filepath is ignored when determining the prefix.
   *
   * @type {string}
   */
  get commonPathPrefix() {
    let commonPrefix;
    let sourcePaths;

    if (this.#commonPathPrefix !== null) {
      return this.#commonPathPrefix;
    }

    sourcePaths = this.sourcePaths;
    if (sourcePaths.length === 1) {
      // If there's only one filepath, then the common prefix is just its dirname.
      commonPrefix = dirname(sourcePaths[0]);
    } else if (sourcePaths.length > 1) {
      // Remove the trailing slash if present.
      commonPrefix = commonPathPrefix(sourcePaths).replace(/[\\/]$/, '');
    } else {
      commonPrefix = null;
    }

    this.#commonPathPrefix = commonPrefix;

    return commonPrefix ?? '';
  }

  /**
   * The longnames of all visible doclets.
   *
   * @type Array<string>
   */
  get longnames() {
    return Array.from(this.docletsByLongname.keys());
  }

  /**
   * The source paths associated with all visible doclets.
   *
   * @type Array<string>
   */
  get sourcePaths() {
    return Array.from(this.#sourcePaths.values());
  }

  /**
   * Start listening to events from the JSDoc environment.
   *
   * In general, you don't need to call this method. A `DocletStore` always listens for events by
   * default.
   */
  startListening() {
    if (!this.#isListening) {
      this.#emitter.on('docletChanged', this.#docletChangedHandler);
      this.#emitter.on('newDoclet', this.#newDocletHandler);

      this.#isListening = true;
    }
  }

  /**
   * Stop listening to events from the JSDoc environment.
   *
   * Call this method if you're done using a `DocletStore`, and you don't want it to listen to
   * future events.
   */
  stopListening() {
    if (this.#isListening) {
      this.#emitter.removeListener('docletChanged', this.#docletChangedHandler);
      this.#emitter.removeListener('newDoclet', this.#newDocletHandler);

      this.#isListening = false;
    }
  }
}
