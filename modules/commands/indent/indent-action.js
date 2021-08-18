const { asyncActionSetup } = require("../../action-setup");

function indent() {
    return asyncActionSetup()
        .then(({selectionPath}) => {
            console.log(selectionPath);
        })

        .catch(function(error){
            console.log(error);
        });
}

module.exports = {
    indent
};