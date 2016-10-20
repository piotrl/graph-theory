const chai = require(`chai`);
const assert = chai.assert;
const expect = chai.expect;

const GraphSeries = require(`./graph-series`);
const graphSeries = new GraphSeries();


describe(`3. `, function () {
    describe(`3a) czy dany (nierosnący) ciąg liczb naturalnych jest ciągiem grafowym`, function () {

        it(`Proper graph progression series`, function () {
            const serie = [2, 2, 2, 2];
            const result = graphSeries.isGraphSequency(serie);

            assert.equal(result, true);
        });

        it(`Proper graph progression series`, function () {
            const serie = [5, 4, 3, 3, 4, 2, 1, 2];
            const result = graphSeries.isGraphSequency(serie);

            assert.equal(result, true);
        });

        it(`Not founds subgraph isomorphic to C3`, function () {
            const serie = [5, 5, 4, 3, 2, 1];
            const result = graphSeries.isGraphSequency(serie);

            assert.equal(result, false);
        });
    });

    describe(`3b) serie conversion to graph`, function () {

        it(`Founds simple graph for serie`, function () {
            const serie = [2, 2, 2, 2];
            const result = graphSeries.findAnySimpleGraph(serie);

            assert.deepEqual(result, [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [0, 1, 1, 0]
            ]);
        });
    });
});
