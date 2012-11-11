# JSDoc 3 change history

This file describes notable changes in each version of JSDoc 3. To download a specific version of JSDoc 3, see [GitHub's tags page](https://github.com/jsdoc3/jsdoc/tags).


## 3.1.0 (TBD)

**NOTE**: This change history is a work in progress.

### Major changes
+ JSDoc now provides a `-l/--lenient` option that tells JSDoc to continue running if it encounters a non-fatal error. (Multiple issues)

### Enhancements
+ If a `README.md` file is passed to JSDoc, its contents will be included on the `index.html` page of the generated documentation. (#128)
+ The `@extends` tag now supports undocumented objects such as `window.XMLHttpRequest`. In addition, you can now use `@host` as a synonym for `@extends`. (#145)
+ The `@lends` tag is now supported in multiline doclets. (#163)
+ The `jsdoc` and `jsdoc.cmd` scripts now work correctly with paths that include spaces. (#127, #130)
+ On Windows, `jsdoc.cmd` now provides the same options as the `jsdoc` shell script. (#127)

### Bug fixes
+ JSDoc now provides default options for the values in `conf.json`. (#129)
+ Doclets for getters and setters are now parsed appropriately. (#150)

### Plugins
+ The new `partial` plugin adds support for a `@partial` tag, which links to an external file that contains JSDoc comments. (#156)
+ The new `verbose` plugin logs the name of each input file to the console. (#157)

### Template improvements
+ The default template now omits the "Classes" header when no classes are documented. (eb0186b9)


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
