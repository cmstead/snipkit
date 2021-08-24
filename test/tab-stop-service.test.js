const { assert} = require('chai');

const { getOffset } = require('../modules/tab-stop-service');

describe('tab stop service', function () {
    describe('get tab stop start offset', function () {
        it('gets the tab stop start offset information when cursor is at the end of the tab stop', function () {
            const snippetBodyString = '${2:Something}';
            const cursorLocation = 2;

            const offset = getOffset(snippetBodyString, cursorLocation);
            const expectedOffset = { start: 3, end: 0 };

            assert.deepEqual(offset, expectedOffset);
        });
    })
});