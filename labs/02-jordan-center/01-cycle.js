class CycleFinder {
    constructor(graph) {
        this.graph = graph;
    }

    traverse() {
        const firstPoint = this.graph.points()[0];
        return this.goNext(firstPoint, []);
    }

    goNext(point, trace) {
        if (trace.indexOf(point) !== -1) {
            return trace;
        }
        trace.push(point);

        for (let edgePoint of this.edgesForPoint(point)) {
            if (edgePoint === trace[trace.length - 2]) {
                continue;
            }
            console.log(point, edgePoint);
            return this.goNext(edgePoint, trace);
        }
    }

    edgesForPoint(point) {
        const points = this.graph.points();
        const pointIndex = points.indexOf(point);
        if (pointIndex === -1) {
            return [];
        }

        return this.graph.get()[pointIndex]
            .map((value, key) => value ? points[key] : 0)
            .filter(value => value !== 0);
    }
}

module.exports = CycleFinder;