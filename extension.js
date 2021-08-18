const vscode = require('vscode');

function activate(context) {
	const formatDocument = () =>
		vscode.commands.executeCommand("editor.action.formatDocument");

	let disposable = vscode.commands.registerCommand('cmstead.snipkit.indent', function () {
		require('./modules/commands/indent/indent-action')
			.indent()
			.then(formatDocument);
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
