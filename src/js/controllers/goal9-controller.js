/*global define*/
define([
    'controllers/base/controller',
    'views/goal9-view',
    'views/goal9Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal9Controller = Controller.extend({

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

    return Goal9Controller;
});
