const chai = require(`chai`);
const DiGraph = require(`./digraph-list`);
const DFS = require(`./dfs`);

const assert = chai.assert;
const expect = chai.expect;

describe(`DFS`, function () {
    describe(`search`, function () {
        it(`basic found example`, function () {
            const graph = new DiGraph(["a", "b", "c", "d"], [
                ["a", "b"],
                ["a", "c"],
                ["c", "d"]
            ]);
            const dfs = new DFS(graph);
            const isFound = dfs.search("d");

            assert.isTrue(isFound);
            assert.deepEqual(dfs.order, ["a", "b", "c", "d"]);
        });

        it(`basic not found example`, function () {
            const graph = new DiGraph(["a", "b", "c", "d"], [
                ["a", "b"],
                ["a", "c"],
                ["c", "d"]
            ]);
            const dfs = new DFS(graph);
            const isFound = dfs.search("e");

            assert.isFalse(isFound);
        });
    });
});