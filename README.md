JSDoc 3
=======
[![Build Status](https://secure.travis-ci.org/jsdoc3/jsdoc.png?branch=master)](http://travis-ci.org/jsdoc3/jsdoc)

An API documentation generator for JavaScript.

Want to contribute to JSDoc? Please read `CONTRIBUTING.md`.


Installation and Usage
----------------------

You can run JSDoc on either Node.js or Mozilla Rhino.

### Node.js

Native support for Node.js is available in JSDoc 3.3.0 and later.

#### Installing JSDoc for Node.js

You can install JSDoc in your project's `node_modules` folder, or you can
install it globally.

To install the latest alpha version:

    npm install jsdoc@"<=3.3.0"

To install the latest development version:

    npm install git+https://github.com/jsdoc3/jsdoc.git

#### Running JSDoc with Node.js

If you installed JSDoc locally, the JSDoc command-line tool is available in
`./node_modules/.bin`. To generate documentation for the file
`yourJavaScriptFile.js`:

    ./node_modules/bin/jsdoc yourJavaScriptFile.js

Or if you installed JSDoc globally:

    jsdoc yourJavaScriptFile.js

By default, the generated documentation is saved in a directory named `out`. You
can use the `--destination` (`-d`) option to specify another directory.

Run `jsdoc --help` for a complete list of command-line options.

### Mozilla Rhino

All versions of JSDoc 3 run on a customized version of Mozilla Rhino, which
requires Java. You can run JSDoc 3 on Java 1.6 and later.

#### Installing JSDoc for Mozilla Rhino

To install JSDoc, download a .zip file for the
[latest development version](https://github.com/jsdoc3/jsdoc/archive/master.zip)
or a [previous release](https://github.com/jsdoc3/jsdoc/tags).

You can also use git to clone the
[JSDoc repository](https://github.com/jsdoc3/jsdoc):

    git clone git+https://github.com/jsdoc3/jsdoc.git

The JSDoc repository includes a
[customized version of Mozilla Rhino](https://github.com/jsdoc3/rhino). Make
sure your Java classpath does not include any other versions of Rhino. (On OS X,
you may need to remove the file `~/Library/Java/Extensions/js.jar`.)

#### Running JSDoc with Mozilla Rhino

On OS X, Linux, and other POSIX systems, to generate documentation for the file
`yourJavaScriptFile.js`:

    ./jsdoc yourJavaScriptFile.js

Or on Windows:

    jsdoc yourJavaScriptFile.js

By default, the generated documentation is saved in a directory named `out`. You
can use the `--destination` (`-d`) option to specify another directory.

Run `jsdoc --help` for a complete list of command-line options.


For More Information
--------------------

Project Documentation: <http://usejsdoc.org/>
Project Documentation Source: <https://github.com/jsdoc3/jsdoc3.github.com>  
JSDoc User's Group: <http://groups.google.com/group/jsdoc-users>  
JSDoc 3 Ant Task: <https://github.com/jannon/jsdoc3-ant-task>  
Project Announcements: <http://twitter.com/jsdoc3>


License
-------

JSDoc 3 is copyright (c) 2011-2013 Michael Mathews <micmath@gmail.com> and the
[contributors to JSDoc](https://github.com/jsdoc3/jsdoc/graphs/contributors).

JSDoc 3 is free software, licensed under the Apache License, Version 2.0. See
the file `LICENSE.md` in this distribution for more details.
