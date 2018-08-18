const ST = require('./state.js')
const vv3 = require('vanilla-vectors-3d')

const angle = 25
const forwardMovement = 1
const iterations = 6
const axiom = ['X']
const rules = {'X':'F+[[X]-X]-F[-FX]+X', 'F':'FF'}

function applyRules(letter) {
    if(letter in rules) {
        return rules[letter]
    } else {
        return letter
    }
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
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
        var stateToStore = new ST.State(new vv3.Vector(0,0,0), 0)
        var stateStack = []
        var branches = []
        var rDirection
        var x
        var y
        var newPosition
        this.instructions.forEach(function(instruction) {
            switch(instruction) {
                case 'F':
                    rDirection = toRadians(currentState.direction)
                    x = currentState.position.x + (forwardMovement * Math.sin(rDirection))
                    y = currentState.position.y + (forwardMovement * Math.cos(rDirection))
                    newPosition = new vv3.Vector(x, y, 0)
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
                    stateToStore = new ST.State(new vv3.Vector(currentState.position.x,currentState.position.y,currentState.position.z), currentState.direction)
                    stateStack.push(stateToStore)
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