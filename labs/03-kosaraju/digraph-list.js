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
        return Object.assign(this.lists[vertex]);
    }

    addEdge(fromVertex, toVertex) {
        const vertexList = this.lists[fromVertex];

        if (vertexList) {
            this.edges.push([fromVertex, toVertex]);
            vertexList.push(toVertex);
        } else {
            throw Error(`Point (${fromVertex}, ${toVertex}) not found`);
        }

        return this;
    }
}

module.exports = DiGraph;