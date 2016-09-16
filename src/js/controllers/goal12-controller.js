/*global define*/
define([
    'controllers/base/controller',
    'views/goal12-view',
    'views/goal12Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal12Controller = Controller.extend({

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

    return Goal12Controller;
});
