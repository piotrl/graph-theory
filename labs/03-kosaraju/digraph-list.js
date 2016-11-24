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
        const nodes = Object.keys(this._lists);

        return nodes.length ? nodes[0] : undefined;
    }

    get lists() {
        return this._lists
    };
    
    reverse() {
        const graph = new DiGraph(this.nodes);
        
        this.edges.forEach(edge => {
            graph.addEdge(edge[1], edge[0]);
        });

        return graph;
    }

    getSiblings(vertex) {
        return this.lists[vertex];
    }

    addEdge(fromVertex, toVertex) {
        const vertexList = this.lists[fromVertex];

        if (vertexList) {
            vertexList.push(toVertex);
        } else {
            throw Error(`Point (${fromVertex}, ${toVertex}) not found`);
        }

        return this;
    }
}

module.exports = DiGraph;