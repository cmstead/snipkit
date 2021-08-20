const vscode = require('../vscode-service').getVscode()
const { transformLocationToRange } = require('./textEditTransforms');

function insertSnippetIntoDocument(location, snippetText) {
    const insertRange = transformLocationToRange(location);
    const snippetString = new vscode.SnippetString(snippetText);

    return vscode.window.activeTextEditor
        .insertSnippet(snippetString, insertRange)
}

module.exports = {
    insertSnippetIntoDocument
};