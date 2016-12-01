const chai = require(`chai`);
const DiGraph = require(`./digraph-weight`);
const Djikstra = require(`./djikstra`);

const assert = chai.assert;

describe(`Djikstra alghorithm`, function () {
    describe(`Finding shortest paths`, function () {
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
            const djikstra = new Djikstra(diGraph);
            const shortestPathsFor1 = djikstra.findShortestPath(1);

            assert.deepEqual(shortestPathsFor1, {
                1: 0,
                2: 1,
                3: 7,
                4: 2,
                5: 5,
                6: 6
            });
        });

        it(`Example from lecture #1 for point 2`, function () {
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
            const djikstra = new Djikstra(diGraph);
            const shortestPathsFor2 = djikstra.findShortestPath(2);

            assert.deepEqual(shortestPathsFor2, {
                1: Infinity,
                2: 0,
                3: 6,
                4: Infinity,
                5: 7,
                6: 8
            });
        });

        it(`Example from lecture #2 with symmetric graph`, function () {
            const diGraph = new DiGraph(["s", "b", "a", "c", "d", "e"])
                    .addEdge("s", "b", 2)
                    .addEdge("b", "a", 1)
                    .addEdge("a", "e", 1)
                    .addEdge("e", "d", 4)
                    .addEdge("d", "b", 1)
                    .addEdge("d", "c", 2)
                    .addEdge("d", "a", 3)
                    .addEdge("d", "s", 1)
                    .addEdge("c", "s", 2)
                    .addEdge("c", "b", 1)
                    .symetricEdges()
                ;
            const djikstra = new Djikstra(diGraph);
            const shortestPaths = djikstra.findShortestPath("s");

            assert.deepEqual(shortestPaths, {
                "s": 0,
                "a": 3,
                "b": 2,
                "c": 2,
                "d": 1,
                "e": 4
            });
        });
    });
});