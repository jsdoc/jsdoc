/*
  Copyright 2010 the JSDoc Authors.

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
// Tag dictionary for Google Closure Compiler.

import { tags as core } from './core.js';
import * as util from './util.js';

const NOOP_TAG = {
  onTagged: () => {
    // Do nothing.
  },
};

export const tags = {
  const: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.kind = 'constant';
      util.setDocletTypeToValueType(doclet, tag);
    },
    // Closure Compiler only
    synonyms: ['define'],
  },
  constructor: util.cloneTagDef(core.class),
  deprecated: util.cloneTagDef(core.deprecated),
  // Closure Compiler only
  dict: NOOP_TAG,
  enum: util.cloneTagDef(core.enum),
  // Closure Compiler only
  export: NOOP_TAG,
  extends: util.cloneTagDef(core.augments),
  // Closure Compiler only
  externs: NOOP_TAG,
  fileoverview: {
    onTagged(doclet, tag) {
      util.setNameToFile(doclet);
      doclet.kind = 'file';
      util.setDocletDescriptionToValue(doclet, tag);

      doclet.preserveName = true;
    },
  },
  final: util.cloneTagDef(core.readonly),
  implements: util.cloneTagDef(core.implements),
  // Closure Compiler only
  implicitcast: NOOP_TAG,
  inheritdoc: util.cloneTagDef(core.inheritdoc),
  interface: util.cloneTagDef(core.interface, {
    canHaveName: false,
    mustNotHaveValue: true,
    // Closure Compiler only
    synonyms: ['record'],
  }),
  lends: util.cloneTagDef(core.lends),
  license: util.cloneTagDef(core.license),
  modifies: util.cloneTagDef(core.modifies),
  // Closure Compiler only
  noalias: NOOP_TAG,
  // Closure Compiler only
  nocollapse: NOOP_TAG,
  // Closure Compiler only
  nocompile: NOOP_TAG,
  // Closure Compiler only
  nosideeffects: {
    onTagged(doclet) {
      doclet.modifies = [];
    },
  },
  // Closure Compiler only
  override: {
    mustNotHaveValue: true,
    onTagged(doclet) {
      doclet.override = true;
    },
  },
  package: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.access = 'package';

      if (tag.value && tag.value.type) {
        util.setDocletTypeToValueType(doclet, tag);
      }
    },
  },
  param: util.cloneTagDef(core.param),
  // Closure Compiler only
  polymer: NOOP_TAG,
  // Closure Compiler only
  polymerBehavior: NOOP_TAG,
  // Closure Compiler only
  preserve: util.cloneTagDef(core.license),
  private: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.access = 'private';

      if (tag.value && tag.value.type) {
        util.setDocletTypeToValueType(doclet, tag);
      }
    },
  },
  protected: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.access = 'protected';

      if (tag.value && tag.value.type) {
        util.setDocletTypeToValueType(doclet, tag);
      }
    },
  },
  public: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.access = 'public';

      if (tag.value && tag.value.type) {
        util.setDocletTypeToValueType(doclet, tag);
      }
    },
  },
  return: util.cloneTagDef(core.returns),
  // Closure Compiler only
  struct: NOOP_TAG,
  // Closure Compiler only
  suppress: NOOP_TAG,
  // Closure Compiler only
  template: NOOP_TAG,
  this: {
    canHaveType: true,
    onTagged(doclet, tag) {
      doclet.this = util.combineTypes(tag);
    },
  },
  throws: util.cloneTagDef(core.throws),
  type: util.cloneTagDef(core.type, {
    mustNotHaveDescription: false,
  }),
  typedef: {
    canHaveType: true,
    onTagged(doclet, tag) {
      util.setDocletKindToTitle(doclet, tag);
      util.setDocletTypeToValueType(doclet, tag);
    },
  },
  // Closure Compiler only
  unrestricted: NOOP_TAG,
};
