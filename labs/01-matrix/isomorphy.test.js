const chai = require(`chai`);
const AdjacencyMatrix = require(`./adjacency-matrix`);
const C3Isomorh = require(`./isomorphy`);
const c3Isomorh = new C3Isomorh();

const assert = chai.assert;
const expect = chai.expect;

function graphWithIsomorphicSubGraph() {
    // Graph from example https://pl.wikipedia.org/wiki/Macierz_s%C4%85siedztwa

    return new AdjacencyMatrix([1, 2, 3, 4, 5, 6])
        .addEdge(6, 4)
        .addEdge(4, 3)
        .addEdge(4, 5)
        .addEdge(3, 2)
        .addEdge(5, 2)
        .addEdge(5, 1)
        .addEdge(2, 1);
}

function graphWithoutIsomorphicSubGraph() {
    return new AdjacencyMatrix([1, 2, 3, 4])
        .addEdge(1, 2)
        .addEdge(1, 3)
        .addEdge(1, 4);
}

describe(`2. Graf zawiera podgraf izomorficzny do cyklu C3 `, function () {
    describe(`2a) Naive`, function () {

        it(`Founds subgraph isomorphic to C3`, function () {
            const graph = graphWithIsomorphicSubGraph();
            const result = c3Isomorh.isIsomorphicNaive(graph);

            assert.equal(result.value, true);
            // assert.sameMembers(result.graph, [5, 2, 1]);
        });

        it(`Not founds subgraph isomorphic to C3`, function () {
            const graph = graphWithoutIsomorphicSubGraph();

            const result = c3Isomorh.isIsomorphicNaive(graph);

            assert.equal(result.value, false);
            assert.isUndefined(result.graph);
        });
    });

    describe(`2b) Optimised`, function () {

        it(`Founds subgraph isomorphic to C3`, function () {
            const graph = graphWithIsomorphicSubGraph();
            const result = c3Isomorh.isIsomorphicOptimised(graph);

            assert.equal(result, true);
        });

        it(`Not founds subgraph isomorphic to C3`, function () {
            const graph = graphWithoutIsomorphicSubGraph();

            const result = c3Isomorh.isIsomorphicOptimised(graph);

            assert.equal(result, false);
        });
    });
});
