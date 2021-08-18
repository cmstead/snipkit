function transformSelectionToPosition(selection) {
    return {
        start: {
            line: selection.start.line + 1,
            column: selection.start.character + 1
        },
        end: {
            line: selection.end.line + 1,
            column: selection.end.character + 1
        }
    };
}

module.exports = {
    transformSelectionToPosition
};