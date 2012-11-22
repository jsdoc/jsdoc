# JSDoc 3 change history

This file describes notable changes in each version of JSDoc 3. To download a specific version of JSDoc 3, see [GitHub's tags page](https://github.com/jsdoc3/jsdoc/tags).


## 3.1.0 (TBD)

**NOTE**: This change history is a work in progress.

### Major changes
+ Updated the `fs` and `path` modules to make their behavior more consistent with Node.js. (Multiple commits)
+ Updated or replaced numerous third-party modules. (Multiple commits)
+ TODO: Closure Compiler types (if we don't have major improvements, mention #118, #226)
+ JSDoc now provides a `-l/--lenient` option that tells JSDoc to continue running if it encounters a non-fatal error. (Multiple issues)
+ Node Package Manager (npm) can now install JSDoc from its GitHub repository. **Note**: JSDoc is not currently compatible with Node.js. However, this change allows JSDoc to be installed as a dependency of a Node.js project. (Multiple commits)
+ A template's `publish.js` file should now assign its `publish` function to `exports.publish`, rather than defining a global `publish` function. The global `publish` function is deprecated and may not be supported in future versions. JSDoc's built-in templates reflect this change. (#166)
+ The template helper (`templateHelper.js`) exports a variety of new functions for finding information within a set of doclets. These functions were previously contained within the default template. (#186)
+ JSDoc now embeds a version of Mozilla Rhino that recognizes Node.js packages, including `package.json` files. (Multiple commits)

### Enhancements
+ If a `README.md` file is passed to JSDoc, its contents will be included on the `index.html` page of the generated documentation. (#128)
+ The `@augments` tag can now refer to an undocumented member, such as `window.XMLHTTPRequest`. (#160)
+ The `@extends` tag can now refer to an undocumented member, such as `window.XMLHttpRequest`. In addition, you can now use `@host` as a synonym for `@extends`. (#145)
+ The `@lends` tag is now supported in multiline doclets. (#163)
+ The `@property` tag no longer results in malformed doclets. (20f87094)
+ On Windows, `jsdoc.cmd` now provides the same options as the `jsdoc` shell script. (#127)
+ JSDoc now provides `setTimeout()`, `clearTimeout()`, `setInterval()`, and `clearInterval()` functions. (Multiple commits)
+ JSDoc no longer provides a global `exit()` function. Use `process.exit()` instead. (1228a8f7)
+ JSDoc can now be configured to pass a raw array of doclets, rather than a TaffyDB, to a template's `publish` function. To use this feature, edit your `conf.json` file to include a `templates.docletFormat` property with the value `array`. **Note**: This option is not compatible with JSDoc's built-in templates. (#258)
+ JSDoc now includes additional shims for Node.js' built-in modules. Note: Many of these shims implement only the functions that JSDoc uses, and they may not be consistent with Node.js' behavior in edge cases. (Multiple commits)
+ When running tests, you can now use the `--nocolor` option to disable colored output. On Windows, colored output is always disabled. (e17601fe, 8bc33541)

### Bug fixes
+ The `jsdoc` and `jsdoc.cmd` scripts now work correctly with paths that include spaces. (#127, #130)
+ The `jsdoc` script now works correctly on Cygwin and MinGW, and with the `dash` shell. (#182, #184, #187)
+ The `-d/--destination` option is no longer treated as a path relative to the JSDoc directory. Instead, it can contain an absolute path, or a path relative to the current working directory. (f5e3f0f3)
+ JSDoc now provides default options for the values in `conf.json`. (#129)
+ Doclets for getters and setters are now parsed appropriately. (#150)
+ If a doclet's text contains leading asterisks, such as bullets representing a Markdown unordered list, the leading asterisks are no longer removed. (#172)
+ If a child member overrides an ancestor member, the ancestor member is no longer documented. (#158)
+ If a member of a namespace has the same name as a namespace, the member is now documented correctly. (#214)
+ When Markdown formatting is enabled, underscores in inline `{@link}` tags are no longer treated as Markdown formatting characters. (#259)
+ Markdown files for tutorials are now parsed based on the settings in `conf.json`, rather than using the "evilstreak" Markdown parser in all cases. (#220)
+ If a folder contains both tutorial source files and `.js` files, JSDoc no longer attempts to parse the `.js` files as JSON files. (#222)
+ The "evilstreak" Markdown parser now works correctly with files that use Windows-style line endings. (#223)
+ JSDoc no longer fails unit tests when the `conf.json` file is not present. (#206)
+ On Windows, JSDoc now passes all unit tests. (Multiple commits)

### Plugins
+ The new `partial` plugin adds support for a `@partial` tag, which links to an external file that contains JSDoc comments. (#156)
+ The new `eventDumper` plugin logs information about parser events to the console. (#242)
+ The new `verbose` plugin logs the name of each input file to the console. (#157)

### Template enhancements
+ The default template can now be used if it is placed outside of the JSDoc directory. (#198)
+ The default template no longer throws an error when a parameter does not have a name. (#175)
+ The default template now omits the "Classes" header when no classes are documented. (eb0186b9)
+ The default template now shows an "Inherited From" section when a member is inherited from another member. (#154)
+ The default template now includes function signatures in headings. (#253)
+ The default template now shows the type of events. (#192)
+ The default template now links to a function's return type when appropriate. (#192)
+ The default template now correctly generates output for tutorials. (#188)
+ The default template now uses prettify.js as its syntax highlighter, and its files are included in JSDoc's output rather than downloaded from a remote server. (#193)
+ The default template no longer overwrites the `index.html` output file if a namespace called `index` has been documented. (#244)
+ The Haruki template now uses arrays rather than objects to contain members, allowing overloaded member to be documented. (#153)
+ The Haruki template now provides a clearer error message when the output destination is not specified correctly. (#174)


## 3.0.1 (June 2012)

### Enhancements
+ The `conf.json` file may now contain `source.include` and `source.exclude` properties. (#56)
    + `source.include` specifies files or directories that JSDoc should _always_ check for documentation.
    + `source.exclude` specifies files or directories that JSDoc should _never_ check for documentation.
    These settings take precedence over the `source.includePattern` and `source.excludePattern` properties, which contain regular expressions that JSDoc uses to search for source files.
+ The `-t/--template` option may now specify the absolute path to a template. (#122)

### Bug fixes
+ JSDoc no longer throws exceptions when a symbol has a special name, such as `hasOwnProperty`. (1ef37251)
+ The `@alias` tag now works correctly when documenting inner classes as globals. (810dd7f7)

### Template improvements
+ The default template now sorts classes by name correctly when the classes come from several modules. (4ce17195)
+ The Haruki template now correctly supports `@example`, `@members`, and `@returns` tags. (6580e176, 59655252, 31c8554d)


## 3.0.0 (May 2012)

Initial release.
