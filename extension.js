const vscode = require('vscode');

const actions = require('./actions');
const { showErrorMessage } = require('./modules/ui-services/messageService');

function activate(context) {
	const formatDocument = () =>
		vscode.commands.executeCommand("editor.action.formatDocument");

	actions.forEach(function (action) {
		let disposable = vscode.commands.registerCommand(`cmstead.snipkit.${action.commandName}`, function () {
			require(action.path)[action.functionName](context)
				.then(formatDocument)
				.catch(function(error){
					showErrorMessage(error.message);
				});
		});
	
		context.subscriptions.push(disposable);
	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
