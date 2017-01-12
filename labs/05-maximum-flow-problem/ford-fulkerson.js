const BFS = require(`./bfs`);

class FordFulkerson {
    constructor(digraph, source, sink) {
        this.source = source;
        this.sink = sink;
        this.residual = Object.assign(digraph);
    }

    startAlgorithm() {
        let maxFlow = 0;
        let p = this.extendingPath();
        while (p.length > 1) {
            const bottleneck = this.bottleneckCapacity(p);
            this.residualGraphUpdate(p, bottleneck);

            maxFlow += bottleneck;
            console.log("Max flow: ", maxFlow);
            p = this.extendingPath();
        }

        return maxFlow;
    }

    bottleneckCapacity(path) {
        const min = {
            bottle: Infinity,
            u: "",
            v: ""
        };
        forEachEdge(path, (u, v) => {
            const nettoValue = this.residual.weight(u, v);
            if (nettoValue < min.bottle) {
                min.bottle = nettoValue;
                min.u = u;
                min.v = v;
            }
        });
        console.log(`Bottleneck(${min.u}, ${min.v}) = ${min.bottle}`);
        return min.bottle;
    }

    residualGraphUpdate(path, bottleneck) {
        const graph = this.residual;
        forEachEdge(path, (u, v) => {
            const edge = this.useEdgeOrCreate(u, v);
            const symmetric = this.useEdgeOrCreate(v, u);

            if ((edge.weight || 0) - bottleneck < 0) {
                console.log("WRONG: edge.weight < 0", u, v, path);
            }

            symmetric.weight = (symmetric.weight || 0) + bottleneck;
            edge.weight = (edge.weight || 0) - bottleneck;

            if (edge.weight === 0) {
                graph.removeEdge(u, v);
            }

            if (symmetric.weight === 0) {
                graph.removeEdge(v, u);
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

    extendingPath() {
        const bfs = new BFS(this.residual);
        const pathExists = bfs.searchSingleNode(this.source, this.sink);
        if (!pathExists) {
            console.log("s !-> t");
            return [];
        }

        console.log("s -> t", bfs.pathTo(this.sink));
        return bfs.pathTo(this.sink);
    }
}

function forEachEdge(path, cb) {
    for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        cb(u, v);
    }
}

module.exports = FordFulkerson;