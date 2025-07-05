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

/**
 * Provides classes and methods related to _doclets_, which contain the information that JSDoc
 * extracts from your source files.
 *
 * @module @jsdoc/doclet
 */
import * as augment from './lib/augment.js';
import { resolveBorrows } from './lib/borrow.js';
import { Doclet } from './lib/doclet.js';
import { DocletStore } from './lib/doclet-store.js';
import { Package } from './lib/package.js';
import * as schema from './lib/schema.js';

export { augment, Doclet, DocletStore, Package, resolveBorrows, schema };
export default { augment, Doclet, DocletStore, Package, resolveBorrows, schema };
