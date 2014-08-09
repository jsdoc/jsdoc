'use strict';

var hasOwnProp = Object.prototype.hasOwnProperty;

function mapDependencies(index) {
    var doclets, doc, len, dependencies = {};

    Object.keys(index).forEach(function(name) {
        doclets = index[name];
        for (var i = 0, ii = doclets.length; i < ii; ++i) {
            doc = doclets[i];
            if (doc.kind === 'class' || doc.kind === 'external') {
                dependencies[name] = {};
                len = doc.augments && doc.augments.length || 0;
                for (var j = 0; j < len; ++j) {
                    dependencies[name][doc.augments[j]] = true;
                }
            }
        }
    });

    return dependencies;
}

function Sorter(dependencies) {
    this.dependencies = dependencies;
    this.visited = {};
    this.sorted = [];
}

Sorter.prototype.visit = function(key) {
    var self = this;

    if (!(key in this.visited)) {
        this.visited[key] = true;

        if (this.dependencies[key]) {
            Object.keys(this.dependencies[key]).forEach(function(path) {
                self.visit(path);
            });
        }

        this.sorted.push(key);
    }
};

Sorter.prototype.sort = function() {
    var self = this;

    Object.keys(this.dependencies).forEach(function(key) {
        self.visit(key);
    });

    return this.sorted;
};

function sort(dependencies) {
    var sorter = new Sorter(dependencies);
    return sorter.sort();
}

function getMembers(longname, docs) {
    var candidate, members = [];
    for (var i = 0, ii = docs.length; i < ii; ++i) {
        candidate = docs[i];
        if (candidate.memberof === longname && candidate.scope === 'instance') {
            members.push(candidate);
        }
    }
    return members;
}

function getAdditions(doclets, docs, longnames) {
    var doop = require('jsdoc/util/doop');

    var additions = [];
    var doc;
    var parents;
    var members;
    var member;
    var parts;

    // doclets will be undefined if the inherited symbol isn't documented
    doclets = doclets || [];

    for (var i = 0, ii = doclets.length; i < ii; i++) {
        doc = doclets[i];
        parents = doc.augments;
        if (parents && doc.kind === 'class') {
            for (var j = 0, jj = parents.length; j < jj; j++) {
                members = getMembers(parents[j], docs);
                for (var k = 0, kk = members.length; k < kk; k++) {
                    member = doop(members[k]);

                    if(!member.inherited)
                    {
                        member.inherits = member.longname;
                    }
                    member.inherited = true;

                    member.memberof = doc.longname;
                    parts = member.longname.split('#');
                    parts[0] = doc.longname;
                    member.longname = parts.join('#');

                    // if the child doesn't override the parent member, add the parent member
                    if (longnames.indexOf(member.longname) === -1) {
                        additions.push(member);
                    }
                }
            }
        }
    }
    return additions;
}

exports.addInherited = function(docs) {
    var dependencies = mapDependencies(docs.index);
    var sorted = sort(dependencies);
    var longnames = [];

    // only build the list of longnames if we'll actually need it
    if (sorted.length) {
        longnames = docs.map(function(doc) {
            // keep the ancestor's docs for a symbol if a local override is not documented
            if (doc.longname && !doc.undocumented) {
                return doc.longname;
            }
        });
    }

    sorted.forEach(function(name) {
        var doclets = docs.index[name];
        var additions = getAdditions(doclets, docs, longnames);
        additions.forEach(function(doc) {
            var name = doc.longname;
            if ( !hasOwnProp.call(docs.index, name) ) {
                docs.index[name] = [];
            }
            docs.index[name].push(doc);
            docs.push(doc);
        });
    });
};

exports.addImplemented = function(docs) {
    var docMap = {},
        interfaces = [],
        implemented = {},
        propertyInfo = {};

    docs.forEach(function(doc) {
        if (!hasOwnProp.call(docMap, doc.memberof)) {
            docMap[doc.memberof] = [];
        }
        docMap[doc.memberof].push(doc);

        if (doc.kind === 'interface') {
            interfaces.push(doc);
        } else if (doc.implements && doc.implements.length) {
            if (!hasOwnProp.call(implemented, doc.memberof)) {
                implemented[doc.memberof] = [];
            }
            implemented[doc.memberof].push(doc);
        }
    });

    /*
    fill members variables like this
    this use for mark 'implemented', 'implementMethod' property to implements Class's method (see below blocks)
    ILayer: {
        methods: ['update', 'setZoom'],
        info: {interface doclet}
    }
     */
    interfaces.forEach(function(inf) {
        if (hasOwnProp.call(docMap, inf.name)) {
            docMap[inf.name].forEach(function(obj) {
                var members = propertyInfo[obj.memberof];
                if (!members) {
                    members = propertyInfo[obj.memberof] = {
                        methods: [],
                        info: {}
                    };
                }

                members.methods.push(obj.name);
                members.info[obj.name] = obj;
            });
        }
    });

    Object.keys(implemented).forEach(function(key) {
        // implemented classes namespace.
        var owner = implemented[key];

        owner.forEach(function(cls) {
            // class's interfaces
            cls.implements.forEach(function(impl) {
                var implMethods = propertyInfo[impl];
                var props = docMap[cls.longname];

                for (var i = 0, len = props.length; i < len; i++) {
                    var prop = props[i];

                    // mark implemented property by check methodInfo variable has same impl, method names.
                    if (prop.kind === 'function' && implMethods && implMethods.methods.indexOf(prop.name) > -1) {
                        prop.implemented = true;
                        prop.implementMethod = implMethods.info[prop.name].longname;
                    }
                }
            });
        });
    });
};
