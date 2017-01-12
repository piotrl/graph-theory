class ColoringBfs {
    constructor(digraph) {
        this.digraph = Object.assign(digraph);
        this.properties = this.digraph.nodes
            .map(key => ({key: key, visited: false, color: undefined}));

        this.queue = [];
        this.conflict = false;
    }

    search(start) {
        this.searchSingleNode(start);

        // for rest of not found
        let notVisitedNodes = this.properties.filter(nodeParam => !nodeParam.visited);
        for (let nodeParams of notVisitedNodes) {
            this.searchSingleNode(nodeParams.key);
        }
    }

    searchSingleNode(start) {
        this.queue.push(start);
        this.property(start).color = 1;

        while (this.queue.length > 0) {
            const node = this.queue.shift();
            if (this.isVisited(node)) {
                continue;
            }

            this.markVisited(node);
            this.addToQueue(node, this.digraph.getSiblings(node));
        }

        return true;
    }

    addToQueue(currentNode, siblings) {
        siblings.forEach(nextNode => {
            if (this.isVisited(nextNode)) return;
            this.queue.push(nextNode);
        });

        for (let neighbour of siblings) {
            this.markColor(currentNode, neighbour);
        }

        return true;
    }

    markColor(node, neighbour) {
        node = this.property(node);
        neighbour = this.property(neighbour);
        if (neighbour.color === undefined) {
            neighbour.color = (node.color + 1) % 2;
        } else if (neighbour.color === node.color) {
            console.log(`Color conflict for (${node.key}, ${neighbour.key}). Same color: ${node.color}`);
            this.conflict = true;
        }
    }

    markVisited(node) {
        const nodeParam = this.property(node);
        if (!nodeParam) {
            throw Error(`markVisited: Not found node: ${node}`);
        }
        nodeParam.visited = true;
    }

    isVisited(node) {
        const nodeParam = this.property(node);
        if (!nodeParam) {
            throw Error(`isVisited: Not found node: ${node}`);
        }
        return nodeParam.visited;
    }

    property(node) {
        return this.properties.find(nodeParams => nodeParams.key === node);
    }
}
module.exports = ColoringBfs;