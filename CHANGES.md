# JSDoc change history

This file describes notable changes in each version of JSDoc, starting with version 3.0.0.


## 4.0.4 (October 2024)

Fixes a compatibility issue with Node.js 23.


## 4.0.3 (May 2024)

Updates dependencies.


## 4.0.2 (February 2023)

Updates the Babel parser, and enables additional Babel plugins for ECMAScript proposals.


## 4.0.1 (February 2023)

If an inline link tag uses a pipe delimiter, and there are spaces around the pipe delimiter, then
the HTML link no longer contains `%20` at the end; also, the link text no longer contains extra
spaces. For example, `{@link https://example.com | link text}` is now rendered as
`<a href="https://example.com/">link text</a>` rather than
`<a href="https://example.com/%20"> link text</a>`.


## 4.0.0 (November 2022)

+ JSDoc releases now use [semantic versioning](https://semver.org/). If JSDoc makes
  backwards-incompatible changes in the future, the major version will be incremented.
+ JSDoc no longer uses the [`taffydb`](https://taffydb.com/) package. If your JSDoc template or
  plugin uses the `taffydb` package, see the
  [instructions for replacing `taffydb` with `@jsdoc/salty`](https://github.com/jsdoc/jsdoc/tree/main/packages/jsdoc-salty#use-salty-in-a-jsdoc-template).
+ JSDoc now supports Node.js 12.0.0 and later.


## 3.6.11 (July 2022)

Updates dependency versions to make JSDoc compatible with Node.js 12.0.0 and later.


## 3.6.10 (January 2022)

Fixes an issue in JSDoc 3.6.9 that prevented JSDoc from being installed in some continuous
integration (CI) environments.


## 3.6.9 (January 2022)

Fixes an issue in JSDoc 3.6.8 that prevented `npm install jsdoc` from working.


## 3.6.8 (January 2022)

Updates dependencies.


## 3.6.7 (May 2021)

Updates dependencies.


## 3.6.6 (September 2020)

Fixes an issue that could cause members of an interface to be tracked incorrectly if the interface
was both defined as an ES2015 class and assigned to a variable. For example:

```js
/** @interface */
foo.Bar = class {
    constructor() {
        /** This member was missing from the generated docs. */
        this.baz = null;
    }
}
```


## 3.6.5 (July 2020)

Prevents circular references in doclets when two function parameters use the same type expression,
and the `--debug` flag is present.


## 3.6.4 (April 2020)

Updates dependencies.


## 3.6.3 (July 2019)

Updates dependencies.


## 3.6.2 (May 2019)

Fixes an issue that prevented ES 2015 classes from appearing in generated docs. ([#1644][1644])


## 3.6.1 (May 2019)

Prevents a crash when using type applications in Node.js 12. ([#1643][1643])


## 3.6.0 (May 2019)

### Major changes

+ JSDoc is now compatible with Node.js 12, and it requires Node.js 8.15.0 or later.
+ JSDoc now recognizes all documented Closure Compiler tags. ([#605][605])

### Enhancements

+ You can now use the `templates.useShortNamesInLinks` configuration setting to show the short name
of each symbol in link text (for example, `baz`), rather than the full longname (for example,
`foo.bar.baz`). ([#738][738])
+ When you enable the Markdown plugin, you can now specify a function that performs syntax
highlighting in code blocks. ([#1412][1412])
+ The default template now places namespaces near the top of the TOC. ([#1410][1410])

### Bug fixes

+ When you add a JSDoc comment to an ES2015 constructor, JSDoc now preserves all of the JSDoc tags,
not only the description and parameters. ([#1129][1129])
+ The `@exports` tag now works correctly when it is combined with the `@enum` tag. ([#970][970])
+ When you enable the Markdown plugin, and you use a code fence with the language set to `plain`,
JSDoc no longer pretty-prints the code block in the generated documentation. ([#1361][1361])


## 3.5.5 (September 2017)

Fixes a compatibility issue with Node.js 8.5.0. (#1438)


## 3.5.4 (August 2017)

+ When a class uses the `@hideconstructor` tag, the default template no longer displays the names of
parameters that the constructor accepts. (#1397)
+ When an arrow function expression returns a class, the class's methods and properties are now
named correctly. (#1409)
+ JSDoc no longer crashes when an anonymous class is passed as a function parameter. (#1416)
+ JSDoc now allows `import` and `export` declarations anywhere where a statement is allowed. (#1411)
+ JSDoc now allows `return` statements outside of functions. (#1411)
+ JSDoc now allows `super()` calls outside of a method definition. (#1411)
+ JSDoc no longer exits before the `STDOUT` pipe has been flushed. (#1408)


## 3.5.3 (July 2017)

+ Non-JSDoc comments (comments that do not begin with `/**`) are now ignored. (#1398)
+ JSDoc no longer crashes when it parses a class property with no value assigned to it. (#1400)
+ When there are JSDoc comments at the end of a source file that has a `'use strict';` directive,
the comments are no longer ignored. (#1396)
+ Namepaths that contain an `@` sign (for example, `module:@prefix/my-module~myCallback`) are now
parsed correctly. (#1302)
+ The default template now displays interfaces that belong to a namespace. (#1406)
+ When an ES2015 class inside a module uses an `@alias` tag, the class's constructor now gets the
correct longname. (#1395)
+ When there are no input files to process, JSDoc no longer prints help text to the console. (#1404)


## 3.5.2 (July 2017)

+ The default template now hides parameters and properties for class constructors that are hidden
with the `@hideconstructor` tag. (#1397)
+ JSDoc now uses an improved algorithm for locating plugins and template resources. (#1394)
+ When the `@alias` tag identifies an instance member (for example, `@alias Foo#bar`), the alias is
now applied correctly. (#1385)
+ When the `@alias` tag is applied to a class that is within a module and is aliased to the module
name, the class's instance members are now documented correctly. (#1134)
+ Fixed a crash when a `@param` tag uses the wrong delimiter to close the type expression (for
example, `@param {Object)`). (#1221)
+ The Markdown plugin now converts Markdown-formatted text in the `@summary` tag. (#1149)


## 3.5.1 (July 2017)

+ Fixed an issue that prevented JSDoc from working on versions of Node.js prior to 5.10.0. (#1393)
+ If the JSDoc configuration file does not have a file extension, JSDoc now assumes that the file
is in JSON format. (#1391)


## 3.5.0 (July 2017)

### Major changes

+ JSDoc now uses the [Babylon](https://github.com/babel/babylon) JavaScript parser, which means that
JSDoc can parse any JavaScript or JSX file that is supported by the [Babel](https://babeljs.io/)
compiler. For example, JSDoc can now parse JavaScript files that include all of the following
language features:

    + [Decorators](https://github.com/tc39/proposal-decorators)
    + [Public and private class fields](https://github.com/tc39/proposal-class-fields)
    + [Asynchronous iterators](https://github.com/tc39/proposal-async-iteration)
    + [Dynamic `import()`](https://github.com/tc39/proposal-dynamic-import)
    + [Optional chaining](https://github.com/tc39/proposal-optional-chaining)

+ You can now use a JavaScript file to configure JSDoc. The JavaScript file must be a CommonJS
module that exports a single configuration object. See the
[documentation](https://jsdoc.app/about-configuring-jsdoc.html) for details and examples.
+ Fixed multiple issues with documenting ES2015 classes and modules. See "Bug fixes" for details.
+ JSDoc now requires Node.js 4.2.0 or later.

### New tags

**Note**: Third-party templates may not support these new tags.

+ You can now use the new [`@async` tag](https://jsdoc.app/tags-async.html) to indicate that a
function is asynchronous (that is, that it was declared with the syntax `async function foo() {}`).
In general, you do not need to use this tag, because JSDoc autodetects asynchronous functions.
(#1188)
+ You can now use the new [`@generator` tag](https://jsdoc.app/tags-generator.html) to indicate
that a function is a generator function. In general, you do not need to use this tag, because JSDoc
autodetects generator functions. (#1158)
+ You can now use the new [`@hideconstructor` tag](https://jsdoc.app/tags-hideconstructor.html) to
tell JSDoc to hide a class's constructor from the documentation. (#952)
+ You can now use the new [`@package` tag](https://jsdoc.app/tags-package.html) to indicate that a
symbol is package-private. (#962)
+ You can now use the new [`@yields` tag](https://jsdoc.app/tags-yields.html) to document the
value that is yielded by a generator function. (#1388)

### Enhancements

+ JSDoc can now parse files that contain asynchronous functions (that is, functions declared as
`async function foo() {}`), and JSDoc autodetects when a function is asynchronous. (#1188)
+ JSDoc now autodetects generator functions. (#1158)
+ When JSDoc cannot parse a type expression, it now logs the line number on which the type
expression was found. (#1057)
+ When JSDoc fires `jsdocCommentFound` and `symbolFound` events, the event now includes a `columnno`
property indicating the column number on which the comment or symbol was found. (#1362)
+ You can now use the new `sourceType` configuration option to control how JavaScript files are
parsed. The default value is `module`. Set the value to `script` to suppress implied strict mode;
this setting will also prevent you from using ES2015 modules. (#1210)
+ You can now use the new `recurseDepth` configuration option to control how many levels deep JSDoc
will recursively search for files. The default value is 10. (#1340)

### Bug fixes

+ JSDoc now correctly documents the constructors and instance properties of ES2015 classes. (#1182)
+ JSDoc now correctly documents the constructor of an ES2015 class exported from an ES2015 module.
(#1272)
+ JSDoc now uses the correct scope for exported symbols, and their children, in ES2015 modules.
(#1293)
+ When JSDoc is run in a directory that has a `plugins/` or `templates/` directory, JSDoc can now
discover plugins and templates in other directories. (#1081, #1308)
+ JSDoc no longer crashes when it reads a UTF-8 JSON file with a leading BOM. (#1256, #1297)
+ When a function is assigned to a variable, JSDoc now autodetects the function's default and
repeatable parameters. (#1054)
+ JSDoc no longer crashes when the `@author` tag does not have a value. (#1289)
+ JSDoc now always calls `process.exit()` when exiting. (#1287)

### Default template

+ The default template now identifies asynchronous and generator functions. (#1158, #1188)
+ The default template now displays appropriate documentation for namespaces that are also
functions. (#955)
+ Images that are wider than the text area are now displayed correctly. (#1359)



## 3.4.3 (November 2016)

Updated JSDoc's `LICENSE.md` file.


## 3.4.2 (October 2016)

+ Classes exported from an ES2015 module are now documented correctly. (#1137)
+ Fixed an issue that prevented plugins and templates from being loaded correctly. (#1259)
+ Fixed a crash when using the experimental object spread operator in assignments. (#1258)


## 3.4.1 (September 2016)

### Enhancements

+ When installing JSDoc from NPM, all dependencies are now pulled from NPM. (#961)
+ The configuration setting `tags.allowUnknownTags` may now contain an array of tag names that
should be allowed. (#1159)

### Bug fixes

+ When an ES2015 module's default export is a class, JSDoc now documents the class correctly.
(#1113, #1120)
+ JSDoc no longer crashes when an ES2015 module exports an anonymous class. (#1113)
+ JSDoc no longer crashes when the experimental object spread operator is used. (#1141)
+ In ES2015 methods, JSDoc now autodetects whether a parameter is a default or repeatable parameter.
(#1144)
+ The Markdown plugin now works correctly with inline tags that contain special characters, such as
`{@link chat."#channel"}`. (#1035)
+ When JSDoc is run in a directory that has a `plugins/` or `templates/` directory, JSDoc can now
discover plugins and templates in other directories. (#1081)

### Templates

+ The default template now uses appropriate styles for displaying tables. (#1064)
+ The default template's CSS file no longer uses the same style for both `<h2>` and `<h3>` elements.
(#1108)
+ JSDoc now includes a `silent` template that generates no output. This template makes it easier to
use JSDoc as a linter to check for syntax errors and unrecognized tags in documentation comments.
(#1160)


## 3.4.0 (November 2015)

### Major changes

+ JSDoc is now compatible with Node.js 4.0.0 and later.
+ JSDoc no longer runs on Mozilla Rhino. Use Node.js to run JSDoc.
+ JSDoc can now parse ECMAScript 2015 code, including code that uses native classes and modules.
(#555)
+ JSDoc can now parse [JSX](https://facebook.github.io/jsx/) files. (#1001)
+ JSDoc's `app` and `env` global variables are now deprecated. Avoid using the `app` global. Use the
`jsdoc/env` module instead of the `env` global. (#812)

### Enhancements

+ `const` declarations are now automatically treated as constants. (#555)
+ Templates may now run asynchronously. To create an asynchronous template, simply return a promise
from your template's `publish` method. (#953)

### Bug fixes

+ Symbols now get the correct longname when they are defined as properties of a prototype and
include special characters, such as `#` and `.` (for example, `Foo.prototype['this#is#bar']`).
(#888)
+ Instance members that are defined as computed properties of `this` (for example, `this['bar']`)
now get the correct longname. (#890)
+ When an instance member (for example, `this.bar`) is documented within a member of a prototype
(for example, `Foo.prototype.setBar`), the instance member's longname is now set correctly. (#1011)
+ The `@borrows` tag now works with symbol names that contain whitespace. (#818)

### Plugins

+ For the Markdown plugin, you can now autogenerate a heading ID for each heading by setting the
configuration property `markdown.idInHeadings` to `true`. (#1032)

### Template improvements

+ In the default template, you can now show the full namepath of each object in the navigation
column by setting the configuration property `templates.default.useLongnameInNav` to `true`. (#986)
+ In the Haruki template, falsy default values now appear in the output. (#1063)


## 3.3.3 (September 2015)

+ Symbols named `prototype` are now handled correctly. (#891)
+ Fixed an issue that could cause JSDoc to go into an infinite loop when a module is documented
twice. (#975)
+ Fixed an issue that could cause parsing errors on valid regular expressions. (#1053)


## 3.3.2 (June 2015)

JSDoc no longer crashes when parsing a large number of files, or a single object that has a large
number of properties. (#976)


## 3.3.1 (June 2015)

+ Fixed a crash in the Haruki template. (#1005)
+ When a type expression includes a record type with numeric keys (for example, `{0: string}`), the
type expression is now parsed correctly. (#1016)


## 3.3.0 (May 2015)

### Major changes

+ You can now run JSDoc on Node.js. (#93)
+ You can now use the `@interface` and `@implements` tags to document interfaces and their
implementations. (#720, #828)
+ Closure Compiler's `@inheritDoc` and `@override` tags are now supported. (#53)
+ If the JSDoc comment for a symbol includes the `@mixes` tag, all of the mixins now appear in the
symbol's documentation. (#378)
+ JSDoc can now log information to the console as it runs (for example, the name of each file that
JSDoc parses). To log this information, run JSDoc with the `--verbose` flag. (#416)
+ You can now use any file as the package or README file for your documentation. Use the
`-P/--package/` and `-R/--readme` flags to specify the package and README file. (#708)
+ The default template's typography and color scheme have been significantly improved. (#550, #780,
#843)

### Enhancements

+ You can now use the `--pedantic` flag to treat all errors as fatal errors, and to treat warnings
as errors. This flag replaces the `--lenient` flag, which had roughly the opposite meaning and is no
longer available. (#416)
+ You can now use the `-a/--access` flag to control whether private, protected, and public symbols
appear in the documentation. (#860, #861)
+ You can now use the `--debug` flag to log detailed debugging information to the console. This
information can help you diagnose bugs in JSDoc itself. (#416)
+ JSDoc's configuration file can now contain JavaScript comments. (#660)
+ You can now include source files from a directory, but exclude one of its subdirectories, by
adding the subdirectory to the `source.exclude` option in the configuration file. (#484)
+ The `source.exclude` option now works correctly when JSDoc is run with the `-r/--recurse` flag.
(#616)
+ When JSDoc is run with the `-r/--recurse` flag, it now scans for tutorials recursively. (#712)
+ JSDoc's `-X/--explain` option now runs much more quickly. (#633)
+ If all of the text for an `@example` tag is indented, JSDoc now removes the extra indentation.
(#540)
+ The default value for a parameter or property can now include brackets (for example,
`@param {Array.<string>} [foo=['bar']]`). (#640)
+ You can now provide a default value for parameters and properties that are not optional (for
example, `@property {string} foo='bar'`). (#791)
+ If the `@type` tag includes a description (for example, `@type {string} some text`), JSDoc now
parses the type expression correctly and discards the description. (#615)
+ You can now add JSDoc comments to function parameters. (#473)
+ For Closure Compiler projects, you can now enable a Closure Compiler-specific tag dictionary that
more closely matches Closure Compiler's semantics. To enable Closure Compiler semantics, set the
configuration file's `tags.dictionaries` option to `['closure']`. This option can contain the values
`jsdoc`, `closure`, or both. If multiple dictionaries are enabled, and a tag is defined in more than
one dictionary, JSDoc uses the definition from the first dictionary that contains the tag. (#729,
#730, #731, #732)
+ If one symbol overrides another, JSDoc now adds an `overrides` property to the doclet that is
overriding another. The `overrides` property contains the longname of the overridden symbol. (#792)
+ When a JSDoc tag contains a type expression, the doclet's `type` object now includes a hidden
`parsedType` property. The `parsedType` property contains a syntax tree that represents the type
expression. The syntax tree is generated by [Catharsis](https://github.com/hegemonic/catharsis), and
its format may change in the future. (#576)
+ JSDoc now allows output filenames to contain non-ASCII characters. In addition, links to output
files are now URL-encoded when necessary. (#677)
+ JSDoc now ensures that output filenames do not have a leading underscore. (#758)
+ JSDoc now tries to ensure that `id` attributes in output files are unique within that file. (#539)
+ JSDoc now has an up-to-date JSON Schema file for parse results. The schema file is available in
`lib/jsdoc/schema.js`. (#327)
+ JSDoc now extracts more information from package files. (#710)
+ JSDoc now displays usage information if you run JSDoc without any input files, or with an
unrecognized command-line option. (#609, #840)

### Bug fixes

+ When the `allowUnknownTags` option is set to `false`, JSDoc no longer logs warnings about the
presence of `@also` and `@scope` tags. (#574)
+ Fixed several errors when parsing type expressions. (#619, #644, #652, #705, #767)
+ Properties added to the `module.exports` object can now be documented. (#500)
+ When a symbol's name starts with the same characters as its parent namespace (such as `Vector` in
`V.Vector`), JSDoc now assigns the correct longname to the symbol. (#608)
+ If a child class inherits from multiple parent classes, and the parent classes have instance
members with the same name, the child class no longer displays the documentation from both parent
classes. (#613)
+ If a source file contains an object literal, and one of the property names is a whitespace
character or a character that must be escaped in a regular expression, JSDoc now parses the file
successfully. (#549, #775)
+ Virtual comments now work correctly for overloaded functions. (#727)
+ When a virtual comment appears within a module, JSDoc now assigns the correct values to the
virtual comment doclet's `memberof`, `longname`, and `scope` properties. (#631)
+ JSDoc now sets the `scope` property to `global` for all global doclets. (#684)
+ Module doclets no longer have a `scope` property. (#782)
+ In Markdown tutorials, JSDoc no longer unescapes HTML entities. (#743)
+ If a longname includes a variation (for example, `Foo#bar(variation)`), the link text is now
preserved when generating HTML links. (#857)
+ When a single JSDoc comment includes `@class`, `@classdesc`, and `@constructor` tags, JSDoc no
longer ignores the value of the `@classdesc` tag. (#806)
+ For tags where the name and type are both optional (`@constant`, `@external`, `@member`,
`@module`, `@namespace`, and `@param`), JSDoc now parses the tag correctly when it includes a type
but not a name. (#351, #535)
+ The `@default` tag now works correctly when used with an array literal. (#604)
+ The `@enum` tag now works correctly when the enumeration is part of a chain of assignments (for
example, `var FOO = exports.FOO = {/* enumerated values */}`). (#702)
+ The `@exports` and `@module` tags now work correctly when their value includes a `module:`
namespace (for example, `@exports module:foo`). (#786)
+ The `@memberof` tag now works correctly when it refers to a module that is defined in a separate
file. (#880)
+ The `@variation` tag now works correctly when its value is enclosed in parentheses (for example,
`@variation (foo)`). (#850)

### Plugins

+ Tag definitions can now have a `mustNotHaveDescription` property. When this property is set to
`true`, JSDoc will warn the user if the tag text includes a description (such as `The description`
in `@param {string} foo - The description`). (#615)
+ Tag definitions can now call the method `dictionary.normalize`, which is a synonym for
`dictionary.normalise`. (#884)
+ The Markdown plugin no longer prevents inline `{@link}` tags from working. (#518)
+ The Markdown plugin now converts `@author` and `@throws` tag values to HTML by default. (#736,
#878)
+ JSDoc now includes a `summarize` plugin that automatically generates summaries based on the
description. (#485)
+ JSDoc now includes an `underscore` plugin that finds symbols whose names begin with an underscore
and automatically tags them as `@private`. (#471)
+ Plugins can now replace the `doclet` property of `newDoclet` events. (#584)

### Template improvements

+ You can now override the default template's main layout file, `layout.tmpl`, by setting the
`templates.default.layoutFile` option in JSDoc's configuration file. The property can contain a
relative or absolute path to the replacement for `layout.tmpl`. Relative paths are resolved against
the path to the configuration file; the current working directory; and the JSDoc directory, in that
order. (#480)
+ When the `templates.default.outputSourceFiles` option is set to `false`, the documentation no
longer shows the path to each source file. (#571)
+ You can now use the property `templates.default.staticFiles.include` to list files that will be
copied to the output directory. For backwards compatibility, the property
`templates.default.staticFiles.paths` is also supported but is deprecated. (#785)
+ The property `templates.default.staticFiles.include` now works correctly when an absolute path is
specified. (#939)
+ The `templates.default.staticFiles` options now work correctly on Windows. (#785)
+ In output files, you can now prevent the date from appearing in the footer by setting the property
`templates.default.includeDate` to `false`. (#910)
+ Output files no longer show the default value for members of an enumeration. (#689)
+ In certain types of AMD modules, the module-overview section is no longer duplicated. (#853)
+ If a constructor is assigned to `module.exports`, the value of the `@classdesc` tag now appears in
the documentation. (#740)
+ If a constructor is assigned to `module.exports`, and the constructor inherits from another class,
the parent class is now listed in the documentation. (#594)
+ Text within an `@example` tag, including HTML tags, is now properly escaped. (#511)
+ If a member has a `@fires` tag, the tag information now appears in the documentation. (#568)
+ If a symbol has members that use the `@mixin` tag, the mixins are now listed in the documentation.
(#379, #602)
+ When multiple `@param` tags are used to document properties of array values (for example,
`@param {Object[]} foo` and `@param {string} foo[].bar`), the properties are now grouped into the
appropriate row of the parameters table. (#870)
+ If a member has a `@requires` tag, the tag information now appears in the documentation. (#563)
+ Type expressions are now presented more clearly. (#618)
+ Pretty-printed source files now include line numbers. (#532)
+ When you run JSDoc with a single input file, the full path to the file no longer appears in the
documentation. (#553)
+ When an overloaded function is assigned to `module.exports`, the documentation now displays all of
the signatures for the overloaded function. (#727)
+ Resolved several issues that caused the default template to generate invalid HTML. (#843)


## 3.2.2 (November 2013)

### Bug fixes

+ Addressed a regression in JSDoc 3.2.1 that could prevent a function declaration from shadowing a
declaration with the same name in an outer scope. (#513)
+ If a child class overrides a method in a parent class without documenting the overridden method,
the method's documentation is now copied from the parent class. (#503)
+ You can now use inline HTML tags in Markdown-formatted text. In addition, JSDoc now uses only the
[marked Markdown parser](https://github.com/chjj/marked); the markdown-js parser has been removed.
(#510)
+ Type expressions can now include a much broader range of repeatable types. In addition, you can
now use Closure Compiler's nullable and non-nullable modifiers with repeatable types. For example,
the type expression `...!string` (a repeatable, non-nullable string) is now parsed correctly. (#502)
+ If a function accepts a parameter named `prototype`, the parameter is no longer renamed during
parsing. (#505)
+ If the list of input files includes relative paths, the paths are now resolved relative to the
user's working directory. (a3d33842)


## 3.2.1 (October 2013)

### Enhancements

+ JSDoc's parser now fires a `processingComplete` event after JSDoc has completed all
post-processing of the parse results. This event has a `doclets` property containing an array of
doclets. (#421)
+ When JSDoc's parser fires a `parseComplete` event, the event now includes a `doclets` property
containing an array of doclets. (#431)
+ You can now use relative paths in the JSDoc configuration file's `source.exclude` option. Relative
paths will be resolved relative to the current working directory. (#405)
+ If a symbol uses the `@default` tag, and its default value is an object literal, this value is now
stored as a string, and the doclet will have a `defaultvaluetype` property containing the string
`object`. This change enables templates to show the default value with appropriate syntax
highlighting. (#419)
+ Inline `{@link}` tags can now contain newlines. (#441)

### Bug fixes

+ Inherited symbols now indicate that they were inherited from the ancestor that defined the symbol,
rather than the direct parent. (#422)
+ If the first line of a JavaScript file contains a hashbang (for example, `#!/usr/bin/env node`),
the hashbang is now ignored when the file is parsed. (#499)
+ Resolved a crash when a JavaScript file contains a [JavaScript
1.8](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.8) keyword, such as
`let`. (#477)
+ The type expression `function[]` is now parsed correctly. (#493)
+ If a module is tagged incorrectly, the module's output file now has a valid filename. (#440, #458)
+ For tags that accept names, such as `@module` and `@param`, if a hyphen is used to separate the
name and description, the hyphen must appear on the same line as the name. This change prevents a
Markdown bullet on the followng line from being interpreted as a separator. (#459)
+ When lenient mode is enabled, a `@param` tag with an invalid type expression no longer causes a
crash. (#448)
+ The `@requires` tag can now contain an inline tag in its tag text. (#486)
+ The `@returns` tag can now contain inline tags even if a type is not specified. (#444)
+ When lenient mode is enabled, a `@returns` tag with no value no longer causes a crash. (#451)
+ The `@type` tag now works correctly with type expressions that span multiple lines. (#427)
+ If a string contains inline `{@link}` tags preceded by bracketed link text (for example,
`[test]{@link Test#test}`), HTML links are now generated correctly even if the string contains other
bracketed text. (#470)
+ On POSIX systems, if you run JSDoc using a symlink to the startup script, JSDoc now works
correctly. (#492)

### Default template

+ Pretty-printed source files are now generated by default. To disable this feature, add the
property `templates.default.outputSourceFiles: false` to your `conf.json` file. (#454)
+ Links to a specific line in a source file now work correctly. (#475)
+ Pretty-printed source files are now generated using the encoding specified in the `-e/--encoding`
option. (#496)
+ If a `@default` tag is added to a symbol whose default value is an object, the value is now
displayed in the output file. (#419)
+ Output files now identify symbols as "abstract" rather than "virtual." (#432)


## 3.2.0 (May 2013)

### Major changes

+ JSDoc can now parse any valid [Google Closure Compiler type
expression](https://developers.google.com/closure/compiler/docs/js-for-compiler#types). **Note**: As
a result of this change, JSDoc quits if a file contains an invalid type expression. To prevent JSDoc
from quitting, run JSDoc with the `--lenient` (`-l`) command-line option. (Multiple issues)
+ You can now use the new `@listens` tag to indicate that a symbol listens for an event. (#273)

### Enhancements

+ The parser now fires a `parseBegin` event before it starts parsing files, as well as a
`parseComplete` event after all files have been parsed. Plugins can define event handlers for these
events, and `parseBegin` handlers can modify the list of files to parse. (#299)
+ Event handlers for `jsdocCommentFound` events can now modify the JSDoc comment. (#228)
+ You can now exclude tags from Markdown processing using the new option `markdown.excludeTags` in
the configuration file. (#337)
+ You can now use the [marked](https://github.com/chjj/marked) Markdown parser by setting the
configuration property `markdown.parser` to `marked`. In addition, if `markdown.parser` is set to
`gfm`, JSDoc will now use the "marked" parser instead. (#385)
+ The `@typedef` tag no longer requires a name when used with a Closure Compiler-style type
definition. For example, the following type definition will automatically get the name `Foo.Bar`:

    ```javascript
        /** @typedef {string} */
        Foo.Bar;
    ```

    (#391)
+ You can now use an inline `{@type}` tag in a parameter's description. If this tag is present,
JSDoc will assume that the parameter uses the type specified in the inline `{@type}` tag. For
example, the following `@param` tag would cause `myParam`'s type to be documented as `Foo`:

    ```
    @param {(boolean|string)} myParam - My special parameter. {@type Foo}
    ```

    (#152)
+ The `console.log` function now behaves the same way as on Node.js. In addition, the functions
`console.info`, `console.error`, `console.warn`, and `console.trace` have been implemented. (#298)
+ You can now use npm to install JSDoc globally by running `npm install -g`. **Note**: JSDoc will
still run under Mozilla Rhino, not Node.js. (#374)
+ The `jsVersion` configuration property has been removed. (#390)

### Bug fixes

+ JSDoc now quits if the configuration file cannot be loaded. (#407)
+ JSDoc's `--explain` (`-X`) option now runs much more quickly, and it outputs valid JSON to the
console. (#298)
+ JSDoc's `--lenient` (`-l`) option now prints warnings on STDERR rather than STDOUT. (#298)
+ The parser now assigns the correct scope to object properties whose names include single quotes.
(#386)
+ The parser now recognizes CommonJS modules that export a single function rather than an object.
(#384)
+ The inline `{@link}` tag now works correctly when `@link` is followed by a tab. (#359)
+ On POSIX systems, quoted command-line arguments are no longer split on spaces. (#397)

### Plugins

+ The new `overloadHelper` plugin makes it easier to link to overloaded methods. (#179)
+ The `markdown` plugin now converts Markdown links in the `@see` tag. (#297)

### Default template enhancements

+ You can now use the configuration property `templates.default.staticFiles` to copy additional
static files to the output directory. (#393)
+ All output files now use human-readable filenames. (#339)
+ The documentation for events now lists the symbols that listen to that event. (#273)
+ Links to source files now allow you to jump to the line where a symbol is defined. (#316)
+ The output files now link to individual types within a Closure Compiler type expression. (Multiple
issues)
+ CommonJS modules that export a single function, rather than an object, are now documented more
clearly. (#384)
+ Functions that can throw multiple types of errors are now documented more clearly. (#389)
+ If a `@property` tag does not identify the property's name, the template no longer throws an
error. (#373)
+ The type of each `@typedef` is now displayed. (#391)
+ If a `@see` tag contains a URL (for example, `@see http://example.com` or
`@see <http://example.com>`), the tag text is now converted to a link. (#371)
+ Repeatable parameters are now identified. (#381)
+ The "Classes" header is no longer repeated in the navigation bar. (#361)
+ When the only documented symbols in global scope are type definitions, you can now click the
"Global" header to view their documentation. (#261)


## 3.1.1 (February 2013)

+ Resolved a crash when no input files contain JSDoc comments. (#329)
+ Resolved a crash when JSDoc cannot identify the common prefix of several paths. (#330)
+ Resolved a crash when the full path to JSDoc contained at least one space. (#347)
+ Files named `README.md` or `package.json` will now be processed when they are specified on the
command line. (#350)
+ You can now use `@emits` as a synonym for `@fires`. (#324)
+ The module `jsdoc/util/templateHelper` now allows you to specify the CSS class for links that are
generated by the following methods: (#331)
    + `getAncestorLinks`
    + `getSignatureReturns`
    + `getSignatureTypes`
    + `linkto`


## 3.1.0 (January 2013)

### Major changes

+ You can now use the new `@callback` tag to provide information about a callback function's
signature. To document a callback function, create a standalone JSDoc comment, as shown in the
following example:

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
    + In your `conf.json` file, you can now enable the option `templates.cleverLinks` to display
    code links in a monospace font and URL links in plain text. You can also enable the option
    `templates.monospaceLinks` to display all links in a monospace font. **Note**: JSDoc templates
    must be updated to respect these options.
    + You can now use the new inline tags `{@linkplain}`, which forces a plain-text link, and
    `{@linkcode}`, which forces a monospace link. These tags always override the settings in your
    `conf.json` file. (#250)
+ JSDoc now provides a `-l/--lenient` option that tells JSDoc to continue running if it encounters a
non-fatal error. (Multiple issues)
+ A template's `publish.js` file should now assign its `publish` function to `exports.publish`,
rather than defining a global `publish` function. The global `publish` function is deprecated and
may not be supported in future versions. JSDoc's built-in templates reflect this change. (#166)
+ The template helper (`templateHelper.js`) exports a variety of new functions for finding
information within a parse tree. These functions were previously contained within the default
template. (#186)
+ Updated the `fs` and `path` modules to make their behavior more consistent with Node.js. In
addition, created extended versions of these modules with additional functionality. (Multiple
commits)
+ Updated or replaced numerous third-party modules. (Multiple commits)
+ Reorganized the JSDoc codebase in preparation for future enhancements. (Multiple commits)
+ JSDoc now embeds a version of Mozilla Rhino that recognizes Node.js packages, including
`package.json` files. (Multiple commits)
+ Node.js' `npm` utility can now install JSDoc from its GitHub repository. **Note**: JSDoc is not
currently compatible with Node.js. However, this change allows JSDoc to be installed as a dependency
of a Node.js project. In this version, global installation with `npm` is not supported. (Multiple
commits)

### Enhancements

+ If a `README.md` file is passed to JSDoc, its contents will be included on the `index.html` page
of the generated documentation. (#128)
+ The `@augments` tag can now refer to an undocumented member, such as `window.XMLHTTPRequest`.
(#160)
+ The `@extends` tag can now refer to an undocumented member, such as `window.XMLHttpRequest`. In
addition, you can now use `@host` as a synonym for `@extends`. (#145)
+ The `@lends` tag is now supported in multiline JSDoc comments. (#163)
+ On Windows, `jsdoc.cmd` now provides the same options as the `jsdoc` shell script. (#127)
+ JSDoc now provides `setTimeout()`, `clearTimeout()`, `setInterval()`, and `clearInterval()`
functions. (Multiple commits)
+ JSDoc no longer provides a global `exit()` function. Use `process.exit()` instead. (1228a8f7)
+ JSDoc now includes additional shims for Node.js' built-in modules. **Note**: Many of these shims
implement only the functions that JSDoc uses, and they may not be consistent with Node.js' behavior
in edge cases. (Multiple commits)
+ JSDoc now provides a `-v/--version` option to display information about the current version.
(#303)
+ When running tests, you can now use the `--nocolor` option to disable colored output. On Windows,
colored output is always disabled. (e17601fe, 8bc33541)

### Bug fixes

+ When using the `@event` tag to define an event within a class or namespace, the event's longname
is now set correctly regardless of tag order. (#280)
+ The `@property` tag no longer results in malformed parse trees. (20f87094)
+ The `jsdoc` and `jsdoc.cmd` scripts now work correctly with paths that include spaces. (#127,
#130)
+ The `jsdoc` script now works correctly on Cygwin and MinGW, and with the `dash` shell. (#182,
#184, #187)
+ The `-d/--destination` option is no longer treated as a path relative to the JSDoc directory.
Instead, it can contain an absolute path, or a path relative to the current working directory.
(f5e3f0f3)
+ JSDoc now provides default options for the values in `conf.json`. (#129)
+ If the `conf.json` file does not exist, JSDoc no longer tries to create it, which prevents errors
if the current user does not have write access to the JSDoc directory. (d2d05fcb)
+ Doclets for getters and setters are now parsed appropriately. (#150)
+ Only the first asterisk is removed from each line of a JSDoc comment. (#172)
+ If a child member overrides an ancestor member, the ancestor member is no longer documented.
(#158)
+ If a member of a namespace has the same name as a namespace, the member is now documented
correctly. (#214)
+ The parse tree now uses a single set of properties to track both JSDoc-style type information and
Closure Compiler-style type information. (#118)
+ If a type has a leading `!`, indicating that it is non-nullable, the leading `!` is now removed
from the type name. (#226)
+ When Markdown formatting is enabled, underscores in inline `{@link}` tags are no longer treated as
Markdown formatting characters. (#259)
+ Markdown links now work correctly when a JavaScript reserved word, such as `constructor`, is used
as the link text. (#249)
+ Markdown files for tutorials are now parsed based on the settings in `conf.json`, rather than
using the "evilstreak" Markdown parser in all cases. (#220)
+ If a folder contains both tutorial source files and `.js` files, JSDoc no longer attempts to parse
the `.js` files as JSON files. (#222)
+ The "evilstreak" Markdown parser now works correctly with files that use Windows-style line
endings. (#223)
+ JSDoc no longer fails unit tests when the `conf.json` file is not present. (#206)
+ On Windows, JSDoc now passes all unit tests. (Multiple commits)

### Plugins

+ The new `partial` plugin adds support for a `@partial` tag, which links to an external file that
contains JSDoc comments. (#156)
+ The new `commentsOnly` plugin removes everything in a file except JSDoc-style comments. You can
use this plugin to document source files that are not valid JavaScript, including source files for
other languages. (#304)
+ The new `eventDumper` plugin logs information about parser events to the console. (#242)
+ The new `verbose` plugin logs the name of each input file to the console. (#157)

### Template enhancements

#### Default template

+ The template output now includes pretty-printed versions of source files. This feature is enabled
by default. To disable this feature, add the property `templates.default.outputSourceFiles: false`
to your `conf.json` file. (#208)
+ You can now use the template if it is placed outside of the JSDoc directory. (#198)
+ The template no longer throws an error when a parameter does not have a name. (#175)
+ The navigation bar now includes an "Events" section if any events are documented. (#280)
+ Pages no longer include a "Classes" header when no classes are documented. (eb0186b9)
+ Member details now include "Inherited From" section when a member is inherited from another
member. (#154)
+ If an `@author` tag contains text in the format "Jane Doe <jdoe@example.com>", the value is now
converted to an HTML `mailto:` link. (#326)
+ Headings for functions now include the function's signature. (#253)
+ Type information is now displayed for events. (#192)
+ Functions now link to their return type when appropriate. (#192)
+ Type definitions that contain functions are now displayed correctly. (#292)
+ Tutorial output is now generated correctly. (#188)
+ Output files now use Google Code Prettify with the Tomorrow theme as a syntax highlighter. (#193)
+ The `index.html` output file is no longer overwritten if a namespace called `index` has been
documented. (#244)
+ The current JSDoc version number is now displayed in the footer. (#321)

#### Haruki template

+ Members are now contained in arrays rather than objects, allowing overloaded members to be
documented. (#153)
+ A clearer error message is now provided when the output destination is not specified correctly.
(#174)


## 3.0.1 (June 2012)

### Enhancements

+ The `conf.json` file may now contain `source.include` and `source.exclude` properties. (#56)
    + `source.include` specifies files or directories that JSDoc should _always_ check for
    documentation.
    + `source.exclude` specifies files or directories that JSDoc should _never_ check for
    documentation.
    These settings take precedence over the `source.includePattern` and `source.excludePattern`
    properties, which contain regular expressions that JSDoc uses to search for source files.
+ The `-t/--template` option may now specify the absolute path to a template. (#122)

### Bug fixes

+ JSDoc no longer throws exceptions when a symbol has a special name, such as `hasOwnProperty`.
(1ef37251)
+ The `@alias` tag now works correctly when documenting inner classes as globals. (810dd7f7)

### Template improvements

+ The default template now sorts classes by name correctly when the classes come from several
modules. (4ce17195)
+ The Haruki template now correctly supports `@example`, `@members`, and `@returns` tags. (6580e176,
59655252, 31c8554d)


## 3.0.0 (May 2012)

Initial release.

[605]: https://github.com/jsdoc/jsdoc/issues/605
[738]: https://github.com/jsdoc/jsdoc/issues/738
[970]: https://github.com/jsdoc/jsdoc/issues/970
[1129]: https://github.com/jsdoc/jsdoc/issues/1129
[1361]: https://github.com/jsdoc/jsdoc/issues/1361
[1410]: https://github.com/jsdoc/jsdoc/issues/1410
[1412]: https://github.com/jsdoc/jsdoc/issues/1412
[1643]: https://github.com/jsdoc/jsdoc/issues/1643
[1644]: https://github.com/jsdoc/jsdoc/issues/1644
