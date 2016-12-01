const chai = require(`chai`);
const DiGraph = require(`./digraph-weight`);

const assert = chai.assert;
const expect = chai.expect;

describe(`Digraph with weight representation by lists`, function () {

    describe(`Digraph weight`, function () {
        it(`Finds weight of edge`, function () {
            const diGraph = new DiGraph([1, 2])
                .addEdge(1, 2, 3)
                .addEdge(2, 1, 7);
            assert.deepEqual(diGraph.lists, {
                1: [2],
                2: [1]
            });

            assert.equal(diGraph.weight(1, 2), 3);
            assert.equal(diGraph.weight(2, 1), 7);
        });

        it(`Remove edge`, function () {
            const diGraph = new DiGraph([1, 2])
                .addEdge(1, 2, 3)
                .addEdge(2, 1, 7)
                .removeEdge(1, 2);

            assert.deepEqual(diGraph.lists, {
                1: [],
                2: [1]
            });

            assert.equal(diGraph.weight(1, 2), Infinity);
            assert.equal(diGraph.weight(2, 1), 7);
        });


        it(`Remove node`, function () {
            const diGraph = new DiGraph([1, 2, 3])
                .addEdge(1, 2, 3)
                .addEdge(2, 1, 7)
                .addEdge(2, 3, 5);

            assert.deepEqual(diGraph.lists, {
                1: [2],
                2: [1, 3],
                3: []
            });

            diGraph.removeNode(1);

            assert.deepEqual(diGraph.lists, {
                2: [3],
                3: []
            });

            assert.equal(diGraph.weight(1, 2), Infinity);
            assert.equal(diGraph.weight(2, 1), Infinity);
            assert.equal(diGraph.weight(2, 3), 5);
        });
    });

    describe(`Digraph creation`, function () {

        it(`Init with only one vertex`, function () {
            const diGraph = new DiGraph([1]);
            assert.deepEqual(diGraph.lists, {
                1: []
            });
        });

        it(`Init rows arent equal only vertex`, function () {
            const diGraph = new DiGraph([1, 2]);
            assert.notEqual(diGraph.lists[0], diGraph.lists[1]);
        });

        it(`Init with one edge`, function () {
            const graph = new DiGraph([1, 2])
                .addEdge(1, 2);

            assert.deepEqual(graph.lists, {
                1: [2],
                2: []
            });
        });
    });

    describe(`Reverse digraph`, function () {
        it(`Init with one edge`, function () {
            const graph = new DiGraph([1, 2])
                .addEdge(1, 2)
                .reverse();

            assert.deepEqual(graph.lists, {
                1: [],
                2: [1]
            });
        });

        it(`Init with three edges`, function () {
            const graph = new DiGraph([1, 2, 3])
                .addEdge(1, 2)
                .addEdge(1, 3)
                .addEdge(2, 3)
                .reverse();
            assert.deepEqual(graph.lists, {
                1: [],
                2: [1],
                3: [1, 2]
            });
        });
    });

    describe(`Digraph operations`, function () {

        it(`Siblings for to way`, function () {
            const diGraph = new DiGraph([1]);
            assert.deepEqual(diGraph.lists, {
                1: []
            });
        });

        it(`Init rows arent equal only vertex`, function () {
            const diGraph = new DiGraph([1, 2]);
            assert.notEqual(diGraph.lists[0], diGraph.lists[1]);
        });

        it(`Init with one edge`, function () {
            const matrix = new DiGraph([1, 2])
                .addEdge(1, 2);
            assert.deepEqual(matrix.lists, {
                1: [2],
                2: []
            });
        });
    });
});