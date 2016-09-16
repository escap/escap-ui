/*global define*/
define([
    'controllers/base/controller',
    'views/goal10-view',
    'views/goal10Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal10Controller = Controller.extend({

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

    return Goal10Controller;
});
