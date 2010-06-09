//<%
/**
 * jsUnity Universal JavaScript Testing Framework v0.6
 * http://jsunity.com/
 *
 * Copyright (c) 2009 Ates Goral
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

jsUnity = (function () {
    function fmt(str) {
        var a = Array.prototype.slice.call(arguments, 1);
        return str.replace(/\?/g, function () { return a.shift(); });
    }

    function hash(v) {
        if (v instanceof Object) {
            var arr = [];
            
            for (var p in v) {
                arr.push(p);
                arr.push(hash(v[p]));    
            }
            
            return arr.join("#");
        } else {
            return String(v);
        }
    }
    
    var defaultAssertions = {
        assertException: function (fn, message) {
            try {
                fn instanceof Function && fn();
            } catch (e) {
                return;
            }

            throw fmt("?: (?) does not raise an exception or not a function",
                message || "assertException", fn);
        },

        assertTrue: function (actual, message) {
            if (!actual) {
                throw fmt("?: (?) does not evaluate to true",
                    message || "assertTrue", actual);
            }
        },
        
        assertFalse: function (actual, message) {
            if (actual) {
                throw fmt("?: (?) does not evaluate to false",
                    message || "assertFalse", actual);
            }
        },
        
        assertIdentical: function (expected, actual, message) {
            if (expected !== actual) {
                throw fmt("?: (?) is not identical to (?)",
                    message || "assertIdentical", actual, expected);
            }
        },

        assertNotIdentical: function (expected, actual, message) {
            if (expected === actual) {
                throw fmt("?: (?) is identical to (?)",
                    message || "assertNotIdentical", actual, expected);
            }
        },

        assertEqual: function (expected, actual, message) {
            if (hash(expected) != hash(actual)) {
                throw fmt("?: (?) is not equal to (?)",
                    message || "assertEqual", actual, expected);
            }
        },
        
        assertNotEqual: function (expected, actual, message) {
            if (hash(expected) == hash(actual)) {
                throw fmt("?: (?) is equal to (?)",
                    message || "assertNotEqual", actual, expected);
            }
        },
        
        assertMatch: function (re, actual, message) {
            if (!re.test(actual)) {
                throw fmt("?: (?) does not match (?)",
                    message || "assertMatch", actual, re);
            }
        },
        
        assertNotMatch: function (re, actual, message) {
            if (re.test(actual)) {
                throw fmt("?: (?) matches (?)",
                    message || "assertNotMatch", actual, re);
            }
        },
        
        assertTypeOf: function (typ, actual, message) {
            if (typeof actual !== typ) {
                throw fmt("?: (?) is not of type (?)",
                    message || "assertTypeOf", actual, typ);
            }
        },

        assertNotTypeOf: function (typ, actual, message) {
            if (typeof actual === typ) {
                throw fmt("?: (?) is of type (?)",
                    message || "assertNotTypeOf", actual, typ);
            }
        },
        
        assertInstanceOf: function (cls, actual, message) {
            if (!(actual instanceof cls)) {
                throw fmt("?: (?) is not an instance of (?)",
                    message || "assertInstanceOf", actual, cls);
            }
        },

        assertNotInstanceOf: function (cls, actual, message) {
            if (actual instanceof cls) {
                throw fmt("?: (?) is an instance of (?)",
                    message || "assertNotInstanceOf", actual, cls);
            }
        },

        assertNull: function (actual, message) {
            if (actual !== null) {
                throw fmt("?: (?) is not null",
                    message || "assertNull", actual);
            }
        },
        
        assertNotNull: function (actual, message) {
            if (actual === null) {
                throw fmt("?: (?) is null",
                    message || "assertNotNull", actual);
            }
        },
        
        assertUndefined: function (actual, message) {
            if (actual !== undefined) {
                throw fmt("?: (?) is not undefined",
                    message || "assertUndefined", actual);
            }
        },
        
        assertNotUndefined: function (actual, message) {
            if (actual === undefined) {
                throw fmt("?: (?) is undefined",
                    message || "assertNotUndefined", actual);
            }
        },
        
        assertNaN: function (actual, message) {
            if (!isNaN(actual)) {
                throw fmt("?: (?) is not NaN",
                    message || "assertNaN", actual);
            }
        },
        
        assertNotNaN: function (actual, message) {
            if (isNaN(actual)) {
                throw fmt("?: (?) is NaN",
                    message || "assertNotNaN", actual);
            }
        },
        
        fail: function (message) {
            throw message || "fail";
        }
    };
    
    function plural(cnt, unit) {
        return cnt + " " + unit + (cnt == 1 ? "" : "s");
    }

    function splitFunction(fn) {
        var tokens =
            /^[\s\r\n]*function[\s\r\n]*([^\(\s\r\n]*?)[\s\r\n]*\([^\)\s\r\n]*\)[\s\r\n]*\{((?:[^}]*\}?)+)\}[\s\r\n]*$/
            .exec(fn);
        
        if (!tokens) {
            throw "Invalid function.";
        }
        
        return {
            name: tokens[1].length ? tokens[1] : undefined,
            body: tokens[2]
        };
    }
    
    var probeOutside = function () {
        try {
            return eval(
                [ "typeof ", " === \"function\" && ", "" ].join(arguments[0]));
        } catch (e) {
            return false;
        }
    };

    function parseSuiteString(str) {
        var obj = {};

        var probeInside = new Function(
            splitFunction(probeOutside).body + str);

        var tokenRe = /(\w+)/g; // todo: wiser regex
        var tokens;

        while ((tokens = tokenRe.exec(str))) {
            var token = tokens[1];
            var fn;
    
            if (!obj[token]
                && (fn = probeInside(token))
                && fn != probeOutside(token)) {

                obj[token] = fn;
            }
        }

        return parseSuiteObject(obj);
    }

    function parseSuiteFunction(fn) {
        var fnParts = splitFunction(fn);
        var suite = parseSuiteString(fnParts.body);

        suite.suiteName = fnParts.name;

        return suite;
    }

    function parseSuiteArray(tests) {
        var obj = {};

        for (var i = 0; i < tests.length; i++) {
            var item = tests[i];
            
            if (!obj[item]) {
                switch (typeof item) {
                case "function":
                    var fnParts = splitFunction(item);
                    obj[fnParts.name] = item;
                    break;
                case "string":
                    var fn;
                    
                    if (fn = probeOutside(item)) {
                        obj[item] = fn;
                    }
                }
            }
        }

        return parseSuiteObject(obj);
    }

    function parseSuiteObject(obj) {
        var suite = new jsUnity.TestSuite(obj.suiteName, obj);

        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                var fn = obj[name];

                if (typeof fn === "function") {
                    if (/^test/.test(name)) {
                        suite.tests.push({ name: name, fn: fn });
                    } else if (/^setUp|tearDown$/.test(name)) {
                        suite[name] = fn;
                    }
                }
            }
        }
        
        return suite;
    }

    return {
        TestSuite: function (suiteName, scope) {
            this.suiteName = suiteName;
            this.scope = scope;
            this.tests = [];
            this.setUp = undefined;
            this.tearDown = undefined;
        },

        TestResults: function () {
            this.suiteName = undefined;
            this.total = 0;
            this.passed = 0;
            this.failed = 0;
            this.duration = 0;
        },

        assertions: defaultAssertions,

        env: {
            defaultScope: this,

            getDate: function () {
                return new Date();
            }
        },
        
        attachAssertions: function (scope) {
            scope = scope || this.env.defaultScope;

            for (var fn in jsUnity.assertions) {
                scope[fn] = jsUnity.assertions[fn];
            }
        },

        log: function () {},

        error: function (s) { this.log("[ERROR] " + s); },

        compile: function (v) {
            if (v instanceof jsUnity.TestSuite) {
                return v;
            } else if (v instanceof Function) {
                return parseSuiteFunction(v);
            } else if (v instanceof Array) {
                return parseSuiteArray(v);
            } else if (v instanceof Object) {
                return parseSuiteObject(v);
            } else if (typeof v === "string") {
                return parseSuiteString(v);
            } else {
                throw "Argument must be a function, array, object, string or "
                    + "TestSuite instance.";
            }
        },

        run: function () {
            var results = new jsUnity.TestResults();

            var suiteNames = [];
            var start = jsUnity.env.getDate();

            for (var i = 0; i < arguments.length; i++) {
                try {
                    var suite = jsUnity.compile(arguments[i]);
                } catch (e) {
                    this.error("Invalid test suite: " + e);
                    return false;
                }

                var cnt = suite.tests.length;

                this.log("Running "
                    + (suite.suiteName || "unnamed test suite"));
                this.log(plural(cnt, "test") + " found");
    
                suiteNames.push(suite.suiteName);
                results.total += cnt;

                for (var j = 0; j < cnt; j++) {
                    var test = suite.tests[j];
    
                    try {
                        suite.setUp && suite.setUp();
                        test.fn.call(suite.scope);
                        suite.tearDown && suite.tearDown();

                        results.passed++;

                        this.log("[PASSED] " + test.name);
                    } catch (e) {
                        suite.tearDown && suite.tearDown();

                        this.log("[FAILED] " + test.name + ": " + e);
                    }
                }
            }

            results.suiteName = suiteNames.join(",");
            results.failed = results.total - results.passed;
            results.duration = jsUnity.env.getDate() - start;

            this.log(plural(results.passed, "test") + " passed");
            this.log(plural(results.failed, "test") + " failed");
            this.log(plural(results.duration, "millisecond") + " elapsed");

            return results;
        }
    };
})();
//%>
