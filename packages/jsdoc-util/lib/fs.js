/**
 * @module @jsdoc/util/lib/fs
 */

const _ = require('lodash');
const klaw = require('klaw-sync');
const path = require('path');

exports.ls = ((dir, opts = {}) => {
    const depth = _.has(opts, 'depth') ? opts.depth : -1;

    const files = klaw(dir, {
        depthLimit: depth,
        filter: (f => !path.basename(f.path).startsWith('.')),
        nodir: true
    });

    return files.map(f => f.path);
});
