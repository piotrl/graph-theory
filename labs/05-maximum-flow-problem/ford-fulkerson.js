const DFS = require(`./dfs`);


// Edmonds–Karp actually
class FordFulkerson {
    constructor(digraph, source, sink) {
        this.source = source;
        this.sink = sink;
        this.residual = Object.assign(digraph);
    }

    startAlgorithm() {
        let maxFlow = 0;
        let p = this.extendingPath();
        while (p.length > 0) {
            const bottleneck = this.bottleneckCapacity(p);
            this.residualGraphUpdate(p, bottleneck);

            maxFlow += bottleneck;
            console.log("Max flow: ", maxFlow);
            p = this.extendingPath();
        }

        return maxFlow;
    }

    bottleneckCapacity(path) {
        let bottle = Infinity;
        this.forEachEdge(path, (u, v) => {
            const nettoValue = this.residual.weight(u, v);
            bottle = Math.min(bottle, nettoValue);
        });

        console.log("Bottleneck: ", bottle);
        return bottle;
    }

    residualGraphUpdate(path, bottleneck) {
        const graph = this.residual;
        this.forEachEdge(path, (u, v) => {
            const edge = this.useEdgeOrCreate(u, v);
            const symmetric = this.useEdgeOrCreate(v, u);

            symmetric.weight = symmetric.weight + bottleneck;
            edge.weight = edge.weight - bottleneck;

            if (edge.weight === 0) {
                graph.removeEdge(u, v);
            }
        });
    }

    useEdgeOrCreate(u, v) {
        let edge = this.residual.findEdge(u, v);
        if (edge) {
            return edge;
        }
        this.residual.addEdge(u, v);
        return this.residual.findEdge(u, v);
    }

    /**
     * Using DFS is not best solution, but I already had it implemented. :)
     * BFS is much better as it returns shorter paths
     */
    extendingPath() {
        const dfs = new DFS(this.residual);
        const pathExists = dfs.search(this.source, this.sink);
        if (!pathExists) {
            console.log("s !-> t");
            return [];
        }

        console.log("s -> t", dfs.order);
        return dfs.order;
    }

    forEachEdge(path, cb) {
        for (let i = 0; i < path.length - 1; i++) {
            const u = path[i];
            const v = path[i + 1];
            cb(u, v);
        }
    }

    initFlow() {
        return Array.apply(null, new Array(this.vertex.length))
            .map(() => new Array(this.vertex.length).fill(0));
    }

    validate() {
        if (this.source === this.sink)
            throw new Error("Source equals sink");
        // if (!this.isFeasible(G, s, t))
        //     throw new Error("Initial flow is infeasible");
    }
}

module.exports = FordFulkerson;