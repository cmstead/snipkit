const dollarPattern = /([^\\])(\$)/ig;
function transformTextLine(textToTransform) {
    let transformedText = textToTransform
        .trim()
        .replace(/(^|[^\\])\"/ig, "$1\\\"");

    while(dollarPattern.test(transformedText)) {
        transformedText = transformedText.replace(dollarPattern, '$1\\$');
    }

    return `"${transformedText}"`;
}

function transformToBodyText(textToTransform) {
    const transformedTextLines = textToTransform.split('\n')
        .map((textLine) => transformTextLine(textLine));

    return transformedTextLines.join(',\n');
}

module.exports = {
    transformToBodyText
};