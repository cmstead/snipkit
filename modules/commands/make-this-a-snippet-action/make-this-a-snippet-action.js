const { asyncTextOnlyActionSetup, asyncActionSetup } = require("../../action-setup");
const openLanguageSnippetFile = require("../../open-language-snippet-file");
const { getSourceSelection } = require("../../source-utilities");
const { showErrorMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");

function makeThisASnippet(context) {
    let textActionSetup = null;
    let selectedSource = null;
    return asyncTextOnlyActionSetup()
        .then((newTextActionSetup) => textActionSetup = newTextActionSetup)

        .then(() => getSourceSelection(textActionSetup.source, textActionSetup.location))
        .then((selectedSource) => validateUserInput({
            value: selectedSource,
            validator: (selectedSource) => selectedSource.trim() !== '',
            message: 'No text selected; canceling snippet creation'
        }))
        .then((newSelectedSource) => selectedSource = newSelectedSource)

        .then(() => openLanguageSnippetFile(context))

        .then(() => asyncActionSetup)

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    makeThisASnippet
};