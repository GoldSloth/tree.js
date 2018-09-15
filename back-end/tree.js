const math = require('mathjs')
const { Position, Direction } = require('./state.js')
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

exports.Tree = function(
        axiom,
        rules, 
        iterations,
        angle,
        forwardMovement,
        branchWidth,
        lengths,
        widths,
    ) {
    this.type = 'Tree'
    this.axiom = axiom
    this.rules = rules
    this.iterations = iterations
    this.angle = angle
    this.forwardMovement = forwardMovement
    this.branchWidth = branchWidth
    this.lengths = lengths
    this.widths = widths
    
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
        var progression = 0
        var bWidth = this.branchWidth
        var bLength = this.forwardMovement
        var currentPosition = new Position(0, 0, 0)
        var currentDirection = new Direction()
        var stateStack = []
        var newPosition
        var leafMode = false
        this.instructions.forEach(function(instruction) {
            switch(instruction) {
                case 'F':
                    newPosition = currentDirection.extend(bLength)
                    if (leafMode) {
                        this.leaves.push({p0: currentPosition.makeClone(), p1: newPosition.makeClone()})
                    } else {
                        this.leaves.push({p0: currentPosition.makeClone(), p1: newPosition.makeClone(), w: bWidth})
                    }
                    currentPosition.makeFromClone(newPosition.makeClone())
                    break
                case 'f':
                    newPosition = currentDirection.extend(this.forwardMovement*0.1)
                    if (leafMode) {
                        this.leaves.push({p0: currentPosition.makeClone(), p1: newPosition.makeClone()})
                    } else {
                        this.leaves.push({p0: currentPosition.makeClone(), p1: newPosition.makeClone(), w: bWidth})
                    }
                    currentPosition.makeFromClone(newPosition.makeClone())
                    break
                case '+':
                    currentDirection.rotateX(this.angle.x)
                    break
                case '-':
                    currentDirection.rotateX(-this.angle.x)
                    break
                case '&':
                    currentDirection.rotateY(this.angle.y)
                    break    
                case '^':
                    currentDirection.rotateY(-this.angle.y)
                    break
                case '=':
                    currentDirection.rotateZ(this.angle.z)
                    break    
                case '/':
                    currentDirection.rotateZ(-this.angle.z)
                    break
                case '|':
                    currentDirection.rotateX(180)
                    break
                case '[':
                    stateToStore = {"d": currentDirection.makeClone(), "p": currentPosition.makeClone()}
                    stateStack.push(stateToStore)
                    break
                    
                case ']' :
                    var currentState = stateStack.pop()
                    currentDirection = new Direction(currentState.d.H, currentState.d.L, currentState.d.U)
                    currentPosition = new Position()
                    currentPosition.makeFromClone(currentState.p)
                    break
                case '`':
                    leafMode = (!leafMode)
                    break

                case '<':
                    progression++
                    bLength = this.forwardMovement * this.lengths[progression]
                    bWidth = this.branchWidth * this.widths[progression]
                    break
                    
                case '>':
                    if (progression>0){ progression-- }
                    bLength = this.forwardMovement * this.lengths[progression]
                    bWidth = this.branchWidth * this.widths[progression]
                    break
                
            }
        }, this)
        this.branches = this.branches.map(x => {
            return {
                'p0': 
                {
                    'x': x.p0.x,
                    'y': x.p0.y,
                    'z': x.p0.z
                },
                'p1': 
                {
                    'x': x.p1.x, 
                    'y': x.p1.y, 
                    'z': x.p1.z
                },
                'w': x.w
            }
        })
        console.log(this.branches)
    }

    this.makeTree = function() {
        this.makeInstructions()
        this.makeBranches()
        logWrite('Tree Instructions: ' + this.instructions + '\n' + 'Branches: ' + this.branches, 'tree-log.log')
        return {branches: this.branches, leaves: this.leaves}
    }
}
