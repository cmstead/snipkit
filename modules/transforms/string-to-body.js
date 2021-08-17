function transformTextLine(textToTransform) {
    const transformedText = textToTransform
        .trim()
        .replace(/(^|[^\\])\"/ig, "$1\\\"")
        .replace(/(^|[^\\])\$/ig, "$1\\$");

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