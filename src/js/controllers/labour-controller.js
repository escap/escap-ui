/*global define*/
define([
    'controllers/base/controller',
    'views/labour-view',
    'views/labourDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var LabourController = Controller.extend({

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

    return LabourController;
});
