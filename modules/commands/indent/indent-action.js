const { asyncActionSetup } = require("../../action-setup");
const { getNewSourceEdit } = require("../../edit-utils/SourceEdit");
const { transformLocationToRange } = require("../../edit-utils/textEditTransforms");
const { getNormalizedSelection } = require("../../selection-utilities");
const { getSourceSelection } = require("../../source-utilities");
const { showErrorMessage } = require("../../ui-services/messageService");
const { validateUserInput } = require("../../validatorService");

function indent() {
    let actionSetup = null;
    let sourceSelection = null;
    let indentedSelection = null;
    let normalizedSelection = null;
    return asyncActionSetup()
        .then((newActionSetup) => {
            actionSetup = newActionSetup;
        })

        .then(() => getNormalizedSelection(actionSetup.source, actionSetup.location))
        .then((newNormalizedSelection) => normalizedSelection = newNormalizedSelection)

        .then(() => getSourceSelection(actionSetup.source, normalizedSelection))
        .then((sourceSelection) => validateUserInput({
            value: sourceSelection,
            validator: sourceSelection =>
                sourceSelection
                    .split(/\r?\n/g)
                    .reduce((result, line) =>
                        result && /^\s*"?/.test(line)),
            message: "Invalid body selection: not all lines begin with an open quote"
        }))
        .then((newSourceSelection) => sourceSelection = newSourceSelection)

        .then(() => indentedSelection = sourceSelection
            .split(/\r?\n/g)
            .map((line) => line.replace(/^(\s*)"/, '$1\"\\t'))
            .join('\n'))

        .then(() => {
            const replacementRange = transformLocationToRange(normalizedSelection);

            return getNewSourceEdit()
                .addReplacementEdit(replacementRange, indentedSelection)
                .applyEdit()
        })

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    indent
};