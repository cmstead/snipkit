function transformSelectionToPosition(selection) {
    return {
        start: {
            line: selection.start.line,
            column: selection.start.character + 1
        },
        end: {
            line: selection.end.line,
            column: selection.end.character + 1
        }
    };
}

module.exports = {
    transformSelectionToPosition
};