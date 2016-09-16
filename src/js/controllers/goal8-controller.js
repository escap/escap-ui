/*global define*/
define([
    'controllers/base/controller',
    'views/goal8-view',
    'views/goal8Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal8Controller = Controller.extend({

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

    return Goal8Controller;
});
