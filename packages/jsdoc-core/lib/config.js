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
 * @namespace config
 * @memberof module:@jsdoc/core
 */
import { cosmiconfig, defaultLoaders } from 'cosmiconfig';
import _ from 'lodash';
import stripBom from 'strip-bom';
import stripJsonComments from 'strip-json-comments';

const MODULE_NAME = 'jsdoc';

/**
 * The default configuration settings for JSDoc.
 *
 * @namespace defaultConfig
 * @memberof module:@jsdoc/core.config
 */
export const defaultConfig = {
  // TODO: Integrate CLI options with other options.
  /**
   * JSDoc options that can be specified on the command line.
   *
   * @namespace opts
   * @memberof module:@jsdoc/core.config.defaultConfig
   */
  opts: {
    /**
     * The output directory for the generated documentation. If this directory does not exist, then
     * JSDoc creates it. The default value is `./out`.
     *
     * @type {string}
     * @memberof module:@jsdoc/core.config.defaultConfig.opts
     */
    destination: './out',

    /**
     * The character encoding to use. Use an
     * [encoding supported by Node.js](https://nodejs.org/api/buffer.html#buffers-and-character-encodings).
     * The default value is `utf8`.
     *
     * @type {string}
     * @memberof module:@jsdoc/core.config.defaultConfig.opts
     */
    encoding: 'utf8',
  },
  /**
   * The paths to the JSDoc plugins to load. Use the same paths that you would use to import each
   * plugin as a module.
   *
   * @type {Array<string>}
   * @memberof module:@jsdoc/core.config.defaultConfig
   */
  plugins: [],

  /**
   * The source files to parse.
   *
   * @type {Array<string>}
   * @memberof module:@jsdoc/core.config.defaultConfig
   */
  sourceFiles: [],

  /**
   * The type of source file. In most cases, you should use the value `module`, which is the default
   * value.
   *
   * If none of your source files use syntax from ECMAScript 2015 or later, then use the value
   * `script`.
   *
   * @type {string}
   * @memberof module:@jsdoc/core.config.defaultConfig
   */
  sourceType: 'module',

  /**
   * Settings for interpreting JSDoc tags.
   *
   * @namespace tags
   * @memberof module:@jsdoc/core.config.defaultConfig
   */
  tags: {
    /**
     * Whether to allow tags that JSDoc does not recognize. The default value is `true`.
     *
     * @type {boolean}
     * @memberof module:@jsdoc/core.config.defaultConfig.tags
     */
    allowUnknownTags: true,

    // TODO: Use module paths, not magic strings.
    /**
     * The JSDoc tag dictionaries to load.
     *
     * If you specify two or more tag dictionaries, and a tag is defined in multiple
     * dictionaries, JSDoc uses the definition from the first dictionary that includes that tag.
     *
     * @type {Array<string>}
     * @memberof module:@jsdoc/core.config.defaultConfig.tags
     */
    dictionaries: ['jsdoc', 'closure'],
  },

  /**
   * Settings for generating output with JSDoc templates. Some JSDoc templates might ignore these
   * settings.
   *
   * @namespace
   * @memberof module:@jsdoc/core.config.defaultConfig
   */
  templates: {
    /**
     * Whether to use a monospaced font for links to other code symbols, but not links to websites.
     * The default value is `false`.
     *
     * @type {boolean}
     * @memberof module:@jsdoc/core.config.defaultConfig.templates
     */
    cleverLinks: false,

    /**
     * Whether to use a monospaced font for all links. The default value is `false`.
     *
     * @type {boolean}
     * @memberof module:@jsdoc/core.config.defaultConfig.templates
     */
    monospaceLinks: false,
  },
};

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

/**
 * Information about a JSDoc configuration file.
 *
 * @typedef {Object<string, string>} module:@jsdoc/core.config~ConfigInfo
 * @property {Object<string, *>} config - The configuration settings.
 * @property {string} filepath - The path to the configuration file that was loaded.
 */

/**
 * Loads JSDoc configuration settings from the specified filepath.
 *
 * You can provide configuration settings in the following formats:
 *
 * +  A CommonJS or ES2015 module that exports the configuration settings. For CommonJS modules, use
 *    the extension `.cjs`.
 * +  A JSON file that contains the configuration settings.
 * +  A YAML file that contains the configuration settings.
 * +  A `jsdoc` property in a `package.json` file that contains the configuration settings.
 *
 * If `filepath` is a configuration file, then JSDoc loads that configuration file.
 *
 * If `filepath` is a directory, then JSDoc looks for the following files in that directory and
 * loads the first one it finds:
 *
 * 1. `package.json` (`jsdoc` property)
 * 2. `.jsdocrc` (JSON or YAML)
 * 3. `.jsdocrc.json`
 * 4. `.jsdocrc.yaml`
 * 5. `.jsdocrc.yml`
 * 6. `.jsdocrc.js` (ES2015 module)
 * 7. `jsdoc.config.js` (ES2015 module)
 *
 * @alias module:@jsdoc/core.config.load
 * @param {string} filepath - The path to the configuration file, or a directory that contains the
 * configuration file.
 * @returns {module:@jsdoc/core.config~ConfigInfo} The configuration settings.
 */
export async function load(filepath) {
  let loaded;

  if (filepath) {
    loaded = await explorer.load(filepath);
  } else {
    loaded = (await explorer.search()) ?? {};
  }

  return {
    config: _.defaultsDeep({}, loaded.config, defaultConfig),
    filepath: loaded.filepath,
  };
}
