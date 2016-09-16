/*global define*/
define([
    'controllers/base/controller',
    'views/connectivity-view',
    'views/connectivityDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var ConnectivityController = Controller.extend({

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

    return ConnectivityController;
});
