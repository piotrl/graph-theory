const chai = require(`chai`);
const DiGraph = require(`./digraph-list`);
const DFS = require(`./dfs`);

const assert = chai.assert;
const expect = chai.expect;

describe(`DFS`, function () {

    describe(`search`, function () {
        it(`basic found example`, function () {
            const graph = new DiGraph(["a", "b", "c", "d"], [
                ["a", "b"],
                ["a", "c"],
                ["c", "d"]
            ]);
            const dfs = new DFS(graph);
            const isFound = dfs.search(digraph.first, "d");

            assert.isTrue(isFound);
            assert.deepEqual(dfs.order, ["a", "b", "c", "d"]);
        });

        it(`basic not found example`, function () {
            const graph = new DiGraph(["a", "b", "c", "d"], [
                ["a", "b"],
                ["a", "c"],
                ["c", "d"]
            ]);
            const dfs = new DFS(graph);
            const isFound = dfs.search(digraph.first, "e");

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

            const dfs = new DFS(digraph);
            dfs.search(digraph.first);

            assert.deepEqual(dfs.order, ['S', 'A', 'D', 'B', 'C']);
        });

        it(`Post order`, function () {
            const digraph = new DiGraph([1, 2, 3, 4, 5, 6, 7, 8, 9])
                .addEdge(1, 2)
                .addEdge(1, 4)
                .addEdge(1, 3)
                .addEdge(3, 5)
                .addEdge(5, 6)
                .addEdge(6, 7)
                .addEdge(7, 3)
                .addEdge(6, 8)
                .addEdge(8, 9)
                .addEdge(9, 8);

            const dfs = new DFS(digraph);
            dfs.postOrder(digraph.first);

            assert.deepEqual(dfs.postOrderStack, [7, 9, 8, 6, 5, 3, 2, 4, 1]);
            // assert.deepEqual(dfs.postOrder, [7, 9, 8, 6, 5, 3, 2, 4, 1]);
        });
    });
});