exports.print = function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    java.lang.System.out.print(String(arguments[i]));
  }
};

exports.puts = function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    java.lang.System.out.println(arguments[i] + '\n');
  }
};

exports.debug = function(x) {
  exports.puts('DEBUG: ' + x + '\n');
};

var error = exports.error = function(x) {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    exports.puts(arguments[i] + '\n');
  }
};

exports.format = {
  stylize: function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
          'italic' : [3, 23],
          'underline' : [4, 24],
          'inverse' : [7, 27],
          'white' : [37, 39],
          'grey' : [90, 39],
          'black' : [30, 39],
          'blue' : [34, 39],
          'cyan' : [36, 39],
          'green' : [32, 39],
          'magenta' : [35, 39],
          'red' : [31, 39],
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\033[' + styles[style][0] + 'm' + str +
             '\033[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  },

    pad: function (n) {
      return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
exports.timestamp = function() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


exports.log = function(msg) {
  exports.puts(exports.timestamp() + ' - ' + msg.toString());
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be revritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false }
  });
};

exports.mixin = function(target, source){
    var property, empty = {};

    for (property in source) {
        if( !(property in empty) ) {
            target[property] = source[property];
        }
    }
    
    return target;
};