const ST = require('./state.js')
const vv3 = require('vanilla-vectors-3d')

const angle = 25
const forwardMovement = 10
const iterations = 3
const axiom = ['X']
const rules = {'X':'F+[[X]-X]-F[-FX]+X', 'F':'FF'}

function applyRules(letter) {
    for (var key in rules) {
        var value = rules[key]
        if (letter === key) {
            return value
        }
        else {
            return letter
        }
    }
}

exports.Tree2D = function() {
    this.type = 'Tree2D'
    this.instructions = ['No instructions set']
    this.branches = []

    this.makeInstructions = function() {
        var tree = axiom
        for (i=0;i<iterations;i++) {
            tree = tree.map(applyRules).map(x => x.split(''))
            tree = [].concat.apply([], tree)
        }
        this.instructions = tree
    }

    this.makeBranches = function() {
        var currentState = new ST.State(new vv3.Vector(0,0,0), 0)
        var stateStack = []
        var branches = []
        this.instructions.forEach(function(instruction) {
            switch(instruction) {
                case 'F':
                    
                    
                    var newPosition = new vv3.Vector(currentState.position.x + (forwardMovement * Math.sin(currentState.direction)), currentState.position.y + (forwardMovement * Math.cos(currentState.direction)),0)
                    branches.push(new vv3.Line(currentState.position, newPosition))
                    currentState.position = newPosition
                    break
                    
                case '+':
                    currentState.direction+=angle
                    break
                    
                case '-':
                    currentState.direction-=angle
                    break
                    
                case '[':
                    stateStack.push(currentState)
                    break
                    
                case ']' :
                    currentState = stateStack.pop()
                    break
            }
        });
        this.branches = branches
    }
}

// exports.Tree3D = function() {
//     console.log('Tree3D created')
//     this.type = 'Tree3D'
// }