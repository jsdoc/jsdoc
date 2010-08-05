/**
 * Normal Template
 */

var TOKEN_RE = new RegExp("(\{[\=\:\#\/].+?\})"),
	COMMAND_RE = new RegExp("^\{[\:\/\=]");

var xpath = function (path) {
	if (path === '$last') {
		return "$last";
	}
	
    if (/\||;|\$|~/.test(path)) {
        throw new Error("Invalid characters in path '" + path + "'");
    }

    path = path.replace(/\//g, ".").replace(/'|"/, "");
    
    if (path == ".") {
        return "d";
    } else if (/^\./.test(path)) {
        return "data" + path;
    } else {
        return "d." + path;
    }
}

/**
 * Template filters. Add your own to this dictionary.
 */
exports.filters = {
    str: function (val) { // used to override default filtering.
        return val.toString();
    },
    strip: function (val) { 
        return val.toString().replace(/<([^>]+)>/g, "");
    },        
    html: function (val) {
        return val.toString().replace(/&/g, "&amp;").replace(/>/g, "&gt;").
                   replace(/</g, "&lt;");
    },
    attr: function (val) {
        return val.toString().replace(/&/g, "&amp;").replace(/>/g, "&gt;").
                   replace(/</g, "&lt;").replace(/"/g, "&quot;");
    },
    uri: encodeURI
}

/**
 * Compile the template source into the template function.
 */
exports.compile = function (src, options) {
    // v = curent value, d = cursor, a = reduced array, df = default filter, res = result
    var code = ['var v,a,d = data,res = [];'],
        stack = ["data"],
        nesting = [],
        tokens = src.split(TOKEN_RE);

    var filters, tag;

    if (options && options.filters) {
        filters = {};
        for (var i in exports.filters) filters[i] = exports.filters[i];
        for (var i in options.filters) filters[i] = options.filters[i];
    } else {
        filters = exports.filters;
    }

    if (filters.defaultfilter) {
        code.push('var df = filters.defaultfilter;');
    }
               
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        
        if (token == "") continue;

        if (token.match(COMMAND_RE)) {
            if (token[1] == ":") { // open tag
                var parts = token.substring(2, token.length-1).split(" "),
                    cmd = parts[0],
                    arg = parts[1],
                    val;
              
                switch (cmd) {
                case "if": // checks for undefined and boolean.
                    nesting.push("if");
                    val = xpath(arg);
                    code.push('if (' + val + ') {');
                    continue;                    

                case "select":
                case "s":
                    nesting.push("select");
                    val = xpath(arg);
                    code.push('d = ' + val + ';if (d != undefined) {');
                    stack.unshift(val.replace(/^d\./, stack[0] + "."));
                    continue;                    
                
                case "reduce":
                case "r":
                    nesting.push("reduce");
                    val = xpath(arg);
                    var depth = stack.length;
                    code.push('var a' + depth + ' = ' + val + ';if ((a' + depth + ' != undefined) && (a' + depth + '.length > 0)) ');
                    stack.unshift("a" + depth + "[i" + depth + "]");
                    code.push('for (var i' + depth + ' = 0,l' + depth + ' = a' + depth + '.length; i' + depth + ' < l' + depth + '; i' + depth + '++) {$last = (i' + depth + ' == l' + depth + '-1); d = a' + depth + '[i' + depth + '];');                
                    continue;                    
                    
                case "else":
                case "e":
                    tag = nesting.pop();
                    if (tag) {
                        code.push('} else {');
                        nesting.push(tag);
                    } else {
                        throw new Error("Unbalanced 'else' tag");
                    }
                    continue;

                case "lb": // output left curly bracket '{'
                    code.push('res.push("{");');
                    continue;

                case "rb": // output right curly bracket '}'
                    code.push('res.push("}");');
                    continue;

                case "!": // comment
                    continue;
                }
            } else if (token[1] == "/") { // close tag
                if (token[2] == ":") {
                    var cmd = token.substring(3, token.length-1).split(" ")[0];

                    switch (cmd) {
                    case "if":
                        tag = nesting.pop();
                        if (tag == "if") {
                            code.push('};');
                        } else {
                            throw new Error("Unbalanced 'if' close tag" + (tag ? ", expecting '" + tag + "' close tag" : ""));
                        }
                        continue;

                    case "select":
                    case "s":
                        tag = nesting.pop();
                        if (tag == "select") {
                            stack.shift();
                            code.push('};d = ' + stack[0] + ';');
                        } else {
                            throw new Error("Unbalanced 'select' close tag" + (tag ? ", expecting '" + tag + "' close tag" : ""));
                        }
                        continue;

                    case "reduce":
                    case "r":
                        tag = nesting.pop();
                        if (tag == "reduce") {
                            stack.shift();
                            code.push('}; $last = false; d = ' + stack[0] + ';');
                        } else {
                            throw new Error("Unbalanced 'reduce' close tag" + (tag ? ", expecting '" + tag + "' close tag" : ""));
                        }
                        continue;
                    }
                }
            } else if (token[1] == "=") { // interpolation
                var parts = token.substring(2, token.length-1).split(" "),
                    pre = "", post = "";
                for (var j = 0; j < parts.length-1; j++) {
                    pre += "filters." + parts[j] + "("; post += ")";
                }
                if (pre == "") {
                    if (filters.defaultfilter) {
                        pre = "df("; post = ")";
                    }
                }
                code.push('v = ' + xpath(parts[j]) + ';if (v != undefined) res.push(' + pre + 'v' + post +');');
                continue;
            }
        }

        // plain text
        code.push('res.push("' + token.replace(/\\/g, "\\\\").replace(/\r/g, "").replace(/\n/g, "\\n").replace(/"/g, '\\"') + '");');
    }    

    tag = nesting.pop();
    if (tag) {
        throw new Error("Unbalanced '" + tag + "' tag, is not closed");
    }

    code.push('return res.join("");');    

    var func = new Function("data", "filters", code.join(""));

    return function (data) { return func(data, filters) };
}