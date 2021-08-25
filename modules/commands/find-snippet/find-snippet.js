const fs = require('fs');

const { parse: parseJson } = require('jsonc-parser');

function statFile(filePath) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch (_) {
        return false;
    }
}

function readSnippetData(snippetFilePath) {
    if(!statFile(snippetFilePath)) {
        return {};
    }

    try {
        const snippetText = fs.readFileSync(snippetFilePath, { encoding: 'utf8' });

        return parseJson(snippetText);
    } catch (error) {
        throw new Error('Unable to parse snippet JSON file');
    }
}

module.exports = {
    readSnippetData
};