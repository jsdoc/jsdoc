'use strict';

var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
var CARET = 0x5E;


module.exports = function changeCasePlugin(md, transform) {
    md.inline.ruler.after('emphasis', 'change_case', function(state) {
        var max = state.posMax;
        var start = state.pos;

        if (state.src.charCodeAt(start) !== CARET || start + 2 >= max) {
            return false;
        }

        state.pos = start + 1;

        var found;
        while (state.pos < max) {
            if (state.src.charCodeAt(state.pos) === CARET) {
                found = true;
                break;
            }

            state.md.inline.skipToken(state);
        }

        if (!found || start + 1 === state.pos) {
            state.pos = start;
            return false;
        }

        var content = state.src.slice(start + 1, state.pos);

        state.posMax = state.pos;
        state.pos = start + 1;

        var token = state.push('text', '', 0);
        token.markup = '^';
        token = state.push('text', '', 0);
        token.content = content.replace(UNESCAPE_RE, '$1');
        token.content = transform === 'lower' ? token.content.toLowerCase() : token.content.toUpperCase();
        token = state.push('text', '', 0);
        token.markup = '^';

        state.pos = state.posMax + 1;
        state.posMax = max;
        return true;
    });
};
