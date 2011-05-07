
module.exports = {
    'basename' : function(path) {
        var parts = path.split('/');
        parts.pop();
        path = parts.join('/');
        return path;
    }
};