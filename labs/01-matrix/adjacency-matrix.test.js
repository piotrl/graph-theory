const chai = require(`chai`);
const AdjacencyMatrix = require(`./adjacency-matrix`);

const assert = chai.assert;
const expect = chai.expect;

describe(`Adjacency matrix`, function () {
    describe(`creation`, function () {

        it(`Init Matrix with only vertex`, function () {
            const matrix = new AdjacencyMatrix([1, 2]);
            assert.deepEqual(matrix.get(), [
                [0, 0],
                [0, 0]
            ]);
        });

        it(`Init Matrix rows arent equal only vertex`, function () {
            const matrix = new AdjacencyMatrix([1, 2]);
            assert.notEqual(matrix.get()[0], matrix.get()[1]);
        });

        it(`Init Matrix with one edge`, function () {
            const matrix = new AdjacencyMatrix([1, 2], [
                [1, 2]
            ]);
            assert.deepEqual(matrix.get(), [
                [0, 1],
                [1, 0]
            ]);
        });

    });

    describe(`Edges`, function () {
        it(`Insert edge`, function () {
            const matrix = new AdjacencyMatrix([1, 2])
                .addEdge(1, 2);

            assert.deepEqual(matrix.get(), [
                [0, 1],
                [1, 0]
            ]);
        });

        it(`Remove edge`, function () {
            const matrix = new AdjacencyMatrix([1, 2, 3])
                .addEdge(1, 2)
                .addEdge(1, 3)
                .removeEdge(1, 3);

            assert.deepEqual(matrix.get(), [
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);
        });
    });

    describe(`Points`, function () {
        it(`Add point to empty graph`, function () {
            const matrix = new AdjacencyMatrix()
                .addPoint(1)
                .addPoint(2);

            assert.deepEqual(matrix.get(), [
                [0, 0],
                [0, 0]
            ]);
        });

        it(`Add point to filled graph`, function () {
            const matrix = new AdjacencyMatrix([1, 2])
                .addPoint(3);

            assert.deepEqual(matrix.get(), [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

        it(`Add point to filled graph and edges`, function () {
            const matrix = new AdjacencyMatrix([1, 2], [
                [1, 2]
            ])
                .addPoint(3);

            assert.deepEqual(matrix.get(), [
                [0, 1, 0],
                [1, 0, 0],
                [0, 0, 0]
            ]);
        });

        it(`Remove point from graph`, function () {
            const matrix = new AdjacencyMatrix([1, 2])
                .removePoint(1);

            assert.deepEqual(matrix.get(), [
                [0]
            ]);
        });
    });

    describe(`1b) wyznaczenie stopnia wierzchołka oraz minimalnego i maksymalnego stopnia grafu`, function () {
        it(`One edge should return 1`, function () {
            const matrix = new AdjacencyMatrix([1, 2], [
                [1, 2]
            ]).addEdge(1, 2);

            assert.equal(matrix.degreeForPoint(1), 1);
        });

        it(`Two edge should return 2`, function () {
            const matrix = new AdjacencyMatrix([1, 2, 3], [
                [1, 2],
                [1, 3]
            ]).addEdge(1, 2);

            assert.equal(matrix.degreeForPoint(1), 2);
        });


        it(`Count min & max degree for points`, function () {
            const matrix = new AdjacencyMatrix([1, 2, 3, 4], [
                [1, 2],
                [1, 3]
            ]).addEdge(1, 2);

            const point = matrix.degree();
            assert.equal(point.max.degree, 2);
            assert.equal(point.min.degree, 0);
        });
    });

    describe(`1c) wyznaczenie, ile jest wierzchołków stopnia parzystego i nieparzystego`, function () {
        it(`Example with empty point`, function () {
            const matrix = new AdjacencyMatrix([1, 2, 3, 4, 5])
                .addEdge(2, 4)
                .addEdge(1, 2)
                .addEdge(1, 3);

            const parity = matrix.parity();

            assert.deepEqual(parity.even.length, 3);
            assert.deepEqual(parity.odd.length, 2);
        });

        it(`Example with all points connected`, function () {
            const matrix = new AdjacencyMatrix([1, 2, 3])
                .addEdge(1, 2)
                .addEdge(2, 3)
                .addEdge(1, 3);

            const parity = matrix.parity();

            assert.deepEqual(parity.even.length, 3);
            assert.deepEqual(parity.odd.length, 0);

            console.log(` 1c) stopnie wierzcholkow przyste: \n\n`, parity.even, "\n\n");
            console.log(` 1c) stopnie wierzcholkow nieparzyste: \n\n`, parity.odd, "\n\n");
        });
    });

    describe(`1d) wypisanie (posortowanego nierosnąco) ciągu stopni wierzchołków w grafie `, function () {
        it(`Example with empty point`, function () {
            const matrix = new AdjacencyMatrix([1, 2, 3, 4, 5])
                .addEdge(1, 2)
                .addEdge(1, 3)
                .addEdge(1, 5)
                .addEdge(2, 5);

            const pointsDegree = matrix.countDegreeForAllPoints();
            assert.deepEqual(pointsDegree.map(point => point.degree), [3, 2, 1, 0, 2]);

            pointsDegree.sort((a, b) => b.degree - a.degree);
            console.log(`\n 1d) stopnie wierzcholkow \n`, pointsDegree);
        });
    });
});