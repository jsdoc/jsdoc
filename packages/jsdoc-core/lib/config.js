/*
  Copyright 2019 the JSDoc Authors.

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
 * Manages configuration settings for JSDoc.
 *
 * @alias module:@jsdoc/core.config
 */
import { cosmiconfig, defaultLoaders } from 'cosmiconfig';
import _ from 'lodash';
import stripBom from 'strip-bom';
import stripJsonComments from 'strip-json-comments';

const MODULE_NAME = 'jsdoc';

export const defaultConfig = {
  // TODO(hegemonic): Integrate CLI options with other options.
  opts: {
    destination: './out',
    encoding: 'utf8',
  },
  /**
   * The JSDoc plugins to load.
   */
  plugins: [],
  /**
   * Settings for loading and parsing source files.
   */
  sourceFiles: [],
  /**
   * The type of source file. In general, you should use the value `module`. If none of your
   * source files use ECMAScript >=2015 syntax, you can use the value `script`.
   */
  sourceType: 'module',
  /**
   * Settings for interpreting JSDoc tags.
   */
  tags: {
    /**
     * Set to `true` to allow tags that JSDoc does not recognize.
     */
    allowUnknownTags: true,
    // TODO(hegemonic): Use module paths, not magic strings.
    /**
     * The JSDoc tag dictionaries to load.
     *
     * If you specify two or more tag dictionaries, and a tag is defined in multiple
     * dictionaries, JSDoc uses the definition from the first dictionary that includes that tag.
     */
    dictionaries: ['jsdoc', 'closure'],
  },
  /**
   * Settings for generating output with JSDoc templates. Some JSDoc templates might ignore these
   * settings.
   */
  templates: {
    /**
     * Set to `true` to use a monospaced font for links to other code symbols, but not links to
     * websites.
     */
    cleverLinks: false,
    /**
     * Set to `true` to use a monospaced font for all links.
     */
    monospaceLinks: false,
  },
};

// TODO: Consider exporting this class.
class Config {
  constructor(filepath, config) {
    this.config = config;
    this.filepath = filepath;
  }
}

function loadJson(filepath, content) {
  return defaultLoaders['.json'](filepath, stripBom(stripJsonComments(content)));
}

function loadYaml(filepath, content) {
  return defaultLoaders['.yaml'](filepath, stripBom(content));
}

const explorer = cosmiconfig(MODULE_NAME, {
  cache: false,
  loaders: {
    '.json': loadJson,
    '.yaml': loadYaml,
    '.yml': loadYaml,
    noExt: loadYaml,
  },
  searchPlaces: [
    'package.json',
    `.${MODULE_NAME}rc`,
    `.${MODULE_NAME}rc.json`,
    `.${MODULE_NAME}rc.yaml`,
    `.${MODULE_NAME}rc.yml`,
    `.${MODULE_NAME}rc.js`,
    `${MODULE_NAME}.config.js`,
  ],
});

export async function load(filepath) {
  let loaded;

  if (filepath) {
    loaded = await explorer.load(filepath);
  } else {
    loaded = (await explorer.search()) ?? {};
  }

  return new Config(loaded.filepath, _.defaultsDeep({}, loaded.config, defaultConfig));
}
