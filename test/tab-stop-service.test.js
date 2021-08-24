const { assert} = require('chai');

const { getOffset } = require('../modules/tab-stop-service');

describe('tab stop service', function () {
    describe('get tab stop start offset', function () {
        it('gets the tab stop start offset information', function () {
            const snippetBodyString = '${2:Something}';
            const cursorLocation = 2;

            const offset = getOffset(snippetBodyString, cursorLocation);
            const expectedOffset = 0;

            assert.equal(offset, expectedOffset);
        });
    })
});