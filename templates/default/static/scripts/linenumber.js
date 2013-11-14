(function() {
    var source = document.getElementsByClassName('prettyprint source linenums');
    var i = 0, lineNumber = 0, lineId, lines, totalLines, anchorHash;

    if (source && source[0]) {
        anchorHash = document.location.hash.substring(1);
        lines = source[0].getElementsByTagName('li');
        totalLines = lines.length;

        for (; i < totalLines; i++) {
            lineNumber++;
            lineId = 'line' + lineNumber;
            lines[i].id = lineId;
            if (lineId == anchorHash) {
                lines[i].className += ' selected';
            }
        }
    }
})();