const chai = require(`chai`);
const DiGraph = require(`./digraph-list`);

const assert = chai.assert;
const expect = chai.expect;

describe(`Digraph representation by lists`, function () {
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
            const graph = new DiGraph([1, 2], [
                [1, 2]
            ]);
            assert.deepEqual(graph.lists, {
                1: [2],
                2: []
            });
        });
    });

    describe(`Reverse digraph`, function () {
        it(`Init with one edge`, function () {
            const graph = new DiGraph([1, 2], [
                [1, 2]
            ]).reverse();
            assert.deepEqual(graph.lists, {
                1: [],
                2: [1]
            });
        });

        it(`Init with three edges`, function () {
            const graph = new DiGraph([1, 2, 3], [
                [1, 2],
                [1, 3],
                [2, 3]
            ]).reverse();
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
            const matrix = new DiGraph([1, 2], [
                [1, 2]
            ]);
            assert.deepEqual(matrix.lists, {
                1: [2],
                2: []
            });
        });
    });
});