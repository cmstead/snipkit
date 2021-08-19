const { buildSelectionPath } = require('./selection-path');
const { parseSource } = require('./parser/parser');
const { transformSelectionToPosition } = require('./transforms/selection-to-position');
const { showErrorMessage } = require('./ui-services/messageService');
const { transformSelectionToLocation } = require('./edit-utils/code-range-transforms');

const vscode = require('./vscode-service').getVscode();

function actionSetup() {

    const activeTextEditor = vscode.window.activeTextEditor;
    const position = transformSelectionToPosition(activeTextEditor.selection);
    const location = transformSelectionToLocation(activeTextEditor.selection);
    const source = activeTextEditor.document.getText();

    try {
        const ast = parseSource(source);
        const selectionPath = buildSelectionPath(ast.child, position);

        return {
            activeTextEditor,
            source,

            location,
            position,
            ast,
            selectionPath
        }
    } catch (_) {
        showErrorMessage('Unable to interpret JSON source; SnipKit cannot start')
    }
}

function textOnlyActionSetup() {
    const activeTextEditor = vscode.window.activeTextEditor;
    const location = transformSelectionToLocation(activeTextEditor.selection);
    const source = activeTextEditor.document.getText();

    return {
        activeTextEditor,
        source,
        location
    }
}

function asyncTextOnlyActionSetup() {
    return Promise.resolve(textOnlyActionSetup());
}

function asyncActionSetup() {
    return Promise.resolve(actionSetup());
}

module.exports = {
    actionSetup,
    asyncActionSetup,
    asyncTextOnlyActionSetup
};