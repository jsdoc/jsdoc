var e = ' is not implemented for Node.js!';

exports.ls = function() {
    throw new Error('fs.ls' + e);
};

exports.toDir = function() {
    throw new Error('fs.toDir' + e);
};

exports.mkPath = function() {
    throw new Error('fs.mkpath' + e);
};

exports.copyFileSync = function() {
    throw new Error('fs.copyFileSync' + e);
};
