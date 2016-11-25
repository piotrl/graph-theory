const chai = require(`chai`);
const DiGraph = require(`./digraph-list`);
const Kosaraju = require(`./kosaraju`);

const assert = chai.assert;

describe(`Kosaraju alghorithm`, function () {
    describe(`Finding strong connected components`, function () {

        it(`One node graph, no edges`, function () {
            const diGraph = new DiGraph([1]);
            const kosaraju = new Kosaraju(diGraph);

            assert.equal(kosaraju.count, 0);
        });

        it(`Example from lecture`, function () {
            const diGraph = new DiGraph([1, 2, 3, 4, 5, 6, 7, 8, 9])
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

            const kosaraju = new Kosaraju(diGraph);
            const scc = kosaraju.scc();

            // assert.equal(kosaraju.count, 5);
            assert.deepEqual(scc, [
                [1], [2], [4],
                [3, 5, 6, 7],
                [8, 9]
            ]);
        });
    });
});