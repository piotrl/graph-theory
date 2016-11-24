class DFS {
    constructor(digraph) {
        this.graph = digraph;
        this.visited = {};
        this.order = [];
        this.stack = [];
    }

    search(searchedNode) {
        const graph = Object.assign(this.graph);
        const node = graph.first;

        if (node && !this.visited[node]) {
            this.stack.push(node);
        }

        while (this.stack.length) {
            const node = this.stack.pop();
            if (this.visited[node]) {
                continue;
            }

            this.order.push(node);
            this.visited[node] = true;
            if (node === searchedNode) {
                return true;
            }
            this.addOrderedNodesToStack(graph.getSiblings(node));
        }

        return false;
    }

    addOrderedNodesToStack(siblings) {
        siblings.sort().reverse() // Alphabetical order
            .forEach((nextNode) => {
                if (this.visited[nextNode]) return;

                this.stack.push(nextNode);
            });
        return siblings;
    }
}
module.exports = DFS;