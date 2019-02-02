/**
 * @module @jsdoc/util/lib/fs
 */

const _ = require('lodash');
const fs = require('fs');
const klaw = require('klaw-sync');
const path = require('path');

const walkSync = exports.walkSync = (filepaths, opts = {}) => {
    const depth = _.has(opts, 'depth') ? opts.depth : -1;
    let filter;
    let found = [];

    if (typeof filepaths === 'string') {
        filepaths = [filepaths];
    }

    if (typeof opts.filter === 'function') {
        filter = f => opts.filter.call(null, f.path);
    }

    filepaths.forEach(f => {
        f = path.resolve(f);

        if (fs.statSync(f).isFile()) {
            found.push({ path: f });
        } else {
            found = found.concat(
                klaw(f, {
                    depthLimit: depth,
                    filter: filter,
                    nodir: true
                })
            );
        }
    });

    return found.map(f => f.path);
};

exports.lsSync = (dir, opts = {}) => walkSync(dir, {
    depth: opts.depth,
    filter: (f => !path.basename(f).startsWith('.')),
    nodir: true
});
