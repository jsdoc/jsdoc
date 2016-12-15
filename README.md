JSDoc 3
=======
[![Build Status](https://travis-ci.org/jsdoc3/jsdoc.svg?branch=master)](http://travis-ci.org/jsdoc3/jsdoc)

An API documentation generator for JavaScript.

Want to contribute to JSDoc? Please read `CONTRIBUTING.md`.

Installation and Usage
----------------------

JSDoc supports Node.js 0.10 and later. You can install JSDoc in your project's
`node_modules` folder, or you can install it globally.

To install the latest version available on NPM:

    npm install jsdoc

To install the latest development version:

    npm install git+https://github.com/jsdoc3/jsdoc.git

If you installed JSDoc locally, the JSDoc command-line tool is available in
`./node_modules/.bin`. To generate documentation for the file
`yourJavaScriptFile.js`:

    ./node_modules/.bin/jsdoc yourJavaScriptFile.js

Or if you installed JSDoc globally, simply run the `jsdoc` command:

    jsdoc yourJavaScriptFile.js

By default, the generated documentation is saved in a directory named `out`. You
can use the `--destination` (`-d`) option to specify another directory.

Run `jsdoc --help` for a complete list of command-line options.

Templates and Build Tools
-------------------------

The JSDoc community has created numerous templates and other tools to help you
generate and customize your documentation. Here are just a few:

### Templates

+ [jaguarjs-jsdoc](https://github.com/davidshimjs/jaguarjs-jsdoc)
  ([example](http://davidshimjs.github.io/jaguarjs/doc))
+ [DocStrap](https://github.com/docstrap/docstrap) ([example](https://docstrap.github.io/docstrap))
+ [jsdoc3Template](https://github.com/DBCDK/jsdoc3Template)
  ([example](https://github.com/danyg/jsdoc3Template/wiki#wiki-screenshots))
+ [minami](https://github.com/Nijikokun/minami)
+ [docdash](https://github.com/clenemt/docdash) ([example](http://clenemt.github.io/docdash/))
+ [tui-jsdoc-temlpate](https://github.com/nhnent/tui.jsdoc-template) ([example](https://nhnent.github.io/tui.jsdoc-template/latest/))

### Build Tools

+ [JSDoc Ant task](https://github.com/jannon/jsdoc3-ant-task)
+ [JSDoc Grunt plugin](https://github.com/krampstudio/grunt-jsdoc)
+ [JSDoc Gulp plugin](https://github.com/mlucool/gulp-jsdoc3)

For More Information
--------------------

+ Documentation is available at [Use JSDoc](http://usejsdoc.org).
+ Contribute to the docs at [jsdoc3/jsdoc3.github.com](https://github.com/jsdoc3/jsdoc3.github.com).
+ Ask for help on the [JSDoc Users mailing list](http://groups.google.com/group/jsdoc-users).
+ Post questions tagged `jsdoc` to [Stack
Overflow](http://stackoverflow.com/questions/tagged/jsdoc).

License
-------

JSDoc 3 is copyright (c) 2011-present Michael Mathews <micmath@gmail.com> and the
[contributors to JSDoc](https://github.com/jsdoc3/jsdoc/graphs/contributors).

JSDoc 3 is free software, licensed under the Apache License, Version 2.0. See
the file `LICENSE.md` in this distribution for more details.
