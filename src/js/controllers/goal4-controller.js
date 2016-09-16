/*global define*/
define([
    'controllers/base/controller',
    'views/goal4-view',
    'views/goal4Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal4Controller = Controller.extend({

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

    return Goal4Controller;
});
