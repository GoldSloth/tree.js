const math = require('mathjs')

exports.Direction = class {
    constructor(H, L, U) {
        if (!arguments.length) {
            this.H = math.matrix([[0], [1], [0]])
            this.L = math.matrix([[0], [0], [1]]) 
            this.U = math.matrix([[1], [0], [0]]) 
        } else {
            this.H = math.clone(H)
            this.L = math.clone(L)
            this.U = math.clone(U)
        }
    }

    rotateX (angle) {
        var sinTheta = Math.sin(angle * (180 / Math.PI))
        var cosTheta = Math.cos(angle * (180 / Math.PI))
        var RX = math.matrix(
            [
                [ cosTheta, sinTheta, 0],
                [-sinTheta, cosTheta, 0],
                [ 0       , 0       , 1]
            ])
        
        this.H = math.multiply(RX, this.H)
        this.L = math.multiply(RX, this.L)
        this.U = math.multiply(RX, this.U)
    }


    rotateY (angle) {
        var sinTheta = Math.sin(angle * (180 / Math.PI))
        var cosTheta = Math.cos(angle * (180 / Math.PI))
        var RY = math.matrix(
            [
                [ cosTheta, 0, -sinTheta],
                [ 0       , 1, 0        ],
                [ sinTheta, 0,  cosTheta]
            ])
        
        this.H = math.multiply(RY, this.H)
        this.L = math.multiply(RY, this.L)
        this.U = math.multiply(RY, this.U)
    }

    rotateZ (angle) {
        var sinTheta = Math.sin(angle * (180 / Math.PI))
        var cosTheta = Math.cos(angle * (180 / Math.PI))
        var RZ = math.matrix(
            [
                [ cosTheta, sinTheta, 0],
                [-sinTheta, cosTheta, 0],
                [ 0       , 0       , 1]
            ])
        
        this.H = math.multiply(RZ, this.H)
        this.L = math.multiply(RZ, this.L)
        this.U = math.multiply(RZ, this.U)
    }

    get makeClone () {
        return {H: math.clone(this.H), L: math.clone(this.L), U: math.clone(this.U)}
    }

    extend(length) {
        var x = (math.subset(this.H, math.index(0))*length)
        var y = (math.subset(this.H, math.index(1))*length)
        var z = (math.subset(this.H, math.index(2))*length)
        return new Position(x, y, z)
    }

    get H() {
        return math.clone(this.H)
    }

    get L() {
        return math.clone(this.U)
    }

    get L() {
        return math.clone(this.L)
    }

}

exports.Position = class {
    constructor(x, y, z) {
        if (!arguments.length) {
            this.position = math.matrix([0, 0, 0])
        } else {
            this.position = math.matrix([x, y, z])
        }
    }

    get x() {
        return math.subset(this.position, math.index(0))
    }

    get y() {
        return math.subset(this.position, math.index(1))
    }

    get z() {
        return math.subset(this.position, math.index(2))
    }

    add(secondPos) {
        this.position = math.clone(math.add(this.position, secondPos))
    }

    makeClone() {
        return math.clone(this.position)
    }

    makeFromClone(cloneablePosition) {
        this.position = math.clone(cloneablePosition)
    }
}
