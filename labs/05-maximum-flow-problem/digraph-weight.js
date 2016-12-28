class DiGraph {
    constructor(nodes, edges) {
        this.nodes = nodes || [];
        this.edges = edges || [];
        this._lists = {};

        this.nodes.forEach(vertex => {
            this._lists[vertex] = [];
        });
    }

    weight(u, v) {
        if (u === v) {
            return 0;
        }
        const edge = this.findEdge(u, v);

        if (edge && edge.weight != null) {
            return edge.weight;
        }

        return Infinity;
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
            graph.addEdge(edge.to, edge.from);
        });

        return graph;
    }

    getSiblings(vertex) {
        if (!this._lists[vertex]) {
            return [];
        }
        return Object.assign(this._lists[vertex]);
    }

    addEdge(from, to, weight) {
        const vertexList = this._lists[from];

        if (vertexList) {
            this.edges.push({from, to, weight});
            vertexList.push(to);
        } else {
            throw Error(`Point (${from}, ${to}) not found`);
        }

        return this;
    }

    symetricEdges() {
        this.edges.forEach(edge => {
            this.addEdge(edge.to, edge.from, edge.weight);
        });

        return this;
    }

    findEdge(u, v) {
        return this.edges.find(edge => {
            return edge.from === u && edge.to === v;
        });
    }

    removeEdge(u, v) {
        this.edges = this.edges.filter(edge => edge.from !== u || edge.to !== v);
        const uEdges = this._lists[u];
        const vIndex = uEdges.indexOf(v);
        if (vIndex !== -1) {
            uEdges.splice(vIndex, 1);
        }

        return this;
    }

    removeNode(nodeToDelete) {
        const nodeIndex = this.nodes.indexOf(nodeToDelete);
        if (nodeIndex != -1) {
            this.nodes.splice(nodeIndex, 1);
        }

        const siblings  = this.getSiblings(nodeToDelete);
        siblings.forEach(node => {
            this.removeEdge(node, nodeToDelete);
            this.removeEdge(nodeToDelete, node);
        });


        const siblingsList = this._lists[nodeToDelete];
        if (siblingsList) {
            delete this._lists[nodeToDelete];
        }

        Object.keys(this._lists)
            .map(key => this._lists[key])
            .forEach(vertexList => {
                const nodeIndex = vertexList.indexOf(nodeToDelete);
                if (nodeIndex !== -1) {
                    vertexList.splice(nodeIndex, 1);
                }
            });
        return this;
    }
}

module.exports = DiGraph;