function reverseString(stringToReverse) {
    let reversedBodyString = stringToReverse.split('');
    reversedBodyString.reverse();
    return reversedBodyString.join('');
}

function computeOffsetData(index, stringLength, cursorLocation, currentToken) {
    const indexOffset = stringLength - index - 1;
    const offset = cursorLocation - currentToken.length + 1 - indexOffset;
    const tokenStart = offset + currentToken.length;

    return { start: tokenStart, end: offset };
}

function buildTabStopTokenData(snippetBodyString, cursorLocation) {
    const reversedBodyString = reverseString(snippetBodyString);
    let currentToken = '';
    let exitIndex = 0;

    for (let i = reversedBodyString.length - (cursorLocation + 1); i < reversedBodyString.length; i++) {
        const character = reversedBodyString[i];

        currentToken += character;

        if (!/^[0-9]+\{?\$?$/.test(currentToken)) {
            currentToken = '';
        } else if (/[0-9]+\{?\$/.test(currentToken)) {
            exitIndex = i;
            break;
        }
    }

    return {
        currentToken,
        exitIndex
    };
}

function getOffset(snippetBodyString, cursorLocation) {
    const { currentToken, exitIndex } = buildTabStopTokenData(snippetBodyString, cursorLocation)

    return computeOffsetData(exitIndex, snippetBodyString.length, cursorLocation, currentToken)
}

module.exports = {
    getOffset
};