const ColoringBfs = require("./coloring-bfs");

class MaximalMatching {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
    }

    transformToNetowrk() {
        this.network = Object.assign(this.digraph);
        const groups = this.getGroups();
        this.addEntryPoint("s", groups[0]);
        this.addEntryPoint("t", groups[1]);

        for (const edge of this.network.edges) {
            edge.weight = 1;
        }
    }

    addEntryPoint(point, nodeGroup) {
        this.network.nodes.push(point);

        for (const node of nodeGroup) {
            if (node === point) continue;
            this.network.addEdge(point, node);
            this.network.addEdge(node, point);
        }
    }

    getGroups() {
        const groups = {};
        for (const node of this.coloring.properties) {
            groups[node.color] = groups[node.color] || [];
            groups[node.color].push(node.key);
        }

        return groups;
    }

    validateBipartite() {
        this.coloring = new ColoringBfs(this.digraph);

        this.coloring.search(this.digraph.first);
        return !this.coloring.conflict;
    }

}

module.exports = MaximalMatching;