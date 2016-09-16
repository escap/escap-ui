/*global define*/
define([
    'controllers/base/controller',
    'views/poverty-view',
    'views/povertyDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var PovertyController = Controller.extend({

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

    return PovertyController;
});
