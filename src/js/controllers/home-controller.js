/*global define*/
define([
    'controllers/base/controller',
    'views/home-view'
], function (Controller, View) {

    'use strict';

    debugger;
    var HomeController = Controller.extend({

        show: function (params) {
            debugger;

            this.view = new View({
                region: 'main'
            });
        }
    });

    return HomeController;
});
