const vscode = require('../../vscode-service').getVscode();

function editSnippets() {
    vscode.commands.executeCommand("workbench.action.openSnippets");

    return Promise.resolve(true);
}

module.exports = {
    editSnippets
}