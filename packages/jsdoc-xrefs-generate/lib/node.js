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

import { readFileSync } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { SCOPE, SCOPE_TO_PUNC } from '@jsdoc/name';
import spawn from 'nano-spawn';
import { regex } from 'regex';
import semver from 'semver';

const CACHE_DIR = '.jsdoc-xrefs-cache';
// Node.js JSON documentation files to process.
const NODEJS_JSON = [
  'assert.json',
  'async_context.json',
  'async_hooks.json',
  'buffer.json',
  'child_process.json',
  'cluster.json',
  'console.json',
  'crypto.json',
  'dgram.json',
  'diagnostics_channel.json',
  'dns.json',
  'domain.json',
  'errors.json',
  'events.json',
  'fs.json',
  // TODO: Make these omit module name and have `scope: 'global'`.
  'globals.json',
  'http.json',
  'http2.json',
  'https.json',
  'inspector.json',
  // TODO: Make `node:module.Module` a namespace.
  'module.json',
  'net.json',
  'os.json',
  'path.json',
  'perf_hooks.json',
  'process.json',
  'punycode.json',
  'querystring.json',
  'readline.json',
  'sqlite.json',
  'stream.json',
  'string_decoder.json',
  'test.json',
  'timers.json',
  'tls.json',
  'tracing.json',
  'tty.json',
  'url.json',
  'util.json',
  'v8.json',
  'vm.json',
  'wasi.json',
  'webcrypto.json',
  'webstreams.json',
  'worker_threads.json',
  'zlib.json',
];

// Metadata for specific `type`s.
const NODEJS_TYPE_METADATA = {
  class: {
    kind: 'class',
  },
  classMethod: {
    kind: 'method',
    scope: 'static',
  },
  event: {
    kind: 'event',
  },
  method: {
    kind: 'method',
  },
  module: {
    kind: 'module',
  },
  property: {
    kind: 'member',
  },
};

const NODEJS_VERSIONS = [20, 22, 24];

const REGEXP_BRACKETED_PROPERTY = regex`
  ^ <propertyChain>
  \[
    <propertyChain>
  \]

  (?(DEFINE)
    # This accepts some invalid values, but we're a scraper, not a validator.
    (?<propertyChain> [a-zA-Z][a-zA-Z0-9_./]*)
  )
`;

export default class NodeXrefGenerator {
  constructor(options) {
    this.collator = new Intl.Collator('en', { caseFirst: 'lower' });
    this.defaultLocale = 'en';
    this.defaultVersion = null;
    this.repoDir = options.repoDir;
    this.docKitDir = join(this.repoDir, 'nodejs-doc-kit');
    this.docsDir = join(this.repoDir, 'nodejs');
    this.generateJson = options.generateJson ?? true;
    this.gitRepos = {
      'https://github.com/nodejs/doc-kit': this.docKitDir,
      'https://github.com/nodejs/node': this.docsDir,
    };
    this.gitTags = [];
    this.locales = [];
    this.slug = null;
    this.versions = options.versions ?? NODEJS_VERSIONS.slice();
    this.xrefsByModule = {};
  }

  #addXref(xref, metadata) {
    // We always track by the root module, even if we're in a submodule like `fs/promises`.
    const moduleName = this.#rootModuleName(metadata);
    const { longname, scope } = this.#getLongnameAndScope(xref, metadata);

    if (scope) {
      xref.scope = scope;
    }
    xref.url = metadata.urlPrefix;
    if (xref.slug) {
      xref.url += '#' + xref.slug;
      delete xref.slug;
    }

    this.xrefsByModule[metadata.majorVersion][moduleName][longname] = xref;
    for (const variant of this.#getLongnameVariants(longname, xref)) {
      this.xrefsByModule[metadata.majorVersion][moduleName][variant] = xref;
    }
  }

  #createXref(item, metadata, ...sources) {
    let info = {
      name: item.name ? this.#handleName(item, metadata) : null,
    };

    info = Object.assign(info, ...(sources ?? []));
    info = Object.assign(info, NODEJS_TYPE_METADATA[item.type]);
    info.slug ??= item.textRaw ? this.slug(item.textRaw) : null;

    return info;
  }

  #currentModuleName(metadata) {
    return metadata.moduleName.at(-1);
  }

  // TODO: async_hooks static methods on the module are showing up as instance methods of
  // async_hooks.AsyncHook
  async extractXrefs() {
    const allRepoTags = await this.#getDocRepoTags();
    const jsonPaths = {};
    const promises = [];
    const tagsToProcess = {};

    this.slug = (await import(join(this.docKitDir, 'src/utils/parser/slugger.mjs'))).slug;

    for (const majorVersion of this.versions) {
      tagsToProcess[majorVersion] = semver.maxSatisfying(allRepoTags, String(majorVersion));
    }

    for (const [majorVersion, tag] of Object.entries(tagsToProcess)) {
      // We need to generate these in sequence, not in parallel.
      // TODO: use reduce?
      // eslint-disable-next-line no-await-in-loop
      jsonPaths[majorVersion] = await this.#generateJson({ majorVersion, tag });
    }

    for (const [majorVersion, jsonFiles] of Object.entries(jsonPaths)) {
      const jsonData = {};
      let jsonDir;

      jsonFiles.forEach((jsonFile) => {
        jsonDir ??= dirname(jsonFile);
        try {
          // TODO: Figure out why jsonData is empty when we do this asynchronously
          jsonData[jsonFile] = JSON.parse(readFileSync(jsonFile, 'utf8'));
        } catch (e) {
          // Do nothing; this module probably doesn't exist in the specified Node.js version.
        }
      });

      this.#mergeAsyncContextAndHooks(jsonDir, jsonData);

      for (const moduleData of Object.values(jsonData)) {
        promises.push(this.#handleRoot(moduleData, majorVersion));
      }
    }

    return Promise.all(promises);
  }

  fetchData() {
    const promises = [];

    if (!this.generateJson) {
      return Promise.resolve();
    }

    for (const [repoUrl, repoDir] of Object.entries(this.gitRepos)) {
      const cwd = { cwd: repoDir };

      promises.push(
        this.#isGitRepo(repoDir).then(async (isGitRepo) => {
          if (isGitRepo) {
            await spawn('git', ['checkout', 'main'], cwd);
            await spawn('git', ['fetch'], cwd);

            return spawn('git', ['rebase', 'origin/main'], cwd);
          } else {
            return mkdir(repoDir, { recursive: true }).then(
              spawn('git', ['clone', repoUrl, repoDir])
            );
          }
        })
      );
    }

    return Promise.all(promises);
  }

  #filterAndSortVersions(versions) {
    let filtered = versions.filter((v) => {
      // Remove unstable major versions, which use odd numbers.
      if (semver.major(v) % 2) {
        return false;
      }

      return true;
    });

    // If there were no stable versions, then restore the unstable versions.
    if (filtered.length === 0) {
      filtered = versions.slice();
    }

    return semver.rsort(filtered);
  }

  #fixName(name, metadata) {
    let prefix;

    // Like `util.TextDecoder`
    prefix = this.#currentModuleName(metadata) + '.';
    if (name.startsWith(prefix)) {
      name = name.replace(prefix, '');
    }
    // Like `BroadcastChannel extends EventTarget`
    else if (name.includes(' extends ')) {
      name = name.replace(/ extends .+$/, '');
    }

    return name;
  }

  async #generateJson({ majorVersion, tag }) {
    const outDir = join(this.docKitDir, 'out', String(majorVersion));
    const docKitCwd = { cwd: this.docKitDir };
    const docsCwd = { cwd: this.docsDir };

    if (this.generateJson) {
      await spawn('git', ['checkout', tag], docsCwd);
      await spawn('npm', ['install'], docKitCwd);
      await mkdir(outDir, { recursive: true });
      await spawn(
        './bin/cli.mjs',
        [
          'generate',
          '-t',
          'legacy-json',
          '-i',
          join(this.docsDir, 'doc/api/*.md'),
          '--index',
          join(this.docsDir, 'doc/api/index.md'),
          '-o',
          outDir,
        ],
        docKitCwd
      );
      await spawn('git', ['checkout', 'main']);
    }

    return Promise.resolve(NODEJS_JSON.map((f) => join(outDir, f)));
  }

  async #getDocRepoTags() {
    return (await spawn('git', ['tag', '--list'], { cwd: this.docsDir })).output.split('\n');
  }

  #getLongnameAndScope(xref, metadata) {
    const currentAncestors = metadata.ancestors.slice();
    let currentXref;
    const nameStack = [];
    let parent;
    const { scope, scopePunc } = this.#getScope(xref, metadata);

    do {
      currentXref = parent ?? xref;
      const { scopePunc: punc } = this.#getScope(
        currentXref,
        Object.assign({}, metadata, { ancestors: currentAncestors })
      );

      nameStack.push(punc + currentXref.name);

      parent = currentAncestors.pop();
    } while (parent && currentXref.kind !== 'module');

    return {
      longname: nameStack.reverse().join(''),
      scope,
      scopePunc,
    };
  }

  #getLongnameVariants(longname, xref) {
    const variants = [`node:${longname}`];

    // Add namespaced variants.
    for (const kind of ['event', 'module']) {
      if (xref.kind === kind) {
        variants.push(...[`${kind}:${longname}`, `${kind}:node:${longname}`]);
      }
    }

    return variants;
  }

  #getScope(xref, metadata) {
    let { kind, name, scope } = xref;
    const parent = metadata.ancestors?.at(-1);

    if (scope) {
      // The xref already has a scope, so we'll just use it.
    }
    // Like `util.TextDecoder`
    else if (name.startsWith(this.#currentModuleName(metadata) + '.')) {
      scope = SCOPE.NAMES.STATIC;
    }
    // Like any event
    else if (kind === 'event') {
      scope = SCOPE.NAMES.INNER;
    }
    // Like `dir[Symbol.asyncIterator]()`
    else if (parent?.kind !== 'module' && name.match(REGEXP_BRACKETED_PROPERTY)) {
      scope = SCOPE.NAMES.INSTANCE;
    }
    // Like the method `captureStackTrace` on the class `SystemError`, or the property `bytesRead`
    // on the class `fs.ReadStream`
    else if (parent?.kind === 'class' && (xref.kind === 'method' || xref.kind === 'member')) {
      scope = SCOPE.NAMES.INSTANCE;
    }

    if (!scope && parent && xref.kind !== 'module') {
      scope = SCOPE.NAMES.STATIC;
    }

    return { scope, scopePunc: scope ? SCOPE_TO_PUNC[scope] : '' };
  }

  #handleAdded(added) {
    if (!Array.isArray(added)) {
      added = [added];
    }

    return this.#filterAndSortVersions(added)[0];
  }

  #handleClass(klass, metadata) {
    let xref = this.#createXref(klass, metadata);

    this.#pushAncestor(xref, metadata);

    if (klass.meta) {
      xref = Object.assign(xref, this.#handleMeta(klass.meta));
    }

    if (klass.classMethods) {
      this.#handleClassMethods(klass.classMethods, metadata);
    }
    if (klass.events) {
      this.#handleEvents(klass.events, metadata);
    }
    if (klass.methods) {
      this.#handleMethods(klass.methods, metadata);
    }
    if (klass.properties) {
      this.#handleProperties(klass.properties, metadata);
    }

    // We don't want the class to be an ancestor of itself, so we need to pop the ancestor _before_
    // we add the class's xref.
    this.#popAncestor(metadata);
    this.#addXref(xref, metadata);
  }

  #handleClasses(classes, metadata) {
    for (const klass of classes) {
      this.#handleClass(klass, metadata);
    }
  }

  #handleClassMethod(classMethod, metadata) {
    const xref = this.#createXref(classMethod, metadata);

    this.#addXref(xref, metadata);
  }

  #handleClassMethods(classMethods, metadata) {
    for (const classMethod of classMethods) {
      this.#handleClassMethod(classMethod, metadata);
    }
  }

  #handleDeprecated(deprecated) {
    return this.#filterAndSortVersions(deprecated)[0];
  }

  #handleEvent(event, metadata) {
    let xref = this.#createXref(event, metadata);

    if (event.meta) {
      xref = Object.assign(xref, this.#handleMeta(event.meta));
    }

    this.#addXref(xref, metadata);
  }

  #handleEvents(events, metadata) {
    for (const event of events) {
      this.#handleEvent(event, metadata);
    }
  }

  #handleIntroducedIn(introducedIn, metadata) {
    return this.#handleAdded(introducedIn, metadata);
  }

  #handleMeta(meta) {
    const result = {};

    if (meta.added) {
      result.since = this.#handleAdded(meta.added);
    }
    if (meta.deprecated) {
      result.deprecated = this.#handleDeprecated(meta.deprecated);
    }

    return result;
  }

  #handleMethod(method, metadata) {
    const xref = this.#createXref(method, metadata);

    this.#addXref(xref, metadata);
  }

  #handleMethods(methods, metadata) {
    for (const method of methods) {
      this.#handleMethod(method, metadata);
    }
  }

  #handleModule(module, metadata) {
    let originalUrlPrefix;

    // `fs/promises` needs special treatment; it's effectively a root module.
    if (this.#currentModuleName(metadata) === 'fs' && module.name === 'promises_api') {
      const xref = {
        kind: 'module',
        name: 'fs/promises',
        slug: this.slug(module.textRaw),
      };

      this.#pushModuleName('fs/promises', metadata);
      this.#addXref(xref, metadata);
      this.#pushAncestor(xref, metadata);
    }

    // If we merged two packages, then make sure URLs point to the correct package.
    if (module._moduleNameForUrl) {
      originalUrlPrefix = metadata.urlPrefix;
      metadata.urlPrefix = `${this.#urlPrefix(metadata.majorVersion)}/${module._moduleNameForUrl}.html`;
    }

    const currentModuleName = this.#currentModuleName(metadata);

    // This property contains the equivalent of `@since` for the module as a whole.
    if (module.introduced_in) {
      const moduleXref =
        this.xrefsByModule[metadata.majorVersion][currentModuleName][currentModuleName];

      moduleXref.since = this.#handleIntroducedIn(module.introduced_in);
    }

    if (module.classes) {
      this.#handleClasses(module.classes, metadata);
    }
    if (module.modules) {
      this.#handleModules(module.modules, metadata);
    }

    if (module.events) {
      this.#handleEvents(module.events, metadata);
    }
    if (module.methods) {
      this.#handleMethods(module.methods, metadata);
    }
    if (module.properties) {
      this.#handleProperties(module.properties, metadata);
    }

    if (originalUrlPrefix) {
      metadata.urlPrefix = originalUrlPrefix;
    }

    if (currentModuleName === 'fs/promises') {
      this.#popModuleName(metadata);
      this.#popAncestor(metadata);
    }
  }

  #handleModules(modules, metadata) {
    for (const module of modules) {
      this.#handleModule(module, metadata);
    }
  }

  #handleName(item) {
    let { name } = item;

    // Event names like `net.client.socket` must be quoted.
    if (item.type === 'event' && name.match(/[.:]/)) {
      name = `"${name}"`;
    }

    return name;
  }

  #handleProperties(properties, metadata) {
    for (const property of properties) {
      this.#handleProperty(property, metadata);
    }
  }

  #handleProperty(property, metadata) {
    const parent = metadata.ancestors.at(-1);

    const slug = this.slug(parent.name + property.name);
    // Properties have a `type` like `string`, so we have to assign the `kind` manually.
    const xref = this.#createXref(property, metadata, { slug, kind: 'member' });

    this.#addXref(xref, metadata);
  }

  #handleRoot(moduleData, majorVersion) {
    const moduleName = moduleData.api;
    const urlPrefix = `${this.#urlPrefix(majorVersion)}/${moduleName}.html`;
    const xref = {
      kind: 'module',
      name: moduleName,
      url: urlPrefix,
    };
    const metadata = {
      ancestors: [xref],
      majorVersion,
      moduleName: [moduleName],
      urlPrefix,
    };

    if (moduleData.modules) {
      this.xrefsByModule[majorVersion] ??= {};
      this.xrefsByModule[majorVersion][moduleName] = {};
      // Add a top-level xref for the module.
      this.#addXref(xref, metadata);
      // Process the children.
      this.#handleModules(moduleData.modules, metadata);
    }
  }

  async #isGitRepo(repoDir) {
    try {
      await stat(join(repoDir, '.git'));

      return true;
    } catch (e) {
      return false;
    }
  }

  #mergeAsyncContextAndHooks(jsonDir, jsonData) {
    const contextPath = join(jsonDir, 'async_context.json');
    const contextData = jsonData[contextPath];
    const hooksPath = join(jsonDir, 'async_hooks.json');
    const hooksData = jsonData[hooksPath];
    const mergedData = {
      type: 'module',
      api: 'async_hooks',
      modules: [
        {
          _moduleNameForUrl: 'async_hooks',
          methods: hooksData.modules[0].methods.slice(),
          classes: hooksData.modules[0].classes.filter((c) => c.name === 'AsyncHook'),
        },
        {
          _moduleNameForUrl: 'async_context',
          classes: contextData.modules[0].classes.slice(),
        },
      ],
    };

    jsonData[hooksPath] = mergedData;
    delete jsonData[contextPath];
  }

  #popAncestor(metadata) {
    return metadata.ancestors.pop();
  }

  #popModuleName(metadata) {
    return metadata.moduleName.pop();
  }

  #pushAncestor(xref, metadata) {
    xref.name = this.#fixName(xref.name, metadata);

    return metadata.ancestors.push(xref);
  }

  #pushModuleName(name, metadata) {
    return metadata.moduleName.push(name);
  }

  #rootModuleName(metadata) {
    return metadata.moduleName[0];
  }

  #sortXrefs(xrefs) {
    return Object.keys(xrefs)
      .sort((a, b) => this.collator.compare(a, b))
      .reduce((obj, key) => {
        obj[key] = xrefs[key];
        return obj;
      }, {});
  }

  #urlPrefix(version) {
    return `https://nodejs.org/docs/latest-v${version}.x/api`;
  }

  async writeXrefs(outputDir) {
    const promises = [];

    for (const [majorVersion, module] of Object.entries(this.xrefsByModule)) {
      // TODO: do this outside loop
      // eslint-disable-next-line no-await-in-loop
      await mkdir(join(outputDir, majorVersion), { recursive: true });
      for (const [moduleName, moduleXrefs] of Object.entries(module)) {
        const xrefs = this.#sortXrefs(moduleXrefs);

        promises.push(
          writeFile(
            join(outputDir, majorVersion, `${moduleName}.json`),
            JSON.stringify({ xrefs }, null, 2),
            'utf8'
          )
        );
      }
    }

    await Promise.all(promises);
  }
}

const repoDir = join(import.meta.dirname, '..', CACHE_DIR);
const options = { generateJson: false, repoDir };
const gen = new NodeXrefGenerator(options);

await gen.fetchData();
await gen.extractXrefs();
await gen.writeXrefs(join(process.cwd(), 'out'));
