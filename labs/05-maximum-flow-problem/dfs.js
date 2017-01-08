class DFS {
    constructor(digraph) {
        this.init(digraph);
    }

    init(digraph) {
        this.digraph = Object.assign(digraph);
        this.visited = this.digraph.nodes
            .map(key => ({key: key, visited: false}));

        this.order = [];
        this.postOrderStack = [];
        this.stack = [];
    }

    postOrder(start) {
        this.singlePathPostOrder(start);

        // for rest of not found
        let notVisitedNodes = this.visited.filter(nodeParam => !nodeParam.visited);
        notVisitedNodes.forEach(nodeParams => {
            this.singlePathPostOrder(nodeParams.key);
        });
    }

    singlePathPostOrder(node) {
        if (this.isVisited(node)) {
            return;
        } else {
            this.markVisited(node);
        }

        this.digraph.getSiblings(node)
            .sort()
            .forEach(sibling => {
                if (!this.isVisited(sibling)) {
                    this.singlePathPostOrder(sibling);
                }
            });

        this.postOrderStack.push(node);
    }

    markVisited(node) {
        const nodeParam = this.visited.find(nodeParams => nodeParams.key === node);
        if (!nodeParam) {
            throw Error(`Not found node: ${node}`);
        }
        nodeParam.visited = true;
    }

    isVisited(node) {
        const nodeParam = this.visited.find(nodeParams => nodeParams.key === node);
        if (!nodeParam) {
            throw Error(`Not found node: ${node}`);
        }
        return nodeParam.visited;
    }

    search(start, end) {
        if (!this.isVisited(start)) {
            this.stack.push(start);
        }

        while (this.stack.length > 0) {
            const node = this.stack.pop();
            if (this.isVisited(node)) {
                continue;
            }

            this.order.push(node);
            this.markVisited(node);
            if (end === node) {
                return true;
            }
            this.addOrderedNodesToStack(this.digraph.getSiblings(node));
        }

        return false;
    }

    addOrderedNodesToStack(siblings) {
        siblings.sort()
            .forEach(nextNode => {
                if (this.isVisited(nextNode)) return;

                this.stack.push(nextNode);
            });
        return siblings;
    }

}
module.exports = DFS;