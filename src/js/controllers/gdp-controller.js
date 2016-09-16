/*global define*/
define([
    'controllers/base/controller',
    'views/gdp-view',
    'views/gdpDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var GdpController = Controller.extend({

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

    return GdpController;
});
