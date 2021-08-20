const openLanguageSnippetFile = require('../../open-language-snippet-file');

function editSnippets(context) {
    return openLanguageSnippetFile(context);
}

module.exports = {
    editSnippets
}