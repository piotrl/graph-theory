const ColoringBfs = require("./coloring-bfs");
const DiGraph = require("../04-djikstra-shortest-path/digraph-weight");

class MaximalMatching {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
    }

    transformToNetowrk() {
        this.network = new DiGraph(this.digraph.nodes);
        const groups = this.getGroups();
        this.addEntryPoints(groups[0], groups[1]);
        for (const edge of this.network.edges) {
            edge.weight = 1;
        }

        return this.network;
    }

    addEntryPoints(nodeGroupBlue, nodeGroupRed) {
        let point = "s";
        this.network.nodes.push(point);
        for (const node of nodeGroupBlue) {
            if (node === point) continue;
            this.network.addEdge(point, node);
            for (const sibling of this.digraph.getSiblings(node)) {
                this.network.addEdge(node, sibling);
            }
        }
        point = "t";
        this.network.nodes.push(point);
        for (const node of nodeGroupRed) {
            if (node === point) continue;
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