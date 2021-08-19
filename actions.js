module.exports = [
    {
        commandName: 'indent',
        path: './modules/commands/indent/indent-action',
        functionName: 'indent'
    },
    {
        commandName: 'outdent',
        path: './modules/commands/outdent/outdent-action',
        functionName: 'outdent'
    },
    {
        commandName: 'insertSnippet',
        path: './modules/commands/insert-snippet/insert-snippet-action',
        functionName: 'insertSnippet'
    },
    {
        commandName: 'pasteSnippet',
        path: './modules/commands/paste-snippet/paste-snippet-action',
        functionName: 'pasteSnippet'
    },
    {
        commandName: 'formatAsBody',
        path: './modules/commands/format-as-body/format-as-body-action',
        functionName: 'formatAsBody'
    }
];