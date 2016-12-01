class Djikstra {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
    }

    findShortestPath(startPoint) {
        const path = this.initPath(startPoint);
        this.digraph.removeNode(startPoint);

        while (this.digraph.nodes.length > 0) {
            const minNodeInPath = this.min(path, this.digraph.nodes);
            this.digraph.nodes.forEach(node => {
                path[node] = Math.min(
                    path[node],
                    path[minNodeInPath] + this.digraph.weight(minNodeInPath, node)
                );
            });
            this.digraph.removeNode(minNodeInPath);
        }

        return path;
    }

    initPath(startPoint) {
        const shortestPath = {};
        this.digraph.nodes
            .forEach(node => {
                shortestPath[node] = this.digraph.weight(startPoint, node);
            });

        return shortestPath;
    }

    min(path, nodes) {
        let minNode = nodes[0];
        nodes.forEach(node => {
            if (path[node] < path[minNode]) {
                minNode = node;
            }
        });

        return minNode;
    }
}

module.exports = Djikstra;