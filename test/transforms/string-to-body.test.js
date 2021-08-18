const { assert } = require('chai');

const { transformToBodyText } = require('../../modules/transforms/string-to-body');

const slash = "\\";
const doubleSlash = "\\\\";

describe('Transform selected string text to snippet body text', function () {
    it('transforms a single line into body-safe text', function () {
        const rawText = `      this is a test with "quotes" and a $-sign`;
        const expectedText = `"this is a test with ${slash}"quotes${slash}" and a ${doubleSlash}$-sign"`;

        const actualText = transformToBodyText(rawText);

        assert.equal(actualText, expectedText);
    });
    it('transforms a single line into body-safe text', function () {
        const rawText = [
            `      this is a test with "quotes" and a $-sign`,
            '      more text',
            ' "MORE!"',
            '            MOARRRR!$$$!'
        ].join('\n');
        const expectedText = [
            `"this is a test with ${slash}"quotes${slash}" and a ${doubleSlash}$-sign"`,
            '"more text"',
            `"${slash}"MORE!${slash}""`,
            `"MOARRRR!${doubleSlash}$${doubleSlash}$${doubleSlash}$!"`
        ].join(',\n');

        const actualText = transformToBodyText(rawText);

        assert.equal(actualText, expectedText);
    });
});

