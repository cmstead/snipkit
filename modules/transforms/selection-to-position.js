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

function transformPositionToSelection(position) {
    return {
        start: {
            line: position.start.line - 1,
            character: position.start.column - 1
        },
        end: {
            line: position.end.line - 1,
            character: position.end.column - 1
        }
    };
}

module.exports = {
    transformPositionToSelection,
    transformSelectionToPosition
};