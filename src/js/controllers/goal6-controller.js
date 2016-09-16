/*global define*/
define([
    'controllers/base/controller',
    'views/goal6-view',
    'views/goal6Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal6Controller = Controller.extend({

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

    return Goal6Controller;
});
