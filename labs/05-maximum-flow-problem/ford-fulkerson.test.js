const chai = require(`chai`);
const DiGraph = require(`./digraph-weight`);
const FordFulkerson = require(`./ford-fulkerson`);

const assert = chai.assert;

describe(`FordFulkerson method`, function () {
    describe(`Finding maximum flow`, function () {
        it(`Example from lecture #1 for point 1`, function () {
            const diGraph = new DiGraph([1, 2, 3, 4, 5, 6])
                    .addEdge(1, 2, 1)
                    .addEdge(1, 4, 2)
                    .addEdge(4, 2, 4)
                    .addEdge(2, 3, 6)
                    .addEdge(4, 5, 3)
                    .addEdge(3, 5, 1)
                    .addEdge(3, 6, 4)
                    .addEdge(5, 6, 1)
                ;
            const fordFulkerson = new FordFulkerson(diGraph);

        });



    });
});