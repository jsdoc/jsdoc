/** @constructor */
function Message(to) {
    
    var headers = {};
    
    /** document me */
    headers.to = to;
    
    (function() {
        /** document me */
        headers.from = '';
    })()
}

