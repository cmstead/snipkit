const { window } = require('../vscode-service').getVscode();

function showErrorMessage(message) {
    console.log(message);

    return window.showErrorMessage(message);
}

module.exports = {
    showErrorMessage
};