const math = require('mathjs');

class C3Isomorh {

    isIsomorphicNaive(graph) {
        const adjacencyMatrix = graph.get();
        const size = adjacencyMatrix.length;

        for (let i = 0; i < size; i++) {
            for (let j = i + 1; j < size; j++) {
                for (let k = j + 1; k < size; k++) {
                    if (isGraphIsomorphic(adjacencyMatrix, i, j, k)) {
                        return {
                            value: true,
                            graph: foundSubGraph(graph, i, j, k)
                        }
                    }
                }
            }
        }

        return {
            value: false
        };

        function foundSubGraph(adjacencyMatrix, i, j, k) {
            const points = adjacencyMatrix.points();
            return [points[i], points[j], points[k]];
        }

        function isGraphIsomorphic(adjacencyMatrix, i, j, k) {
            return adjacencyMatrix[i][j] === 1 &&
                adjacencyMatrix[j][k] === 1 &&
                adjacencyMatrix[k][i] === 1;
        }
    }

    isIsomorphicOptimised(graph) {
        const size = graph.get().length;
        const A = math.matrix(graph.get());
        const A2 = math.multiply(A, A);

        for (let x = 0; x < size; x++) {
            for (let y = x + 1; y < size; y++) {
                if (isGraphIsomorphic(x, y)) {
                    return true
                }
            }
        }

        return false;

        function isGraphIsomorphic(x, y) {
            return A.toArray()[x][y] === 1 &&
                A2.toArray()[x][y] === 1
        }
    }
}

module.exports = C3Isomorh;