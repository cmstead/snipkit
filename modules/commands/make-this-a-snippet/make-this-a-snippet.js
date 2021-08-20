const { transformSelectionToLocation } = require("../../edit-utils/code-range-transforms");
const { transformPositionToSelection } = require("../../transforms/selection-to-position");
const { transformToBodyText } = require("../../transforms/string-to-body");

function getPastePositionForEmptyObject(rootObject) {
    const pasteStart = {
        line: rootObject.position.start.line,
        column: rootObject.position.start.column + 1
    };

    return {
        start: pasteStart,
        end: pasteStart
    }
}

function getPastePositionForObjectWithProperties({ properties }) {
    const lastProperty = properties[properties.length - 1];

    const pasteStart = {
        line: lastProperty.value.position.end.line,
        column: lastProperty.value.position.end.column
    };

    return {
        start: pasteStart,
        end: pasteStart
    };
}

function getPasteLocation(rootObject) {
    const properties = rootObject.properties;
    const objectHasNoProperties = properties.length === 0;

    let pastePosition = objectHasNoProperties
        ? getPastePositionForEmptyObject(rootObject)
        : getPastePositionForObjectWithProperties(rootObject);

    const pasteSelection = transformPositionToSelection(pastePosition);
    return transformSelectionToLocation(pasteSelection);
}

function getSnippetCommaPrefix(properties) {
    return properties.length > 0 ? ',\n' : ''
}

function buildSnippetString(selectedSource, snippetJson) {
    const bodyText = transformToBodyText(selectedSource);
    const snippetText = snippetJson.body.join('\n').replace('${body}', bodyText);

    return snippetText;
}

function buildSnippetText(selectedSource, snippetJson, properties) {
    const snippetString = buildSnippetString(selectedSource, snippetJson);
    const snippetPrefix = getSnippetCommaPrefix(properties);

    return `${snippetPrefix}${snippetString}`;
}

module.exports = {
    buildSnippetText,
    getPasteLocation
};