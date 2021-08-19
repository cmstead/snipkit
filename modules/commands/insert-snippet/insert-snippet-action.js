const { asyncActionSetup } = require("../../action-setup");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const { openSelectList } = require("../../ui-services/inputService");
const { showErrorMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");

function insertSnippet() {
    let actionSetup = null;
    let snippets = null;
    return asyncActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => require('../../../snippets.json'))
        .then((newSnippets) => snippets = newSnippets)

        .then(() => Object.keys(snippets))
        .then((snippetKeys) => openSelectList({
            values: snippetKeys,
            title: 'Which snippet do you want to insert?'
        }))
        .then((selectedKey) => validateUserInput({
            value: selectedKey,
            validator: (selectedKey) => typeof snippets[selectedKey.trim()] !== 'undefined',
            message: 'No valid snippet was selected; canceling snippet insert'
        }))
        .then((snippetKey) => snippets[snippetKey].body.join('\n'))

        .then((snippetText) => {
            return insertSnippetIntoDocument(actionSetup.location, snippetText);
        })

        .catch(function (error) {
            showErrorMessage(error.message);
        });

    // return Promise.resolve('');
}

module.exports = {
    insertSnippet
};