(function() {
    var doop = require("jsdoc/util/doop").doop,
        hasOwnProp = Object.prototype.hasOwnProperty;
    
    exports.addInherited = function(docs) {
        var dependencies = mapDependencies(docs.index);
        var sorted = sort(dependencies);
        var longnames = [];

        // only build the list of longnames if we'll actually need it
        if (sorted.length) {
            longnames = docs.map(function(doc) {
                if (doc.longname) {
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

    function mapDependencies(index) {
        var doclets, doc, len, dependencies = {};
        for (var name in index) {
            if ( hasOwnProp.call(index, name) ) {
                doclets = index[name];
                for (var i=0, ii=doclets.length; i<ii; ++i) {
                    doc = doclets[i];
                    if (doc.kind === "class" || doc.kind === "external") {
                        dependencies[name] = {};
                        len = doc.augments && doc.augments.length || 0;
                        for (var j=0; j<len; ++j) {
                            dependencies[name][doc.augments[j]] = true;
                        }
                    }
                }
            }
        }
        return dependencies;
    }

    function getAdditions(doclets, docs, longnames) {
        var additions = [],
            doc,
            parents,
            members,
            member,
            parts;

        // doclets will be undefined if the inherited symbol isn't documented
        doclets = doclets || [];

        for (var i=0, ii=doclets.length; i<ii; ++i) {
            doc = doclets[i];
            parents = doc.augments;
            if (parents && doc.kind === "class") {
                for (var j=0, jj=parents.length; j<jj; ++j) {
                    members = getMembers(parents[j], docs);
                    for (var k=0, kk=members.length; k<kk; ++k) {
                        member = doop(members[k]);

                        member.inherits = member.longname;
                        member.inherited = true;

                        member.memberof = doc.longname;
                        parts = member.longname.split("#");
                        parts[0] = doc.longname;
                        member.longname = parts.join("#");

                        // if the child doesn't override the parent member, add the parent member
                        if ( longnames.indexOf(member.longname) === -1 ) {
                            additions.push(member);
                        }

                    }

                }
            }
        }
        return additions;
    }
    
    function getMembers(longname, docs) {
        var candidate, members = [];
        for (var i=0, ii=docs.length; i<ii; ++i) {
            candidate = docs[i];
            if (candidate.memberof === longname && candidate.scope === "instance") {
                members.push(candidate);
            }
        }
        return members;
    }

    var Sorter = function(dependencies) {
        this.dependencies = dependencies;
        this.visited = {};
        this.sorted = [];
    };
    Sorter.prototype = {
        sort: function() {
            for (var key in this.dependencies) {
                if ( hasOwnProp.call(this.dependencies, key) ) {
                    this.visit(key);
                }
            }
            return this.sorted;
        },
        visit: function(key) {
            if (!(key in this.visited)) {
                this.visited[key] = true;
                
                for (var path in this.dependencies[key]) {
                    if ( hasOwnProp.call(this.dependencies[key], path) ) {
                        this.visit(path);
                    }
                }
                this.sorted.push(key);
            }
        }
    };

    function sort(dependencies) {
        var sorter = new Sorter(dependencies);
        return sorter.sort();
    }

    
}());
