class BFS {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
        this.visited = this.digraph.nodes
            .map(key => ({key: key, visited: false}));
        this.path = {};
        this.order = [];
        this.queue = [];
        this.found = false;
    }

    pathTo(node) {
        let previous = this.path[node];
        const path = [node];
        while (previous !== undefined) {
            path.unshift(previous);
            previous = this.path[previous];
        }

        return path;
    }
    
    search(start, end) {
        this.searchSingleNode(start, end);

        // for rest of not found
        let notVisitedNodes = this.visited.filter(nodeParam => !nodeParam.visited);
        for (let nodeParams of notVisitedNodes) {
            if (this.found) return this.found;
            this.searchSingleNode(nodeParams.key, end);
        }
        return this.found;
    }

    searchSingleNode(start, end) {
        this.queue.push(start);
        while (this.queue.length > 0) {
            const node = this.queue.shift();
            if (this.isVisited(node)) {
                continue;
            }

            this.order.push(node);
            this.markVisited(node);
            if (end === node) {
                this.found = true;
                return this.found;
            }
            this.addToQueue(node, this.digraph.getSiblings(node));
        }

        this.found = false;
        return this.found;
    }

    addToQueue(previous, siblings) {
        siblings
            .forEach(nextNode => {
                if (this.isVisited(nextNode)) return;
                this.updatePath(nextNode, previous);
                this.queue.push(nextNode);
            });
    }

    updatePath(node, previous) {
        this.path[node] = previous;
    }

    markVisited(node) {
        const nodeParam = this.visited.find(nodeParams => nodeParams.key === node);
        if (!nodeParam) {
            throw Error(`markVisited: Not found node: ${node}`);
        }
        nodeParam.visited = true;
    }

    isVisited(node) {
        const nodeParam = this.visited.find(nodeParams => nodeParams.key === node);
        if (!nodeParam) {
            throw Error(`isVisited: Not found node: ${node}`);
        }
        return nodeParam.visited;
    }
}
module.exports = BFS;