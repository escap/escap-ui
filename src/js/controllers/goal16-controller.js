/*global define*/
define([
    'controllers/base/controller',
    'views/goal16-view',
    'views/goal16Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal16Controller = Controller.extend({

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

    return Goal16Controller;
});
