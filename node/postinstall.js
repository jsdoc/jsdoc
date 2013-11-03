#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var jsdocPath = path.resolve( path.join(__dirname, '..') );
var symlinkSrc = path.join( jsdocPath, 'lib', 'jsdoc' );
var symlinkDest = path.join( jsdocPath, 'node_modules', 'jsdoc' );

fs.lstat(symlinkDest, function(err, stats) {
    // if the path exists, make sure it looks okay
    if (!err) {
        if ( stats.isSymbolicLink() ) {
            // this is what we want
        }
        else if ( stats.isDirectory() ) {
            console.warn('The path %s should be a symbolic link to %s rather than a standalone ' +
                'directory. You may need to resolve this issue so that JSDoc can work correctly.',
                symlinkDest, symlinkSrc);
        }

        process.exit(0);
    }
    else {
        fs.symlink(symlinkSrc, symlinkDest, function(err) {
            if (err) {
                console.error('Unable to create a symbolic link from %s to %s: %s', symlinkSrc,
                    symlinkDest, err);
                process.exit(1);
            }

            process.exit(0);
        });
    }
});
