/*global define*/
define([
    'controllers/base/controller',
    'views/goal3-view',
    'views/goal3Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal3Controller = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        },

        download: function (params) {

            this.view = new downloadView({
                region: 'main'
            });
        }
    });

    return Goal3Controller;
});
