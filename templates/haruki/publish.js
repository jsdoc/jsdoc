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
                        'name': element.name,
                        'description': element.desc || '',
                        'access': element.access || ''
                    };
                    addDocNode(thisNamespace, from, element.path, element.name);
                }
                else if (element.kind === 'mixin') {
                    if (! to.mixins) {
                        to.mixins = {};
                    }
                    var thisMixin = to.mixins[element.name] = {
                        'name': element.name,
                        'description': element.desc || '',
                        'access': element.access || ''
                    };
                    addDocNode(thisMixin, from, element.path, element.name);
                }
                else if (element.kind === 'method') {
                	var _to = to;
//                 	if (element.scope === 'static') {
//                 		if (to.constructor) { // like a class
//                 			to = to.constructor;
//                 		}
//                 	}
                	
                    if (! to.functions) {
                        to.functions = {};
                    }
                    var thisFunction = to.functions[element.name] = {
                        'name': element.name,
                        'access': element.access || '',
                        'description': element.desc || '',
                        'parameters': [
                        ]
                    };
                    
                    if (element.returns !== undefined) {
                        to.functions[element.name].returns = element.returns;
                    }
                    
                    if (element.param) for (var i = 0, len = element.param.length; i < len; i++) {
                    	thisFunction.parameters.push({
                    		'name': element.param[i].name,
                    		'type': element.param[i].type? (element.param[i].type.length === 1? element.param[i].type[0] : element.param[i].type) : '',
                    		'description': element.param[i].desc || '',
                    		'default': element.param[i].defaultvalue || '',
                    		'optional': typeof element.param[i].optional === 'boolean'? element.param[i].optional : '',
                    		'nullable': typeof element.param[i].nullable === 'boolean'? element.param[i].nullable : ''
                    	});
                    }
                    to = _to;
                }
                else if (element.kind === 'property') {
                	var _to = to;
                    if (element.scope === 'static') {
                		if (to.constructor) { // like a class
                			to = to.constructor;
                		}
                	}
                    
                    if (! to.properties) {
                        to.properties = {};
                    }
                    to.properties[element.name] = {
                        'name': element.name,
                        'access': element.access || '',
                        'description': element.desc || '',
                        'type': element.type? (element.type.length === 1? element.type[0] : element.type) : ''
                    };
                    to = _to;
                }
                else if (element.kind === 'event') {
                	var _to = to;
                	
                    if (! to.events) {
                        to.events = {};
                    }
                    var thisEvent = to.events[element.name] = {
                        'name': element.name,
                        'access': element.access || '',
                        'description': element.desc || '',
                        'parameters': [
                        ],
                        'returns': element.returns
                    };
                    
                    if (element.param) for (var i = 0, len = element.param.length; i < len; i++) {
                    	thisEvent.parameters.push({
                    		'name': element.param[i].name,
                    		'type': element.param[i].type? (element.param[i].type.length === 1? element.param[i].type[0] : element.param[i].type) : '',
                    		'description': element.param[i].desc || '',
                    		'default': element.param[i].defaultvalue || '',
                    		'optional': typeof element.param[i].optional === 'boolean'? element.param[i].optional : '',
                    		'nullable': typeof element.param[i].nullable === 'boolean'? element.param[i].nullable : ''
                    	});
                    }
                    to = _to;
                }
                else if (element.kind === 'constructor') {
                    if (! to.classes) {
                        to.classes = {};
                    }
                    var thisClass = to.classes[element.name] = {
                        'name': element.name,
                        'description': element.classdesc || '',
                        'extends': element.augments || [],
                        'access': element.access || '',
                        'fires': element.fires || '',
                        'constructor': {
                        	'name': element.name,
                        	'description': element.desc || '',
                        	'parameters': [
                        	]
                        }
                    };
                    
                    if (element.param) for (var i = 0, len = element.param.length; i < len; i++) {
                    	thisClass.constructor.parameters.push({
                    		'name': element.param[i].name,
                    		'type': element.param[i].type? (element.param[i].type.length === 1? element.param[i].type[0] : element.param[i].type) : '',
                    		'description': element.param[i].desc || '',
                    		'default': element.param[i].defaultvalue || '',
                    		'optional': typeof element.param[i].optional === 'boolean'? element.param[i].optional : '',
                    		'nullable': typeof element.param[i].nullable === 'boolean'? element.param[i].nullable : ''
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

