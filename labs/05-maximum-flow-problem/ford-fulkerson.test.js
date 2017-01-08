const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const FordFulkerson = require(`./ford-fulkerson`);

const assert = chai.assert;

describe(`FordFulkerson method`, function () {
    describe(`Finding maximum flow`, function () {
        it(`Cormen example`, function () {
            const network = new DiGraph(["s", "v1", "v2", "v3", "v4", "t"])
                    .addEdge("s", "v1", 16)
                    .addEdge("s", "v2", 13)
                    .addEdge("v1", "v2", 10)
                    .addEdge("v1", "v3", 12)
                    .addEdge("v2", "v1", 4)
                    .addEdge("v2", "v4", 14)
                    .addEdge("v3", "v2", 9)
                    .addEdge("v3", "t", 20)
                    .addEdge("v4", "v3", 7)
                    .addEdge("v4", "t", 4)
                ;

            const fordFulkerson = new FordFulkerson(network, "s", "t");
            const maxFlow = fordFulkerson.startAlgorithm();

            assert.deepEqual(maxFlow, 23);
        });

        it(`Excercise 1`, function () {
            const network = new DiGraph(["s", "1", "2", "3", "4", "5", "6", "t"])
                    .addEdge("s", "1", 3)
                    .addEdge("s", "2", 5)
                    .addEdge("s", "3", 1)
                    .addEdge("1", "4", 2)
                    .addEdge("2", "3", 2)
                    .addEdge("2", "5", 4)
                    .addEdge("3", "4", 2)
                    .addEdge("3", "6", 2)
                    .addEdge("3", "5", 2)
                    .addEdge("4", "t", 3)
                    .addEdge("5", "t", 1)
                    .addEdge("6", "t", 2)
                ;

            const fordFulkerson = new FordFulkerson(network, "s", "t");
            const maxFlow = fordFulkerson.startAlgorithm();

            assert.deepEqual(maxFlow, 17);
        });

        it(`Excercise 2`, function () {
            const network = new DiGraph(["s", "a", "b", "c", "d", "e", "t"])
                    .addEdge("s", "a", 9)
                    .addEdge("s", "d", 9)
                    .addEdge("a", "c", 3)
                    .addEdge("a", "b", 7)
                    .addEdge("b", "t", 6)
                    .addEdge("b", "c", 4)
                    .addEdge("c", "e", 2)
                    .addEdge("c", "t", 9)
                    .addEdge("d", "c", 3)
                    .addEdge("d", "e", 6)
                    .addEdge("e", "t", 8)
                ;

            const fordFulkerson = new FordFulkerson(network, "s", "t");
            const maxFlow = fordFulkerson.startAlgorithm();

            assert.deepEqual(maxFlow, 18);
        });
    });

    describe(`Support methods`, function () {
        let network;

        beforeEach(function () {
            network = new DiGraph(["s", "v1", "v2", "v3", "v4", "t"])
                    .addEdge("s", "v1", 16)
                    .addEdge("s", "v2", 13)
                    .addEdge("v1", "v2", 10)
                    .addEdge("v1", "v3", 12)
                    .addEdge("v2", "v1", 4)
                    .addEdge("v2", "v4", 14)
                    .addEdge("v3", "v2", 9)
                    .addEdge("v3", "t", 20)
                    .addEdge("v4", "v3", 7)
                    .addEdge("v4", "t", 4)
                ;
        });

        it(`Finding extending path`, function () {
            const fordFulkerson = new FordFulkerson(network, "s", "t");
            const path = fordFulkerson.extendingPath();

            // longest path - not very good solution
            assert.deepEqual(path, [ "s", "v1", "v2", "v4", "t" ]);
        });

        it(`Calculate bottleneck`, function () {
            const fordFulkerson = new FordFulkerson(network, "s", "t");
            const path = ["s", "v1", "v3", "t"];
            const bottleneck = fordFulkerson.bottleneckCapacity(path);

            assert.deepEqual(bottleneck, 12);
        });

        it(`Calculate bottleneck of long path`, function () {
            const fordFulkerson = new FordFulkerson(network, "s", "t");
            const path = [ "s", "v1", "v2", "v4", "t"];
            const bottleneck = fordFulkerson.bottleneckCapacity(path);

            assert.deepEqual(bottleneck, 4);
        });
    });
});