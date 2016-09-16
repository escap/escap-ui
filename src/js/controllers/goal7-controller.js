/*global define*/
define([
    'controllers/base/controller',
    'views/goal7-view',
    'views/goal7Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal7Controller = Controller.extend({

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

    return Goal7Controller;
});
