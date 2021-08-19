const snipkitActions = require('../../../actions');
const { ACTION } = require('../../../actionTypes');
const { openSelectList } = require('../../ui-services/inputService');
const { showErrorMessage } = require('../../ui-services/messageService');
const { validateUserInput } = require('../../validatorService');

const vscode = require('../../vscode-service').getVscode();

function setValue(obj, key, value) {
    obj[key] = value;
    return obj;
}

function selectAction() {
    const selectedActions = snipkitActions
        .filter(action => action.type === ACTION);

    const actionMap = selectedActions
        .reduce((map, action) => setValue(map, action.title, action.commandName), {});

    const actionList = Object.keys(actionMap);

    return openSelectList({
        title: 'What do you want to do?',
        values: actionList
    })
        .then((selectedAction) => validateUserInput({
            value: selectedAction,
            validator: (selectedAction) => typeof actionMap[selectedAction] !== 'undefined',
            message: 'No action selected; canceling SnipKit action'
        }))
        .then((selectedAction) => {
            const commandName = actionMap[selectedAction];

            return vscode.commands.executeCommand(`cmstead.snipkit.${commandName}`);
        })

        .catch(function (error) {
            showErrorMessage(error.message);
        });
}

module.exports = {
    selectAction
};