const { asyncTextOnlyActionSetup } = require("../../action-setup");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const { showErrorMessage } = require("../../ui-services/messageService");

function insertZero() {
    return asyncTextOnlyActionSetup()
        .then((actionSetup) => {
            return insertSnippetIntoDocument(actionSetup.location, '\$0');
        })

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    insertSnippet: insertZero
};