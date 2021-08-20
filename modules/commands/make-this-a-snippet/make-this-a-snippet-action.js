const { asyncTextOnlyActionSetup, asyncActionSetup } = require("../../action-setup");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const openLanguageSnippetFile = require("../../open-language-snippet-file");
const { getSourceSelection } = require("../../source-utilities");
const { showErrorMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");

const { getPasteLocation, buildSnippetText } = require("./make-this-a-snippet");

function makeThisASnippet(context) {
    let textActionSetup = null;
    let selectedSource = null;

    let actionSetup = null;
    return asyncTextOnlyActionSetup()
        .then((newTextActionSetup) => textActionSetup = newTextActionSetup)

        .then(() => getSourceSelection(textActionSetup.source, textActionSetup.location))
        .then((selectedSource) => validateUserInput({
            value: selectedSource,
            validator: (selectedSource) => selectedSource.trim() !== '',
            message: 'No text selected; canceling snippet creation'
        }))
        .then((newSelectedSource) => selectedSource = newSelectedSource)

        .then(() => {
            return openLanguageSnippetFile(context);
        })

        .then(() => asyncActionSetup())
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => require('../../snippets/snippet-snippet.json'))

        .then((snippetJson) => {
            const rootObject = actionSetup.selectionPath[0];
            const properties = rootObject.properties;

            const pasteLocation = getPasteLocation(rootObject);
            const snippetText = buildSnippetText(selectedSource, snippetJson, properties)

            return {
                pasteLocation,
                snippetText
            };
        })

        .then(({ pasteLocation, snippetText }) =>
            insertSnippetIntoDocument(pasteLocation, snippetText))

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    makeThisASnippet
};