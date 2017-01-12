const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const BFS = require(`./bfs`);

const assert = chai.assert;
const expect = chai.expect;

describe(`BFS`, function () {

    describe(`search`, function () {
        it(`basic found example`, function () {
            const graph = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("a", "c")
                    .addEdge("c", "d")
                ;

            const dfs = new BFS(graph);
            const isFound = dfs.search("a", "d");

            assert.isTrue(isFound);
            assert.deepEqual(dfs.order, ["a", "b", "c", "d"]);
            assert.deepEqual(dfs.pathTo("d"), ["a", "c", "d"]);
        });

        it(`basic not found example`, function () {
            const graph = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("a", "c")
                    .addEdge("c", "d")
                ;

            const dfs = new BFS(graph);
            const isFound = dfs.search("a", "e");

            assert.isFalse(isFound);
        });

        it(`example from internet`, function () {
            const digraph = new DiGraph(['S', 'A', 'B', 'C', 'D'])
                .addEdge('S', 'A')
                .addEdge('S', 'B')
                .addEdge('S', 'C')
                .addEdge('A', 'D')
                .addEdge('B', 'D')
                .addEdge('C', 'D');

            const dfs = new BFS(digraph);
            dfs.search('S', 'D');

            assert.deepEqual(dfs.order, ['S', 'A', 'B', 'C', 'D']);
            assert.deepEqual(dfs.pathTo('D'), ['S', 'C', 'D']);
        });

        it(`example from almost ford fulekrson`, function () {
            const digraph = new DiGraph(["s", "v1", "v2", "v3", "v4", "t"])
                    .addEdge("v1", "s", 16)
                    .addEdge("s", "v2", 6)
                    .addEdge("v2", "s", 7)
                    .addEdge("v1", "v2", 10)
                    .addEdge("v2", "v1", 8)
                    .addEdge("v3", "v1", 12)
                    .addEdge("v2", "v4", 11)
                    .addEdge("v4", "v2", 3)
                    .addEdge("v3", "v2", 9)
                    .addEdge("v3", "t", 1)
                    .addEdge("v3", "v4", 7)
                    .addEdge("t", "v4", 4)
                ;

            const dfs = new BFS(digraph);
            const isFound = dfs.searchSingleNode("s", "t");
            assert.isFalse(isFound);
        });
    });
});