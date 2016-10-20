class AdjacencyMatrixGraph {

    constructor(vertex, edges) {
        this.vertex = vertex || [];
        this.edges = edges || [];

        this.array = Array.apply(null, new Array(this.vertex.length))
            .map(() => this.emptyRow(this.vertex.length));

        if (this.edges) {
            this.edges.forEach(edge => {
                this.addEdge(... edge);
            });
        }
    }

    get() {
        return this.array;
    }

    points() {
        return this.vertex;
    }

    addEdge(...edge) {
        const i = this.vertex.indexOf(edge[0]);
        const j = this.vertex.indexOf(edge[1]);

        if (i === -1 || j === -1) {
            throw Error(`Point (${i}, ${j}) not found`);
        }

        this.array[i][j] = 1;
        this.array[j][i] = 1;

        return this;
    }

    removeEdge(...edge) {
        const i = this.vertex.indexOf(edge[0]);
        const j = this.vertex.indexOf(edge[1]);

        this.array[i][j] = 0;
        this.array[j][i] = 0;

        return this;
    }

    addPoint(point) {
        this.vertex.push(point);

        this.array.forEach(row => row.push(0));
        this.array.push(this.emptyRow(this.vertex.length));

        return this;
    }

    removePoint(point) {
        const i = this.vertex.indexOf(point);
        if (i === -1) {
            throw Error(`Point [${i}] doesn't exist in graph ${this.vertex}`);
        }

        this.array.splice(i, 1);
        this.array.forEach(row => row.splice(i, 1));

        return this;
    }

    degree() {
        const degrees = this.countDegreeForAllPoints()
            .sort((curr, next) => curr.degree - next.degree);

        return {
            min: degrees[0],
            max: degrees[degrees.length - 1]
        }
    }

    parity() {
        const degrees = this.countDegreeForAllPoints();

        return {
            even: degrees.filter(point => point.degree % 2 === 0),
            odd: degrees.filter(point => point.degree % 2 === 1)
        }
    }

    countDegreeForAllPoints() {
        return this.vertex.map((point) => {
            return {id: point, degree: this.degreeForPoint(point)}
        });
    }

    degreeForPoint(point) {
        const i = this.vertex.indexOf(point);
        if (i === -1) {
            throw Error(`Point [${i}] doesn't exist in graph ${this.vertex}`);
        }

        return this.array[i].reduce(function (curr, next) {
            return curr + next;
        });
    }

    emptyRow(length) {
        return new Array(length).fill(0);
    }
}

module.exports = AdjacencyMatrixGraph;