const astTraverse = require('./ast-traverse');

function nodeStartContainsSelectionStart(nodePosition, selectionLocation) {
    return (nodePosition.start.line < selectionLocation.start.line
        || (nodePosition.start.line === selectionLocation.start.line
            && nodePosition.start.column <= selectionLocation.start.column));
}

function nodeEndContainsSelectionEnd(nodePosition, selectionLocation) {
    return (nodePosition.end.line > selectionLocation.end.line
        || (nodePosition.end.line === selectionLocation.end.line
            && nodePosition.end.column >= selectionLocation.end.column));
}

function getPropertyPosition(node) {
    return {
        start: node.key.position.start,
        end: node.value.position.end
    }
}

function nodeContainsSelection(node, selectionLocation) {
    const nodePosition = node.type === 'property'
        ? getPropertyPosition(node)
        : node.position;

    return nodeStartContainsSelectionStart(nodePosition, selectionLocation)
        && nodeEndContainsSelectionEnd(nodePosition, selectionLocation);
}

/*
An important note about node paths so I don't forget:
A node path is constructed as an array of nodes, each surrounding the one in the
next position in the array.
The 0th position is the top of the program. The last position is the location of
the user selection. Each node in between the first and last are vertically scoped,
meaning each surrounds the next.
This provides a means to do a vertical search for surrounding scopes and other
ancestor nodes without needing to traverse the entire AST.
*/

function buildNodePath(parsedSource, selectionLocation) {
    let nodePath = [];

    astTraverse.traverse(parsedSource, {
        enter: function (node) {
            if (nodeContainsSelection(node, selectionLocation)) {
                nodePath.push(node);
            }
        }
    });

    return nodePath;
}

module.exports = {
    buildNodePath,
    nodeContainsSelection
};