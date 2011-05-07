
# JS-Signals #

Custom event/messaging system for JavaScript inspired by [AS3-Signals](https://github.com/robertpenner/as3-signals).

For a more in-depth introduction read the [JS-Signals Project Page](http://millermedeiros.github.com/js-signals/) and visit the links below.


## Links ##

 * [Project Page](http://millermedeiros.github.com/js-signals/)
 * [Wiki](http://github.com/millermedeiros/js-signals/wiki/)
 * [Documentation](http://millermedeiros.github.com/js-signals/docs)
 * [Changelog](http://github.com/millermedeiros/js-signals/blob/master/CHANGELOG.markdown)


## License ##

 * [MIT License](http://www.opensource.org/licenses/mit-license.php)


## Distribution Files ##

Files inside `dist` folder.

 * docs/index.html : Documentation.
 * js-signals.js : Uncompressed source code with comments.
 * js-signals.amd.js : Uncompressed source code wrapped as an [asynchronous module](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) to be used together with [RequireJS](http://requirejs.org/).
 * js-signals.cjs.js : Uncompressed source code wrapped as an [CommonJS module](http://wiki.commonjs.org/wiki/Modules/1.1) to be used on [nodejs](http://nodejs.org/) or any other environment that supports CommonJS modules.
 * js-signals.min.js : Compressed code.

You can install JS-Signals on Node.js using [NPM](http://npmjs.org/)

    npm install signals


## Repository Structure ##

### Folder Structure ###

    dev       ->  development files
    |- build       ->  files used on the build process
    |- src         ->  source files
    |- tests       ->  unit tests
    dist      ->  distribution files
    |- docs        ->  documentation

### Branches ###

    master      ->  always contain code from the latest stable version
    release-**  ->  code canditate for the next stable version (alpha/beta)
    develop     ->  main development branch (nightly)
    **other**   ->  features/hotfixes/experimental, probably non-stable code


## Building your own ##

This project uses [Apache Ant](http://ant.apache.org/) for the build process. If for some reason you need to build a custom version of JS-Signals install Ant and run:

    ant build

This will delete all JS files inside the `dist` folder, merge/update/compress source files, validate generated code using [JSLint](http://www.jslint.com/) and copy the output to the `dist` folder.

**IMPORTANT:** `dist` folder always contain the latest version, regular users should **not** need to run build task.