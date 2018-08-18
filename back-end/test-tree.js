const fs = require('fs')
const TC = require('./tree.js')

function logWrite(message, filename) {
    fs.writeFile(filename, message, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Written to " + filename);
    });
}

var testTree2D = new TC.Tree2D()
testTree2D.makeInstructions()
testTree2D.makeBranches()

logWrite('Tree Instructions: ' + testTree2D.instructions + '\n' + 'Branches: ' + testTree2D.branches, 'tree-log.log')

logWrite('var branches = ' + JSON.stringify(testTree2D.branches), 'test-tree.json')
