/*global define*/
define([
    'controllers/base/controller',
    'views/goal11-view',
    'views/goal11Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal11Controller = Controller.extend({

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

    return Goal11Controller;
});
