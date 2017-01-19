const chai = require(`chai`);
const DiGraph = require(`../04-djikstra-shortest-path/digraph-weight`);
const FleuryEulerCycles = require(`./euler-cycle`);

const assert = chai.assert;

describe(`Fleury Euler Cycles`, function () {
    // http://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/
    describe(`Find cycle`, function () {
        it(`King's bridges problem`, function () {
            const network = new DiGraph(["a", "b", "c", "d"])
                    .addEdge("a", "b")
                    .addEdge("b", "c")
                    .addEdge("d", "a")
                    .addEdge("d", "b")
                    .addEdge("d", "c")
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const hasEulerCycle = eulerCycles.hasEulerCycle();
            assert.isFalse(hasEulerCycle);
        });


        it(`Example #1 without euler cycle`, function () {
            const network = new DiGraph([0, 1, 2, 3])
                    .addEdge(0, 1)
                    .addEdge(0, 2)
                    .addEdge(1, 2)
                    .addEdge(2, 3)
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const hasEulerCycle = eulerCycles.hasEulerCycle();
            assert.isFalse(hasEulerCycle);
        });

        it(`Example #2`, function () {
            const network = new DiGraph([0, 1, 2])
                    .addEdge(0, 1)
                    .addEdge(1, 2)
                    .addEdge(2, 0)
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const hasEulerCycle = eulerCycles.hasEulerCycle();
            assert.isTrue(hasEulerCycle);

            const cycle = eulerCycles.findGraphCycle();
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
            const hasEulerCycle = eulerCycles.hasEulerCycle();
            assert.isTrue(hasEulerCycle);
            const cycle = eulerCycles.findGraphCycle();
            eulerCycles.printCycle(cycle);
        });

        it(`Example #4`, function () {
            const network = new DiGraph([0, 1, 2, 3, 4, 4])
                    .addEdge(1, 0)
                    .addEdge(0, 2)
                    .addEdge(2, 1)
                    .addEdge(0, 3)
                    .addEdge(3, 4)
                    .addEdge(4, 0)
                    .symetricEdges()
                ;
            const eulerCycles = new FleuryEulerCycles(network);
            const hasEulerCycle = eulerCycles.hasEulerCycle();
            assert.isTrue(hasEulerCycle);

            const cycle = eulerCycles.findGraphCycle();
            eulerCycles.printCycle(cycle);
        });


    });
});