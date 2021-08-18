const { buildNodePath } = require('./node-path');
const { parseSource } = require('./parser/parser');

const vscode = require('./vscode-service').getVsCode();

function transformSelectionToLocation(selection) {
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

function actionSetup() {

    const activeTextEditor = vscode.window.activeTextEditor;
    const location = transformSelectionToLocation(activeTextEditor.selection);
    const source = activeTextEditor.document.getText();
    const ast = parseSource(source);
    const selectionPath = buildNodePath(ast.child, location);

    return {
        source,
        ast,
        selectionPath
    }
}

function asyncActionSetup() {
    return Promise.resolve(actionSetup());
}

module.exports = {
    actionSetup,
    asyncActionSetup
};