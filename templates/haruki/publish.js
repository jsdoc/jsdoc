(function() {
	var dumper = require('flesler/jsdump');

	publish = function(docs, opts) { // global

        function addDocNode(to, from, parentPath, parentName) {
            from.filter(function (element) {            
                return (element.memberof === parentPath);
            }).forEach(function (element) {
                if (element.kind === 'namespace') {
                    if (! to.namespaces) {
                        to.namespaces = {};
                    }
                    var thisNamespace = to.namespaces[element.name] = {
                        "name" : element.name,
                        "description" : element.desc || ""
                    };
                    addDocNode(thisNamespace, from, element.path, element.name);
                }
                else if (element.kind === 'method') {
                	//var _to = to;
                	if (element.scope === 'static') {
                		to = to.constructor;
                	}
                	
                    if (! to.functions) {
                        to.functions = {};
                    }
                    var thisFunction = to.functions[element.name] = {
                        "name" : element.name,
                        "description" : element.desc || "",
                        "parameters": [
                        ]
                    };
                    
                    if (element.param) for (var i = 0, len = element.param.length; i < len; i++) {
                    	thisFunction.parameters.push({
                    		"name": element.param[i].name,
                    		"type": element.param[i].type? (element.param[i].type.length === 1? element.param[i].type[0] : element.param[i].type) : "",
                    		"description": element.param[i].description || "",
                    		"default": element.param[i].defaultvalue || "",
                    		"optional": typeof element.param[i].optional === 'boolean'? element.param[i].optional : "",
                    		"nullable": typeof element.param[i].nullable === 'boolean'? element.param[i].nullable : ""
                    	});
                    }
                    //to = _to;
                    
                }
                else if (element.kind === 'property') {
                    if (! to.properties) {
                        to.properties = {};
                    }
                    to.properties[element.name] = {
                        "name" : element.name,
                        "description" : element.desc || "",
                        "type": element.type? (element.type.length === 1? element.type[0] : element.type) : ""
                    };
                }
                else if (element.kind === 'constructor') {
                    if (! to.classes) {
                        to.classes = {};
                    }
                    var thisClass = to.classes[element.name] = {
                        "name" : element.name,
                        "description" : element.classdesc || "",
                        "access": element.access || "",
                        "constructor": {
                        	"name" : element.name,
                        	"description" : element.desc || "",
                        	"parameters": [
                        	]
                        }
                    };
                    
                    if (element.param) for (var i = 0, len = element.param.length; i < len; i++) {
                    	thisClass.constructor.parameters.push({
                    		"name": element.param[i].name,
                    		"type": element.param[i].type? (element.param[i].type.length === 1? element.param[i].type[0] : element.param[i].type) : "",
                    		"description": element.param[i].description || "",
                    		"default": element.param[i].defaultvalue || "",
                    		"optional": typeof element.param[i].optional === 'boolean'? element.param[i].optional : "",
                    		"nullable": typeof element.param[i].nullable === 'boolean'? element.param[i].nullable : ""
                    	});
                    }
                    addDocNode(thisClass, from, element.path, element.name);
                }
            });
        }

        var rootNamespace = {};
        addDocNode(rootNamespace, docs.doc, undefined);

        print(dumper.jsDump.parse(rootNamespace));
	}

})();

