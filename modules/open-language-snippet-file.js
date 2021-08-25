const fs = require('fs');
const { promisify } = require('util');

const vscode = require('./vscode-service').getVscode();
const { buildSnippetFilePath } = require('./snippet-file-utils');

function statFile(filePath) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch (error) {
        return false;
    }
}

function openFile(filePath) {
    let snippetUri = vscode.Uri.file(filePath);

    return vscode.workspace.openTextDocument(snippetUri)
        .then((textDocument) =>
            vscode.window.showTextDocument(textDocument))
}

function openLanguageSnippetFile(context) {
    const snippetFilePath = buildSnippetFilePath(context);

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