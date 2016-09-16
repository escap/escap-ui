/*global define*/
define([
    'controllers/base/controller',
    'views/goal13-view',
    'views/goal13Download-view'
], function (Controller, View, downloadView) {
    'use strict';

    var Goal13Controller = Controller.extend({

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

    return Goal13Controller;
});
