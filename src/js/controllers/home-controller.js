/*global define*/
define([
    'controllers/base/controller',
    'views/home-view',
    'views/home-Indexview'
], function (Controller, View, indexView) {

    'use strict';

    var HomeController = Controller.extend({

        show: function (params) {
            this.view = new View({
                region: 'main'
            });
        },
        index: function (params) {
            this.view = new indexView({
                region: 'main'
            });
        }
    });

    return HomeController;
});
