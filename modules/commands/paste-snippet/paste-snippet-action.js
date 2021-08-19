const { asyncActionSetup } = require("../../action-setup");
const { showErrorMessage } = require("../../ui-services/messageService");

function pasteSnippet() {
    let actionSetup = null;
    return asyncActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => {
            const snippetText = require('../../snippets/snippet-snippet.json').body;
        })

        .catch(function(error){
            showErrorMessage(error.message);
        });
}

module.exports = {
    pasteSnippet
};