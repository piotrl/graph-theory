const AdjacencyMatrixGraph = require('./adjacency-matrix');

class GraphSeries {

    findAnySimpleGraph(series) {
        if (!this.isGraphSequency(series)) {
            throw Error("${series} is not graph series. Cannot find graphs.");
        }

        const graphPoints = [...Array(series.length).keys()];
        const graph = new AdjacencyMatrixGraph(graphPoints);
        console.log('graphPoints', graph.points());

        series = series.map((degree, key) => {
            return {degree: degree, point: key}
        });

        while (series.length > 0) {
            series.sort((a, b) => b.degree - a.degree);

            const first = series[0];
            series = series.slice(1);
            if (series.length === 0) {
                return graph.get();
            }

            for (let i = 0; i < first.degree; i++) {
                series[i].degree--;
                console.log(`${first.point}, ${series[i].point}`);
                graph.addEdge(first.point, series[i].point);
            }
        }

        return graph.get();
    }

    // Havel–Hakimi
    isGraphSequency(series) {
        while (series.length > 0) {
            series.sort((a, b) => b - a);

            const first = series[0];
            series = series.slice(1);

            if (series.length === 0) {
                return true;
            }
            if (first > series.length) {
                throw Error(`Item ${first} is bigger than length of array ${series}`);
            }
            for (let i = 0; i < first; i++) {
                series[i]--;
            }
            if (series.includes(-1)) {
                return false;
            }
        }

        return true;
    }
}

module.exports = GraphSeries;