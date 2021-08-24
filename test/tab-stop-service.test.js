const { assert} = require('chai');

const { getOffset } = require('../modules/tab-stop-service');

describe('tab stop service', function () {
    describe('get tab stop start offset', function () {
        it('gets the tab stop start offset information when cursor is at the end of the tab stop number', function () {
            const snippetBodyString = '${2:Something}';
            const cursorLocation = 2;

            const offset = getOffset(snippetBodyString, cursorLocation);
            const expectedOffset = { start: 3, end: 0 };

            assert.deepEqual(offset, expectedOffset);
        });

        it('gets the tab stop start offset information when cursor is inside tab stop, not at end of tab stop number', function () {
            const snippetBodyString = '${2:Something}';
            const cursorLocation = 4;

            const offset = getOffset(snippetBodyString, cursorLocation);
            const expectedOffset = { start: 5, end: 2 };

            assert.deepEqual(offset, expectedOffset);
        });
    });
});