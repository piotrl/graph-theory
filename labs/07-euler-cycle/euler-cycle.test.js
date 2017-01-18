const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const FleuryEulerCycles = require(`./euler-cycle`);

const assert = chai.assert;

describe(`Fleury Euler Cycles`, function () {
    // http://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/
    describe(`Find cycle`, function () {
        it(`Example #1`, function () {
            const network = new DiGraph([0, 1, 2, 3])
                    .addEdge(0, 1)
                    .addEdge(0, 2)
                    .addEdge(1, 2)
                    .addEdge(2, 3)
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const startingPoint = eulerCycles.findStartingPoint();
            const cycle = eulerCycles.findGraphCycle(startingPoint);
            eulerCycles.printCycle(cycle);
        });

        it(`Example #2`, function () {
            const network = new DiGraph([0, 1, 2])
                    .addEdge(0, 1)
                    .addEdge(1, 2)
                    .addEdge(2, 0)
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const startingPoint = eulerCycles.findStartingPoint();
            const cycle = eulerCycles.findGraphCycle(startingPoint);
            eulerCycles.printCycle(cycle);
        });

        it(`Example #3`, function () {
            const network = new DiGraph([0, 1, 2, 3, 4, 5])
                    .addEdge(1, 0)
                    .addEdge(0, 2)
                    .addEdge(2, 1)
                    .addEdge(0, 3)
                    .addEdge(3, 4)
                    .addEdge(3, 2)
                    .addEdge(3, 1)
                    .addEdge(2, 4)
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const startingPoint = eulerCycles.findStartingPoint();
            const cycle = eulerCycles.findGraphCycle(startingPoint);
            eulerCycles.printCycle(cycle);
        });


    });
});