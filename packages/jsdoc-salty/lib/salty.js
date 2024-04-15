/*
  Copyright 2022 the JSDoc Authors.

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
const _ = require('lodash');

// Install shim for Object.hasOwn() if necessary.
/* istanbul ignore next */
if (!Object.hasOwn) {
  Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
}

function addToSelection(salty, item, i) {
  salty._selectedItems.push(item);
  salty._selectedIndexes.push(i);
}

function selectAllItems(salty) {
  salty._selectedItems = salty._items.slice();
  salty._selectedIndexes = [...Array(salty._items.length).keys()];
}

function createSelection(salty) {
  salty._selectedIndexes = [];
  salty._selectedItems = [];
}

function eraseSelection(salty) {
  salty._selectedIndexes = null;
  salty._selectedItems = null;
}

function finderWithFunction(salty, func) {
  createSelection(salty);

  salty._items.forEach((item, i) => {
    if (func.bind(item)()) {
      addToSelection(salty, item, i);
    }
  });

  return salty;
}

function applyMatcherObject(value, matcherObject) {
  if (matcherObject.isUndefined === true) {
    return _.isUndefined(value);
  }

  if (matcherObject.isUndefined === false) {
    return !_.isUndefined(value);
  }

  if (matcherObject.left) {
    return value && value.startsWith && value.startsWith(matcherObject.left);
  }

  if (matcherObject.right) {
    return value && value.endsWith && value.endsWith(matcherObject.right);
  }

  return false;
}

function finderWithMatcher(salty, ...args) {
  let item;
  let matches;
  const len = salty._items.length;
  const matcher = _.defaults({}, ...args);
  const matcherKeys = Object.keys(matcher);
  let matcherValue;

  // Fast path if matcher object was empty or missing; that means "select all."
  if (matcherKeys.length === 0) {
    selectAllItems(salty);
  } else {
    createSelection(salty);

    for (let i = 0; i < len; i++) {
      matches = true;

      item = salty._items[i];
      for (const key of matcherKeys) {
        matcherValue = matcher[key];
        if (Array.isArray(matcherValue)) {
          if (!matcherValue.includes(item[key])) {
            matches = false;
          }
        } else if (_.isObject(matcherValue)) {
          matches = applyMatcherObject(item[key], matcherValue);
        } else if (matcherValue !== item[key]) {
          matches = false;
        }

        if (matches === false) {
          break;
        }
      }

      if (matches) {
        addToSelection(salty, item, i);
      }
    }
  }

  return salty;
}

function finder(salty, ...args) {
  if (args.length && _.isFunction(args[0])) {
    return finderWithFunction(salty, args[0]);
  } else {
    return finderWithMatcher(salty, ...args);
  }
}

function isNullOrUndefined(value) {
  return _.isNull(value) || _.isUndefined(value);
}

function sorter(items, keys) {
  keys = keys.split(',').map((key) => key.trim());
  keys.reverse();
  for (const key of keys) {
    // TaffyDB has an unusual approach to sorting that can yield surprising results. Rather than
    // duplicate that approach, we use the following sort order, which is close enough to TaffyDB
    // and is easier to reason about:
    //
    // 1. Non-null, non-undefined values, in standard sort order
    // 2. Null values
    // 3. Explicitly undefined values: key is present, value is undefined
    // 4. Implicitly undefined values: key is not present
    items.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (isNullOrUndefined(aValue) || isNullOrUndefined(bValue)) {
        // Null and undefined come after all other values.
        if (!isNullOrUndefined(aValue)) {
          return -1;
        }

        if (!isNullOrUndefined(bValue)) {
          return 1;
        }

        // Null comes before undefined.
        if (_.isNull(aValue) && _.isUndefined(bValue)) {
          return -1;
        }

        if (_.isUndefined(aValue) && _.isNull(bValue)) {
          return 1;
        }

        // Explicitly undefined comes before implicitly undefined.
        if (_.isUndefined(aValue) && _.isUndefined(bValue)) {
          if (Object.hasOwn(a, key)) {
            return -1;
          }

          if (Object.hasOwn(b, key)) {
            return 1;
          }
        }

        // Both values are null, or both values are undefined.
        return 0;
      }

      // Neither value is null or undefined, so just use standard sort order.
      if (aValue < bValue) {
        return -1;
      }

      if (aValue > bValue) {
        return 1;
      }

      return 0;
    });
  }

  return true;
}

function makeDb(salty) {
  /*
    Selections are persisted a bit differently in TaffyDB and Salty. Consider the following:

    ```js
    let db2 = db({ a: 1 });

    db2.remove();
    db().get;
    db2.get();
    ```

    In TaffyDB, `db` and `db2` track selected items separately. `db().get()` returns all items;
    `db2.get()` returns an empty array.

    In Salty, `db` and `db2` are the same object, so they share information about selected items.
    `db().get()` returns all items; `db2.get()` also returns all items, because the selection from
    `db().get()` remains active.
  */
  const db = (...args) => finder(salty, ...args);

  db.sort = (keys) => sorter(salty._items, keys);

  return db;
}

class Salty {
  constructor(items) {
    this._items = items ? items.slice() : [];
    eraseSelection(this);

    return makeDb(this);
  }

  each(func) {
    this._selectedItems.forEach((item, i) => func(item, i));

    return this;
  }

  get() {
    return this._selectedItems.slice();
  }

  remove() {
    let removedItems = 0;

    if (this._selectedIndexes && this._selectedIndexes.length) {
      removedItems = this._selectedIndexes.length;
      this._items = this._items.filter((_item, i) => !this._selectedIndexes.includes(i));
    }

    // Make the selection empty so that calling `get()` returns an empty array.
    createSelection(this);

    return removedItems;
  }
}

module.exports = Salty;
