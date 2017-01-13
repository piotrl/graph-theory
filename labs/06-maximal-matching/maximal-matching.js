const DiGraph = require("../04-djikstra-shortest-path/digraph-weight");
const FordFulkerson = require("../05-maximum-flow-problem/ford-fulkerson");
const ColoringBfs = require("./coloring-bfs");

class MaximalMatching {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
    }

    findMaximalMatching() {
        if (!this.validateBipartite()) {
            throw new Error("Not valid bipartie graph");
        }
        this.transformToNetowrk();
        const fordFulkerson = new FordFulkerson(this.network, "s", "t");
        fordFulkerson.startAlgorithm();

        let maxMatchingAmount = 0;
        for (const node of this.groupRed) {
            const siblings = fordFulkerson.residual.getSiblings(node);

            for (const sibling of siblings) {
                if (sibling === "s" || sibling === "t") continue;

                if (fordFulkerson.residual.weight(node, sibling) === 1) {
                    console.log(`(${node}, ${sibling})`);
                    maxMatchingAmount++;
                }
            }
        }
        console.log(`Maximum matching: ${maxMatchingAmount}`)
        return maxMatchingAmount;
    }

    transformToNetowrk() {
        this.network = new DiGraph(this.digraph.nodes);
        const groups = this.getGroups();
        this.groupBlue = groups[0];
        this.groupRed = groups[1];
        this.addEntryPoints(this.groupBlue, this.groupRed);
        for (const edge of this.network.edges) {
            edge.weight = 1;
        }

        return this.network;
    }

    addEntryPoints(nodeGroupBlue, nodeGroupRed) {
        let point = "s";
        this.network.addNode(point);
        for (const node of nodeGroupBlue) {
            if (node === point) continue;
            this.network.addEdge(point, node);
            for (const sibling of this.digraph.getSiblings(node)) {
                this.network.addEdge(node, sibling);
            }
        }
        point = "t";
        this.network.addNode(point);
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