const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const MaximalMatching = require(`./maximal-matching`);

const assert = chai.assert;

describe(`MaximalMatching method`, function () {
    describe(`Maximal matching`, function () {
        it(`Find simple example`, function () {
            const network = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("b", "c")
                    .addEdge("c", "d")
                    .addEdge("d", "a")
                    .symetricEdges()
                ;
            const maximalMatching = new MaximalMatching(network);
            maximalMatching.findMaximalMatching();
        });

        // http://eduinf.waw.pl/inf/alg/001_search/0147.php
        it(`Example from website`, function () {
            const network = new DiGraph([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                    .addEdge(0, 5)
                    .addEdge(0, 7)
                    .addEdge(0, 9)
                    .addEdge(1, 6)
                    .addEdge(1, 8)
                    .addEdge(2, 5)
                    .addEdge(2, 6)
                    .addEdge(2, 7)
                    .addEdge(2, 8)
                    .addEdge(2, 9)
                    .addEdge(3, 7)
                    .addEdge(3, 8)
                    .addEdge(4, 6)
                    .addEdge(4, 8)
                    .symetricEdges()
                ;
            const maximalMatching = new MaximalMatching(network);
            maximalMatching.findMaximalMatching();
        });
    });

    describe("Build network from graph", function () {
        it(`Validate complicated bipartie graph`, function () {
            const graph = new DiGraph([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                    .addEdge(0, 5)
                    .addEdge(0, 7)
                    .addEdge(0, 9)
                    .addEdge(1, 6)
                    .addEdge(1, 8)
                    .addEdge(2, 5)
                    .addEdge(2, 6)
                    .addEdge(2, 7)
                    .addEdge(2, 8)
                    .addEdge(2, 9)
                    .addEdge(3, 7)
                    .addEdge(3, 8)
                    .addEdge(4, 6)
                    .addEdge(4, 8)
                    .symetricEdges()
                ;

            const maximalMatching = new MaximalMatching(graph);
            const isBipartite = maximalMatching.validateBipartite();
            const network = maximalMatching.transformToNetowrk();
            console.log(network);

            assert.isTrue(isBipartite);
        });
    });

    describe(`Validate bipartie graph`, function () {
        it(`Validate wrong bipartie graph`, function () {
            const network = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("c", "b")
                    .addEdge("c", "d")
                    .addEdge("d", "b")
                    .reverse()
                ;
            const maximalMatching = new MaximalMatching(network, "s", "t");
            const isBipartite = maximalMatching.validateBipartite();
            const groups = maximalMatching.getGroups();
            console.log(groups);

            assert.isFalse(isBipartite);
        });

        it(`Validate OK bipartie graph`, function () {
            const network = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("b", "c")
                    .addEdge("c", "d")
                    .addEdge("d", "a")
                ;
            const maximalMatching = new MaximalMatching(network, "s", "t");
            const isBipartite = maximalMatching.validateBipartite();
            const groups = maximalMatching.getGroups();
            console.log(groups);

            assert.isTrue(isBipartite);
        });

        it(`Validate complicated bipartie graph`, function () {
            const network = new DiGraph([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                    .addEdge(0, 5)
                    .addEdge(0, 7)
                    .addEdge(0, 9)
                    .addEdge(1, 6)
                    .addEdge(1, 8)
                    .addEdge(2, 5)
                    .addEdge(2, 6)
                    .addEdge(2, 7)
                    .addEdge(2, 8)
                    .addEdge(2, 9)
                    .addEdge(3, 7)
                    .addEdge(3, 8)
                    .addEdge(4, 6)
                    .addEdge(4, 8)
                    .symetricEdges()
                ;

            const maximalMatching = new MaximalMatching(network);
            const isBipartite = maximalMatching.validateBipartite();
            const groups = maximalMatching.getGroups();
            console.log(groups);

            assert.isTrue(isBipartite);
            assert.deepEqual(groups, {'0': [5, 6, 7, 8, 9], '1': [0, 1, 2, 3, 4]});
        });
    });
});