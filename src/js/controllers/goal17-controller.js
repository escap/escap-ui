/*global define*/
define([
    'controllers/base/controller',
    'views/goal17-view',
    'views/goal17Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal17Controller = Controller.extend({

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

    return Goal17Controller;
});
