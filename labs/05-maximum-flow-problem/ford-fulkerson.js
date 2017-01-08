const DFS = require(`./dfs`);


// Edmonds–Karp actually
class FordFulkerson {
    constructor(digraph, source, sink) {
        this.source = source;
        this.sink = sink;
        this.maxFlow = 0;
        this.f = [];
        this.cf = {};
        this.digraph = Object.assign(digraph);
    }

    startAlghorithm() {
        this.cf[this.source] = Infinity;
        this.f = this.initFlow();

        let p = this.extendingPath();
        while (p.length > 0) {
            // compute bottleneck capacity
            const cfp = [];
            for (let i = 0; i < p.length - 1; i++) {
                const u = p[i];
                const v = p[i + 1];
                const nettoValue = this.digraph.weight(u, v);


                this.f[u][v] = this.f[u][v] + cf(p);
                this.f[v][u] = this.f[v][u] - cf(p);
            }

            this.extendFlow(p);
            p = this.extendingPath();
        }

        return this.f;
    }

    bottleneck(path) {
        let bottle = Infinity;
        for (let i = 0; i < p.length - 1; i++) {
            const u = p[i];
            const v = p[i + 1];
            const nettoValue = this.digraph.weight(u, v);
        }
    }

    /**
     * Using DFS is not best solution, but I already had it implemented. :)
     * BFS is much better as it returns shorter paths
     */
    extendingPath() {
        const dfs = new DFS(this.digraph);
        const pathExists = dfs.search(this.source, this.sink);
        if (!pathExists) {
            console.log("s !-> t");
            return [];
        }

        console.log("s -> t", dfs.order);
        return dfs.order;
    }

    extendFlow(p) {
        cfp[y - 1] = Math.Min(cfp[x], cp);

    }

    extendFlowForEdge(u, v) {
        const flowData = this.digraph.weight(u, v);
        // flowData
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

    isFeasible() {

    }

}

module.exports = FordFulkerson;