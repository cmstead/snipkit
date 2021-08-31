const { ACTION, SKIP } = require("./actionTypes");

module.exports = [
    {
        commandName: 'indent',
        title: 'Indent Selected Body Lines',
        path: './modules/commands/indent/indent-action',
        functionName: 'indent',
        type: ACTION
    },
    {
        commandName: 'outdent',
        title: 'Outdent Selected Body Lines',
        path: './modules/commands/outdent/outdent-action',
        functionName: 'outdent',
        type: ACTION
    },
    {
        commandName: 'insertSnippet',
        title: 'Insert Snippet Into Document',
        path: './modules/commands/insert-snippet/insert-snippet-action',
        functionName: 'insertSnippet',
        type: ACTION
    },
    {
        commandName: 'insertZero',
        title: 'Insert 0-Index Tab Stop Into Document',
        path: './modules/commands/insert-zero/insert-zero-action',
        functionName: 'insertZero',
        type: SKIP
    },
    {
        commandName: 'pasteSnippet',
        title: 'Paste Snippet From Clipboard',
        path: './modules/commands/paste-snippet/paste-snippet-action',
        functionName: 'pasteSnippet',
        type: ACTION
    },
    {
        commandName: 'formatAsBody',
        title: 'Format Selected Lines as Snippet Body',
        path: './modules/commands/format-as-body/format-as-body-action',
        functionName: 'formatAsBody',
        type: ACTION
    },
    {
        commandName: 'editSnippets',
        title: 'Open Edit/Configure User Snippets Selection',
        path: './modules/commands/edit-snippets/edit-snippets-action',
        functionName: 'editSnippets',
        type: ACTION
    },
    {
        commandName: 'selectAction',
        title: 'Select a SnipKit Action',
        path: './modules/commands/select-action/select-action-action',
        functionName: 'selectAction',
        type: SKIP
    },
    {
        commandName: 'makeThisASnippet',
        title: 'Make selection a snippet',
        path: './modules/commands/make-this-a-snippet/make-this-a-snippet-action',
        functionName: 'makeThisASnippet',
        type: ACTION
    },
    {
        commandName: 'changeTabStopIndex',
        title: 'Select a new tab stop index',
        path: './modules/commands/change-tab-stop-index/change-tab-stop-index-action',
        functionName: 'changeTabStopIndex',
        type: ACTION
    },
    {
        commandName: 'findSnippet',
        title: 'Find Language Snippet',
        path: './modules/commands/find-snippet/find-snippet-action',
        functionName: 'findSnippet',
        type: ACTION
    }
];