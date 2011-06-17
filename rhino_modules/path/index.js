
module.exports = {
    basename : function(path) {
        var parts = path.split('/');
        parts.pop();
        path = parts.join('/');
        return path;
    },
    existsSync: function(path) {
        var file = new java.io.File(path);
        
        if (file.isFile()) {
           return true;
        }
        
        return false;
    }
};