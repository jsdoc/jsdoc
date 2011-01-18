/**
	Define tags that are known in JSDoc.
	@module jsdoc/tag/dictionary/definitions

	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
    exports.defineTags = function(dictionary) {
        
        dictionary.defineTag('access', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                // only valid values are private and protected, public is default
                if ( /^(private|protected)$/i.test(tag.value) ) {
                    doclet.access = tag.value.toLowerCase();
                }
                else {
                    delete doclet.access; 
                }
                
                return true;
            }
        });
        
        dictionary.defineTag('author', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.author = tag.value;
                
                return true;
            }
        });
        
        // I add on to that
        dictionary.defineTag('augments', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.augment( firstWordOf(tag.value) );
                
                return false;
            }
        })
        .synonym('extends')
        .synonym('inherits');
        
        // that adds on to me
        dictionary.defineTag('borrows', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                var [target, source] = parseBorrows(doclet, tag);
                doclet.borrow(target, source);
                
                return false;
            }
        })
        .synonym('mixes');
        
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
        
        dictionary.defineTag('copyright', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.copyright = tag.value;
                
                return true;
            }
        });
        
        dictionary.defineTag('constructor', {
            onTagged: function(doclet, tag) {
                setDocletKindToTitle(doclet, tag);
                setDocletNameToValue(doclet, tag);
                
                return false;
            }
        });
        
        dictionary.defineTag('exports', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                var modName = firstWordOf(tag.value);
                
                if ( modName.indexOf('module:') !== 0) {
                    modName = 'module:'+modName;
                }
                
                doclet.addTag('alias', modName);
                doclet.addTag('kind', 'module');
                
                return false;
            }
        });
        
        dictionary.defineTag('deprecated', {
            // value is optional
            onTagged: function(doclet, tag) {
                doclet.deprecated = tag.value || true;
                
                return true;
            }
        })
        .synonym('deprec');
        
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
        
        dictionary.defineTag('exception', {
            mustHaveValue: true,
            canHaveType: true,
            onTagged: function(doclet, tag) {
                if (!doclet.exceptions) { doclet.exceptions = []; }
                doclet.exceptions.push(tag.value);
                
                return false;
            }
        })
        .synonym('throws');
        
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
        
        dictionary.defineTag('global', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.scope = 'global';
                
                return true;
            }
        });
        
        dictionary.defineTag('ignore', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.ignore = true;
                
                return true;
            }
        });
        
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
        })
        .synonym('argument')
        .synonym('arg');
        
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
                delete doclet.access; // public is default
                
                return true;
            }
        });
        
        // use this instead of old deprecated @final tag
        dictionary.defineTag('readonly', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.readonly = true;
                
                return false;
            }
        });
        
        dictionary.defineTag('requires', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                var modName = firstWordOf(tag.value);
                if (modName.indexOf('module:') !== 0) {
                    modName = 'module:'+modName;
                }
                if (!doclet.requires) { doclet.requires = []; }
                doclet.requires.push(modName);
                
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
        
        dictionary.defineTag('see', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                if (!doclet.see) { doclet.see = []; }
                doclet.see.push(tag.value);
                
                return true;
            }
        });
        
        dictionary.defineTag('since', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.since = tag.value;
                
                return true;
            }
        });
        
        dictionary.defineTag('type', {
            mustHaveValue: true,
            canHaveType: true,
            onTagText: function(text) {
                // any text must be formatted as a type, but for back compat braces are optional
                if ( ! /^\{.+\}$/.test(text) ) {
                    text = '{ '+text+' }';
                }
                return text;
            },
            onTagged: function(doclet, tag) {
                if (tag.value.type) { doclet.type = tag.value.type; }
                
                return false;
            }
        })
        
        dictionary.defineTag('undocumented', {
            mustNotHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.undocumented = true;
                
                return false;
            }
        });
        
        dictionary.defineTag('version', {
            mustHaveValue: true,
            onTagged: function(doclet, tag) {
                doclet.version = tag.value;
                
                return true;
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
	            return [ m[1], m[2] ];
	        }
	        else if (m[1]) {
	            return [ m[1] ];
	        }
	    }
	}
	
	function firstWordOf(string) {
	    var m = /^(\S+)/.exec(string);
	    if (m) { return m[1]; }
	    else { return ''; }
	}
})();