# JSDoc 3 change history

This file describes notable changes in each version of JSDoc 3. To download a specific version of JSDoc 3, see [GitHub's tags page](https://github.com/jsdoc3/jsdoc/tags).


## 3.1.0 (January 2013)

### Major changes
+ You can now use the new `@callback` tag to provide information about a callback function's signature. To document a callback function, create a standalone JSDoc comment, as shown in the following example:

```javascript
/**
 * @class
 */
function MyClass() {}

/**
 * Send a request.
 *
 * @param {MyClass~responseCb} cb - Called after a response is received.
 */
MyClass.prototype.sendRequest = function(cb) {
    // code
};

/**
 * Callback for sending a request.
 *
 * @callback MyClass~responseCb
 * @param {?string} error - Information about the error.
 * @param {?string} response - Body of the response.
 */
```
+ The inline link tag, `{@link}`, has been improved:
    + You can now use a space as the delimiter between the link target and link text.
    + In your `conf.json` file, you can now enable the option `templates.cleverLinks` to display code links in a monospace font and URL links in plain text. You can also enable the option `templates.monospaceLinks` to display all links in a monospace font. **Note**: JSDoc templates must be updated to respect these options.
    + You can now use the new inline tags `{@linkplain}`, which forces a plain-text link, and `{@linkcode}`, which forces a monospace link. These tags always override the settings in your `conf.json` file. (#250)
+ JSDoc now provides a `-l/--lenient` option that tells JSDoc to continue running if it encounters a non-fatal error. (Multiple issues)
+ A template's `publish.js` file should now assign its `publish` function to `exports.publish`, rather than defining a global `publish` function. The global `publish` function is deprecated and may not be supported in future versions. JSDoc's built-in templates reflect this change. (#166)
+ The template helper (`templateHelper.js`) exports a variety of new functions for finding information within a parse tree. These functions were previously contained within the default template. (#186)
+ Updated the `fs` and `path` modules to make their behavior more consistent with Node.js. In addition, created extended versions of these modules with additional functionality. (Multiple commits)
+ Updated or replaced numerous third-party modules. (Multiple commits)
+ Reorganized the JSDoc codebase in preparation for future enhancements. (Multiple commits)
+ JSDoc now embeds a version of Mozilla Rhino that recognizes Node.js packages, including `package.json` files. (Multiple commits)
+ Node.js' `npm` utility can now install JSDoc from its GitHub repository. **Note**: JSDoc is not currently compatible with Node.js. However, this change allows JSDoc to be installed as a dependency of a Node.js project. In this version, global installation with `npm` is not supported. (Multiple commits)

### Enhancements
+ If a `README.md` file is passed to JSDoc, its contents will be included on the `index.html` page of the generated documentation. (#128)
+ The `@augments` tag can now refer to an undocumented member, such as `window.XMLHTTPRequest`. (#160)
+ The `@extends` tag can now refer to an undocumented member, such as `window.XMLHttpRequest`. In addition, you can now use `@host` as a synonym for `@extends`. (#145)
+ The `@lends` tag is now supported in multiline JSDoc comments. (#163)
+ On Windows, `jsdoc.cmd` now provides the same options as the `jsdoc` shell script. (#127)
+ JSDoc now provides `setTimeout()`, `clearTimeout()`, `setInterval()`, and `clearInterval()` functions. (Multiple commits)
+ JSDoc no longer provides a global `exit()` function. Use `process.exit()` instead. (1228a8f7)
+ JSDoc now includes additional shims for Node.js' built-in modules. **Note**: Many of these shims implement only the functions that JSDoc uses, and they may not be consistent with Node.js' behavior in edge cases. (Multiple commits)
+ JSDoc now provides a `-v/--version` option to display information about the current version. (#303)
+ When running tests, you can now use the `--nocolor` option to disable colored output. On Windows, colored output is always disabled. (e17601fe, 8bc33541)

### Bug fixes
+ When using the `@event` tag to define an event within a class or namespace, the event's longname is now set correctly regardless of tag order. (#280)
+ The `@property` tag no longer results in malformed parse trees. (20f87094)
+ The `jsdoc` and `jsdoc.cmd` scripts now work correctly with paths that include spaces. (#127, #130)
+ The `jsdoc` script now works correctly on Cygwin and MinGW, and with the `dash` shell. (#182, #184, #187)
+ The `-d/--destination` option is no longer treated as a path relative to the JSDoc directory. Instead, it can contain an absolute path, or a path relative to the current working directory. (f5e3f0f3)
+ JSDoc now provides default options for the values in `conf.json`. (#129)
+ If the `conf.json` file does not exist, JSDoc no longer tries to create it, which prevents errors if the current user does not have write access to the JSDoc directory. (d2d05fcb)
+ Doclets for getters and setters are now parsed appropriately. (#150)
+ Only the first asterisk is removed from each line of a JSDoc comment. (#172)
+ If a child member overrides an ancestor member, the ancestor member is no longer documented. (#158)
+ If a member of a namespace has the same name as a namespace, the member is now documented correctly. (#214)
+ The parse tree now uses a single set of properties to track both JSDoc-style type information and Closure Compiler-style type information. (#118)
+ If a type has a leading `!`, indicating that it is non-nullable, the leading `!` is now removed from the type name. (#226)
+ When Markdown formatting is enabled, underscores in inline `{@link}` tags are no longer treated as Markdown formatting characters. (#259)
+ Markdown links now work correctly when a JavaScript reserved word, such as `constructor`, is used as the link text. (#249)
+ Markdown files for tutorials are now parsed based on the settings in `conf.json`, rather than using the "evilstreak" Markdown parser in all cases. (#220)
+ If a folder contains both tutorial source files and `.js` files, JSDoc no longer attempts to parse the `.js` files as JSON files. (#222)
+ The "evilstreak" Markdown parser now works correctly with files that use Windows-style line endings. (#223)
+ JSDoc no longer fails unit tests when the `conf.json` file is not present. (#206)
+ On Windows, JSDoc now passes all unit tests. (Multiple commits)

### Plugins
+ The new `partial` plugin adds support for a `@partial` tag, which links to an external file that contains JSDoc comments. (#156)
+ The new `commentsOnly` plugin removes everything in a file except JSDoc-style comments. You can use this plugin to document source files that are not valid JavaScript, including source files for other languages. (#304)
+ The new `eventDumper` plugin logs information about parser events to the console. (#242)
+ The new `verbose` plugin logs the name of each input file to the console. (#157)

### Template enhancements

#### Default template
+ The template output now includes pretty-printed versions of source files. This feature is enabled by default. To disable this feature, add the property `templates.default.outputSourceFiles: false` to your `conf.json` file. (#208)
+ You can now use the template if it is placed outside of the JSDoc directory. (#198)
+ The template no longer throws an error when a parameter does not have a name. (#175)
+ The navigation bar now includes an "Events" section if any events are documented. (#280)
+ Pages no longer include a "Classes" header when no classes are documented. (eb0186b9)
+ Member details now include "Inherited From" section when a member is inherited from another member. (#154)
+ If an `@author` tag contains text in the format "Jane Doe <jdoe@example.com>", the value is now converted to an HTML `mailto:` link. (#326)
+ Headings for functions now include the function's signature. (#253)
+ Type information is now displayed for events. (#192)
+ Functions now link to their return type when appropriate. (#192)
+ Type definitions that contain functions are now displayed correctly. (#292)
+ Tutorial output is now generated correctly. (#188)
+ Output files now use Google Code Prettify with the Tomorrow theme as a syntax highlighter. (#193)
+ The `index.html` output file is no longer overwritten if a namespace called `index` has been documented. (#244)
+ The current JSDoc version number is now displayed in the footer. (#321)

#### Haruki template
+ Members are now contained in arrays rather than objects, allowing overloaded members to be documented. (#153)
+ A clearer error message is now provided when the output destination is not specified correctly. (#174)


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
