const fs = require('fs')
const TC = require('./tree.js')

function logWrite(message) {
    fs.writeFile("tree-log.log", message, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Written to log");
    });
}

var testTree2D = new TC.Tree2D()

testTree2D.makeInstructions()
testTree2D.makeBranches()

// logWrite('Tree Instructions: ' + testTree2D.instructions + '\n' + 'Branches: ' + testTree2D.branches)

logWrite(JSON.stringify(testTree2D.branches))
