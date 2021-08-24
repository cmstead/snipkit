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
    const completeTokenPattern = /^[0-9]+\{?\$$/;

    let nestedTabStops = [];
    let currentToken = '';
    let exitIndex = 0;

    for (let i = reversedBodyString.length - (cursorLocation + 1); i < reversedBodyString.length; i++) {
        const character = reversedBodyString[i];

        currentToken += character;

        if(currentToken === '}') {
            currentToken = '';
            nestedTabStops.push(currentToken);
        } else if (!/^[0-9]+\{?\$?$/.test(currentToken)) {
            currentToken = '';
        } else if (completeTokenPattern.test(currentToken) && nestedTabStops.length === 0) {
            exitIndex = i;
            break;
        } else if(completeTokenPattern.test(currentToken)) {
            currentToken = '';
            nestedTabStops.pop();
        }
    }

    return {
        currentToken: completeTokenPattern.test(currentToken) ? currentToken : '',
        exitIndex
    };
}

function getOffset(snippetBodyString, cursorLocation) {
    const { currentToken, exitIndex } = buildTabStopTokenData(snippetBodyString, cursorLocation);

    return currentToken !== ''
        ? computeOffsetData(exitIndex, snippetBodyString.length, cursorLocation, currentToken)
        : null;
}

module.exports = {
    getOffset
};