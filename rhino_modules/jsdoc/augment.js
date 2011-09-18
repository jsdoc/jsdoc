
(function() {
    
    exports.addInherited = function(docs) {
        var dependencies = mapDependencies(docs.index);
        var sorted = sort(dependencies);
        var additions = [];
        sorted.forEach(function(name) {
            var doc = docs.index[name][0];
            Array.prototype.push.apply(additions, getAdditions(doc, docs));
        });
        additions.forEach(function(doc) {
            var name = doc.longname;
            if (!(docs.index.hasOwnProperty(name))) {
                docs.index[name] = [doc];
            } else {
                docs.index[name].push(doc);
            }
            docs.push(doc);
        });
    }

    function mapDependencies(index) {
        var doc, len, dependencies = {};
        for (var name in index) {
            doc = index[name][0];
            if (doc.kind === "class") {
                dependencies[name] = {};
                len = doc.augments && doc.augments.length || 0;
                for (var i=0; i<len; ++i) {
                    dependencies[name][doc.augments[i]] = true;
                }
            }
        }
        return dependencies;
    }

    function getAdditions(doc, docs) {
        var additions = [];
        var parents = doc.augments;
        if (doc.kind === "class" && parents) {
            var members, member;
            for (var i=0, ii=parents.length; i<ii; ++i) {
                members = getMembers(parents[i], docs);
                for (var j=0, jj=members.length; j<jj; ++j) {
                    member = doop(members[j]);
                    member.memberof = doc.longname;
                    parts = member.longname.split("#");
                    parts[0] = doc.longname;
                    member.longname = parts.join("#");
                    additions.push(member);
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

    function doop(o) {
        if (o instanceof Object && o.constructor != Function) {
            var clone = o instanceof Array ? [] : {}, prop;
            
            for (prop in o){
                if ( o.hasOwnProperty(prop) ) { 
                    clone[prop] = (o[prop] instanceof Object)? doop(o[prop]) : o[prop]; 
                }
            }
            return clone;
        }
        return o;
    };

    var Sorter = function(dependencies) {
        this.dependencies = dependencies;
        this.visited = {};
        this.sorted = [];
    };
    Sorter.prototype = {
        sort: function() {
            for (var key in this.dependencies) {
                this.visit(key);
            }
            return this.sorted;
        },
        visit: function(key) {
            if (!(key in this.visited)) {
                this.visited[key] = true;
                if (!(key in this.dependencies)) {
                    throw new Error("Missing dependency: " + key);
                }
                for (var path in this.dependencies[key]) {
                    this.visit(path);
                }
                this.sorted.push(key);
            }
        }
    };

    function sort(dependencies) {
        var sorter = new Sorter(dependencies);
        return sorter.sort();
    };

    
})();
