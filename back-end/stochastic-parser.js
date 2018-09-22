exports.STParser = class {
    constructor(stochasticString, relativeAmounts) {
        this.sString = stochasticString
        this.rAmounts = relativeAmounts
    }

    _sortGroups(groups) {
        return groups.sort(
            function (a,b) {
                if (a.P < b.P)
                return -1;
                if (b.P > b.P)
                return 1;
                return 0;
            }
          )


    }
    _makeGroups() {
        var groups = []
        var groupCount = 0
        var groupSwitch = false
        for (var i=0; i<this.sString.length; i++) {
            if (this.sString[i] == "{") {
                groupSwitch = true
                groups.push({"P": relativeAmounts[this.sString[i-1]], "data": ""})
            } else if (this.sString[i] == "}") {
                groupSwitch = false
            } else if (groupSwitch) {
                groups[groupCount].data = groups[groupCount].data + this.sString[i]
            }
        }

        return groups
    }

    _pickGroup(groups) {
        var rnd = Math.random()
        var counter = 0
        for (var i=0; i<groups.length; i++) {
            if (rnd < groups[i].P + counter) {
                return groups[i]
            } else {
                counter += groups[i].P
            }
        }
    }

    interpretStochastic() {
        var groups = this._makeGroups()
        groups = this._sortGroups(groups)
        var chosenGroup = this._pickGroup(groups)

        return chosenGroup.data
    }
}