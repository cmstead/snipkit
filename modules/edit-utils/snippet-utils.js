const vscode = require('../vscode-service').getVscode()
const { transformLocationToRange } = require('./textEditTransforms');

function insertSnippetIntoDocument(location, snippetText) {
    const insertLocation = transformLocationToRange(location);
    const snippetString = new vscode.SnippetString(snippetText);

    return vscode.window.activeTextEditor
        .insertSnippet(snippetString, insertLocation)
}

module.exports = {
    insertSnippetIntoDocument
};