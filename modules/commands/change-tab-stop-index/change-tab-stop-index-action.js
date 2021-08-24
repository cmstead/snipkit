const { asyncTextOnlyActionSetup } = require("../../action-setup");
const { insertSnippetIntoDocument } = require("../../edit-utils/snippet-utils");
const { getTabStopNumberOffset, getOffset } = require("../../tab-stop-service");
const { showErrorMessage } = require("../../ui-services/messageService");

function getSnippetInsertLocation(line, actionSetup) {
    const cursorPosition = actionSetup.location.start.column - 1;
    const tabStopOffset = getOffset(line, cursorPosition);

    if(tabStopOffset === null) {
        throw new Error('Could not find an appropriate tab stop; try placing your cursor at the end of the tab stop number');
    }

    const tabStopNumberOffset = getTabStopNumberOffset(line, tabStopOffset, cursorPosition);

    return {
        start: {
            line: actionSetup.location.start.line,
            column: actionSetup.location.start.column - tabStopNumberOffset.start
        },
        end: {
            line: actionSetup.location.start.line,
            column: actionSetup.location.start.column - tabStopNumberOffset.end
        }
    };
}

function changeTabStopIndex() {
    let actionSetup = null;
    let snippets = require('../../../snippets.json');

    return asyncTextOnlyActionSetup()
        .then((newActionSetup) => actionSetup = newActionSetup)

        .then(() => {
            const line = actionSetup.location.start.line - 1;
            const sourceLines = actionSetup.source.split(/\r?\n/);

            return sourceLines.slice(line, line + 1)[0];
        })

        .then((line) => getSnippetInsertLocation(line, actionSetup))

        .then((snippetInsertLocation) => {
            const tabStopIndexSnippet = snippets['Tab Stop Index'].body.join('\n');

            return insertSnippetIntoDocument(snippetInsertLocation, tabStopIndexSnippet);
        })

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    changeTabStopIndex
}