const { State } = require('./state.js')
const vv3 = require('vanilla-vectors-3d')

function applyRules(letter) {
    if(letter in this.rules) {
        return this.rules[letter]
    } else {
        return letter
    }
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function rotateAroundAxis(currentState, forwardMovement) {
    var xRotator = new vv3.Line(
        currentState.position.plus(new vv3.Vector(0,0,1)), 
        currentState.position.plus(new vv3.Vector(0,0,-1))
    )
    var yRotator = new vv3.Line(
        currentState.position.plus(new vv3.Vector(0,1,0)), 
        currentState.position.plus(new vv3.Vector(0,-1,0))
    )
    var zRotator = new vv3.Line(
        currentState.position.plus(new vv3.Vector(1,0,0)), 
        currentState.position.plus(new vv3.Vector(-1,0,0))
    )

    var lineToTransform = new vv3.Line(
        currentState.position, 
        currentState.position.plus(new vv3.Vector(0, forwardMovement, 0))
    )

    lineToTransform = lineToTransform.rotateAroundLine(xRotator, currentState.direction.x)
    lineToTransform = lineToTransform.rotateAroundLine(yRotator, currentState.direction.y)
    lineToTransform = lineToTransform.rotateAroundLine(zRotator, currentState.direction.z)
    return lineToTransform.lPrime
}

exports.Tree = function(axiom, rules, iterations, angle, forwardMovement) {
    this.type = 'Tree'
    this.axiom = axiom
    this.rules = rules
    this.iterations = iterations
    this.angle = angle
    this.forwardMovement = forwardMovement
    
    this.instructions = ['No instructions set']
    this.branches = []

    this.makeInstructions = function() {
        var tree = this.axiom
        for (i=0;i<iterations;i++) {
            tree = tree.map(applyRules, this).map(x => x.split(''))
            tree = [].concat.apply([], tree)
        }
        this.instructions = tree
    }

    this.makeBranches = function() {
        var currentState = new State(new vv3.Vector(0,0,0), new vv3.Vector(0,0,0))
        var stateToStore = new State(new vv3.Vector(0,0,0), new vv3.Vector(0,0,0))
        var stateStack = []
        var rDirection
        var x
        var y
        var newPosition
        this.instructions.forEach(function(instruction) {
            switch(instruction) {
                case 'F':
                    // rDirection = toRadians(currentState.direction.z)
                    // x = currentState.position.x + (this.forwardMovement * Math.sin(rDirection))
                    // y = currentState.position.y + (this.forwardMovement * Math.cos(rDirection))
                    // newPosition = new vv3.Vector(x, y, 0)
                    newPosition = rotateAroundAxis(currentState, this.forwardMovement)
                    this.branches.push(new vv3.Line(currentState.position, newPosition))
                    currentState.position = newPosition
                    break    
                case '+':
                    currentState.direction.z+=this.angle
                    break
                case '-':
                    currentState.direction.z-=this.angle
                    break
                case 'z':
                    currentState.direction.x+=this.angle
                    break    
                case 'c':
                    currentState.direction.x-=this.angle
                    break
                case '[':
                    stateToStore = new State(
                        new vv3.Vector(currentState.position.x,currentState.position.y,currentState.position.z), 
                        new vv3.Vector(currentState.direction.x, currentState.direction.y, currentState.direction.z)
                    )
                    stateStack.push(stateToStore)
                    break
                    
                case ']' :
                    currentState = stateStack.pop()
                    break
            }
        }, this)
    }

    this.makeTree = function() {
        this.makeInstructions()
        this.makeBranches()
        return this.branches
    }
}
