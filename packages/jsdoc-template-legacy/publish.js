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
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import salty from '@jsdoc/salty';
import { log } from '@jsdoc/util';
import commonPathPrefix from 'common-path-prefix';
import glob from 'fast-glob';
import _ from 'lodash';

import { Template } from './lib/template.js';
import * as helper from './lib/templateHelper.js';

const { htmlsafe, linkto, resolveAuthorLinks } = helper;
const { resolve } = createRequire(import.meta.url);
const { taffy } = salty;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FONT_CSS_FILES = ['standard.css', 'standard-italic.css'];
const PRETTIFIER_CSS_FILES = ['tomorrow.min.css'];
const PRETTIFIER_SCRIPT_FILES = ['lang-css.js', 'prettify.js'];

let data;
let view;

function mkdirpSync(filepath) {
  return fs.mkdirSync(filepath, { recursive: true });
}

function find(spec) {
  return helper.find(data, spec);
}

function getAncestorLinks(doclet) {
  return helper.getAncestorLinks(data, doclet);
}

function hashToLink(doclet, hash, dependencies) {
  let url;

  if (!/^(#.+)/.test(hash)) {
    return hash;
  }

  url = helper.createLink(doclet, dependencies);
  url = url.replace(/(#.+|$)/, hash);

  return `<a href="${url}">${hash}</a>`;
}

function needsSignature({ kind, type, meta }) {
  let needsSig = false;

  // function and class definitions always get a signature
  if (kind === 'function' || kind === 'class') {
    needsSig = true;
  }
  // typedefs that contain functions get a signature, too
  else if (kind === 'typedef' && type?.names?.length) {
    for (let i = 0, l = type.names.length; i < l; i++) {
      if (type.names[i].toLowerCase() === 'function') {
        needsSig = true;
        break;
      }
    }
  }
  // and namespaces that are functions get a signature (but finding them is a
  // bit messy)
  else if (kind === 'namespace' && meta?.code?.type?.match(/[Ff]unction/)) {
    needsSig = true;
  }

  return needsSig;
}

function getSignatureAttributes({ optional, nullable }) {
  const attributes = [];

  if (optional) {
    attributes.push('opt');
  }

  if (nullable === true) {
    attributes.push('nullable');
  } else if (nullable === false) {
    attributes.push('non-null');
  }

  return attributes;
}

function updateItemName(item) {
  const attributes = getSignatureAttributes(item);
  let itemName = item.name || '';

  if (item.variable) {
    itemName = `&hellip;${itemName}`;
  }

  if (attributes && attributes.length) {
    itemName = `${itemName}<span class="signature-attributes">${attributes.join(', ')}</span>`;
  }

  return itemName;
}

function addParamAttributes(params) {
  return params.filter(({ name }) => name && !name.includes('.')).map(updateItemName);
}

function buildItemTypeStrings(item) {
  const types = [];

  if (item && item.type && item.type.names) {
    item.type.names.forEach((name) => {
      types.push(linkto(name, htmlsafe(name)));
    });
  }

  return types;
}

function buildAttribsString(attribs) {
  let attribsString = '';

  if (attribs && attribs.length) {
    attribsString = htmlsafe(`(${attribs.join(', ')}) `);
  }

  return attribsString;
}

function addNonParamAttributes(items) {
  let types = [];

  items.forEach((item) => {
    types = types.concat(buildItemTypeStrings(item));
  });

  return types;
}

function addSignatureParams(f) {
  const params = f.params ? addParamAttributes(f.params) : [];

  f.signature = `${f.signature || ''}(${params.join(', ')})`;
}

function addSignatureReturns(f) {
  const attribs = [];
  let attribsString = '';
  let returnTypes = [];
  let returnTypesString = '';
  const source = f.yields || f.returns;

  // jam all the return-type attributes into an array. this could create odd results (for example,
  // if there are both nullable and non-nullable return types), but let's assume that most people
  // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
  if (source) {
    source.forEach((item) => {
      helper.getAttribs(item).forEach((attrib) => {
        if (!attribs.includes(attrib)) {
          attribs.push(attrib);
        }
      });
    });

    attribsString = buildAttribsString(attribs);
  }

  if (source) {
    returnTypes = addNonParamAttributes(source);
  }
  if (returnTypes.length) {
    returnTypesString = ` &rarr; ${attribsString}{${returnTypes.join('|')}}`;
  }

  f.signature =
    `<span class="signature">${f.signature || ''}</span>` +
    `<span class="type-signature">${returnTypesString}</span>`;
}

function addSignatureTypes(f) {
  const types = f.type ? buildItemTypeStrings(f) : [];

  f.signature =
    `${f.signature || ''}<span class="type-signature">` +
    `${types.length ? ` :${types.join('|')}` : ''}</span>`;
}

function addAttribs(f) {
  const attribs = helper.getAttribs(f);
  const attribsString = buildAttribsString(attribs);

  f.attribs = `<span class="type-signature">${attribsString}</span>`;
}

function shortenPaths(files, commonPrefix) {
  Object.keys(files).forEach((file) => {
    files[file].shortened = files[file].resolved
      .replace(commonPrefix, '')
      // always use forward slashes
      .replace(/\\/g, '/');
  });

  return files;
}

function getPathFromDoclet({ meta }) {
  if (!meta) {
    return null;
  }

  return meta.path && meta.path !== 'null' ? path.join(meta.path, meta.filename) : meta.filename;
}

function generate(title, docs, filename, resolveLinks, outdir, dependencies) {
  let docData;
  const env = dependencies.get('env');
  let html;
  let outpath;

  resolveLinks = resolveLinks !== false;

  docData = {
    env: env,
    title: title,
    docs: docs,
  };

  outpath = path.join(outdir, filename);
  html = view.render('container.tmpl', docData);

  if (resolveLinks) {
    html = helper.resolveLinks(html, dependencies); // turn {@link foo} into <a href="foodoc.html">foo</a>
  }

  fs.writeFileSync(outpath, html, 'utf8');
}

function generateSourceFiles(sourceFiles, encoding, outdir, dependencies) {
  encoding = encoding || 'utf8';

  Object.keys(sourceFiles).forEach((file) => {
    let source;
    // links are keyed to the shortened path in each doclet's `meta.shortpath` property
    const sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened, dependencies);

    helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

    try {
      source = {
        kind: 'source',
        code: helper.htmlsafe(fs.readFileSync(sourceFiles[file].resolved, encoding)),
      };
    } catch (e) {
      log.error(`Error while generating source file ${file}: ${e.message}`);
    }

    generate(
      `Source: ${sourceFiles[file].shortened}`,
      [source],
      sourceOutfile,
      false,
      outdir,
      dependencies
    );
  });
}

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:@jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:@jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
  const symbols = {};

  // build a lookup table
  doclets.forEach((symbol) => {
    symbols[symbol.longname] = symbols[symbol.longname] || [];
    symbols[symbol.longname].push(symbol);
  });

  modules.forEach((module) => {
    if (symbols[module.longname]) {
      module.modules = symbols[module.longname]
        // Only show symbols that have a description. Make an exception for classes, because
        // we want to show the constructor-signature heading no matter what.
        .filter(({ description, kind }) => description || kind === 'class')
        .map((symbol) => {
          symbol = _.cloneDeep(symbol);

          if (symbol.kind === 'class' || symbol.kind === 'function') {
            symbol.name = `${symbol.name.replace('module:', '(require("')}"))`;
          }

          return symbol;
        });
    }
  });
}

function buildMemberNav(items, itemHeading, itemsSeen, linktoFn, dependencies) {
  const config = dependencies.get('config');
  let nav = '';

  if (items.length) {
    let itemsNav = '';

    items.forEach((item) => {
      let displayName;

      if (!Object.hasOwn(item, 'longname')) {
        itemsNav += `<li>${linktoFn('', item.name)}</li>`;
      } else if (!Object.hasOwn(itemsSeen, item.longname)) {
        if (config.templates.default.useLongnameInNav) {
          displayName = item.longname;
        } else {
          displayName = item.name;
        }
        itemsNav += `<li>${linktoFn(
          item.longname,
          displayName.replace(/\b(module|event):/g, '')
        )}</li>`;

        itemsSeen[item.longname] = true;
      }
    });

    if (itemsNav !== '') {
      nav += `<h3>${itemHeading}</h3><ul>${itemsNav}</ul>`;
    }
  }

  return nav;
}

function linktoExternal(longName, name) {
  return linkto(longName, name.replace(/(^"|"$)/g, ''));
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.events
 * @param {array<object>} members.interfaces
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members, dependencies) {
  let globalNav;
  let nav = '<h2><a href="index.html">Home</a></h2>';
  const seen = {};

  nav += buildMemberNav(members.modules, 'Modules', {}, linkto, dependencies);
  nav += buildMemberNav(members.externals, 'Externals', seen, linktoExternal, dependencies);
  nav += buildMemberNav(members.namespaces, 'Namespaces', seen, linkto, dependencies);
  nav += buildMemberNav(members.classes, 'Classes', seen, linkto, dependencies);
  nav += buildMemberNav(members.interfaces, 'Interfaces', seen, linkto, dependencies);
  nav += buildMemberNav(members.events, 'Events', seen, linkto, dependencies);
  nav += buildMemberNav(members.mixins, 'Mixins', seen, linkto, dependencies);

  if (members.globals.length) {
    globalNav = '';

    members.globals.forEach(({ kind, longname, name }) => {
      if (kind !== 'typedef' && !Object.hasOwn(seen, longname)) {
        globalNav += `<li>${linkto(longname, name)}</li>`;
      }
      seen[longname] = true;
    });

    if (!globalNav) {
      // turn the heading into a link so you can actually get to the global page
      nav += `<h3>${linkto('global', 'Global')}</h3>`;
    } else {
      nav += `<h3>Global</h3><ul>${globalNav}</ul>`;
    }
  }

  return nav;
}

function sourceToDestination(parentDir, sourcePath, destDir) {
  const relativeSource = path.relative(parentDir, sourcePath);

  console.log(`sourcePath: ${sourcePath}\nrelativeSource: ${relativeSource}`);

  return path.resolve(path.join(destDir, relativeSource));
}

/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
 */
export function publish(docletStore, dependencies) {
  let classes;
  let config;
  let externals;
  let files;
  let fromDir;
  let globalUrl;
  let indexUrl;
  let interfaces;
  let members;
  let mixins;
  let modules;
  let namespaces;
  let opts;
  let outdir;
  let outputSourceFiles;
  let packageInfo;
  let packages;
  const sourceFilePaths = [];
  let sourceFiles = {};
  let staticFilePaths;
  let staticFiles;
  let templateConfig;
  let templatePath;
  let userStaticFileOutputDir;

  opts = dependencies.get('options');
  config = dependencies.get('config');
  templateConfig = config.templates || {};
  templateConfig.default = templateConfig.default || {};
  outdir = path.normalize(opts.destination);
  if (!path.isAbsolute(outdir)) {
    outdir = path.resolve(process.cwd(), outdir);
  }
  templatePath = __dirname;
  view = new Template(path.join(templatePath, 'tmpl'));

  // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
  // doesn't try to hand them out later
  indexUrl = helper.getUniqueFilename('index', dependencies);
  // don't call registerLink() on this one! 'index' is also a valid longname

  globalUrl = helper.getUniqueFilename('global', dependencies);
  helper.registerLink('global', globalUrl);

  // set up templating
  view.layout = templateConfig.default.layoutFile
    ? path.resolve(templateConfig.default.layoutFile)
    : 'layout.tmpl';

  data = taffy(Array.from(docletStore.doclets));
  data.sort('longname, version, since');
  helper.addEventListeners(data);

  data().each((doclet) => {
    let sourcePath;

    doclet.attribs = '';

    if (doclet.examples) {
      doclet.examples = doclet.examples.map((example) => {
        let caption;
        let code;
        const match = example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i);

        if (match) {
          caption = match[1];
          code = match[3];
        }

        return {
          caption: caption || '',
          code: code || example,
        };
      });
    }
    if (doclet.see) {
      doclet.see.forEach((seeItem, i) => {
        doclet.see[i] = hashToLink(doclet, seeItem, dependencies);
      });
    }

    // build a list of source files
    if (doclet.meta) {
      sourcePath = getPathFromDoclet(doclet);
      sourceFiles[sourcePath] = {
        resolved: sourcePath,
        shortened: null,
      };
      if (!sourceFilePaths.includes(sourcePath)) {
        sourceFilePaths.push(sourcePath);
      }
    }
  });

  // update outdir if necessary, then create outdir
  packageInfo = (find({ kind: 'package' }) || [])[0];
  if (packageInfo && packageInfo.name) {
    outdir = path.join(outdir, packageInfo.name, packageInfo.version || '');
  }
  mkdirpSync(outdir);

  // copy the template's static files to outdir
  fromDir = path.join(templatePath, 'static');
  staticFiles = glob.sync('**/*', {
    cwd: fromDir,
    onlyFiles: true,
  });

  staticFiles.forEach((fileName) => {
    const toPath = path.join(outdir, fileName);

    mkdirpSync(path.dirname(toPath));
    fs.copyFileSync(path.join(fromDir, fileName), toPath);
  });

  // copy the fonts used by the template to outdir
  fromDir = path.join(resolve('@fontsource-variable/open-sans'), '..', 'files');
  staticFiles = glob.sync('**/*standard-{normal,italic}*', {
    cwd: fromDir,
    onlyFiles: true,
  });

  staticFiles.forEach((fileName) => {
    const toPath = path.join(outdir, 'fonts', path.basename(fileName));

    mkdirpSync(path.dirname(toPath));
    fs.copyFileSync(path.join(fromDir, fileName), toPath);
  });

  // copy the font CSS to outdir
  staticFiles = path.join(resolve('@fontsource-variable/open-sans'), '..');
  FONT_CSS_FILES.forEach((fileName) => {
    const fromPath = path.join(staticFiles, fileName);
    const toPath = path.join(outdir, 'styles', fileName.replace('standard', 'open-sans'));
    let source = fs.readFileSync(fromPath, 'utf8');

    source = source.replace(/url\(\.\/files/g, 'url(../fonts');
    mkdirpSync(path.dirname(toPath));
    fs.writeFileSync(toPath, source);
  });

  // copy the prettify script to outdir
  PRETTIFIER_SCRIPT_FILES.forEach((fileName) => {
    const toPath = path.join(outdir, 'scripts', path.basename(fileName));

    fs.copyFileSync(path.join(resolve('code-prettify'), '..', fileName), toPath);
  });

  // copy the prettify CSS to outdir
  PRETTIFIER_CSS_FILES.forEach((fileName) => {
    const toPath = path.join(outdir, 'styles', path.basename(fileName));

    fs.copyFileSync(
      // `resolve()` has trouble with this package, so we use an extra-hacky way to
      // get the filepath.
      path.join(
        resolve('fast-glob'),
        '..',
        '..',
        '..',
        'color-themes-for-google-code-prettify',
        'dist',
        'themes',
        fileName
      ),
      toPath
    );
  });

  // copy user-specified static files to outdir
  if (templateConfig.default.staticFiles) {
    // The canonical property name is `include`. We accept `paths` for backwards compatibility
    // with a bug in JSDoc 3.2.x.
    staticFilePaths =
      templateConfig.default.staticFiles.include || templateConfig.default.staticFiles.paths || [];
    staticFilePaths = glob.sync(staticFilePaths, {
      absolute: true,
      onlyFiles: true,
    });
    for (const filepath of staticFilePaths) {
      userStaticFileOutputDir = sourceToDestination(
        commonPathPrefix(staticFilePaths),
        filepath,
        outdir
      );
      mkdirpSync(path.dirname(userStaticFileOutputDir));
      fs.copyFileSync(filepath, userStaticFileOutputDir);
    }
  }

  if (sourceFilePaths.length) {
    sourceFiles = shortenPaths(sourceFiles, commonPathPrefix(sourceFilePaths));
  }
  data().each((doclet) => {
    let docletPath;
    const url = helper.createLink(doclet, dependencies);

    helper.registerLink(doclet.longname, url);

    // add a shortened version of the full path
    if (doclet.meta) {
      docletPath = getPathFromDoclet(doclet);
      docletPath = sourceFiles[docletPath].shortened;
      if (docletPath) {
        doclet.meta.shortpath = docletPath;
      }
    }
  });

  data().each((doclet) => {
    const url = helper.longnameToUrl[doclet.longname];

    if (url.includes('#')) {
      doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
    } else {
      doclet.id = doclet.name;
    }

    if (needsSignature(doclet)) {
      addSignatureParams(doclet);
      addSignatureReturns(doclet);
      addAttribs(doclet);
    }
  });

  // do this after the urls have all been generated
  data().each((doclet) => {
    doclet.ancestors = getAncestorLinks(doclet);

    if (doclet.kind === 'member') {
      addSignatureTypes(doclet);
      addAttribs(doclet);
    }

    if (doclet.kind === 'constant') {
      addSignatureTypes(doclet);
      addAttribs(doclet);
      doclet.kind = 'member';
    }
  });

  members = helper.getMembers(data);

  // output pretty-printed source files by default
  outputSourceFiles = templateConfig.default && templateConfig.default.outputSourceFiles !== false;

  // add template helpers
  view.find = find;
  view.linkto = linkto;
  view.resolveAuthorLinks = resolveAuthorLinks;
  view.htmlsafe = htmlsafe;
  view.outputSourceFiles = outputSourceFiles;

  // once for all
  view.nav = buildNav(members, dependencies);
  attachModuleSymbols(find({ longname: { left: 'module:' } }), members.modules);

  // generate the pretty-printed source files first so other pages can link to them
  if (outputSourceFiles) {
    generateSourceFiles(sourceFiles, opts.encoding, outdir, dependencies);
  }

  if (members.globals.length) {
    generate('Global', [{ kind: 'globalobj' }], globalUrl, true, outdir, dependencies);
  }

  // index page displays information from package.json and lists files
  files = find({ kind: 'file' });
  packages = find({ kind: 'package' });

  generate(
    'Home',
    packages
      .concat([
        {
          kind: 'mainpage',
          longname: opts.mainpagetitle ? opts.mainpagetitle : 'Main Page',
        },
      ])
      .concat(files),
    indexUrl,
    true,
    outdir,
    dependencies
  );

  // set up the lists that we'll use to generate pages
  classes = taffy(members.classes);
  modules = taffy(members.modules);
  namespaces = taffy(members.namespaces);
  mixins = taffy(members.mixins);
  externals = taffy(members.externals);
  interfaces = taffy(members.interfaces);

  Object.keys(helper.longnameToUrl).forEach((longname) => {
    const myClasses = helper.find(classes, { longname: longname });
    const myExternals = helper.find(externals, { longname: longname });
    const myInterfaces = helper.find(interfaces, { longname: longname });
    const myMixins = helper.find(mixins, { longname: longname });
    const myModules = helper.find(modules, { longname: longname });
    const myNamespaces = helper.find(namespaces, { longname: longname });

    if (myModules.length) {
      generate(
        `Module: ${myModules[0].name}`,
        myModules,
        helper.longnameToUrl[longname],
        true,
        outdir,
        dependencies
      );
    }

    if (myClasses.length) {
      generate(
        `Class: ${myClasses[0].name}`,
        myClasses,
        helper.longnameToUrl[longname],
        true,
        outdir,
        dependencies
      );
    }

    if (myNamespaces.length) {
      generate(
        `Namespace: ${myNamespaces[0].name}`,
        myNamespaces,
        helper.longnameToUrl[longname],
        true,
        outdir,
        dependencies
      );
    }

    if (myMixins.length) {
      generate(
        `Mixin: ${myMixins[0].name}`,
        myMixins,
        helper.longnameToUrl[longname],
        true,
        outdir,
        dependencies
      );
    }

    if (myExternals.length) {
      generate(
        `External: ${myExternals[0].name}`,
        myExternals,
        helper.longnameToUrl[longname],
        true,
        outdir,
        dependencies
      );
    }

    if (myInterfaces.length) {
      generate(
        `Interface: ${myInterfaces[0].name}`,
        myInterfaces,
        helper.longnameToUrl[longname],
        true,
        outdir,
        dependencies
      );
    }
  });
}
