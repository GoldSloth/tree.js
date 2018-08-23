const { State } = require('./state.js')
const vv3 = require('vanilla-vectors-3d')
const fs = require('fs')

function logWrite(message, filename) {
    fs.writeFile(filename, message, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Written to " + filename);
    });
}

function applyRules(letter, rules, iteration, final) {
    var iterativeRules = rules[iteration]

    if (final && (rules.final != undefined)) {
        if (letter in rules.final) {
            return rules.final[letter]
        }
    }
    if (!(iterativeRules == undefined)) {
        if (letter in iterativeRules) {
            return iterativeRules[letter]
        }
    }
    if (letter in rules.global) {
        return rules.global[letter]
    }
    return letter

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

exports.Tree = function(axiom, rules, iterations, angle, forwardMovement, branchWidth, useLengthAsWidth) {
    this.type = 'Tree'
    this.axiom = axiom
    this.rules = rules
    this.iterations = iterations
    this.angle = angle
    this.forwardMovement = forwardMovement
    this.branchWidth = branchWidth
    this.useLengthAsWidth = useLengthAsWidth
    
    this.instructions = ['No instructions set']
    this.branches = []
    this.leaves = []

    this.makeInstructions = function() {
        var tree = this.axiom
        this.iteration = 0
        this.finalIteration = false
        for (i=0;i<this.iterations;i++) {
            if(i>this.iterations-2){
                this.finalIteration = true
            }
            this.iteration = i
            var tree2 = []
            for (var x=0; x<tree.length;x++) {
                try {
                    tree2.push(applyRules(tree[x], this.rules, this.iteration, this.finalIteration).split(''))
            
                } catch(err) {
                    console.log(err)
                }
            }
            tree = tree2
            tree = [].concat.apply([], tree)
        }
        this.instructions = tree
    }

    this.makeBranches = function() {
        var bWidth = this.branchWidth
        var bLength = this.forwardMovement
        var currentState = new State(new vv3.Vector(0,0,0), new vv3.Vector(0,0,0))
        var stateToStore = new State(new vv3.Vector(0,0,0), new vv3.Vector(0,0,0))
        var stateStack = []
        var rDirection
        var x
        var y
        var newPosition
        var leafMode = false
        this.instructions.forEach(function(instruction) {
            switch(instruction) {
                case 'F':
                console.log(bLength)
                    newPosition = rotateAroundAxis(currentState, bLength)
                    if (leafMode) {
                        this.leaves.push(new vv3.Line(currentState.position, newPosition))
                    } else {
                        this.branches.push(new vv3.Line(currentState.position, newPosition))
                    }
                    currentState.position = newPosition
                    break    
                case 'f':
                    newPosition = rotateAroundAxis(currentState, this.forwardMovement*0.1)
                    if (leafMode) {
                        this.leaves.push(new vv3.Line(currentState.position, newPosition))
                    } else {
                        this.branches.push(new vv3.Line(currentState.position, newPosition))
                    }
                    currentState.position = newPosition
                    break    
                case '+':
                    currentState.direction.z+=this.angle.z
                    break
                case '-':
                    currentState.direction.z-=this.angle.z
                    break
                case '&':
                    currentState.direction.x+=this.angle.x
                    break    
                case '^':
                    currentState.direction.x-=this.angle.x
                    break
                case '=':
                    currentState.direction.y+=this.angle.y
                    break    
                case '/':
                    currentState.direction.y-=this.angle.y
                    break
                case '|':
                    currentState.direction.x+=180
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
                case '`':
                    leafMode = (!leafMode)
                    break
                case '1':
                    bLength = this.forwardMovement
                    if (this.useLengthAsWidth) {
                        bWidth = this.branchWidth
                    }
                    break
                case '2':
                    bLength = this.forwardMovement * 0.75
                    if (this.useLengthAsWidth) {
                        bWidth = this.branchWidth * 0.75
                    }
                    break
                case '3':
                    bLength = this.forwardMovement * 0.5
                    if (this.useLengthAsWidth) {
                        bWidth = this.branchWidth * 0.5
                    }
                    break
                case '4':
                    bLength = this.forwardMovement * 0.25
                    if (this.useLengthAsWidth) {
                        bWidth = this.branchWidth * 0.25
                    }
                    break
                
            }
        }, this)
    }

    this.makeTree = function() {
        this.makeInstructions()
        this.makeBranches()
        logWrite('Tree Instructions: ' + this.instructions + '\n' + 'Branches: ' + this.branches, 'tree-log.log')
        return {branches: this.branches, leaves: this.leaves}
    }
}
