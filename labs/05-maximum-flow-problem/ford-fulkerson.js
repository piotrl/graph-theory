const DFS = require(`./dfs`);


class FordFulkerson {
    constructor(digraph, source, sink) {
        this.source = source;
        this.sink = sink;
        this.maxFlow = 0;
        this.residualGraph = [];
        this.digraph = Object.assign(digraph);
    }

    startAlghorithm() {
        this.initFunction(0);

        let p = this.extendingPath();
        while (p.length > 0) {
            this.extendFlow(p);
        }

        return this.f;
    }


    /**
     * Using DFS is not best solution, but I already had it implemented. :)
     * BFS is much better as it returns shorter paths
     */
    extendingPath() {
        const dfs = new DFS(this.digraph);
        dfs.search(this.source, this.sink);
        console.log("s -> t", dfs.order);
        return dfs.order;
    }

    extendFlow(p) {

    }

    initFunction(number) {
        this.residualGraph = Array.apply(null, new Array(this.vertex.length))
            .map(() => new Array(this.vertex.length).fill(0));
    }

    initPath(startPoint) {
        const shortestPath = {};
        this.digraph.nodes
            .forEach(node => {
                shortestPath[node] = this.digraph.weight(startPoint, node);
            });

        return shortestPath;
    }

    validate() {
        if (this.source === this.sink)
            throw new Error("Source equals sink");
        // if (!this.isFeasible(G, s, t))
        //     throw new Error("Initial flow is infeasible");
    }

    isFeasible() {

    }

}

module.exports = FordFulkerson;