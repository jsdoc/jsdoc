exports.publish = function(docDb) {
    var ejs = require('ejs');
    
    function find(spec) {
        return docDb.get( docDb.find(spec) );
    }
    
    var functions = find({'kind': 'function'});
    //console.log(functions);
    
    var data = {title: 'All Functions', functions: functions};
    
    var template = '<h1><%= title %></h1>\n<ul>\n<%for (var f in functions){%><li><%=functions[f].longname%></li>\n<%}%></ul>';
    
    var output = ejs.render(template, {locals: data});
    
    return 'Hello: '+output;
}