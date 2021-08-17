function transformToBodyText(textToTransform) {
    return textToTransform
        .trim()
        .replace(/([^\\])\"/ig, "$1\\\"")
        .replace(/([^\\])\$/ig, "$1\\\$");
}

module.exports = {
    transformToBodyText
};