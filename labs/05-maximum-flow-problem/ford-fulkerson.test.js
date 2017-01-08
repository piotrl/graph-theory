const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const FordFulkerson = require(`./ford-fulkerson`);

const assert = chai.assert;

describe(`FordFulkerson method`, function () {
    describe(`Finding maximum flow`, function () {
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