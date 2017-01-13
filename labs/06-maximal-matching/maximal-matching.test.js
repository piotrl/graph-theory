const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const MaximalMatching = require(`./maximal-matching`);

const assert = chai.assert;

describe(`MaximalMatching method`, function () {
    describe(`Maximal matching`, function () {
        it(`Find`, function () {
            const network = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("b", "c")
                    .addEdge("c", "d")
                    .addEdge("d", "a")
                    .symetricEdges()
                ;
            const maximalMatching = new MaximalMatching(network, "s", "t");
            maximalMatching.findMaximalMatching();
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
    });
});