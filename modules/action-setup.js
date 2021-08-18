const { buildSelectionPath } = require('./selection-path');
const { parseSource } = require('./parser/parser');
const { transformSelectionToPosition } = require('./transforms/selection-to-position');

const vscode = require('./vscode-service').getVsCode();

function actionSetup() {

    const activeTextEditor = vscode.window.activeTextEditor;
    const location = transformSelectionToPosition(activeTextEditor.selection);
    const source = activeTextEditor.document.getText();
    const ast = parseSource(source);
    const selectionPath = buildSelectionPath(ast.child, location);

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