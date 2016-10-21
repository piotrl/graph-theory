const chai = require(`chai`);
const assert = chai.assert;
const expect = chai.expect;

const GraphSeries = require(`./graph-series`);
const graphSeries = new GraphSeries();


describe(`3. `, function () {
    describe(`3a) czy dany (nierosnący) ciąg liczb naturalnych jest ciągiem grafowym`, function () {

        it(`Proper graph progression series`, function () {
            const series = [2, 2, 2, 2];
            const result = graphSeries.isGraphSequency(series);

            assert.equal(result, true);
        });

        it(`Proper graph progression series`, function () {
            const series = [5, 4, 3, 3, 4, 2, 1, 2];
            const result = graphSeries.isGraphSequency(series);

            assert.equal(result, true);
        });

        it(`Not proper graph progression series`, function () {
            const series = [5, 5, 4, 3, 2, 1];
            const result = graphSeries.isGraphSequency(series);

            assert.equal(result, false);
        });

        it(`Not proper graph progression series (graph with cycle)`, function () {
            const series = [1, 1, 1];
            const result = graphSeries.isGraphSequency(series);

            assert.equal(result, false);
        });
    });

    describe(`3b) series conversion to graph`, function () {

        it(`Founds simple graph for series`, function () {
            const series = [2, 2, 2, 2];
            const result = graphSeries.findAnySimpleGraph(series);

            assert.deepEqual(result, [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [0, 1, 1, 0]
            ]);
        });
    });
});
