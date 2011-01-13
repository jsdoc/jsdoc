/**
	Define tags that are known in JSDoc.
	@module jsdoc/tag/dictionary/definitions

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
    exports.defineTags = function(dictionary) {
    
        dictionary.defineTag('borrows', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                parseBorrows(doclet, tag);
                
                return false;
            }
        })
        .synonym('extends')
        .synonym('mixes');
        
        dictionary.defineTag('augments', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.augment(tag.value);
                
                return false;
            }
        })
        .synonym('extends');
        
        dictionary.defineTag('class', {
            onTagged: function(doclet, tag) { // @class implies @constructor
                doclet.addTag('kind', 'constructor');
                doclet.classdesc = tag.value;
                
                return false;
            }
        });
        
        dictionary.defineTag('constant', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('const');
        
        dictionary.defineTag('constructor', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('description', {
            mustHaveValue: true
        })
        .synonym('desc');
        
        
        dictionary.defineTag('event', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                applyNamespace(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('example', {
            keepsWhitespace: true,
            mustHaveValue: true
        });
        
        dictionary.defineTag('file', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                setNameToFile(doclet, tag);
                setDocletKindToTitle(doclet, tag);
                //applyNamespace(doclet, tag); // you must add the "file:" namespace yourself, kids
                setDocletDescriptionToValue(doclet, tag);
                
                doclet.preserveName = true;
                
                return false;
            }
        })
        .synonym('fileoverview')
        .synonym('overview');
        
        dictionary.defineTag('fires', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('function', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('method');
        
        dictionary.defineTag('inner', {
            onTagged: function(doclet, tag) {
                setDocletScopeToTitle(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('instance', {
            onTagged: function(doclet, tag) {
                setDocletScopeToTitle(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('kind', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('alias', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.alias = tag.value;

                return true;
            }
        });
        
        dictionary.defineTag('memberof', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                setDocletMemberof(doclet, tag);
                
                return true;
            }
        })
        .synonym('member');
        
        dictionary.defineTag('mixin', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('module', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                doclet.name || setDocletNameToFilename(doclet, tag);
                
                applyNamespace(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('name', {
            mustHaveValue: true
        });
        
        dictionary.defineTag('namespace', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('overload', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('overloads');
        
        dictionary.defineTag('param', {
            mustHaveValue: true,
            canHaveType: true,
            canHaveName: true,
            onTagged: function(doclet, tag) {
                if (!doclet.params) { doclet.params = []; }
                doclet.params.push(tag.value);
                
                return false;
            }
        });
        
        dictionary.defineTag('private', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.access = 'private';
                
                return true;
            }
        });
        
        dictionary.defineTag('property', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        })
        .synonym('field')
        .synonym('var');
        
        dictionary.defineTag('protected', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.access = 'protected';
                
                return true;
            }
        });
        
        dictionary.defineTag('public', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.access = 'public';
                
                return true;
            }
        });
        
        dictionary.defineTag('returns', {
            mustHaveValue: true,
            canHaveType: true,
            onTagged: function(doclet, tag) {
                doclet.returns = tag.value;
                
                return false;
            }
        })
        .synonym('return');
        
//         dictionary.defineTag('static', {
//             
//         });
        
        dictionary.defineTag('undocumented', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.undocumented = true;
                
                return false;
            }
        });
    }
    
    /** @private */
	function setDocletKindToTitle(doclet, tag) {
	    doclet.addTag( 'kind', tag.title );
	}
	
	function setDocletScopeToTitle(doclet, tag) {
	    doclet.addTag( 'scope', tag.title );
	}
	
	function setDocletNameToValue(doclet, tag) {
	    if (tag.text) {
	        doclet.addTag( 'name', tag.text );
	    }
	}
	
	function setDocletDescriptionToValue(doclet, tag) {
	    if (tag.value) {
	        doclet.addTag( 'description', tag.value );
	    }
	}
	
	function setNameToFile(doclet, tag) {
	    if (doclet.meta.filename) { doclet.addTag( 'name', 'file:'+doclet.meta.filename ); }
	}
	
	function setDocletMemberof(doclet, tag) {
	    doclet.setMemberof(tag.value);
	}

	function applyNamespace(doclet, tag) {
	    if (!doclet.name) return; // error?
	    
	    doclet.name = app.jsdoc.name.applyNamespace(doclet.name, tag.title)
	}
	
	function setDocletNameToFilename(doclet, tag) {
	    var name = doclet.meta.filename;
	    name = name.replace(/\.js$/i, '');
	    
	    for (var i = 0, len = env.opts._.length; i < len; i++) {
	        if (name.indexOf(env.opts._[i]) === 0) {
	            name = name.replace(env.opts._[0], '');
	            break
	        }
	    }
	    doclet.name = name;
	}
	
	function parseBorrows(doclet, tag) {
	    var m = /^(\S+)(?:\s+as\s+(\S+))?$/.exec(tag.text);
	    if (m) {
	        if (m[1] && m[2]) {
	            doclet.borrow(m[1], m[2]);
	        }
	        else if (m[1]) {
	            doclet.borrow(m[1]);
	        }
	    }
	}
	
})();