const { asyncTextOnlyActionSetup } = require("../../action-setup");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const { buildSnippetFilePath } = require("../../snippet-file-utils");
const { openSelectList } = require("../../ui-services/inputService");
const { showErrorMessage, showInformationMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");
const { readSnippetData } = require("./find-snippet");

function findSnippet(context) {
    let snippetData = null;
    let actionSetup = null;
    return asyncTextOnlyActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)
        .then(() => buildSnippetFilePath(context))

        .then((snippetFilePath) => readSnippetData(snippetFilePath))

        .then((newSnippetData) => snippetData = newSnippetData)

        .then((snippetData) => validateUserInput({
            value: snippetData,
            validator: (snippetData) => Object.keys(snippetData).length > 0,
            message: 'No snippets available for this language'
        }))

        .then((snippetData) => openSelectList({
            values: Object.keys(snippetData),
            title: 'Which snippet do you want to use?'
        }))

        .then((snippetKey) => validateUserInput({
            value: snippetKey,
            validator: (snippetKey) =>
                typeof snippetData[snippetKey] !== 'undefined',
            message: 'Invalid snippet selection: cannot insert snippet'
        }))

        .then((snippetKey) => {
            const message = `Inserting snippet "${snippetKey}": ${snippetData[snippetKey].prefix}`;

            showInformationMessage(message);

            return snippetKey;
        })

        .then((snippetKey) => snippetData[snippetKey].body.join('\n'))

        .then((snippetText) => 
            insertSnippetIntoDocument(actionSetup.location, snippetText))

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    findSnippet
};