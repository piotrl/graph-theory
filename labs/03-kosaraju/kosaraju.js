const DFS = require('./dfs');

class Kosajaru {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
        this.components = [];
        this.stack = [];
    }

    scc() {
        const graph = Object.assign(this.digraph);
        const dfs = new DFS(graph);
        dfs.search(graph.first);
        this.stack = dfs.order;

        let G1 = graph.reverse();

        while (this.stack.length) {
            const x = this.stack.pop();
            const component = this.findComponent(G1, x);
            this.components.push(component);

            this.removeNodesFromGraph(component, G1);
            this.removeNodesFromStack(component);
        }

        return this.components;
    }

    findComponent(G1, x) {
        const dfs = new DFS(G1);
        dfs.search(x);
        return dfs.order;
    }

    removeNodesFromStack(component) {
        component.forEach(node => {
            const i = this.stack.indexOf(node);
            if (i !== -1) {
                this.stack.splice(i, 1);
            }
        });
    }

    removeNodesFromGraph(component, graph) {
        component.forEach(node => {
            delete graph.lists[node];
        })
    }

    get count() {
        return this.components.length;
    }
}

module.exports = Kosajaru;