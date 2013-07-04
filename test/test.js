var rbush = require('../rbush.js'),
    assert = require('assert');

describe('rbush', function () {

    var data = [[0, 0, 0, 0], [10, 10, 10, 10], [20, 20, 20, 20], [25, 0, 25, 0], [35, 10, 35, 10], [45, 20, 45, 20],
        [0, 25, 0, 25], [10, 35, 10, 35], [20, 45, 20, 45], [25, 25, 25, 25], [35, 35, 35, 35], [45, 45, 45, 45],
        [50, 0, 50, 0], [60, 10, 60, 10], [70, 20, 70, 20], [75, 0, 75, 0], [85, 10, 85, 10], [95, 20, 95, 20],
        [50, 25, 50, 25], [60, 35, 60, 35], [70, 45, 70, 45], [75, 25, 75, 25], [85, 35, 85, 35], [95, 45, 95, 45],
        [0, 50, 0, 50], [10, 60, 10, 60], [20, 70, 20, 70], [25, 50, 25, 50], [35, 60, 35, 60], [45, 70, 45, 70],
        [0, 75, 0, 75], [10, 85, 10, 85],  [20, 95, 20, 95], [25, 75, 25, 75], [35, 85, 35, 85], [45, 95, 45, 95],
        [50, 50, 50, 50], [60, 60, 60, 60], [70, 70, 70, 70], [75, 50, 75, 50], [85, 60, 85, 60], [95, 70, 95, 70],
        [50, 75, 50, 75], [60, 85, 60, 85], [70, 95, 70, 95], [75, 75, 75, 75], [85, 85, 85, 85], [95, 95, 95, 95]];

    var testTree = {
        "children": [{
            "children": [
                {"children": [[0, 0, 0, 0], [0, 25, 0, 25]], "leaf": true, "bbox": [0, 0, 0, 25]},
                {"children": [[10, 10, 10, 10], [10, 35, 10, 35]], "leaf": true, "bbox": [10, 10, 10, 35]},
                {"children": [[20, 20, 20, 20], [20, 45, 20, 45]], "leaf": true, "bbox": [20, 20, 20, 45]},
                {"children": [[25, 0, 25, 0], [25, 25, 25, 25]], "leaf": true, "bbox": [25, 0, 25, 25]},
                {"children": [[35, 10, 35, 10], [35, 35, 35, 35]], "leaf": true, "bbox": [35, 10, 35, 35]},
                {"children": [[45, 20, 45, 20], [45, 45, 45, 45]], "leaf": true, "bbox": [45, 20, 45, 45]}
            ],
            "bbox": [0, 0, 45, 45]
        }, {
            "children": [
                {"children": [[0, 50, 0, 50], [0, 75, 0, 75]], "leaf": true, "bbox": [0, 50, 0, 75]},
                {"children": [[10, 60, 10, 60], [10, 85, 10, 85]], "leaf": true, "bbox": [10, 60, 10, 85]},
                {"children": [[20, 70, 20, 70], [20, 95, 20, 95]], "leaf": true, "bbox": [20, 70, 20, 95]},
                {"children": [[25, 50, 25, 50], [25, 75, 25, 75]], "leaf": true, "bbox": [25, 50, 25, 75]},
                {"children": [[35, 60, 35, 60], [35, 85, 35, 85]], "leaf": true, "bbox": [35, 60, 35, 85]},
                {"children": [[45, 70, 45, 70], [45, 95, 45, 95]], "leaf": true, "bbox": [45, 70, 45, 95]}
            ],
            "bbox": [0, 50, 45, 95]
        }, {
            "children": [
                {"children": [[50, 0, 50, 0], [50, 25, 50, 25]], "leaf": true, "bbox": [50, 0, 50, 25]},
                {"children": [[60, 10, 60, 10], [60, 35, 60, 35]], "leaf": true, "bbox": [60, 10, 60, 35]},
                {"children": [[70, 20, 70, 20], [70, 45, 70, 45]], "leaf": true, "bbox": [70, 20, 70, 45]},
                {"children": [[75, 0, 75, 0], [75, 25, 75, 25]], "leaf": true, "bbox": [75, 0, 75, 25]},
                {"children": [[85, 10, 85, 10], [85, 35, 85, 35]], "leaf": true, "bbox": [85, 10, 85, 35]},
                {"children": [[95, 20, 95, 20], [95, 45, 95, 45]], "leaf": true, "bbox": [95, 20, 95, 45]}
            ],
            "bbox": [50, 0, 95, 45]
        }, {
            "children": [
                {"children": [[50, 75, 50, 75], [50, 50, 50, 50]], "leaf": true, "bbox": [50, 50, 50, 75]},
                {"children": [[60, 60, 60, 60], [60, 85, 60, 85]], "leaf": true, "bbox": [60, 60, 60, 85]},
                {"children": [[70, 95, 70, 95], [70, 70, 70, 70]], "leaf": true, "bbox": [70, 70, 70, 95]},
                {"children": [[75, 75, 75, 75], [75, 50, 75, 50]], "leaf": true, "bbox": [75, 50, 75, 75]},
                {"children": [[85, 85, 85, 85], [85, 60, 85, 60]], "leaf": true, "bbox": [85, 60, 85, 85]},
                {"children": [[95, 70, 95, 70], [95, 95, 95, 95]], "leaf": true, "bbox": [95, 70, 95, 95]}
            ],
            "bbox": [50, 50, 95, 95]
        }],
        "bbox": [0, 0, 95, 95]
    };

    describe('load', function () {
        it('bulk-loads the given data and forms a balanced search tree', function () {
            var tree = rbush().load(data);

            assert.deepEqual(tree.data, testTree);
        });
    });

    describe('search', function () {
        it('finds points given a bbox', function () {
            var tree = rbush().load(data);

            var result = tree.search([40, 20, 80, 70]);

            var sorted = [];
            for (var i = 0; i < result.length; i++) {
                sorted[i] = result[i][0] + ',' + result[i][1];
            }
            sorted.sort();

            assert.deepEqual(sorted,
                ['70,20', '75,25', '45,45', '50,50', '60,60', '70,70',
                 '45,20', '45,70', '75,50', '50,25', '60,35', '70,45'].sort());
        });
    });

    describe('addOne', function () {
        it('adds an item to an existing tree');
    });
});
