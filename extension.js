const vscode = require('vscode');

const actions = require('./actions');

function activate(context) {
	const formatDocument = () =>
		vscode.commands.executeCommand("editor.action.formatDocument");

	actions.forEach(function (action) {
		let disposable = vscode.commands.registerCommand(`cmstead.snipkit.${action.commandName}`, function () {
			require(action.path)[action.functionName]()
				.then(formatDocument);
		});
	
		context.subscriptions.push(disposable);
	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
