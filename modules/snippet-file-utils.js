const os = require('os');
const path = require('path');

const vscode = require('./vscode-service').getVscode();

function buildSnippetFilePath(context) {
    const languageId = vscode.window.activeTextEditor.document.languageId;
    let userRoot = path.join(context.globalStorageUri.path, '../../');

    if (/^win/.test(os.platform())) {
        userRoot = userRoot.slice(1);
    }

    const snippetRoot = path.join(
        userRoot,
        "snippets"
    );

    return path.join(
        snippetRoot,
        `${languageId}.json`
    );
}

module.exports = {
    buildSnippetFilePath
};