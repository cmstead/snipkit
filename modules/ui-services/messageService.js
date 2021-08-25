const { window } = require('../vscode-service').getVscode();

function showErrorMessage(message) {
    console.log(message);

    return window.showErrorMessage(message);
}

function showInformationMessage(message) {
    return window.showInformationMessage(message);
}

module.exports = {
    showErrorMessage,
    showInformationMessage
};