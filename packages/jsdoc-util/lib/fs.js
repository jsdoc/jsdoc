/**
 * @alias @jsdoc/util.fs
 */

const _ = require('lodash');
const klawSync = require('klaw-sync');
const path = require('path');

exports.lsSync = ((dir, opts = {}) => {
    const depth = _.has(opts, 'depth') ? opts.depth : -1;

    const files = klawSync(dir, {
        depthLimit: depth,
        filter: (f => !path.basename(f.path).startsWith('.')),
        nodir: true
    });

    return files.map(f => f.path);
});
