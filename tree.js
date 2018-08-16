const angle = 25
const iterations = 3
const axiom = ['X']
const rules = {'X':'F+[[X]-X]-F[-FX]+X', 'F':'FF'}

function applyRules(letter) {
    for (var key in rules) {
        var value = rules[key]
        if (letter === key) {
            return value
        }
    }
}

exports.Tree2D = function() {
    console.log('Tree2D created')
    this.type = 'Tree2D'
    this.makeTree = function() {
        var tree = axiom
        for (i=0;i<iterations;i++) {
            tree = tree.map(applyRules).map(x => x.split('')).flat()
        }
        return tree
    }
}

exports.Tree3D = function() {
    console.log('Tree3D created')
    this.type = 'Tree3D'
}