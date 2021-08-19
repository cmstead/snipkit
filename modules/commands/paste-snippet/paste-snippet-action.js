const { asyncActionSetup } = require("../../action-setup");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const { transformToBodyText } = require("../../transforms/string-to-body");
const { showErrorMessage } = require("../../ui-services/messageService");

const vscode = require('../../vscode-service').getVscode();

function pasteSnippet() {
    let actionSetup = null;
    return asyncActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => vscode.env.clipboard.readText())
        .then((clipboardText) => transformToBodyText(clipboardText))
        .then((bodyText) => vscode.env.clipboard.writeText(bodyText))

        .then(() => {
            const snippetText = require('../../snippets/snippet-snippet.json').body.join('\n');

            return insertSnippetIntoDocument(actionSetup.location, snippetText);
        })

        .catch(function(error){
            showErrorMessage(error.message);
        });
}

module.exports = {
    pasteSnippet
};