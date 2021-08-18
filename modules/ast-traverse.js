function defaultEnter() { }
function defaultLeave() { }
function defaultFallback(node) {
    throw new Error(`Unknown node type '${node.type}'. If this node type is expected add a fallback method.`);
}

const visitValueNode = (node, parent, { enter, leave }) => {
    enter(node, parent);
    leave(node, parent);
}

function traverseChildren(children, parent, visitors) {
    if(Array.isArray(children)) {
        children.forEach(child => traverseNode(child, parent, visitors));
    }
}

const typeVisitorMethods = {
    "string": visitValueNode,
    "number": visitValueNode,
    "boolean": visitValueNode,
    "null": visitValueNode,
    "key": visitValueNode,

    "document": (node, parent, visitors) => {
        visitors.enter(node, parent);
        
        traverseNode(node.child, node, visitors);
        
        visitors.leave(node, parent);
    },
    "object": (node, parent, visitors) => {
        visitors.enter(node, parent);
        
        traverseChildren(node.properties, node, visitors);
        
        visitors.leave(node, parent);
    },
    "array": (node, parent, visitors) => {
        visitors.enter(node, parent);

        traverseChildren(node.items, node, visitors);

        visitors.leave(node, parent);
    },
    "property": (node, parent, visitors) => {
        visitors.enter(node, parent);

        traverseNode(node.key, node, visitors);
        traverseNode(node.value, node, visitors);

        visitors.leave(node, parent);
    }
}

function traverseNode(node, parent, visitors) {
    const visitingBehavior = typeVisitorMethods[node.type];

    if(typeof visitingBehavior === 'function') {
        visitingBehavior(node, parent, visitors);
    } else {
        visitors.fallback(node, parent, visitors);
    }
}

function traverse(ast, {
    enter = defaultEnter,
    leave = defaultLeave,
    fallback = defaultFallback
}) {
    traverseNode(ast, null, {
        enter,
        leave,
        fallback
    })
}

module.exports = {
    traverse
};