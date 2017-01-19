
const DFS = require("../03-kosaraju/dfs");

class FleuryEulerCycles {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
        this.cycle = [];
    }

    hasEulerCycle() {
        for (const node of this.digraph.nodes) {
            const siblings = this.digraph.getSiblings(node);
            if (siblings.length % 2 !== 0) {
                return false;
            }
        }

        return true;
    }

    findGraphCycle(fromVertex = this.digraph.first) {
        for (const toVertex of this.digraph.getSiblings(fromVertex)) {
            if (this.isValidNextEdge(fromVertex, toVertex)) {
                this.cycle.push([fromVertex, toVertex]);
                this.removeEdge(fromVertex, toVertex);
                this.findGraphCycle(toVertex);
            }
        }

        return this.cycle;
    }

    isValidNextEdge(fromVertex, toVertex) {
        const siblings = this.digraph.getSiblings(fromVertex);
        if (siblings.length === 1) {
            return true;
        }
        // check if graph
        const achievableVertexes = this.achievableVertexes(fromVertex);
        this.removeEdge(fromVertex, toVertex);

        const achievableVertexesAfterRemove = this.achievableVertexes(fromVertex);
        this.addEdge(fromVertex, toVertex);

        return achievableVertexes <= achievableVertexesAfterRemove;
    }

    achievableVertexes(fromVertex) {
        const dfs = new DFS(this.digraph);
        dfs.search(fromVertex);
        return dfs.order.length;
    }

    removeEdge(from, to) {
        this.digraph.removeEdge(from, to);
        this.digraph.removeEdge(to, from);
    }

    addEdge(from, to) {
        this.digraph.removeEdge(from, to);
        this.digraph.removeEdge(to, from);
    }

    printCycle(cycle) {
        console.log("CYCLE");
        for (const edge of cycle) {
            console.log(`${edge[0]} - ${edge[1]}`);
        }
    }
}

module.exports = FleuryEulerCycles;