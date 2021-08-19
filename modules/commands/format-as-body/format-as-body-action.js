const { asyncTextOnlyActionSetup } = require("../../action-setup");
const { getNewSourceEdit } = require("../../edit-utils/SourceEdit");
const { transformLocationToRange } = require("../../edit-utils/textEditTransforms");
const { getSourceSelection } = require("../../source-utilities");
const { transformToBodyText } = require("../../transforms/string-to-body");
const { showErrorMessage } = require("../../ui-services/messageService");

function formatAsBody() {
    let actionSetup = null;
    return asyncTextOnlyActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => getSourceSelection(actionSetup.source, actionSetup.location))
        .then((selectedText) => transformToBodyText(selectedText))
        .then((transformedText) => {
            const replacementRange = transformLocationToRange(actionSetup.location);

            return getNewSourceEdit()
                .addReplacementEdit(replacementRange, transformedText)
                .applyEdit();
        })

        .catch(function(error){
            showErrorMessage(error.message);
        });
}

module.exports = {
    formatAsBody
};