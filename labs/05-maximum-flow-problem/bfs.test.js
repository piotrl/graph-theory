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
            assert.deepEqual(dfs.pathTo('D'), ['S', 'C', 'D' ]);
        });
    });
});