/*global define*/
define([
    'controllers/base/controller',
    'views/insecurity-view',
    'views/insecurityDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var InsecurityController = Controller.extend({

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

    return InsecurityController;
});