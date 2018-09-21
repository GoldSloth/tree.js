const fs = require('fs')
const {Tree} = require('./tree.js')

function logWrite(message, filename) {
    fs.writeFile(filename, message, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Written to " + filename);
    });
}

var treeConfig = {
    angle: {x: 30, y: 90, z: 30},
    leafAngle: {x: 22.5, y: 22.5, z: 22.5},
    forwardMovement: 15,
    leafLength: 0.25,
    branchWidth: 6,
    iterations: 4,
    axiom: ['X'],
    rules: {
        global: {
            'X': '[F[=+<X>][=-<X>]]=[F[=+<X>][=-<X>]]F<X>',
            'F': 'FF'
        },
        final: {
            'X': '[/`[-f+f+f-|-f+f+f]`]'
        }
    },
    lengths: [
        1,
        0.9,
        0.8,
        0.7,
        0.6,
        0.5,
        0.4,
        0.3
    ],
    widths: [
        1,
        0.4,
        0.2,
        0.1,
        0.05,
        0.025,
        0.0125,
        0.006,
        0.003,
        0.0015
    ]
}

var testTree = new Tree(
    treeConfig.axiom,
    treeConfig.rules,
    treeConfig.iterations,
    treeConfig.angle,
    treeConfig.forwardMovement,
    treeConfig.branchWidth,
    treeConfig.lengths,
    treeConfig.widths,
    treeConfig.leafAngle,
    treeConfig.leafLength)
const useLengthAsWidth = true
const branchWidth = 1

var lines = testTree.makeTree()

logWrite('var branches = ' + JSON.stringify(lines), 'test-tree.json')
