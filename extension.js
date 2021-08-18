const vscode = require('vscode');

function activate(context) {
	const formatDocument = () =>
		vscode.commands.executeCommand("editor.action.formatDocument");

	let disposable1 = vscode.commands.registerCommand('cmstead.snipkit.indent', function () {
		require('./modules/commands/indent/indent-action')
			.indent()
			.then(formatDocument);
	});

	context.subscriptions.push(disposable1);

	let disposable2 = vscode.commands.registerCommand('cmstead.snipkit.outdent', function () {
		require('./modules/commands/outdent/outdent-action')
			.outdent()
			.then(formatDocument);
	});

	context.subscriptions.push(disposable2);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
