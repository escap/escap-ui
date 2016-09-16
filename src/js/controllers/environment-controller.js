/*global define*/
define([
    'controllers/base/controller',
    'views/environment-view',
    'views/environmentDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var EnvController = Controller.extend({

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

    return EnvController;
});
