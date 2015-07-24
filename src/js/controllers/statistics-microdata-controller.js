/*global define*/
define([
    'controllers/base/controller',
    'views/statistics/microdata-view'
], function (Controller, View) {
    'use strict';

    var StatisticsMicrodataController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return StatisticsMicrodataController;
});
