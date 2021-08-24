function reverseString(stringToReverse) {
    let reversedBodyString = stringToReverse.split('');
    reversedBodyString.reverse();
    return reversedBodyString.join('');
}

function getOffset(snippetBodyString, cursorLocation) {
    const reversedBodyString = reverseString(snippetBodyString);
    let currentToken = '';
    let index = 0;

    for (let i = reversedBodyString.length - (cursorLocation + 1); i < reversedBodyString.length; i++) {
        const character = reversedBodyString[i];

        currentToken += character;

        if (!/^[0-9]+\{?\$?$/.test(currentToken)) {
            currentToken = '';
        } else if (/[0-9]+\{?\$/.test(currentToken)) {
            index = i;
            break;
        }
    }

    const indexOffset = reversedBodyString.length - index - 1;
    const offset = cursorLocation - currentToken.length + 1 - indexOffset;
    const tokenStart = offset + currentToken.length;

    return { start: tokenStart, end: offset };
}

module.exports = {
    getOffset
};