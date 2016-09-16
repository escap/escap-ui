/*global define*/
define([
    'controllers/base/controller',
    'views/goal2-view',
    'views/goal2Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal2Controller = Controller.extend({

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

    return Goal2Controller;
});
