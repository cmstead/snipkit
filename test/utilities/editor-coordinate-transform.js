class EditorCoords {
    constructor({ line = 1, column = 1 }) {
        this.line = line;
        this.column = column;
    }
}

const defaultEditorCoords = new EditorCoords({});

class EditorRange {
    constructor({
        start = defaultEditorCoords,
        end = defaultEditorCoords
    }) {
        this.start = start;
        this.end = end;
    }
}

const defaultEditorRange = new EditorRange({});

function transformEditorRangeToSelection(editorRange = defaultEditorRange) {
    return {
        start: {
            line: editorRange.start.line,
            column: editorRange.start.column - 1
        },
        end: {
            line: editorRange.end.line,
            column: editorRange.end.column - 1
        }
    }
}

function getNewEditorCoords({ line = 1, column = 1 }) {
    return new EditorCoords({ line, column });
}

function getNewEditorRange({
    start = defaultEditorCoords,
    end = defaultEditorCoords
}) {
    return new EditorRange({ start, end });
}

module.exports = {
    getNewEditorCoords,
    getNewEditorRange,
    transformEditorRangeToSelection
};