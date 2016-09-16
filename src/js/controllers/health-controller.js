/*global define*/
define([
    'controllers/base/controller',
    'views/health-view',
    'views/healthDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var HealthController = Controller.extend({

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

    return HealthController;
});
