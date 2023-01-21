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
const core = require('./core');
const util = require('./util');

const NOOP_TAG = {
  onTagged: () => {
    // Do nothing.
  },
};

exports.const = {
  canHaveType: true,
  onTagged(doclet, tag) {
    doclet.kind = 'constant';
    util.setDocletTypeToValueType(doclet, tag);
  },
  // Closure Compiler only
  synonyms: ['define'],
};

exports.constructor = util.cloneTagDef(core.class);

exports.deprecated = util.cloneTagDef(core.deprecated);

// Closure Compiler only
exports.dict = NOOP_TAG;

exports.enum = util.cloneTagDef(core.enum);

// Closure Compiler only
exports.export = NOOP_TAG;

exports.extends = util.cloneTagDef(core.augments);

// Closure Compiler only
exports.externs = NOOP_TAG;

exports.fileoverview = {
  onTagged(doclet, tag) {
    util.setNameToFile(doclet);
    doclet.kind = 'file';
    util.setDocletDescriptionToValue(doclet, tag);

    doclet.preserveName = true;
  },
};

exports.final = util.cloneTagDef(core.readonly);

exports.implements = util.cloneTagDef(core.implements);

// Closure Compiler only
exports.implicitcast = NOOP_TAG;

exports.inheritdoc = util.cloneTagDef(core.inheritdoc);

exports.interface = util.cloneTagDef(core.interface, {
  canHaveName: false,
  mustNotHaveValue: true,
  // Closure Compiler only
  synonyms: ['record'],
});

exports.lends = util.cloneTagDef(core.lends);

exports.license = util.cloneTagDef(core.license);

exports.modifies = util.cloneTagDef(core.modifies);

// Closure Compiler only
exports.noalias = NOOP_TAG;

// Closure Compiler only
exports.nocollapse = NOOP_TAG;

// Closure Compiler only
exports.nocompile = NOOP_TAG;

// Closure Compiler only
exports.nosideeffects = {
  onTagged(doclet) {
    doclet.modifies = [];
  },
};

// Closure Compiler only
exports.override = {
  mustNotHaveValue: true,
  onTagged(doclet) {
    doclet.override = true;
  },
};

exports.package = {
  canHaveType: true,
  onTagged(doclet, tag) {
    doclet.access = 'package';

    if (tag.value && tag.value.type) {
      util.setDocletTypeToValueType(doclet, tag);
    }
  },
};

exports.param = util.cloneTagDef(core.param);

// Closure Compiler only
exports.polymer = NOOP_TAG;

// Closure Compiler only
exports.polymerBehavior = NOOP_TAG;

// Closure Compiler only
exports.preserve = util.cloneTagDef(core.license);

exports.private = {
  canHaveType: true,
  onTagged(doclet, tag) {
    doclet.access = 'private';

    if (tag.value && tag.value.type) {
      util.setDocletTypeToValueType(doclet, tag);
    }
  },
};

exports.protected = {
  canHaveType: true,
  onTagged(doclet, tag) {
    doclet.access = 'protected';

    if (tag.value && tag.value.type) {
      util.setDocletTypeToValueType(doclet, tag);
    }
  },
};

exports.public = {
  canHaveType: true,
  onTagged(doclet, tag) {
    doclet.access = 'public';

    if (tag.value && tag.value.type) {
      util.setDocletTypeToValueType(doclet, tag);
    }
  },
};

exports.return = util.cloneTagDef(core.returns);

// Closure Compiler only
exports.struct = NOOP_TAG;

// Closure Compiler only
exports.suppress = NOOP_TAG;

// Closure Compiler only
exports.template = NOOP_TAG;

exports.this = {
  canHaveType: true,
  onTagged(doclet, tag) {
    doclet.this = util.combineTypes(tag);
  },
};

exports.throws = util.cloneTagDef(core.throws);

exports.type = util.cloneTagDef(core.type, {
  mustNotHaveDescription: false,
});

exports.typedef = {
  canHaveType: true,
  onTagged(doclet, tag) {
    util.setDocletKindToTitle(doclet, tag);
    util.setDocletTypeToValueType(doclet, tag);
  },
};

// Closure Compiler only
exports.unrestricted = NOOP_TAG;
