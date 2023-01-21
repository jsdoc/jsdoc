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
// Tags that JSDoc uses internally, and that must always be defined.

// Special separator tag indicating that multiple doclets should be generated for the same comment.
// Used internally (and by some JSDoc users, although it's not officially supported).
//
// In the following example, the parser will replace `//**` with an `@also` tag:
// /**
//  * Foo.
//  *//**
//  * Foo with a param.
//  * @param {string} bar
//  */
//  function foo(bar) {}
exports.also = {
  onTagged() {
    // Let the parser handle it. We define the tag here to avoid "not a known tag" errors.
  },
};

exports.description = {
  mustHaveValue: true,
  onTagged: (doclet, { value }) => {
    doclet.description = value;
  },
  synonyms: ['desc'],
};

exports.kind = {
  mustHaveValue: true,
  onTagged: (doclet, { value }) => {
    doclet.kind = value;
  },
};

exports.name = {
  mustHaveValue: true,
  onTagged: (doclet, { value }) => {
    doclet.name = value;
  },
};

exports.undocumented = {
  mustNotHaveValue: true,
  onTagged(doclet) {
    doclet.undocumented = true;
    doclet.comment = '';
  },
};
