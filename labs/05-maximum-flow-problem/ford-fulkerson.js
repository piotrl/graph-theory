class FordFulkerson {
    constructor(digraph, s, t) {
        this.s = s;
        this.t = t;
        this.f = [];
        this.digraph = Object.assign(digraph);
    }

    findMaxFlow() {
        this.initFunction(0);

        let p = this.extendingPathExists();
        while(p.length > 0) {
            this.extendFlow(p);
        }

        return this.f;
    }

    extendingPathExists() {
        return false;
    }

    extendFlow(p) {

    }

    initFunction(number) {

    }


    initPath(startPoint) {
        const shortestPath = {};
        this.digraph.nodes
            .forEach(node => {
                shortestPath[node] = this.digraph.weight(startPoint, node);
            });

        return shortestPath;
    }

}

module.exports = FordFulkerson;