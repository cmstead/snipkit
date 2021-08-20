const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const vscode = require('./vscode-service').getVscode();

function statFile(filePath) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch (error) {
        return false;
    }
}


function openFile(filePath) {
    const snippetUri = vscode.Uri.file(filePath);
    
    return vscode.workspace.openTextDocument(snippetUri)
        .then((textDocument) =>
            vscode.window.showTextDocument(textDocument))
}

function openLanguageSnippetFile(context) {
    const languageId = vscode.window.activeTextEditor.document.languageId;
    const userRoot = path.join(context.globalStorageUri.path, '../../').slice(1);

    const snippetRoot = path.join(
        userRoot,
        "snippets"
    );

    const snippetFilePath = path.join(
        snippetRoot,
        `${languageId}.json`
    );

    const snippetFileExists = statFile(snippetFilePath);
    const asyncWriteFile = promisify(fs.writeFile);

    if (snippetFileExists) {
        return openFile(snippetFilePath);
    } else {
        return asyncWriteFile(snippetFilePath, '{}')
            .then(() => openFile(snippetFilePath));
    }
}

module.exports = openLanguageSnippetFile;