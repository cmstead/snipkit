const { assert } = require('chai');
const fs = require('fs');
const path = require('path');
const { parseSource } = require('../../modules/parser/parser');
const { buildSelectionPath } = require('../../modules/selection-path');
const { transformSelectionToPosition } = require('../../modules/transforms/selection-to-position');
const { transformEditorRangeToSelection, getNewEditorRange, getNewEditorCoords } = require('../utilities/editor-coordinate-transform');

const sourceCodePath = path.join(__dirname, './fixtures/snippet.json');
const parseableSource = fs.readFileSync(sourceCodePath, { encoding: 'utf8' });

describe('selection path', function () {
    it('properly builds a selection path', function () {
        const parsedSource = parseSource(parseableSource);
        const selection = transformEditorRangeToSelection(
            getNewEditorRange({
                start: getNewEditorCoords({ line: 7, column: 20 }),
                end: getNewEditorCoords({ line: 7, column: 20 })
            }));

        const selectedPosition = transformSelectionToPosition(selection);

        const selectionPath = buildSelectionPath(parsedSource.child, selectedPosition);
        const selectedNodeTypes = selectionPath.map(node => node.type);

        const expectedOutcome = ['object', 'property', 'object', 'property', 'array', 'string'];

        assert.equal(
            JSON.stringify(selectedNodeTypes),
            JSON.stringify(expectedOutcome));
    });
});