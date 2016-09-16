/*global define*/
define([
    'controllers/base/controller',
    'views/goal5-view',
    'views/goal5Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal5Controller = Controller.extend({

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

    return Goal5Controller;
});
