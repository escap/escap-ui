/*global define*/
define([
    'controllers/base/controller',
    'views/disaster-view',
    'views/disasterDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var DisasterController = Controller.extend({

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

    return DisasterController;
});
