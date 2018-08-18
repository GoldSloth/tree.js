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
const angle = 25
const forwardMovement = 1
const iterations = 6
const axiom = ['X']
const rules = {'X':'F+[[X]-X]-F[-FX]+X', 'F':'FF'}

var testTree2D = new TC.Tree2D(axiom, rules, iterations, angle, forwardMovement)
var lines = testTree2D.makeTree()

logWrite('Tree Instructions: ' + testTree2D.instructions + '\n' + 'Branches: ' + testTree2D.branches, 'tree-log.log')

logWrite('var branches = ' + JSON.stringify(lines), 'test-tree.json')
