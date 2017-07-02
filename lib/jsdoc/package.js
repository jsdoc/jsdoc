'use strict';

var logger = require('jsdoc/util/logger');
var stripBom = require('jsdoc/util/stripbom');

/**
 * Provides access to information about a JavaScript package.
 *
 * @module jsdoc/package
 * @see https://www.npmjs.org/doc/files/package.json.html
 */

// Collect all of the license information from a `package.json` file.
function getLicenses(packageInfo) {
    var licenses = packageInfo.licenses ? packageInfo.licenses.slice(0) : [];

    if (packageInfo.license) {
        licenses.push({ type: packageInfo.license });
    }

    return licenses;
}

/**
 * Information about where to report bugs in the package.
 *
 * @typedef {Object} module:jsdoc/package.Package~BugInfo
 * @property {string} email - The email address for reporting bugs.
 * @property {string} url - The URL for reporting bugs.
 */

/**
 * Information about a package's software license.
 *
 * @typedef {Object} module:jsdoc/package.Package~LicenseInfo
 * @property {string} type - An identifier for the type of license.
 * @property {string} url - The URL for the complete text of the license.
 */

/**
 * Information about a package author or contributor.
 *
 * @typedef {Object} module:jsdoc/package.Package~PersonInfo
 * @property {string} name - The person's full name.
 * @property {string} email - The person's email address.
 * @property {string} url - The URL of the person's website.
 */

/**
 * Information about a package's version-control repository.
 *
 * @typedef {Object} module:jsdoc/package.Package~RepositoryInfo
 * @property {string} type - The type of version-control system that the repository uses (for
 * example, `git` or `svn`).
 * @property {string} url - The URL for the repository.
 */

/**
 * Information about a JavaScript package. JSDoc can extract package information from
 * `package.json` files that follow the
 * [npm specification](https://www.npmjs.org/doc/files/package.json.html).
 *
 * **Note**: JSDoc does not validate or normalize the contents of `package.json` files. If your
 * `package.json` file does not follow the npm specification, some properties of the `Package`
 * object may not use the format documented here.
 *
 * @class
 * @param {string} json - The contents of the `package.json` file.
 */
exports.Package = function(json) {
    var packageInfo;

    /**
     * The string identifier that is shared by all `Package` objects.
     *
     * @readonly
     * @default
     * @type {string}
     */
    this.kind = 'package';

    try {
        packageInfo = JSON.parse(stripBom.strip(json) || '{}');
    }
    catch (e) {
        logger.error('Unable to parse the package file: %s', e.message);
        packageInfo = {};
    }

    if (packageInfo.name) {
        /**
         * The package name.
         *
         * @type {string}
         */
        this.name = packageInfo.name;
    }

    /**
     * The unique longname for this `Package` object.
     *
     * @type {string}
     */
    this.longname = this.kind + ':' + this.name;

    if (packageInfo.author) {
        /**
         * The author of this package. Contains either a
         * {@link module:jsdoc/package.Package~PersonInfo PersonInfo} object or a string with
         * information about the author.
         *
         * @type {(module:jsdoc/package.Package~PersonInfo|string)}
         * @since 3.3.0
         */
        this.author = packageInfo.author;
    }

    if (packageInfo.bugs) {
        /**
         * Information about where to report bugs in the project. May contain a URL, a string, or an
         * object with more detailed information.
         *
         * @type {(string|module:jsdoc/package.Package~BugInfo)}
         * @since 3.3.0
         */
        this.bugs = packageInfo.bugs;
    }

    if (packageInfo.contributors) {
        /**
         * The contributors to this package.
         *
         * @type {Array.<(module:jsdoc/package.Package~PersonInfo|string)>}
         * @since 3.3.0
         */
        this.contributors = packageInfo.contributors;
    }

    if (packageInfo.dependencies) {
        /**
         * The dependencies for this package.
         *
         * @type {Object}
         * @since 3.3.0
         */
        this.dependencies = packageInfo.dependencies;
    }

    if (packageInfo.description) {
        /**
         * A brief description of the package.
         *
         * @type {string}
         */
        this.description = packageInfo.description;
    }

    if (packageInfo.devDependencies) {
        /**
         * The development dependencies for this package.
         *
         * @type {Object}
         * @since 3.3.0
         */
        this.devDependencies = packageInfo.devDependencies;
    }

    if (packageInfo.engines) {
        /**
         * The JavaScript engines that this package supports. Each key is a string that identifies
         * the engine (for example, `node`). Each value is a
         * [semver](https://www.npmjs.org/doc/misc/semver.html)-compliant version number for the
         * engine.
         *
         * @type {Object}
         * @since 3.3.0
         */
        this.engines = packageInfo.engines;
    }

    /**
     * The source files associated with the package.
     *
     * New `Package` objects always contain an empty array, regardless of whether the `package.json`
     * file includes a `files` property.
     *
     * After JSDoc parses your input files, it sets this property to a list of paths to your input
     * files.
     *
     * @type {Array.<string>}
     */
    this.files = [];

    if (packageInfo.homepage) {
        /**
         * The URL for the package's homepage.
         *
         * @type {string}
         * @since 3.3.0
         */
        this.homepage = packageInfo.homepage;
    }

    if (packageInfo.keywords) {
        /**
         * Keywords to help users find the package.
         *
         * @type {Array.<string>}
         * @since 3.3.0
         */
        this.keywords = packageInfo.keywords;
    }

    if (packageInfo.license || packageInfo.licenses) {
        /**
         * The licenses used by this package. Combines information from the `package.json` file's
         * `license` property and the deprecated `licenses` property.
         *
         * @type {Array.<module:jsdoc/package.Package~LicenseInfo>}
         */
        this.licenses = getLicenses(packageInfo);
    }

    if (packageInfo.main) {
        /**
         * The module ID that provides the primary entry point to the package. For example, if your
         * package is a CommonJS module, and the value of this property is `foo`, users should be
         * able to load your module with `require('foo')`.
         *
         * @type {string}
         * @since 3.3.0
         */
        this.main = packageInfo.main;
    }

    if (packageInfo.repository) {
        /**
         * The version-control repository for the package.
         *
         * @type {module:jsdoc/package.Package~RepositoryInfo}
         * @since 3.3.0
         */
        this.repository = packageInfo.repository;
    }

    if (packageInfo.version) {
        /**
         * The [semver](https://www.npmjs.org/doc/misc/semver.html)-compliant version number of the
         * package.
         *
         * @type {string}
         * @since 3.2.0
         */
        this.version = packageInfo.version;
    }
};
