// Based on Simple JavaScript Templating
// By John Resig - http://ejohn.org/ - MIT Licensed
// see: http://ejohn.org/blog/javascript-micro-templating/
// modified to run on Rhino
(function(){
  var cache = {};
  
  this.tmpl = function tmpl(/** templatefilename | templatesrc */str, data){ // templatefilename not contain `<`
    var fn = str.indexOf('<') === -1 ?
      cache[str] = cache[str] || tmpl(readFile(str)) :
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();