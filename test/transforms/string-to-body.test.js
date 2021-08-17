require('../utilities/approvals').configure();

const { assert } = require('chai');

const { transformToBodyText} = require('../../modules/transforms/string-to-body');

describe('Transform selected string text to snippet body text', function () {
    it('transforms a single line into body-safe text',  function () {
        const rawText = `      this is a test with "quotes" and a $-sign`;
        const expectedText = `this is a test with \\"quotes\\" and a \\$-sign`;

        const actualText = transformToBodyText(rawText);

        assert.equal(actualText, expectedText);
    });
});

