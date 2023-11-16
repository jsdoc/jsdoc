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

import path from 'node:path';

import { name } from '@jsdoc/core';
import commonPathPrefix from 'common-path-prefix';
import _ from 'lodash';

import { parse as parseTagType } from '../type.js';

// Clone a tag definition, excluding synonyms.
export function cloneTagDef(tagDef, extras) {
  const newTagDef = _.cloneDeep(tagDef);

  delete newTagDef.synonyms;

  return extras ? _.extend(newTagDef, extras) : newTagDef;
}

export function getSourcePaths(env) {
  const sourcePaths = env.sourceFiles.slice() || [];

  if (env.opts._) {
    env.opts._.forEach((sourcePath) => {
      const resolved = path.resolve(process.cwd(), sourcePath);

      if (!sourcePaths.includes(resolved)) {
        sourcePaths.push(resolved);
      }
    });
  }

  return sourcePaths;
}

function filepathMinusPrefix(filepath, env) {
  let commonPrefix;
  const sourcePaths = getSourcePaths(env);
  let result = '';

  commonPrefix =
    sourcePaths.length > 1
      ? commonPathPrefix(sourcePaths)
      : path.dirname(sourcePaths[0] || '') + path.sep;

  if (filepath) {
    filepath = path.normalize(filepath);
    // always use forward slashes in the result
    result = (filepath + path.sep).replace(commonPrefix, '').replace(/\\/g, '/');
  }

  if (result.length > 0 && result[result.length - 1] !== '/') {
    result += '/';
  }

  return result;
}

export function setDocletKindToTitle(doclet, { title }) {
  doclet.addTag('kind', title);
}

export function setDocletScopeToTitle(doclet, { title }, deps) {
  let log;

  try {
    doclet.setScope(title);
  } catch (e) {
    log = deps.get('log');
    log.error(e.message);
  }
}

export function setDocletNameToValue(doclet, { value, text }) {
  if (value && value.description) {
    // as in a long tag
    doclet.addTag('name', value.description);
  } else if (text) {
    // or a short tag
    doclet.addTag('name', text);
  }
}

export function setDocletNameToValueName(doclet, { value }) {
  if (value && value.name) {
    doclet.addTag('name', value.name);
  }
}

export function setDocletDescriptionToValue(doclet, { value }) {
  if (value) {
    doclet.addTag('description', value);
  }
}

export function setDocletTypeToValueType(doclet, { value }) {
  if (value && value.type) {
    // Add the type names and other type properties (such as `optional`).
    // Don't overwrite existing properties.
    Object.keys(value).forEach((prop) => {
      if (!Object.hasOwn(doclet, prop)) {
        doclet[prop] = value[prop];
      }
    });
  }
}

export function setNameToFile(doclet) {
  let docletName;

  if (doclet.meta.filename) {
    docletName =
      filepathMinusPrefix(doclet.meta.path, doclet.dependencies.get('env')) + doclet.meta.filename;
    doclet.addTag('name', docletName);
  }
}

export function setDocletMemberof(doclet, { value }) {
  if (value && value !== '<global>') {
    doclet.setMemberof(value);
  }
}

export function applyNamespaceToTag(docletOrNs, tag) {
  if (typeof docletOrNs === 'string') {
    // ns
    tag.value = name.applyNamespace(tag.value, docletOrNs);
  } else {
    // doclet
    if (!docletOrNs.name) {
      return; // error?
    }

    docletOrNs.longname = name.applyNamespace(docletOrNs.name, tag.title);
  }
}

export function setDocletNameToFilename(doclet) {
  let docletName = '';

  if (doclet.meta.path) {
    docletName = filepathMinusPrefix(doclet.meta.path, doclet.dependencies.get('env'));
  }
  // TODO: Drop the file extension regardless of what it is.
  docletName += doclet.meta.filename.replace(/\.js$/i, '');

  doclet.name = docletName;
}

export function parseTypeText(text) {
  const tagType = parseTagType(text, false, true);

  return tagType.typeExpression || text;
}

export function parseBorrows(doclet, { text }) {
  const m = /^([\s\S]+?)(?:\s+as\s+([\s\S]+))?$/.exec(text);

  if (m) {
    if (m[1] && m[2]) {
      return {
        target: m[1],
        source: m[2],
      };
    } else if (m[1]) {
      return {
        target: m[1],
      };
    }

    return {};
  } else {
    return {};
  }
}

export function firstWordOf(string) {
  const m = /^(\S+)/.exec(string);

  if (m) {
    return m[1];
  } else {
    return '';
  }
}

export function combineTypes({ value }) {
  let combined;

  if (value && value.type) {
    if (value.type.names.length === 1) {
      combined = value.type.names[0];
    } else {
      combined = `(${value.type.names.join('|')})`;
    }
  }

  return combined;
}
