const math = require('mathjs')

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

    makeClone() {
        return math.clone(this.position)
    }

    makeFromClone(cloneablePosition) {
        this.position = math.clone(cloneablePosition)
    }

    makeObj() {
        return {'x': this.x, 'y': this.y, 'z': this.z}
    }
}


exports.Direction = class {
    constructor(H, L, U) {
        if (!arguments.length) {
            this.H = math.matrix([[1], [0], [0]])
            this.L = math.matrix([[0], [0], [1]]) 
            this.U = math.matrix([[0], [1], [0]]) 
        } else {
            this.H = math.clone(H)
            this.L = math.clone(L)
            this.U = math.clone(U)
        }
    }

    _internalRotation (angle, axisMap) {
        var sinTheta = Math.sin(angle * (Math.PI/ 180))
        var cosTheta = Math.cos(angle * (Math.PI/ 180))
        var LX = math.subset(axisMap, math.index(0, 0))
        var LY = math.subset(axisMap, math.index(1, 0))
        var LZ = math.subset(axisMap, math.index(2, 0))

        var t00 = cosTheta + ((LX*LX)*(1-cosTheta))
        var t01 = (LX*LY)*(1-cosTheta) - (LZ*sinTheta)
        var t02 = (LX*LZ)*(1-cosTheta) + (LY*sinTheta)

        var t10 = (LY*LX)*(1-cosTheta) + (LZ*sinTheta)
        var t11 = cosTheta + (LY*LY)*(1-cosTheta)
        var t12 = (LY*LZ)*(1-cosTheta) - (LX*sinTheta)

        var t20 = (LZ*LX)*(1-cosTheta) - (LY * sinTheta)
        var t21 = (LZ*LY)*(1-cosTheta) + (LX*sinTheta)
        var t22 = cosTheta + (LZ*LZ)*(1-cosTheta)
        
        var RL = math.matrix(
            [
                [ t00, t01, t02],
                [ t10, t11, t12],
                [ t20, t21, t22]
            ])
        
        this.H = math.multiply(RL, this.H)
        this.L = math.multiply(RL, this.L)
        this.U = math.multiply(RL, this.U)
    }

    rotateZ (angle) {
        this._internalRotation(angle, this.L)
    }


    rotateY (angle) {
        this._internalRotation(angle, this.U)
    }

    rotateX (angle) {
        this._internalRotation(angle, this.H)
    }

    makeClone() {
        return {H: math.clone(this.H), L: math.clone(this.L), U: math.clone(this.U)}
    }

    extend(length) {
        var x = (math.subset(this.U, math.index(0, 0))*length)
        var y = (math.subset(this.U, math.index(1, 0))*length)
        var z = (math.subset(this.U, math.index(2, 0))*length)
        return new exports.Position(x, y, z)
    }

}

