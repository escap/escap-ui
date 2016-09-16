/*global define*/
define([
    'controllers/base/controller',
    'views/goal15-view',
    'views/goal15Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal15Controller = Controller.extend({

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

    return Goal15Controller;
});
