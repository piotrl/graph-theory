const ColoringBfs = require("./coloring");

class MaximalMatching {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
    }

    validateBipartite() {
        const coloring = new ColoringBfs(this.digraph);

        try {
            coloring.search(this.digraph.first);
            return true;
        } catch(exception) {
            console.log(exception.message);
            return false;
        }
    }

}

module.exports = MaximalMatching;