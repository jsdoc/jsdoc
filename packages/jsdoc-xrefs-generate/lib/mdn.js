/*
  Copyright 2026 the JSDoc Authors.

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

import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { prototypeToPunc } from '@jsdoc/name';
import yaml from 'js-yaml';
import _ from 'lodash';
import spawn from 'nano-spawn';
import { regex } from 'regex';
import { glob } from 'tinyglobby';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// TODO: locale
const BASE_URL = 'https://developer.mozilla.org/en-US/docs/';

const MDN_PAGE_TYPE_METADATA = {
  'javascript-class': {
    kind: 'class',
  },
  'javascript-constructor': {
    kind: 'class',
  },
  'javascript-function': {
    kind: 'function',
    scope: 'global',
  },
  'javascript-global-property': {
    kind: 'member',
    scope: 'global',
  },
  'javascript-instance-accessor-property': {
    kind: 'member',
    scope: 'instance',
  },
  'javascript-instance-data-property': {
    kind: 'member',
    scope: 'instance',
  },
  'javascript-instance-method': {
    kind: 'function',
    scope: 'instance',
  },
  'javascript-namespace': {
    kind: 'namespace',
    scope: 'global',
  },
  'javascript-static-accessor-property': {
    kind: 'member',
    scope: 'static',
  },
  'javascript-static-data-property': {
    kind: 'member',
    scope: 'static',
  },
  'javascript-static-method': {
    kind: 'function',
    scope: 'static',
  },
};
const MDN_PAGE_TYPES = new Set(Object.keys(MDN_PAGE_TYPE_METADATA));

const NEEDS_LOWERCASE_ALIAS = ['Array', 'Boolean', 'Function', 'Number', 'Object', 'String'];

const REGEXP_ALIASED_STATIC_PROP = regex`
  ^
    (?<parentName>[a-zA-Z]+)
    \.
    (?<propertyName>[a-zA-Z]+)
    \s
    \(
      (?<propertyAlias>\S+)
    \)
  $
`;
const REGEXP_FRONT_MATTER = regex('m')`
  \g<delimiter> \n
  (?<frontMatter> [\s\S]+)
  \n \g<delimiter>

  (?(DEFINE)
    (?<delimiter> ^---$)
  )
`;
const REGEXP_INSTANCE_PROP = regex`
  :\s
    (?<propertyName> [a-zA-Z]+)
  $
`;
const REGEXP_TRAILING_PARENS = regex`\(\)$`;

async function extractFrontMatter(file) {
  const data = await readFile(file, 'utf8');
  const frontMatterYaml = data.match(REGEXP_FRONT_MATTER)?.groups?.frontMatter;

  return frontMatterYaml ? yaml.load(frontMatterYaml) : {};
}

function createIdentifiers(longname) {
  let staticPropGroups;
  const ids = [];

  longname = longname
    .replace(REGEXP_TRAILING_PARENS, '')
    .replace('() constructor', '.constructor')
    .replace(REGEXP_INSTANCE_PROP, '#$<propertyName>');
  longname = prototypeToPunc(longname);

  // Matches values like `Foo.bar ($!)`.
  staticPropGroups = REGEXP_ALIASED_STATIC_PROP.exec(longname)?.groups;
  if (staticPropGroups) {
    // Like `Foo.bar`
    ids.push(`${staticPropGroups.parentName}.${staticPropGroups.propertyName}`);
    // Like `Foo["$!"]`
    ids.push(
      `${staticPropGroups.parentName}["${staticPropGroups.propertyAlias.replaceAll('"', '\\"')}"]`
    );
    // Like `Foo['$!']`
    ids.push(
      `${staticPropGroups.parentName}['${staticPropGroups.propertyAlias.replaceAll("'", "\\'")}']`
    );
  }
  // Special case for an unusual `RegExp` page title.
  else if (longname === 'RegExp.$1, …, RegExp.$9') {
    for (let i = 1; i <= 9; i++) {
      ids.push(`RegExp.$${i}`);
    }
  }
  // Special case for the `handler` object that a `Proxy` accepts.
  else if (longname.startsWith('handler.')) {
    ids.push('Proxy~' + longname);
  } else {
    ids.push(longname);
  }

  // Selected longnames, like `Object`, get a lowercase alias, like `object`.
  if (NEEDS_LOWERCASE_ALIAS.includes(longname)) {
    ids.push(longname.toLowerCase());
  }

  return ids;
}

function extractPageInfo({ 'page-type': pageType, slug, title }) {
  const items = {};
  let longnames;
  let url;

  if (!MDN_PAGE_TYPES.has(pageType)) {
    return null;
  }

  longnames = createIdentifiers(title);
  url = BASE_URL + slug;

  for (const longname of longnames) {
    items[longname] = _.defaults({ url }, MDN_PAGE_TYPE_METADATA[pageType]);
  }

  return items;
}

const gitDir = await mkdtemp(join(tmpdir(), 'jsdoc-xrefs-mdn-'));

await spawn('git', ['clone', '--depth=1', 'https://github.com/mdn/content', gitDir]);

// TODO: refer to locale, version #, etc., as "variants"
// TODO: allow user to specify locale(s)
// TODO: read from supported locales and only allow these:
// https://github.com/mdn/content/blob/main/files/jsondata/L10n-JavaScript.json
const cwd = join(gitDir, 'files/en-us/web/javascript/reference/global_objects');
const files = await glob('**/*.md', { cwd });
const promises = [];

files.forEach((file) => {
  promises.push(extractFrontMatter(join(cwd, file)));
});

const frontMatter = await Promise.all(promises);
const collator = new Intl.Collator('en', { caseFirst: 'lower' });

let xrefs = {};
for (const fm of frontMatter) {
  Object.assign(xrefs, extractPageInfo(fm));
}
xrefs = Object.keys(xrefs)
  .sort((a, b) => collator.compare(a, b))
  .reduce((obj, key) => {
    obj[key] = xrefs[key];
    return obj;
  }, {});

// TODO: default export is getter that takes options, like locale? okay to make it async?
// TODO: separate packages for generators and xrefs? one package per xrefs? maybe also a "core" package?
// TODO: create JSON Schema; add schema version to output

// console.log(JSON.stringify({ xrefs }, null, 2));
await writeFile(
  join(__dirname, '../data/mdn/en-US.json'),
  JSON.stringify({ xrefs }, null, 2),
  'utf8'
);
