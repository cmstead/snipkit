const { asyncTextOnlyActionSetup, asyncActionSetup } = require("../../action-setup");
const { transformSelectionToLocation } = require("../../edit-utils/code-range-transforms");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const openLanguageSnippetFile = require("../../open-language-snippet-file");
const { getSourceSelection } = require("../../source-utilities");
const { transformPositionToSelection } = require("../../transforms/selection-to-position");
const { transformToBodyText } = require("../../transforms/string-to-body");
const { showErrorMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");

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
            console.log('opening snippet file');
            return openLanguageSnippetFile(context);
        })

        .then(() => asyncActionSetup())
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => {
            const rootObject = actionSetup.selectionPath[0];
            const properties = rootObject.properties;

            let pastePosition = null;

            if (properties.length === 0) {
                const pasteStart = {
                    line: rootObject.position.start.line,
                    column: rootObject.position.start.column + 1
                };

                pastePosition = {
                    start: pasteStart,
                    end: pasteStart
                }
            } else {
                const lastProperty = properties[properties.length - 1];

                const pasteStart = {
                    line: lastProperty.value.position.end.line,
                    column: lastProperty.value.position.end.column
                };

                pastePosition = {
                    start: pasteStart,
                    end: pasteStart
                }
            }

            const pasteSelection = transformPositionToSelection(pastePosition);
            const pasteLocation = transformSelectionToLocation(pasteSelection);

            const snippetJson = require('../../snippets/snippet-snippet.json');
            const bodyText = transformToBodyText(selectedSource);
            const snippetText = snippetJson.body.join('\n').replace('${body}', bodyText);

            const snippetPrefix = properties.length > 0 ? ',\n' : '';

            return insertSnippetIntoDocument(pasteLocation, `${snippetPrefix}${snippetText}`);
        })

        .then(() => new Promise(function (resolve) {
            setTimeout(() => resolve(''), 15);
        }))

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    makeThisASnippet
};