const chai = require(`chai`);
const AdjacencyMatrix = require(`../01-matrix/adjacency-matrix`);
const Cycle = require(`./01-cycle`);

const assert = chai.assert;
const expect = chai.expect;

describe(`Stopien grafu`, function () {
    describe(`Pre-calculations`, function () {
        let matrix;
        before(function () {
            matrix = new AdjacencyMatrix([1, 2, 3, 4])
                .addEdge(1, 2)
                .addEdge(1, 3)
                .addEdge(2, 3)
                .addEdge(2, 4)
                .addEdge(3, 4);
        });

        it(`Graph has minimum degre >= 2`, function () {
            const point = matrix.degree();
            assert.equal(point.max.degree, 3);
            assert.equal(point.min.degree, 2);
        });

        it(`Not existing point contains no edges`, function () {
            const cycle = new Cycle(matrix);

            const edges = cycle.edgesForPoint(1337);
            assert.lengthOf(edges, 0);
            assert.sameMembers(edges, []);
        });

        it(`Finding edges for point`, function () {
            const cycle = new Cycle(matrix);

            const edges = cycle.edgesForPoint(1);
            assert.lengthOf(edges, 2, 'point 1 has 3 edges');
            assert.sameMembers(edges, [2, 3]);
        });
    });

    describe(`Traverse graph`, function () {
        let matrix;
        before(function () {
            matrix = new AdjacencyMatrix([1, 2, 3, 4])
                .addEdge(1, 2)
                .addEdge(1, 3)
                .addEdge(2, 3)
                .addEdge(2, 4)
                .addEdge(3, 4);
        });

        it(`Traverse from point 1`, function () {
            const cycle = new Cycle(matrix);

            const trace = cycle.traverse(1);
            assert.deepEqual(trace, [1, 2, 3, 1]);
        });

        it(`Traverse from point 2`, function () {
            const cycle = new Cycle(matrix);

            const trace = cycle.traverse(2);
            assert.deepEqual(trace, [2, 1, 3, 2]);
        });

        it(`Traverse from point 3`, function () {
            const cycle = new Cycle(matrix);

            const trace = cycle.traverse(3);
            assert.deepEqual(trace, [3, 1, 2, 3]);
        });

        it(`Traverse from point 4`, function () {
            const cycle = new Cycle(matrix);

            const trace = cycle.traverse(4);
            assert.deepEqual(trace, [2, 1, 3, 2]);
        });
    });
});
