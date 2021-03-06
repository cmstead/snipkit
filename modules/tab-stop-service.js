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

const placeholderTokenPattern = /^[0-9]+\{\$$/;
const bareTabStopToken = /^[0-9]+\$$/;
const isAcceptableToken = (token) =>
    placeholderTokenPattern.test(token)
    || bareTabStopToken.test(token);

function buildTabStopTokenData(snippetBodyString, cursorLocation) {
    const reversedBodyString = reverseString(snippetBodyString);

    let nestedTabStops = [];
    let currentToken = '';
    let exitIndex = 0;

    const startPosition = reversedBodyString.length - (cursorLocation + 1);

    for (let i = startPosition; i < reversedBodyString.length; i++) {
        const character = reversedBodyString[i];

        currentToken += character;

        if (currentToken === '}') {
            currentToken = '';
            nestedTabStops.push(currentToken);
        } else if (!/^[0-9]+\{?\$?$/.test(currentToken)) {
            currentToken = '';
        } else if (
            (placeholderTokenPattern.test(currentToken) && nestedTabStops.length === 0)
            || (bareTabStopToken.test(currentToken) && startPosition === i - currentToken.length + 1)) {
            exitIndex = i;
            break;
        } else if (placeholderTokenPattern.test(currentToken)) {
            currentToken = '';
            nestedTabStops.pop();
        }
    }

    return {
        currentToken: isAcceptableToken(currentToken) ? currentToken : '',
        exitIndex
    };
}

function getOffset(snippetBodyString, cursorLocation) {
    const { currentToken, exitIndex } = buildTabStopTokenData(snippetBodyString, cursorLocation);

    return currentToken !== ''
        ? computeOffsetData(exitIndex, snippetBodyString.length, cursorLocation, currentToken)
        : null;
}

function getTabStopNumberOffset(snippetBodyString, offsetLocation, cursorLocation) {
    const startLocation = cursorLocation - offsetLocation.start;
    const endLocation = cursorLocation - offsetLocation.end;

    const tabStopToken = snippetBodyString.substring(startLocation + 1, endLocation + 1);
    let index = 0;

    for(let i = index; i < tabStopToken.length; i++) {
        const char = tabStopToken[i];

        if(/[0-9]/.test(char)){
            index = i;
            break;
        }
    }

    return {
        end: offsetLocation.end,
        start: offsetLocation.start - index
    };
}

module.exports = {
    getOffset,
    getTabStopNumberOffset
};