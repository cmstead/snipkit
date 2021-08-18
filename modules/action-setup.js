const { buildSelectionPath } = require('./selection-path');
const { parseSource } = require('./parser/parser');
const { transformSelectionToPosition } = require('./transforms/selection-to-position');

const vscode = require('./vscode-service').getVscode();

function actionSetup() {

    const activeTextEditor = vscode.window.activeTextEditor;
    const location = transformSelectionToPosition(activeTextEditor.selection);
    const source = activeTextEditor.document.getText();

    try {
        const ast = parseSource(source);
        const selectionPath = buildSelectionPath(ast.child, location);

        return {
            activeTextEditor,
            source,

            location,
            ast,
            selectionPath
        }
    } catch (_) {
        throw new Error('Unable to interpret JSON source; SnipKit cannot start')
    }
}

function asyncActionSetup() {
    return Promise.resolve(actionSetup());
}

module.exports = {
    actionSetup,
    asyncActionSetup
};