(function() {
	var fs = require('common/fs');

	var dumper = require('flesler/jsdump');

	publish = function(docs, opts) { // global

        function addNamespaces (to, from, parentPath, parentName) {
            from.filter(function (element) {            
                return (element.memberof === parentPath);
            }).forEach(function (element) {
                if (element.kind === 'namespace') {
                    if (! to.namespaces) {
                        to.namespaces = {};
                    }
                    var nestedNamespace = to.namespaces[element.name] = {
                        "name" : element.name,
                        "description" : element.desc
                    };
                    addNamespaces(nestedNamespace, from, element.path, element.name);
                }
                else if (element.kind === 'method') {
                    if (! to.functions) {
                        to.functions = {};
                    }
                    to.functions[element.name] = {
                        "name" : element.name,
                        "description" : element.desc
                    };
                }
                else if (element.kind === 'property') {
                    if (! to.properties) {
                        to.properties = {};
                    }
                    to.properties[element.name] = {
                        "name" : element.name,
                        "description" : element.desc
                    };
                }
            });
        }

        var rootNamespace = {};
        addNamespaces(rootNamespace, docs.doc, undefined);

        print(dumper.jsDump.parse(rootNamespace));
	}

})();

