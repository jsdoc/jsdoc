/**
 * @file better-dom.js
 * @version 1.7.4 2014-03-25T14:05:46
 * @overview Live extension playground
 * @copyright 2013-2014 Maksim Chemerisuk
 * @license MIT
 * @see https://github.com/chemerisuk/better-dom
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];
var $Element = require("./element")["default"];
var $Elements = require("./elements")["default"];

var reSingleTag = /^\w+$/,
    sandbox = document.createElement("body");

/**
 * Create a new DOM element in memory
 * @memberOf DOM
 * @param  {Mixed}  value     HTMLString, EmmetString or native element
 * @param  {Object} [varMap]  key/value map of variables in emmet template
 * @return {$Element|$Elements} element(s) wrapper
 */
DOM.create = function(value, varMap) {
    if (value.nodeType === 1) return $Element(value);

    if (typeof value !== "string") throw _.makeError("create", true);

    if (reSingleTag.test(value)) {
        value = document.createElement(value);
    } else {
        sandbox.innerHTML = DOM.template(value, varMap);

        for (var nodes = []; value = sandbox.firstChild; sandbox.removeChild(value)) {
            if (value.nodeType === 1) nodes.push(value);
        }

        if (nodes.length !== 1) return new $Elements(nodes);

        value = nodes[0];
    }

    return new $Element(value);
};
},{"./dom":5,"./element":12,"./elements":20,"./utils":32}],2:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];
var $Element = require("./element")["default"];
var SelectorMatcher = require("./selectormatcher")["default"];

/**
 * Live extensions support
 * @module extend
 * @see https://github.com/chemerisuk/better-dom/wiki/Live-extensions
 */

// Inspired by trick discovered by Daniel Buchner:
// https://github.com/csuwldcat/SelectorListener
var reRemovableMethod = /^(on|do)[A-Z]/,
    extensions = [],
    returnTrue = function()  {return true},
    returnFalse = function()  {return false},
    nativeEventType, animId, link, styles,
    applyMixins = function(obj, mixins)  {
        _.forOwn(mixins, function(value, key)  {
            if (key !== "constructor") obj[key] = value;
        });
    },
    applyExtensions = function(node)  {
        extensions.forEach(function(ext)  { if (ext.accept(node)) ext(node, true) });

        _.each.call(node.children, applyExtensions);
    },
    stopExt = function(node, index)  {return function(e)  {
        var stop;

        e = e || window.event;
        // mark extension as processed via _.SKIPEXT bitmask
        if (_.CSS3_ANIMATIONS) {
            stop = e.animationName === animId && e.target === node;
        } else {
            stop = e.srcUrn === "dataavailable" && e.srcElement === node;
        }

        if (stop) (e._skip = e._skip || {})[index] = true;
    }},
    makeExtHandler = function(node, skip)  {return function(ext, index)  {
        // skip previously excluded or mismatched elements
        if (!skip[index] && ext.accept(node)) ext(node);
    }};

if (_.CSS3_ANIMATIONS) {
    nativeEventType = _.WEBKIT_PREFIX ? "webkitAnimationStart" : "animationstart";
    animId = "DOM" + new Date().getTime();

    setTimeout(function()  {return DOM.importStyles("@" + _.WEBKIT_PREFIX + "keyframes " + animId, "from {opacity:.99} to {opacity:1}")}, 0);

    styles = {
        "animation-duration": "1ms !important",
        "animation-name": animId + " !important"
    };

    document.addEventListener(nativeEventType, function(e)  {
        if (e.animationName === animId) {
            extensions.forEach(makeExtHandler(e.target, e._skip || {}));
        }
    }, false);
} else {
    nativeEventType = "ondataavailable";
    link = document.querySelector("link[rel=htc]");

    if (!link) throw "You forgot to include <link rel='htc'> for IE < 10";

    styles = {behavior: "url(" + link.href + ") !important"};

    document.attachEvent(nativeEventType, function()  {
        var e = window.event;

        if (e.srcUrn === "dataavailable") {
            extensions.forEach(makeExtHandler(e.srcElement, e._skip || {}));
        }
    });
}

/**
 * Declare a live extension
 * @memberOf module:extend
 * @param  {String}           selector         css selector of which elements to capture
 * @param  {Boolean|Function} [condition=true] indicates if live extension should be attached or not
 * @param  {Object}           mixins           extension declatation
 */
DOM.extend = function(selector, condition, mixins) {
    if (arguments.length === 2) {
        mixins = condition;
        condition = true;
    }

    if (typeof condition === "boolean") condition = condition ? returnTrue : returnFalse;

    if (!mixins || typeof mixins !== "object" || typeof condition !== "function") throw _.makeError("extend", true);

    if (selector === "*") {
        // extending element prototype
        applyMixins($Element.prototype, mixins);
    } else {
        var eventHandlers = Object.keys(mixins).filter(function(prop)  {return !!reRemovableMethod.exec(prop)}),
            ctr = mixins.hasOwnProperty("constructor") && mixins.constructor,
            index = extensions.length,
            ext = function(node, mock)  {
                var el = $Element(node);

                if (_.CSS3_ANIMATIONS) {
                    node.addEventListener(nativeEventType, stopExt(node, index), false);
                } else {
                    node.attachEvent(nativeEventType, stopExt(node, index));
                }

                if (mock !== true && condition(el) === false) return;

                applyMixins(el, mixins);
                // make a safe call so live extensions can't break each other
                if (ctr) el.dispatch(ctr);
                // remove event handlers from element's interface
                if (mock !== true) eventHandlers.forEach(function(prop)  { delete el[prop] });
            };

        ext.accept = SelectorMatcher(selector);
        extensions.push(ext);

        DOM.ready(function()  {
            // initialize extension manually to make sure that all elements
            // have appropriate methods before they are used in other DOM.ready.
            // Also fixes legacy IEs when the HTC behavior is already attached
            _.each.call(document.querySelectorAll(selector), ext);
            // Any extension should be initialized after DOM.ready
            // MUST be after querySelectorAll because of legacy IEs behavior
            DOM.importStyles(selector, styles);
        });
    }
};

/**
 * Return {@link $Element} initialized with all existing live extensions.
 * Also exposes private event handler functions that aren't usually presented
 * @memberOf module:extend
 * @param  {Mixed}        [content]  HTMLString, EmmetString
 * @param  {Object|Array} [varMap]   key/value map of variables in emmet template
 * @return {$Element} mocked instance
 */
DOM.mock = function(content, varMap) {
    return content ? DOM.create(content, varMap).legacy(applyExtensions) : new $Element();
};
},{"./dom":5,"./element":12,"./selectormatcher":30,"./utils":32}],3:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];

/**
 * Import external scripts on the page and call optional callback when it will be done
 * @memberOf DOM
 * @param {...String} urls       script file urls
 * @param {Function}  [callback] callback that is triggered when all scripts are loaded
 */
DOM.importScripts = function() {var SLICE$0 = Array.prototype.slice;var urls = SLICE$0.call(arguments, 0);
    var callback = function() {
        var arg = urls.shift(),
            argType = typeof arg,
            script;

        if (argType === "string") {
            script = document.createElement("script");
            script.src = arg;
            script.onload = callback;
            script.async = true;

            _.injectElement(script);
        } else if (argType === "function") {
            arg();
        } else if (arg) {
            throw _.makeError("importScripts", true);
        }
    };

    callback();
};
},{"./dom":5,"./utils":32}],4:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];
var styleAccessor = require("./styleaccessor")["default"];

var styleNode = _.injectElement(document.createElement("style")),
    styleSheet = styleNode.sheet || styleNode.styleSheet,
    styleRules = styleSheet.cssRules || styleSheet.rules;

/**
 * Append global css styles
 * @memberOf DOM
 * @param {String}         selector  css selector
 * @param {String|Object}  cssText   css rules
 */
DOM.importStyles = function(selector, cssText) {
    if (cssText && typeof cssText === "object") {
        var styleObj = {};

        _.forOwn(cssText, function(value, prop)  {
            var hook = styleAccessor.set[prop];

            value = typeof value === "number" ? value + "px" : value || "";

            if (hook) {
                hook(styleObj, value);
            } else {
                styleObj[prop] = value;
            }
        });

        cssText = [];

        _.forOwn(styleObj, function(styles, selector)  { cssText.push(selector + ":" + styles) });

        cssText = cssText.join(";");
    }

    if (typeof selector !== "string" || typeof cssText !== "string") {
        throw _.makeError("importStyles", true);
    }

    if (styleSheet.cssRules) {
        styleSheet.insertRule(selector + " {" + cssText + "}", styleRules.length);
    } else {
        // ie doesn't support multiple selectors in addRule
        selector.split(",").forEach(function(selector)  { styleSheet.addRule(selector, cssText) });
    }
};
},{"./dom":5,"./styleaccessor":31,"./utils":32}],5:[function(require,module,exports){
"use strict";
var $Node = require("./node")["default"];

var DOM = new $Node(document);

DOM.version = "1.7.4";
DOM.template = function(str)  {return str};

/**
 * Global object to access DOM
 * @namespace DOM
 * @extends $Node
 */
exports["default"] = window.DOM = DOM;
},{"./node":29}],6:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];

var callbacks = [],
    readyState = document.readyState,
    pageLoaded = function()  {
        // safely trigger stored callbacks
        if (callbacks) callbacks = callbacks.forEach(DOM.dispatch, DOM);
    };

// Catch cases where ready is called after the browser event has already occurred.
// IE10 and lower don't handle "interactive" properly... use a weak inference to detect it
// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
if (document.attachEvent ? readyState === "complete" : readyState !== "loading") {
    // use setTimeout to make sure that the dispatch method exists
    setTimeout(pageLoaded, 0);
} else {
    if (_.DOM2_EVENTS) {
        window.addEventListener("load", pageLoaded, false);
        document.addEventListener("DOMContentLoaded", pageLoaded, false);
    } else {
        window.attachEvent("onload", pageLoaded);
        document.attachEvent("ondataavailable", function()  {
            if (window.event.srcUrn === "DOMContentLoaded") pageLoaded();
        });
    }
}

/**
 * Execute callback when DOM is ready
 * @memberOf DOM
 * @param {Function} callback event listener
 */
DOM.ready = function(callback) {
    if (typeof callback !== "function") throw _.makeError("ready", true);

    if (callbacks) {
        callbacks.push(callback);
    } else {
        DOM.dispatch(callback);
    }
};
},{"./dom":5,"./utils":32}],7:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];

/**
 * Emmet abbreviation syntax support
 * @module template
 * @see https://github.com/chemerisuk/better-dom/wiki/Microtemplating
 * @see http://docs.emmet.io/cheat-sheet/
 */

var // operator type / priority object
    operators = {"(": 1,")": 2,"^": 3,">": 4,"+": 4,"*": 5,"`": 6,"]": 5,"[": 6,".": 7,"#": 8},
    reAttr = /([\w\-]+)(?:=((?:(`|')((?:\\?.)*)?\3)|[^\s]+))?/g,
    reIndex = /(\$+)(?:@(-)?(\d+)?)?/g,
    reHtml = /^[\s<]/,
    cache = {},
    toString = function(term)  {return term.join ? term.join("") : term},
    normalizeAttrs = function(term, name, value, quotes, rawValue)  {
        if (!quotes || quotes === "`") quotes = "\"";
        // always wrap attribute values with quotes if they don't exist
        // replace ` quotes with " except when it's a single quotes case
        return name + "=" + quotes + (rawValue || value || name) + quotes;
    },
    injectTerm = function(term, first)  {return function(el)  {
        var index = first ? el.indexOf(">") : el.lastIndexOf("<");
        // inject term into the html string
        return el.substr(0, index) + term + el.substr(index);
    }},
    makeTerm = function(tag)  {
        var result = cache[tag];

        if (!result) result = cache[tag] = "<" + tag + "></" + tag + ">";

        return result;
    },
    makeIndexedTerm = function(term)  {return function(_, i, arr)  {
        return term.replace(reIndex, function(expr, fmt, sign, base)  {
            var index = (sign ? arr.length - i - 1 : i) + (base ? +base : 1);
            // make zero-padding index string
            return (fmt + index).slice(-fmt.length).split("$").join("0");
        });
    }};

// populate empty tags
"area base br col hr img input link meta param command keygen source".split(" ").forEach(function(tag)  {
    cache[tag] = "<" + tag + ">";
});

/**
 * Parse emmet-like template into a HTML string
 * @memberOf module:template
 * @param  {String}       template  emmet-like expression
 * @param  {Object|Array} [varMap]  key/value map of variables
 * @return {String} HTML string
 */
DOM.template = function(template, varMap) {
    if (typeof template !== "string") throw _.makeError("template", true);
    // handle varMap
    if (varMap) template = _.format(template, varMap);

    var stack = [],
        output = [],
        term = "",
        i, n, str, priority, skip, node;

    if (template in cache) return cache[template];

    if (!template || reHtml.exec(template)) return template;

    // parse expression into RPN

    for (i = 0, n = template.length; i < n; ++i) {
        str = template[i];
        // concat .c1.c2 into single space separated class string
        if (str === "." && stack[0] === ".") str = " ";

        priority = operators[str];

        if (priority && (!skip || skip === str)) {
            // fix for a>`text`+b
            if (str === "+" && stack[0] === "`") str = ">";
            // remove redundat ^ operators from the stack when more than one exists
            if (str === "^" && stack[0] === "^") stack.shift();

            if (term) {
                output.push(term);
                term = "";
            }

            if (str !== "(") {
                while (operators[stack[0]] > priority) {
                    output.push(stack.shift());
                    // for ^ operator stop shifting when the first > is found
                    if (str === "^" && output[output.length - 1] === ">") break;
                }
            }

            if (str === ")") {
                stack.shift(); // remove "(" symbol from stack
            } else if (!skip) {
                stack.unshift(str);

                if (str === "[") skip = "]";
                if (str === "`") skip = "`";
            } else {
                skip = false;
            }
        } else {
            term += str;
        }
    }

    if (term) output.push(term);

    output = output.concat(stack);

    // transform RPN into html nodes

    stack = [];

    for (i = 0, n = output.length; i < n; ++i) {
        str = output[i];

        if (str in operators) {
            term = stack.shift();
            node = stack.shift() || [""];

            if (typeof node === "string") node = [ makeTerm(node) ];

            switch(str) {
            case ".":
                term = injectTerm(" class=\"" + term + "\"", true);
                break;

            case "#":
                term = injectTerm(" id=\"" + term + "\"", true);
                break;

            case "[":
                term = injectTerm(" " + term.replace(reAttr, normalizeAttrs), true);
                break;

            case "`":
                term = injectTerm(term);
                break;

            case "*":
                // Array.prototype.map doesn't work properly here
                node = this.map.call(Array(+term), makeIndexedTerm(toString(node)));
                break;

            default:
                term = typeof term === "string" ? makeTerm(term) : toString(term);

                if (str === ">") {
                    term = injectTerm(term);
                } else {
                    node.push(term);
                }
            }

            str = typeof term === "function" ? node.map(term) : node;
        }

        stack.unshift(str);
    }

    output = toString(stack[0]);

    return varMap ? output : cache[template] = output;
};
},{"./dom":5,"./utils":32}],8:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];

/**
 * Class manipulation support
 * @module classes
 */

var reSpace = /[\n\t\r]/g;

function makeClassesMethod(nativeStrategyName, strategy) {
    var methodName = nativeStrategyName === "contains" ? "hasClass" : nativeStrategyName + "Class";

    if (_.docEl.classList) {
        strategy = function(className) {
            return this._._node.classList[nativeStrategyName](className);
        };
    }

    if (methodName === "hasClass") {
        return function(className) {
            var args = arguments;

            if (this._._node) {
                if (args.length === 1) {
                    return strategy.call(this, className);
                } else {
                    return this.every.call(args, strategy, this);
                }
            }
        };
    } else {
        return function(className) {
            var args = arguments;

            return this.each(function(el)  {
                if (args.length === 1) {
                    strategy.call(el, className);
                } else {
                    _.each.call(args, strategy, el);
                }
            });
        };
    }
}

/**
 * Check if element contains class name(s)
 * @memberOf module:classes
 * @param  {...String} classNames class name(s)
 * @return {Boolean}   true if the element contains all classes
 * @function
 */
$Element.prototype.hasClass = makeClassesMethod("contains", function(className) {
    return (" " + this._._node.className + " ").replace(reSpace, " ").indexOf(" " + className + " ") >= 0;
});

/**
 * Add class(es) to element
 * @memberOf module:classes
 * @param  {...String} classNames class name(s)
 * @return {$Element}
 * @function
 */
$Element.prototype.addClass = makeClassesMethod("add", function(className) {
    if (!this.hasClass(className)) this._._node.className += " " + className;
});

/**
 * Remove class(es) from element
 * @memberOf module:classes
 * @param  {...String} classNames class name(s)
 * @return {$Element}
 * @function
 */
$Element.prototype.removeClass = makeClassesMethod("remove", function(className) {
    className = (" " + this._._node.className + " ").replace(reSpace, " ").replace(" " + className + " ", " ");

    this._._node.className = className.trim();
});

/**
 * Toggle class(es) on element
 * @memberOf module:classes
 * @param  {...String}  classNames class name(s)
 * @return {$Element}
 * @function
 */
$Element.prototype.toggleClass = makeClassesMethod("toggle", function(className) {
    var oldClassName = this._._node.className;

    this.addClass(className);

    if (oldClassName === this._._node.className) this.removeClass(className);
});
},{"./element":12,"./utils":32}],9:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];

/**
 * Clonning of an element support
 * @module clone
 */

/**
 * Clone element
 * @memberOf module:clone
 * @param {Boolean} [deep=true] true if all children should also be cloned, or false otherwise
 * @return {$Element} clone of current element
 */
$Element.prototype.clone = function() {var deep = arguments[0];if(deep === void 0)deep = true;
    if (typeof deep !== "boolean") throw _.makeError("clone");

    var node = this._._node, result;

    if (node) {
        if (_.DOM2_EVENTS) {
            result = new $Element(node.cloneNode(deep));
        } else {
            result = DOM.create(node.outerHTML);

            if (!deep) result.set("innerHTML", "");
        }
    } else {
        result = new $Element();
    }

    return result;
};
},{"./element":12,"./utils":32}],10:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];
var $Element = require("./element")["default"];

var hooks = {};

/**
 * Get property or attribute value by name
 * @param  {String|Array} [name] property/attribute name or array of names
 * @return {Object} property/attribute value
 */
$Element.prototype.get = function(name) {
    var data = this._,
        node = data._node,
        hook = hooks[name],
        key, value;

    if (!node) return;

    if (hook) return hook(node, name);

    if (typeof name === "string") {
        if (name[0] === "_") {
            key = name.substr(1);

            if (key in data) {
                value = data[key];
            } else {
                try {
                    value = node.getAttribute("data-" + key);
                    // parse object notation syntax
                    if (value[0] === "{" && value[value.length - 1] === "}") {
                        value = JSON.parse(value);
                    }
                } catch (err) { }

                if (value != null) data[key] = value;
            }

            return value;
        }

        return name in node ? node[name] : node.getAttribute(name);
    }

    return $Node.prototype.get.call(this, name);
};

// $Element#get hooks

hooks.undefined = function(node) {
    var name;

    if (node.tagName === "OPTION") {
        name = node.hasAttribute("value") ? "value" : "text";
    } else if (node.tagName === "SELECT") {
        return ~node.selectedIndex ? node.options[node.selectedIndex].value : "";
    } else {
        name = node.type && "value" in node ? "value" : "innerHTML";
    }

    return node[name];
};

// some browsers don't recognize input[type=email] etc.
hooks.type = function(node)  {return node.getAttribute("type") || node.type};

if (!_.DOM2_EVENTS) hooks.textContent = function(node)  {return node.innerText};
},{"./element":12,"./node":29,"./utils":32}],11:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var DOM = require("./dom")["default"];
var $Element = require("./element")["default"];

/**
 * Internationalization support
 * @module i18n
 * @see https://github.com/chemerisuk/better-dom/wiki/Localization
 */

var VALUE_SEPARATOR = "\n",
    readValue = function(key)  {
        var value = sessionStorage["__" + key];

        return value ? value.split(VALUE_SEPARATOR) : [];
    },
    languages = readValue("");

/**
 * Get/set localized value
 * @memberOf module:i18n
 * @param  {String}       [key]     resource string key
 * @param  {Object|Array} [varMap]  resource string variables
 * @return {String|$Element}
 */
$Element.prototype.i18n = function(key, varMap) {var this$0 = this;
    if (!arguments.length) return this.get("data-i18n");

    if (key && typeof key !== "string" || varMap && typeof varMap !== "object") throw _.makeError("i18n");
    // update data-i18n-{lang} attributes
    var str = sessionStorage["__" + key];

    str = str ? [key].concat(str.split(VALUE_SEPARATOR)) : [key];

    str.forEach(function(value, index)  {
        var attrName = "data-i18n" + (index ? "-" + languages[index - 1] : "");

        if (value) this$0.set(attrName, varMap ? _.format(value, varMap) : value);
    });

    return this.set("");
};

/**
 * Import global i18n string(s)
 * @memberOf module:i18n
 * @param {String}         lang    target language
 * @param {String|Object}  key     english string to localize or key/value object
 * @param {String}         value   localized string
 * @function
 */
DOM.importStrings = function(lang, key, value) {
    var keyType = typeof key,
        attrName = "data-i18n-" + lang,
        langIndex = languages.indexOf(lang),
        str;

    if (keyType === "string") {
        if (langIndex === -1) {
            langIndex = languages.push(lang) - 1;
            // add global rule for the data-i18n-{lang} attribute
            DOM.importStyles("[" + attrName + "]:lang(" + lang + "):before", "content:attr(" + attrName + ")");
            // persiste changed languages array
            sessionStorage.__ = languages.join(VALUE_SEPARATOR);
        }

        str = readValue(key);
        str[langIndex] = value;
        sessionStorage["__" + key] = str.join(VALUE_SEPARATOR);

        DOM.ready(function()  {return DOM.findAll("[data-i18n=\"" + key + "\"]").set(attrName, value)});
    } else if (keyType === "object") {
        _.forOwn(key, function(value, key)  { DOM.importStrings(lang, key, value) });
    } else {
        throw _.makeError("importStrings", true);
    }
};

// by default just show data-i18n string
DOM.importStyles("[data-i18n]:before", "content:attr(data-i18n)");
},{"./dom":5,"./element":12,"./utils":32}],12:[function(require,module,exports){
"use strict";
var $Node = require("./node")["default"];

/**
 * Used to represent a DOM element
 * @name $Element
 * @extends $Node
 * @constructor
 * @private
 */
function $Element(element) {
    if (element && element.__dom__) return element.__dom__;

    if (this instanceof $Element) {
        $Node.call(this, element);
    } else {
        return new $Element(element);
    }
}

$Element.prototype = new $Node();
$Element.prototype.toString = function() {
    var node = this._._node;

    return node ? node.tagName.toLowerCase() : "";
};

exports["default"] = $Element;
},{"./node":29}],13:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];

/**
 * Element manipulation support
 * @module manipulation
 */

function makeManipulationMethod(methodName, fasterMethodName, standalone, strategy) {
    return function() {
        var args = arguments;

        return this.legacy(function(node, el, index, ref)  {
            if (!(standalone || node.parentNode && node.parentNode.nodeType === 1)) return;

            var html = "", value;

            _.each.call(args, function(arg)  {
                if (typeof arg === "function") arg = arg(el, index, ref);

                if (typeof arg === "string") {
                    html += DOM.template(arg).trim();
                } else if (arg instanceof $Element) {
                    if (!value) value = document.createDocumentFragment();
                    // populate fragment
                    arg.legacy(function(node)  {return value.appendChild(node)});
                } else {
                    throw _.makeError(methodName);
                }
            });

            if (!fasterMethodName && html) value = DOM.create(html)._._node;

            if (!fasterMethodName || value) {
                strategy(node, value);
            } else if (html) {
                node.insertAdjacentHTML(fasterMethodName, html);
            }
        });
    };
}

/**
 * Insert html string or $Element after the current
 * @memberOf module:manipulation
 * @param {...Mixed} contents HTMLString, EmmetString, $Element or functor that returns content
 * @return {$Element}
 * @function
 */
$Element.prototype.after = makeManipulationMethod("after", "afterend", false, function(node, relatedNode)  {
    node.parentNode.insertBefore(relatedNode, node.nextSibling);
});

/**
 * Insert html string or $Element before the current
 * @memberOf module:manipulation
 * @param {...Mixed} contents HTMLString, EmmetString, $Element or functor that returns content
 * @return {$Element}
 * @function
 */
$Element.prototype.before = makeManipulationMethod("before", "beforebegin", false, function(node, relatedNode)  {
    node.parentNode.insertBefore(relatedNode, node);
});

/**
 * Prepend html string or $Element to the current
 * @memberOf module:manipulation
 * @param {...Mixed} contents HTMLString, EmmetString, $Element or functor that returns content
 * @return {$Element}
 * @function
 */
$Element.prototype.prepend = makeManipulationMethod("prepend", "afterbegin", true, function(node, relatedNode)  {
    node.insertBefore(relatedNode, node.firstChild);
});

/**
 * Append html string or $Element to the current
 * @memberOf module:manipulation
 * @param {...Mixed} contents HTMLString, EmmetString, $Element or functor that returns content
 * @return {$Element}
 * @function
 */
$Element.prototype.append = makeManipulationMethod("append", "beforeend", true, function(node, relatedNode)  {
    node.appendChild(relatedNode);
});

/**
 * Replace current element with html string or $Element
 * @memberOf module:manipulation
 * @param {Mixed} content HTMLString, EmmetString, $Element or functor that returns content
 * @return {$Element}
 * @function
 */
$Element.prototype.replace = makeManipulationMethod("replace", "", false, function(node, relatedNode)  {
    node.parentNode.replaceChild(relatedNode, node);
});

/**
 * Remove current element from DOM
 * @memberOf module:manipulation
 * @return {$Element}
 * @function
 */
$Element.prototype.remove = makeManipulationMethod("remove", "", false, function(node)  {
    node.parentNode.removeChild(node);
});
},{"./element":12,"./utils":32}],14:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];
var SelectorMatcher = require("./selectormatcher")["default"];

/**
 * CSS selector matching support
 * @module matches
 */

var hooks = {};

/**
 * Check if the element matches selector
 * @memberOf module:matches
 * @param  {String}   selector  css selector for checking
 * @return {$Element}
 */
$Element.prototype.matches = function(selector) {
    if (!selector || typeof selector !== "string") throw _.makeError("matches");

    var checker = hooks[selector] || SelectorMatcher(selector),
        node = this._._node;

    return node && !!checker(node);
};

// $Element.matches hooks

hooks[":focus"] = function(node)  {return node === document.activeElement};

hooks[":hidden"] = function(node)  {
    return node.getAttribute("aria-hidden") === "true" ||
        _.computeStyle(node).display === "none" || !_.docEl.contains(node);
};

hooks[":visible"] = function(node)  {return !hooks[":hidden"](node)};
},{"./element":12,"./selectormatcher":30,"./utils":32}],15:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];

/**
 * Element offset calculation support
 * @module offset
 */

/**
 * Calculates offset of the current element
 * @memberOf module:offset
 * @return object with left, top, bottom, right, width and height properties
 */
$Element.prototype.offset = function() {
    var node = this._._node,
        clientTop = _.docEl.clientTop,
        clientLeft = _.docEl.clientLeft,
        scrollTop = window.pageYOffset || _.docEl.scrollTop,
        scrollLeft = window.pageXOffset || _.docEl.scrollLeft,
        boundingRect;

    if (node) {
        boundingRect = node.getBoundingClientRect();

        return {
            top: boundingRect.top + scrollTop - clientTop,
            left: boundingRect.left + scrollLeft - clientLeft,
            right: boundingRect.right + scrollLeft - clientLeft,
            bottom: boundingRect.bottom + scrollTop - clientTop,
            width: boundingRect.right - boundingRect.left,
            height: boundingRect.bottom - boundingRect.top
        };
    }
};
},{"./element":12,"./utils":32}],16:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];
var $Element = require("./element")["default"];

var hooks = {};

/**
 * Set property/attribute value by name
 * @param {String|Object|Array} [name]  property/attribute name
 * @param {String|Function}     value   property/attribute value or function that returns it
 * @return {$Element}
 */
$Element.prototype.set = function(name, value) {
    var nameType = typeof name;

    if (arguments.length === 1 && nameType !== "object") {
        value = name;
        name = undefined;
    }

    return this.legacy(function(node, el, index, ref)  {
        var hook = hooks[name],
            watchers = (el._._watchers || {})[name],
            newValue = value, oldValue;

        if (watchers) oldValue = el.get(name);

        if (name && name[0] === "_") {
            el._[name.substr(1)] = newValue;
        } else {
            if (typeof newValue === "function") newValue = value(el, index, ref);

            if (hook) {
                hook(node, newValue);
            } else if (nameType !== "string") {
                return $Node.prototype.set.call(el, name);
            } else if (newValue == null) {
                node.removeAttribute(name);
            } else if (name in node) {
                node[name] = newValue;
            } else {
                node.setAttribute(name, newValue);
            }
            // trigger reflow manually in IE8
            if (!_.DOM2_EVENTS || _.LEGACY_ANDROID) node.className = node.className;
        }

        if (watchers && oldValue !== newValue) {
            watchers.forEach(function(w)  { el.dispatch(w, newValue, oldValue, name) });
        }
    });
};

/**
 * Watch for changes of a particular property/attribute
 * @param  {String}   name     property/attribute name
 * @param  {Function} callback watch callback the accepts (newValue, oldValue, name)
 * @return {$Element}
 */
$Element.prototype.watch = function(name, callback) {
    return this.each(function(el)  {
        var watchers = el._._watchers;

        if (!watchers) el.set("__watchers", watchers = {});

        (watchers[name] || (watchers[name] = [])).push(callback);
    });
};

/**
 * Disable watching of a particular property/attribute
 * @param  {String}   name    property/attribute name
 * @param  {Function} callback watch callback the accepts (name, newValue, oldValue)
 * @return {$Element}
 */
$Element.prototype.unwatch = function(name, callback) {
    var eq = function(w)  {return w !== callback};

    return this.each(function(el)  {
        var watchers = el._._watchers;

        if (watchers) watchers[name] = (watchers[name] || []).filter(eq);
    });
};

// $Element#set hooks

hooks.undefined = function(node, value) {
    var name;
    // handle numbers, booleans etc.
    value = value == null ? "" : String(value);

    if (node.tagName === "SELECT") {
        // selectbox has special case
        if (_.every.call(node.options, function(o)  {return !(o.selected = o.value === value)})) {
            node.selectedIndex = -1;
        }
    } else if (node.type && "value" in node) {
        // for IE use innerText because it doesn't trigger onpropertychange
        name = _.DOM2_EVENTS ? "value" : "innerText";
    } else {
        name = "innerHTML";
    }

    if (name) node[name] = value;
};

if (!_.DOM2_EVENTS) hooks.textContent = function(node, value)  { node.innerText = value };
},{"./element":12,"./node":29,"./utils":32}],17:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];
var styleAccessor = require("./styleaccessor")["default"];

/**
 * Changing of element styles support
 * @module css
 */

/**
 * CSS properties accessor for an element
 * @memberOf module:css
 * @param  {String|Object}   name    style property name or key/value object
 * @param  {String|Function} [value] style property value or function that returns it
 * @return {String|$Element} property value or reference to this
 */
$Element.prototype.style = function(name, value) {
    var len = arguments.length,
        node = this._._node,
        nameType = typeof name,
        style, hook, computed;

    if (len === 1 && (nameType === "string" || Array.isArray(name))) {
        if (node) {
            style = node.style;

            value = (nameType === "string" ? [name] : name).reduce(function(memo, name)  {
                hook = styleAccessor.get[name];
                value = hook ? hook(style) : style[name];

                if (!computed && !value) {
                    style = _.computeStyle(node);
                    value = hook ? hook(style) : style[name];

                    computed = true;
                }

                memo[name] = value;

                return memo;
            }, {});
        }

        return node && nameType === "string" ? value[name] : value;
    }

    return this.legacy(function(node, el, index, ref)  {
        var style = node.style,
            appendCssText = function(value, key)  {
                var hook = styleAccessor.set[key];

                if (typeof value === "function") value = value(el, index, ref);

                if (value == null) value = "";

                if (hook) {
                    hook(style, value);
                } else {
                    style[key] = typeof value === "number" ? value + "px" : value.toString();
                }
            };

        if (len === 1 && name && nameType === "object") {
            _.forOwn(name, appendCssText);
        } else if (len === 2 && nameType === "string") {
            appendCssText(value, name);
        } else {
            throw _.makeError("style");
        }
    });
};
},{"./element":12,"./styleaccessor":31,"./utils":32}],18:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];
var $Elements = require("./elements")["default"];
var SelectorMatcher = require("./selectormatcher")["default"];

/**
 * Element traversing support
 * @module traversing
 * @see https://github.com/chemerisuk/better-dom/wiki/Traversing
 */

function makeTraversingMethod(methodName, propertyName, all) {
    return function(selector, andSelf) {
        if (selector && typeof selector !== "string") throw _.makeError(methodName);

        var matcher = SelectorMatcher(selector),
            nodes = all ? [] : null,
            it = this._._node;

        for (it = it && !andSelf ? it[propertyName] : it; it; it = it[propertyName]) {
            if (it.nodeType === 1 && (!matcher || matcher(it))) {
                if (!all) return $Element(it);

                nodes.push(it);
            }
        }

        return new $Elements(nodes);
    };
}

function makeChildTraversingMethod(all) {
    return function(selector) {
        if (all) {
            if (selector && typeof selector !== "string") throw _.makeError("children");
        } else {
            if (selector && typeof selector !== "number") throw _.makeError("child");
        }

        var node = this._._node,
            children = node ? node.children : null;

        if (!node) return new $Element();

        if (!_.DOM2_EVENTS) {
            // fix IE8 bug with children collection
            children = this.filter.call(children, function(node)  {return node.nodeType === 1});
        }

        if (all) return new $Elements(selector ? this.filter.call(children, SelectorMatcher(selector)) : children);

        if (selector < 0) selector = children.length + selector;

        return $Element(children[selector]);
    };
}

/**
 * Find next sibling element filtered by optional selector
 * @memberOf module:traversing
 * @param {String} [selector] css selector
 * @param {Boolean} [andSelf] if true than search will start from the current element
 * @return {$Element} matched element
 * @function
 */
$Element.prototype.next = makeTraversingMethod("next", "nextSibling");

/**
 * Find previous sibling element filtered by optional selector
 * @memberOf module:traversing
 * @param {String} [selector] css selector
 * @param {Boolean} [andSelf] if true than search will start from the current element
 * @return {$Element} matched element
 * @function
 */
$Element.prototype.prev = makeTraversingMethod("prev", "previousSibling");

/**
 * Find all next sibling elements filtered by optional selector
 * @memberOf module:traversing
 * @param {String} [selector] css selector
 * @param {Boolean} [andSelf] if true than search will start from the current element
 * @return {$Element} collection of matched elements
 * @function
 */
$Element.prototype.nextAll = makeTraversingMethod("nextAll", "nextSibling", true);

/**
 * Find all previous sibling elements filtered by optional selector
 * @memberOf module:traversing
 * @param {String} [selector] css selector
 * @param {Boolean} [andSelf] if true than search will start from the current element
 * @return {$Element} collection of matched elements
 * @function
 */
$Element.prototype.prevAll = makeTraversingMethod("prevAll", "previousSibling", true);

/**
 * Find parent element filtered by optional selector
 * @memberOf module:traversing
 * @param {String} [selector] css selector
 * @param {Boolean} [andSelf] if true than search will start from the current element
 * @return {$Element} matched element
 * @function
 */
$Element.prototype.parent = makeTraversingMethod("parent", "parentNode");

/**
 * Return child element by index filtered by optional selector
 * @memberOf module:traversing
 * @param  {Number} index child index
 * @return {$Element} matched child
 * @function
 */
$Element.prototype.child = makeChildTraversingMethod(false);

/**
 * Fetch children elements filtered by optional selector
 * @memberOf module:traversing
 * @param  {String} [selector] css selector
 * @return {$Element} collection of matched elements
 * @function
 */
$Element.prototype.children = makeChildTraversingMethod(true);
},{"./element":12,"./elements":20,"./selectormatcher":30,"./utils":32}],19:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];
var styleAccessor = require("./styleaccessor")["default"];

/**
 * Changing of element visibility support
 * @module visibility
 */

var parseTimeValue = function(value)  {
        var endIndex = value.length - 1;

        return value.lastIndexOf("ms") === endIndex - 1 || value.lastIndexOf("s") !== endIndex ?
            parseFloat(value) : parseFloat(value) * 1000;
    },
    calcDuration = function(style, animation)  {
        var prefix = animation ? "animation-" : "transition-",
            delay = styleAccessor.get[prefix + "delay"](style).split(","),
            duration = styleAccessor.get[prefix + "duration"](style).split(","),
            iterationCount = animation ? styleAccessor.get[prefix + "iteration-count"](style).split(",") : [];

        return Math.max.apply(Math, duration.map(function(value, index)  {
            var it = iterationCount[index] || "1";
            // initial or empty value equals to 1
            return (it === "initial" ? 1 : parseFloat(it)) *
                parseTimeValue(value) + (parseTimeValue(delay[index]) || 0);
        }));
    },
    transitionProps = ["timing-function", "property", "duration", "delay"].map(function(p)  {return "transition-" + p}),
    eventType = _.WEBKIT_PREFIX ? "webkitTransitionEnd" : "transitionend",
    absentStrategy = !_.LEGACY_ANDROID && _.CSS3_ANIMATIONS ? ["position", "absolute"] : ["display", "none"],
    changeVisibility = function(el, fn, callback)  {return function()  {return el.legacy(function(node, el, index, ref)  {
        var style = node.style,
            compStyle = _.computeStyle(node),
            isHidden = typeof fn === "function" ? fn(node) : fn,
            isDetached = !_.docEl.contains(node),
            completeVisibilityChange = function()  {
                if (style.visibility === "hidden") {
                    style[absentStrategy[0]] = absentStrategy[1];
                } else {
                    style.pointerEvents = "";
                }

                if (callback) callback(el, index, ref);
            },
            processVisibilityChange = function()  {
                var duration, index, transition, absentance;

                // Android Browser is too slow and has a lot of bugs in
                // the implementation, so disable animations for them
                if (!_.LEGACY_ANDROID && _.CSS3_ANIMATIONS && !isDetached) {
                    duration = Math.max(calcDuration(compStyle), calcDuration(compStyle, true));
                }

                if (duration) {
                    // make sure that the visibility property will be changed
                    // to trigger the completeAnimation callback
                    if (!style.visibility) style.visibility = isHidden ? "visible" : "hidden";

                    transition = transitionProps.map(function(prop, index)  {
                        // have to use regexp to split transition-timing-function value
                        return styleAccessor.get[prop](compStyle).split(index ? ", " : /, (?!\d)/);
                    });

                    // try to find existing or use 0s length or make a new visibility transition
                    index = transition[1].indexOf("visibility");
                    if (index < 0) index = transition[2].indexOf("0s");
                    if (index < 0) index = transition[0].length;

                    transition[0][index] = "linear";
                    transition[1][index] = "visibility";
                    transition[isHidden ? 2 : 3][index] = "0s";
                    transition[isHidden ? 3 : 2][index] = duration + "ms";

                    transition.forEach(function(value, index)  {
                        styleAccessor.set[transitionProps[index]](style, value.join(", "));
                    });

                    node.addEventListener(eventType, function completeAnimation(e) {
                        if (e.propertyName === "visibility") {
                            e.stopPropagation(); // this is an internal event

                            node.removeEventListener(eventType, completeAnimation, false);

                            completeVisibilityChange();
                        }
                    }, false);
                }

                if (isHidden) {
                    absentance = style[absentStrategy[0]];
                    // store current inline value in a internal property
                    if (absentance !== "none") el.set("__visibility", absentance);
                    // prevent accidental user actions during animation
                    style.pointerEvents = "none";
                } else {
                    // restore initial property value if it exists
                    style[absentStrategy[0]] = el.get("__visibility") || "";
                }

                style.visibility = isHidden ? "hidden" : "visible";
                // trigger native CSS animation
                el.set("aria-hidden", String(isHidden));
                // must be AFTER changing the aria-hidden attribute
                if (!duration) completeVisibilityChange();
            };

        // if element is not detached use requestAnimationFrame that fixes several issues:
        // 1) animation of new added elements (http://christianheilmann.com/2013/09/19/quicky-fading-in-a-newly-created-element-using-css/)
        // 2) firefox-specific animations sync quirks (because of the getComputedStyle call)
        // 3) power consuption: show/hide do almost nothing if page is not active
        if (isDetached) {
            processVisibilityChange();
        } else {
            _.raf(processVisibilityChange);
        }
    })}},
    makeVisibilityMethod = function(name, fn)  {return function(delay, callback) {
        var len = arguments.length,
            delayType = typeof delay;

        if (len === 1 && delayType === "function") {
            callback = delay;
            delay = 0;
        }

        if (delay && (delayType !== "number" || delay < 0) ||
            callback && typeof callback !== "function") {
            throw _.makeError(name);
        }

        callback = changeVisibility(this, fn, callback);

        if (delay) {
            setTimeout(callback, delay);
        } else {
            callback();
        }

        return this;
    }};

/**
 * Show element with optional callback and delay
 * @memberOf module:visibility
 * @param {Number}   [delay=0]  time in miliseconds to wait
 * @param {Function} [callback] function that executes when animation is done
 * @return {$Element}
 * @function
 */
$Element.prototype.show = makeVisibilityMethod("show", false);

/**
 * Hide element with optional callback and delay
 * @memberOf module:visibility
 * @param {Number}   [delay=0]  time in miliseconds to wait
 * @param {Function} [callback] function that executes when animation is done
 * @return {$Element}
 * @function
 */
$Element.prototype.hide = makeVisibilityMethod("hide", true);

/**
 * Toggle element visibility with optional callback and delay
 * @memberOf module:visibility
 * @param {Number}   [delay=0]  time in miliseconds to wait
 * @param {Function} [callback] function that executes when animation is done
 * @return {$Element}
 * @function
 */
$Element.prototype.toggle = makeVisibilityMethod("toggle", function(node) {
    return node.getAttribute("aria-hidden") !== "true";
});
},{"./element":12,"./styleaccessor":31,"./utils":32}],20:[function(require,module,exports){
"use strict";
var $Element = require("./element")["default"];

/**
 * Used to represent a collection of DOM elements
 * @name $Elements
 * @extends $Element
 * @constructor
 * @private
 */
function $Elements(elements) {
    for (var i = 0, n = elements && elements.length || 0; i < n; ++i) {
        this[i] = $Element(elements[i]);
    }

    this._ = {};
    this.length = n;
}

$Elements.prototype = new $Element();
$Elements.prototype.toString = Array.prototype.join;

exports["default"] = $Elements;
},{"./element":12}],21:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Element = require("./element")["default"];
var SelectorMatcher = require("./selectormatcher")["default"];

/*
 * Helper type to create an event handler
 */

var defaultArgs = ["target", "currentTarget", "defaultPrevented"],
    CUSTOM_EVENT_TYPE = "dataavailable",
    hooks = {},
    EventHandler = function(type, selector, callback, props, el, node, once)  {
        var hook = hooks[type],
            matcher = SelectorMatcher(selector, node),
            handler = function(e)  {
                e = e || window.event;
                // early stop in case of default action
                if (EventHandler.skip === type) return;
                // handle custom events in legacy IE
                if (handler._type === CUSTOM_EVENT_TYPE && e.srcUrn !== type) return;
                // srcElement can be null in legacy IE when target is document
                var target = e.target || e.srcElement || document,
                    currentTarget = matcher ? matcher(target) : node,
                    fn = typeof callback === "string" ? el[callback] : callback,
                    args = props || defaultArgs;

                // early stop for late binding or when target doesn't match selector
                if (typeof fn !== "function" || !currentTarget) return;

                // off callback even if it throws an exception later
                if (once) el.off(type, callback);

                args = args.map(function(name)  {
                    if (!_.DOM2_EVENTS) {
                        switch (name) {
                        case "which":
                            return e.keyCode;
                        case "button":
                            var button = e.button;
                            // click: 1 === left; 2 === middle; 3 === right
                            return button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) );
                        case "pageX":
                            return e.pageX || e.clientX + _.docEl.scrollLeft - _.docEl.clientLeft;
                        case "pageY":
                            return e.clientY + _.docEl.scrollTop - _.docEl.clientTop;
                        }
                    }

                    switch (name) {
                    case "type":
                        return type;
                    case "defaultPrevented":
                        // IE8 and Android 2.3 use returnValue instead of defaultPrevented
                        return "defaultPrevented" in e ? e.defaultPrevented : e.returnValue === false;
                    case "target":
                        return $Element(target);
                    case "currentTarget":
                        return $Element(currentTarget);
                    case "relatedTarget":
                        return $Element(e.relatedTarget || e[(e.toElement === node ? "from" : "to") + "Element"]);
                    }

                    return e[name];
                });
                // if props is not specified then prepend extra arguments if they exist
                if (e._args) args = e._args.concat(args);

                if (fn.apply(el, args) === false) {
                    // prevent default if handler returns false
                    if (_.DOM2_EVENTS) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            };

        if (hook) handler = hook(handler, type) || handler;
        // handle custom events for IE8
        if (!_.DOM2_EVENTS && !("on" + (handler._type || type) in node)) {
            handler._type = CUSTOM_EVENT_TYPE;
        }

        handler.type = selector ? type + " " + selector : type;
        handler.callback = callback;

        return handler;
    };

// EventHandler hooks

["scroll", "mousemove"].forEach(function(name)  {
    hooks[name] = function(handler)  {
        var free = true;
        // debounce frequent events
        return function(e)  { if (free) free = _.raf(function()  { free = !handler(e) }) };
    };
});

if ("onfocusin" in _.docEl) {
    _.forOwn({focus: "focusin", blur: "focusout"}, function(value, prop)  {
        hooks[prop] = function(handler)  { handler._type = value };
    });
} else {
    // firefox doesn't support focusin/focusout events
    hooks.focus = hooks.blur = function(handler)  { handler.capturing = true };
}

if (document.createElement("input").validity) {
    hooks.invalid = function(handler)  { handler.capturing = true };
}

if (!_.DOM2_EVENTS) {
    // fix non-bubbling form events for IE8
    ["submit", "change", "reset"].forEach(function(name)  {
        hooks[name] = function(handler)  { handler._type = CUSTOM_EVENT_TYPE };
    });
}

EventHandler.hooks = hooks;

exports["default"] = EventHandler;
},{"./element":12,"./selectormatcher":30,"./utils":32}],22:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];

/**
 * Get property value by name
 * @param  {String} key property name
 * @return {Object} property value
 */
$Node.prototype.get = function(key) {
    var el = this;

    if (typeof key === "string") {
        if (key[0] === "_") {
            return this._[key.substr(1)];
        } else {
            return this._._node[key];
        }
    } else if (Array.isArray(key)) {
        return key.reduce(function(r, key)  { return r[key] = el.get(key), r }, {});
    }

    throw _.makeError("get");
};

/**
 * Set property value by name
 * @param  {String} key   property name
 * @param  {Object} value property value
 * @return {$Node}
 */
$Node.prototype.set = function(key, value) {var this$0 = this;
    var keyType = typeof key;

    if (keyType === "string") {
        if (key[0] === "_") {
            this._[key.substr(1)] = value;
        } else {
            this._._node[key] = value;
        }

        return this;
    } else if (key && keyType === "object") {
        return _.forOwn(key, function(value, key)  { this$0.set(key, value) });
    }

    throw _.makeError("set");
};
},{"./node":29,"./utils":32}],23:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];
var $Element = require("./element")["default"];

/**
 * Ancestor check support
 * @module contains
 */

/**
 * Check if element is inside of context
 * @memberOf module:contains
 * @param  {$Element} element element to check
 * @return {Boolean} true if success
 */
$Node.prototype.contains = function(element) {
    var node = this._._node;

    if (element instanceof $Element) {
        return node && element.every(function(el)  {return node.contains(el._._node)});
    }

    throw _.makeError("contains");
};
},{"./element":12,"./node":29,"./utils":32}],24:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];

/**
 * Getter/setter of a data entry value. Tries to read the appropriate
 * HTML5 data-* attribute if it exists
 * @param  {String|Object|Array}  key(s)  data key or key/value object or array of keys
 * @param  {Object}               [value] data value to store
 * @return {Object} data entry value or this in case of setter
 * @deprecated see {@link https://github.com/chemerisuk/better-dom/issues/12}
 */
$Node.prototype.data = function(key, value) {var this$0 = this;
    var len = arguments.length,
        keyType = typeof key;

    if (len === 1) {
        if (keyType === "string") {
            return this.get("_" + key);
        } else if (key && keyType === "object") {
            if (Array.isArray(key)) {
                return this.get(key.map(function(key)  {return "_" + key} ));
            } else {
                return _.forOwn(key, function(value, key)  { this$0.set("_" + key, value) });
            }
        }
    } else if (len === 2) {
        return this.each(function(el)  { el.set("_" + key, value) });
    }

    throw _.makeError("data", this);
};
},{"./node":29,"./utils":32}],25:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];

var dispatcher = document.createElement("a"),
    safePropName = "onpropertychange";

if (_.DOM2_EVENTS) {
    // for modern browsers use late binding for safe calls
    // dispatcher MUST have handleEvent property before registering
    dispatcher[safePropName = "handleEvent"] = null;
    dispatcher.addEventListener(safePropName, dispatcher, false);
}

/**
 * Make a safe method/function call
 * @param  {String|Function}  method  name of method or function for a safe call
 * @param  {...Object}        [args]  extra arguments to pass into each invokation
 * @return {Object} result of the invokation which is undefined if there was an exception
 */
$Node.prototype.dispatch = function(method) {var SLICE$0 = Array.prototype.slice;var args = SLICE$0.call(arguments, 1);
    var methodType = typeof method,
        el = this,
        node = this._._node,
        handler, result, e;

    if (node) {
        if (methodType === "function") {
            handler = function()  { result = method.apply(el, args) };
        } else if (methodType === "string") {
            handler = function()  { result = node[method].apply(node, args) };
        } else {
            throw _.makeError("dispatch");
        }
        // register safe invokation handler
        dispatcher[safePropName] = handler;
        // make a safe call
        if (_.DOM2_EVENTS) {
            e = document.createEvent("HTMLEvents");
            e.initEvent(safePropName, false, false);
            dispatcher.dispatchEvent(e);
        }
        // cleanup references
        dispatcher[safePropName] = null;
    }

    return result;
};
},{"./node":29,"./utils":32}],26:[function(require,module,exports){
var SLICE$0 = Array.prototype.slice;"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];
var EventHandler = require("./eventhandler")["default"];

/**
 * Event handling support
 * @module events
 * @see https://github.com/chemerisuk/better-dom/wiki/Event-handling
 */

/**
 * Bind a DOM event
 * @memberOf module:events
 * @param  {String|Array}    type event type(s) with optional selector
 * @param  {Function|String} callback event callback or property name (for late binding)
 * @param  {Array}           [props] array of event properties to pass into the callback
 * @return {$Node}
 */
$Node.prototype.on = function(type, callback, props, /*INTERNAL*/once) {var this$0 = this;
    var eventType = typeof type,
        selector, index, args;

    if (eventType === "string") {
        index = type.indexOf(" ");

        if (~index) {
            selector = type.substr(index + 1);
            type = type.substr(0, index);
        }

        if (!Array.isArray(props)) {
            once = props;
            props = undefined;
        }
    } else if (eventType === "object") {
        if (Array.isArray(type)) {
            args = _.slice.call(arguments, 1);

            type.forEach(function(name)  { this$0.on.apply(this$0, [name].concat(args)) });
        } else {
            _.forOwn(type, function(value, name)  { this$0.on(name, value) });
        }

        return this;
    } else {
        throw _.makeError("on");
    }

    return this.legacy(function(node, el)  {
        var handler = EventHandler(type, selector, callback, props, el, node, once);

        if (_.DOM2_EVENTS) {
            node.addEventListener(handler._type || type, handler, !!handler.capturing);
        } else {
            // IE8 doesn't support onscroll on document level
            if (el === DOM && type === "scroll") node = window;

            node.attachEvent("on" + (handler._type || type), handler);
        }
        // store event entry
        el._._handlers.push(handler);
    });
};

/**
 * Bind a DOM event but fire once before being removed
 * @memberOf module:events
 * @param  {String|Array}    type event type(s) with optional selector
 * @param  {Function|String} callback event callback or property name (for late binding)
 * @param  {Array}           [props] array of event properties to pass into the callback
 * @return {$Node}
 */
$Node.prototype.once = function() {var args = SLICE$0.call(arguments, 0);
    return this.on.apply(this, args.concat(true));
};

/**
 * Unbind an event from the element
 * @memberOf module:events
 * @param  {String}          type type of event
 * @param  {Function|String} [callback] event handler
 * @return {$Node}
 */
$Node.prototype.off = function(type, callback) {
    if (typeof type !== "string") throw _.makeError("off");

    return this.legacy(function(node, el)  {
        el.set("__handlers", el._._handlers.filter(function(handler)  {
            if (type !== handler.type || callback && callback !== handler.callback) return true;

            type = handler._type || handler.type;

            if (_.DOM2_EVENTS) {
                node.removeEventListener(type, handler, !!handler.capturing);
            } else {
                // IE8 doesn't support onscroll on document level
                if (el === DOM && type === "scroll") node = window;

                node.detachEvent("on" + type, handler);
            }
        }));
    });
};

/**
 * Triggers an event of specific type with optional extra arguments
 * @memberOf module:events
 * @param  {String}  type  type of event
 * @param  {...Object}     [args]  extra arguments to pass into each event handler
 * @return {Boolean} true if default action wasn't prevented
 */
$Node.prototype.fire = function(type) {var args = SLICE$0.call(arguments, 1);
    var eventType = typeof type,
        handler = {}, hook;

    if (eventType === "string") {
        if (hook = EventHandler.hooks[type]) handler = hook(handler) || handler;

        eventType = handler._type || type;
    } else {
        throw _.makeError("fire");
    }

    return this.every(function(el)  {
        var node = el._._node,
            e, canContinue;

        if (_.DOM2_EVENTS) {
            e = document.createEvent("HTMLEvents");
            e.initEvent(eventType, true, true);
            e._args = args;

            canContinue = node.dispatchEvent(e);
        } else {
            e = document.createEventObject();
            e._args = args;
            // handle custom events for legacy IE
            if (!("on" + eventType in node)) eventType = "dataavailable";
            // store original event type
            if (eventType === "dataavailable") e.srcUrn = type;

            node.fireEvent("on" + eventType, e);

            canContinue = e.returnValue !== false;
        }

        // Call native method. IE<9 dies on focus/blur to hidden element
        if (canContinue && node[type] && (type !== "focus" && type !== "blur" || node.offsetWidth)) {
            // Prevent re-triggering of the same event
            EventHandler.skip = type;

            node[type]();

            EventHandler.skip = null;
        }

        return canContinue;
    });
};
},{"./eventhandler":21,"./node":29,"./utils":32}],27:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
var $Node = require("./node")["default"];
var $Element = require("./element")["default"];
var $Elements = require("./elements")["default"];

/**
 * Element search support
 * @module find
 */

// big part of code inspired by Sizzle:
// https://github.com/jquery/sizzle/blob/master/sizzle.js

var rquickExpr = document.getElementsByClassName ? /^(?:(\w+)|\.([\w\-]+))$/ : /^(?:(\w+))$/,
    rsibling = /[\x20\t\r\n\f]*[+~>]/,
    rescape = /'|\\/g,
    tmpId = "DOM" + new Date().getTime();

/**
 * Find the first matched element by css selector
 * @memberOf module:find
 * @param  {String} selector css selector
 * @return {$Element} the first matched element
 */
$Node.prototype.find = function(selector, /*INTERNAL*/all) {
    if (typeof selector !== "string") throw _.makeError("find");

    var node = this._._node,
        quickMatch = rquickExpr.exec(selector),
        elements, old, nid, context;

    if (!node) return new $Element();

    if (quickMatch) {
        if (quickMatch[1]) {
            // speed-up: "TAG"
            elements = node.getElementsByTagName(selector);
        } else {
            // speed-up: ".CLASS"
            elements = node.getElementsByClassName(quickMatch[2]);
        }

        if (elements && !all) elements = elements[0];
    } else {
        old = true;
        nid = tmpId;
        context = node;

        if (node !== document) {
            // qSA works strangely on Element-rooted queries
            // We can work around this by specifying an extra ID on the root
            // and working up from there (Thanks to Andrew Dupont for the technique)
            if ( (old = node.getAttribute("id")) ) {
                nid = old.replace(rescape, "\\$&");
            } else {
                node.setAttribute("id", nid);
            }

            nid = "[id='" + nid + "'] ";

            context = rsibling.test(selector) ? node.parentNode : node;
            selector = nid + selector.split(",").join("," + nid);
        }

        try {
            elements = context[all ? "querySelectorAll" : "querySelector"](selector);
        } finally {
            if (!old) node.removeAttribute("id");
        }
    }

    return all ? new $Elements(elements) : $Element(elements);
};

/**
 * Find all matched elements by css selector
 * @memberOf module:find
 * @param  {String} selector css selector
 * @return {$Element} matched elements
 */
$Node.prototype.findAll = function(selector) {
    return this.find(selector, true);
};
},{"./element":12,"./elements":20,"./node":29,"./utils":32}],28:[function(require,module,exports){
"use strict";
var $Node = require("./node")["default"];

var reInvoke = /cb\.call\(([^)]+)\)/g,
    defaults = {
        BEGIN: "",
        BODY:   "",
        END:  "return this"
    },
    makeLoopMethod = function(options)  {
        var code = "%BEGIN%\nfor(var i=0,n=this.length;i<n;++i){%BODY%}%END%", key;

        for (key in defaults) {
            code = code.replace("%" + key + "%", options[key] || defaults[key]);
        }
        // improve performance by using call method on demand
        code = code.replace(reInvoke, function(expr, args)  {
            return "(that?" + expr + ":cb(" + args.split(",").slice(1).join() + "))";
        });

        return Function("cb", "that", "undefined", code);
    };

/**
 * Execute callback on each element in the collection
 * @param  {Function} callback  function that accepts (element, index, self)
 * @param  {Object}   [context] callback context
 * @return {$Node}
 * @function
 */
$Node.prototype.each = makeLoopMethod({
    BODY:  "cb.call(that, this[i], i, this)"
});

/**
 * Check if the callback returns true for any element in the collection
 * @param  {Function} callback   function that accepts (element, index, self)
 * @param  {Object}   [context]  callback context
 * @return {Boolean} true, if any element in the collection return true
 * @function
 */
$Node.prototype.some = makeLoopMethod({
    BODY:  "if (cb.call(that, this[i], i, this) === true) return true",
    END:   "return false"
});

/**
 * Check if the callback returns true for all elements in the collection
 * @param  {Function} callback   function that accepts (element, index, self)
 * @param  {Object}   [context]  callback context
 * @return {Boolean} true, if all elements in the collection returns true
 * @function
 */
$Node.prototype.every = makeLoopMethod({
    BEGIN: "var out = true",
    BODY:  "out = cb.call(that, this[i], i, this) && out",
    END:   "return out"
});

/**
 * Create an array of values by running each element in the collection through the callback
 * @param  {Function} callback   function that accepts (element, index, self)
 * @param  {Object}   [context]  callback context
 * @return {Array} new array of the results of each callback execution
 * @function
 */
$Node.prototype.map = makeLoopMethod({
    BEGIN: "var out = Array(this && this.length || 0)",
    BODY:  "out[i] = cb.call(that, this[i], i, this)",
    END:   "return out"
});

/**
 * Examine each element in a collection, returning an array of all elements the callback returns truthy for
 * @param  {Function} callback   function that accepts (element, index, self)
 * @param  {Object}   [context]  callback context
 * @return {Array} new array with elements where callback returned true
 * @function
 */
$Node.prototype.filter = makeLoopMethod({
    BEGIN: "var out = []",
    BODY:  "if (cb.call(that, this[i], i, this)) out.push(this[i])",
    END:   "return out"
});

/**
 * Boil down a list of values into a single value (from start to end)
 * @param  {Function} callback function that accepts (memo, element, index, self)
 * @param  {Object}   [memo]   initial value of the accumulator
 * @return {Object} the accumulated value
 * @function
 */
$Node.prototype.reduce = makeLoopMethod({
    BEGIN: "var len = arguments.length; if (len < 2) that = this[0]",
    BODY:  "that = cb(that, this[len < 2 ? i + 1 : i], i, this)",
    END:   "return that"
});

/**
 * Boil down a list of values into a single value (from end to start)
 * @param  {Function} callback function that accepts (memo, element, index, self)
 * @param  {Object}   [memo]   initial value of the accumulator
 * @return {Object} the accumulated value
 * @function
 */
$Node.prototype.reduceRight = makeLoopMethod({
    BEGIN: "var j, len = arguments.length; if (len < 2) that = this[this.length - 1]",
    BODY:  "j = n - i - 1; that = cb(that, this[len < 2 ? j - 1 : j], j, this)",
    END:   "return that"
});

/**
 * Execute code in a 'unsafe' block where the first callback argument is native object.
 * @memberOf $Node.prototype
 * @param  {Function} callback function that accepts (node, element, index, self)
 * @return {$Node}
 * @function
 */
$Node.prototype.legacy = makeLoopMethod({
    BODY:  "cb.call(that, this[i]._._node, this[i], i, this)"
});
},{"./node":29}],29:[function(require,module,exports){
"use strict";
/**
 * Used to represent a DOM node
 * @name $Node
 * @constructor
 * @private
 */
function $Node(node) {
    if (node) this[0] = node.__dom__ = this;

    this._ = {_node: node, _handlers: []};
    this.length = node ? 1 : 0;
}

exports["default"] = $Node;
},{}],30:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
/*
 * Helper for css selectors
 */
var rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\[([\w\-\=]+)\])?(?:\.([\w\-]+))?$/;
// Quick matching inspired by jQuery
exports["default"] = function(selector, context) {
    if (typeof selector !== "string") return null;

    var quick = rquickIs.exec(selector);

    if (quick) {
        //   0  1    2   3          4
        // [ _, tag, id, attribute, class ]
        if (quick[1]) quick[1] = quick[1].toLowerCase();
        if (quick[3]) quick[3] = quick[3].split("=");
        if (quick[4]) quick[4] = " " + quick[4] + " ";
    }

    return function(node)  {
        var result, found, test;

        if (!quick && !node.webkitMatchesSelector) {
            found = (context || document).querySelectorAll(selector);
            test = function(x)  {return x === node};
        }

        for (; node && node.nodeType === 1; node = node.parentNode) {
            if (quick) {
                result = (
                    (!quick[1] || node.nodeName.toLowerCase() === quick[1]) &&
                    (!quick[2] || node.id === quick[2]) &&
                    (!quick[3] || (quick[3][1] ? node.getAttribute(quick[3][0]) === quick[3][1] : node.hasAttribute(quick[3][0]))) &&
                    (!quick[4] || (" " + node.className + " ").indexOf(quick[4]) >= 0)
                );
            } else {
                // querySelectorAll is faster in all browsers except Webkit-based:
                // http://jsperf.com/queryselectorall-vs-matches/3
                if (node.webkitMatchesSelector) {
                    result = node.webkitMatchesSelector(selector);
                } else {
                    result = _.some.call(found, test);
                }
            }

            if (result || !context || node === context) break;
        }

        return result && node;
    };
}
},{"./utils":32}],31:[function(require,module,exports){
"use strict";
var _ = require("./utils")["default"];
/*
 * Helper for accessing css
 */
var hooks = {get: {}, set: {}},
    reDash = /\-./g,
    reCamel = /[A-Z]/g,
    directions = ["Top", "Right", "Bottom", "Left"],
    computed = _.computeStyle(_.docEl),
    // In Opera CSSStyleDeclaration objects returned by _.computeStyle have length 0
    props = computed.length ? _.slice.call(computed, 0) : Object.keys(computed).map(function(key)  {
        return key.replace(reCamel, function(str)  {return "-" + str.toLowerCase()});
    });

props.forEach(function(propName)  {
    var prefix = propName[0] === "-" ? propName.substr(1, propName.indexOf("-", 1) - 1) : null,
        unprefixedName = prefix ? propName.substr(prefix.length + 2) : propName,
        stylePropName = propName.replace(reDash, function(str)  {return str[1].toUpperCase()});
    // most of browsers starts vendor specific props in lowercase
    if (!(stylePropName in computed)) {
        stylePropName = stylePropName[0].toLowerCase() + stylePropName.substr(1);
    }

    if (stylePropName !== propName) {
        hooks.get[unprefixedName] = function(style)  {return style[stylePropName]};
        hooks.set[unprefixedName] = function(style, value)  {
            value = typeof value === "number" ? value + "px" : value.toString();
            // use cssText property to determine DOM.importStyles call
            style["cssText" in style ? stylePropName : propName] = value;
        };
    }
});

// Exclude the following css properties from adding px
" float fill-opacity font-weight line-height opacity orphans widows z-index zoom ".split(" ").forEach(function(propName)  {
    var stylePropName = propName.replace(reDash, function(str)  {return str[1].toUpperCase()});

    if (propName === "float") {
        stylePropName = "cssFloat" in computed ? "cssFloat" : "styleFloat";
        // normalize float css property
        hooks.get[propName] = function(style)  {return style[stylePropName]};
    }

    hooks.set[propName] = function(style, value)  {
        style["cssText" in style ? stylePropName : propName] = value.toString();
    };
});

// normalize property shortcuts
_.forOwn({
    font: ["fontStyle", "fontSize", "/", "lineHeight", "fontFamily"],
    padding: directions.map(function(dir)  {return "padding" + dir}),
    margin: directions.map(function(dir)  {return "margin" + dir}),
    "border-width": directions.map(function(dir)  {return "border" + dir + "Width"}),
    "border-style": directions.map(function(dir)  {return "border" + dir + "Style"})
}, function(props, key)  {
    hooks.get[key] = function(style)  {
        var result = [],
            hasEmptyStyleValue = function(prop, index)  {
                result.push(prop === "/" ? prop : style[prop]);

                return !result[index];
            };

        return props.some(hasEmptyStyleValue) ? "" : result.join(" ");
    };

    hooks.set[key] = function(style, value)  {
        if (value && "cssText" in style) {
            // normalize setting complex property across browsers
            style.cssText += ";" + key + ":" + value;
        } else {
            props.forEach(function(name)  {return style[name] = typeof value === "number" ? value + "px" : value.toString()});
        }
    };
});

exports["default"] = hooks;
},{"./utils":32}],32:[function(require,module,exports){
"use strict";
var doc = document,
    win = window,
    userAgent = win.navigator.userAgent,
    currentScript = doc.scripts[0],
    reVar = /\{([\w\-]+)\}/g;

exports["default"] = {
    makeError: function(method, DOM)  {
        var type = DOM ? "DOM" : "$Element";

        return TypeError(type + "." + method + " was called with illegal arguments. Check http://chemerisuk.github.io/better-dom to verify the function call");
    },
    computeStyle: function(node)  {
        return window.getComputedStyle ? window.getComputedStyle(node) : node.currentStyle;
    },
    injectElement: function(el)  {
        return currentScript.parentNode.insertBefore(el, currentScript);
    },
    format: function(template, varMap)  {
        return template.replace(reVar, function(x, name)  {return name in varMap ? varMap[name] : x});
    },
    raf: (function() {
        var lastTime = 0,
            propName = ["r", "webkitR", "mozR", "oR"].reduce(function(memo, name)  {
                var prop = name + "equestAnimationFrame";

                return memo || window[prop] && prop;
            }, null);

        if (propName) {
            return function(callback)  { window[propName](callback) };
        } else {
            return function(callback)  {
                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime));

                lastTime = currTime + timeToCall;

                if (timeToCall) {
                    setTimeout(callback, timeToCall);
                } else {
                    callback(currTime + timeToCall);
                }
            };
        }
    }()),
    // constants
    docEl: doc.documentElement,
    CSS3_ANIMATIONS: win.CSSKeyframesRule || !doc.attachEvent,
    LEGACY_ANDROID: ~userAgent.indexOf("Android") && userAgent.indexOf("Chrome") < 0,
    DOM2_EVENTS: !!doc.addEventListener,
    WEBKIT_PREFIX: win.WebKitAnimationEvent ? "-webkit-" : "",
    // utilites
    forOwn: function(obj, fn, thisPtr)  {
        Object.keys(obj).forEach(function(key)  { fn.call(thisPtr, obj[key], key) });

        return thisPtr;
    },
    slice: Array.prototype.slice,
    every: Array.prototype.every,
    each: Array.prototype.forEach,
    some: Array.prototype.some
};
},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);