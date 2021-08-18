const { parse } = require('json-ast');

function normalizeSourceLineEndings(source) {
    return source.split(/\r?\n/).join('\n');
}

function parseSource(source) {
    const normalizedSource = normalizeSourceLineEndings(source);
    return parse(normalizedSource, { verbose: true });
}

module.exports = {
    parseSource
};