function isMulticharacterSelection(selection) {
    return selection.start.line !== selection.end.line || selection.start.column !== selection.end.column
}

function getSingleLineSelection(sourceText, selection) {
    const sourceLines = sourceText.split(/\r?\n/);
    const sourceLine = sourceLines[selection.start.line - 1];

    return {
        start: {
            line: selection.start.line,
            column: 0
        },
        end: {
            line: selection.start.line,
            column: sourceLine.length - 1
        }
    };
}

function getNormalizedSelection(sourceText, selection) {
    if (isMulticharacterSelection(selection)) {
        return selection;
    } else {
        return getSingleLineSelection(sourceText, selection);
    }
}

module.exports = {
    getNormalizedSelection
};