class DiGraph {
    constructor(nodes, edges) {
        this.nodes = nodes || [];
        this.edges = edges || [];
        this._lists = {};

        this.nodes.forEach(vertex => {
            this._lists[vertex] = [];
        });

        this.edges.forEach(edge => {
            this.addEdge(... edge);
        });
    }

    get first() {
        return this.nodes[0];
    }

    get lists() {
        return this._lists;
    };

    reverse() {
        const graph = new DiGraph(this.nodes);
        this.edges.forEach(edge => {
            graph.addEdge(edge[1], edge[0]);
        });

        return graph;
    }

    getSiblings(vertex) {
        if (!this._lists[vertex]) {
            return [];
        }
        return Object.assign(this._lists[vertex]);
    }

    addEdge(fromVertex, toVertex) {
        const vertexList = this._lists[fromVertex];

        if (vertexList) {
            this.edges.push([fromVertex, toVertex]);
            vertexList.push(toVertex);
        } else {
            throw Error(`Point (${fromVertex}, ${toVertex}) not found`);
        }

        return this;
    }

    removeNode(nodeToDelete) {
        const nodeIndex = this.nodes.indexOf(nodeToDelete);
        this.nodes.splice(nodeIndex, 1);

        const siblingsList = this._lists[nodeToDelete];
        if (siblingsList) {
            delete this._lists[nodeToDelete];
        }

        Object.keys(this._lists).map(key => this._lists[key])
            .forEach(vertexList => {
                vertexList.forEach((node, index) => {
                    if (nodeToDelete === node) {
                        delete vertexList[index];
                    }
                });
            })
    }
}

module.exports = DiGraph;