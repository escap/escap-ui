/*global define*/
define([
    'controllers/base/controller',
    'views/goal14-view',
    'views/goal14Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal14Controller = Controller.extend({

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

    return Goal14Controller;
});
