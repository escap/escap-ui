/*global define*/
define([
    'controllers/base/controller',
    'views/consumption-view'
], function (Controller, View) {
    'use strict';

    var ConsumptionController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return ConsumptionController;
});
