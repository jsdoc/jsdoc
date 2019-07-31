/*global document */
(() => {
    const source = document.getElementsByClassName('prettyprint source linenums');
    let i = 0;
    let lineNumber = 0;
    let lineId;
    let lines;
    let totalLines;
    let anchorHash;
    let from = -1;
    let to;

    if (source && source[0]) {
        anchorHash = document.location.hash.substring(1);
        if (anchorHash.indexOf("to") != -1) {
            from = anchorHash.split('to')[0].split('line')[1];
            to = anchorHash.split('to')[1];
        }
        lines = source[0].getElementsByTagName('li');
        totalLines = lines.length;

        for (; i < totalLines; i++) {
            lineNumber++;
            lineId = `line${lineNumber}`;
            lines[i].id = lineId;
            if (lineId === anchorHash || (lineNumber >= parseInt(from) && lineNumber <= parseInt(to))) {
                lines[i].className += ' selected';
            }
        }
        if (from != -1)
            document.getElementById("line" + from).scrollIntoView();
    }
})();