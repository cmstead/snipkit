const { parse } = require('json-ast');

function parseSource(source) {
    return parse(source, { verbose: true });
}

module.exports = {
    parseSource
};