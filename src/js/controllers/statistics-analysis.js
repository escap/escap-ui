/*global define*/
define([
    'controllers/base/controller',
    'views/statistics/analysis-view'
], function (Controller, View) {
    'use strict';

    var StatisticsAnalysisController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return StatisticsAnalysisController;
});
