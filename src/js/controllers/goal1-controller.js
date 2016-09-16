/*global define*/
define([
    'controllers/base/controller',
    'views/goal1-view',
    'views/goal1Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal1Controller = Controller.extend({

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

    return Goal1Controller;
});
