class DFS {
    constructor(digraph) {
        this.digraph = this.init(digraph);
    }

    init(digraph) {
        this.visited = {};
        this.order = [];
        this.postOrderStack = [];
        this.stack = [];

        return Object.assign(digraph);
    }

    postOrder(node) {
        console.log("pre-order", node, typeof node);
        this.visited[node] = true;

        this.digraph.getSiblings(node)
            .sort().reverse()
            .forEach(sibling => {
                if (sibling && !this.visited[sibling]) {
                    this.postOrder(sibling);
                }
            });

        this.postOrderStack.push(node);
    }

    search(start, searchedNode) {
        const graph = this.init(this.digraph);
        const node = start;

        if (node && !this.visited[node]) {
            this.stack.push(node);
        }

        while (this.stack.length >= 0) {
            const node = this.stack.pop();
            if (this.visited[node]) {
                continue;
            }

            this.order.push(node);
            this.visited[node] = true;
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