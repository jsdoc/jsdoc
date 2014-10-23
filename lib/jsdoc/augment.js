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

function getAdditions(doclets, docs, documented) {
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

                    if (!member.inherited) {
                        member.inherits = member.longname;
                    }
                    member.inherited = true;

                    member.memberof = doc.longname;
                    parts = member.longname.split('#');
                    parts[0] = doc.longname;
                    member.longname = parts.join('#');

                    // add the ancestor's docs, unless the descendant both a) overrides the
                    // ancestor and b) documents the override
                    if ( !hasOwnProp.call(documented, member.longname) ) {
                        additions.push(member);
                    }
                }
            }
        }
    }

    return additions;
}

exports.addInherited = function(docs) {
    var index = docs.index.longname;
    var dependencies = mapDependencies(index);
    var sorted = sort(dependencies);

    sorted.forEach(function(name) {
        var doclets = index[name];
        var additions = getAdditions(doclets, docs, docs.index.documented);

        additions.forEach(function(doc) {
            var name = doc.longname;

            if ( !hasOwnProp.call(index, name) ) {
                index[name] = [];
            }
            index[name].push(doc);
            docs.push(doc);
        });
    });
};

// TODO: move as much of this as possible to jsdoc/borrow.indexAll
exports.addImplemented = function(docs) {
    var docMap = {};
    var interfaces = {};
    var implemented = {};
    var memberInfo = {};

    docs.forEach(function(doc) {
        var memberof = doc.memberof || doc.name;

        if (!hasOwnProp.call(docMap, memberof)) {
            docMap[memberof] = [];
        }
        docMap[memberof].push(doc);

        if (doc.kind === 'interface') {
            interfaces[doc.longname] = doc;
        }
        else if (doc.implements && doc.implements.length) {
            if (!hasOwnProp.call(implemented, doc.memberof)) {
                implemented[memberof] = [];
            }
            implemented[memberof].push(doc);
        }
    });

    // create an dictionary of interface doclets
    Object.keys(interfaces).forEach(function(ifaceName) {
        var iface = interfaces[ifaceName];
        if (hasOwnProp.call(docMap, iface.name)) {
            docMap[iface.name].forEach(function(doc) {
                var members = memberInfo[doc.memberof];

                if (!members) {
                    members = memberInfo[doc.memberof] = {};
                }
                members[doc.name] = doc;
            });
        }
    });

    Object.keys(implemented).forEach(function(key) {
        // implemented classes namespace.
        var owner = implemented[key];

        owner.forEach(function(klass) {
            // class's interfaces
            klass.implements.forEach(function(impl) {
                var interfaceMember;
                var interfaceMembers = memberInfo[impl];
                var member;
                var members;

                // mark the interface as being implemented by the class
                if (hasOwnProp.call(interfaces, impl)) {
                    interfaces[impl].implementations = interfaces[impl].implementations || [];
                    interfaces[impl].implementations.push(klass.longname);
                }

                // if the interface has no members, skip to the next owner
                if (!interfaceMembers) {
                    return;
                }

                if (!hasOwnProp.call(docMap, klass.longname)) {
                    docMap[klass.longname] = [];
                }
                members = docMap[klass.longname];

                for (var i = 0, len = members.length; i < len; i++) {
                    member = members[i];
                    interfaceMember = interfaceMembers && interfaceMembers[member.name];

                    // if we didn't find the member name in the interface, skip to the next member
                    if (!interfaceMember) {
                        continue;
                    }

                    // mark members that implement an interface
                    member.implements = member.implements || [];
                    member.implements.push(interfaceMember.longname);

                    // mark interface members that the symbol implements
                    interfaceMember.implementations = interfaceMember.implementations || [];
                    interfaceMember.implementations.push(member.longname);
                }
            });
        });
    });
};
