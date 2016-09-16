/*global define*/
define([
    'controllers/base/controller',
    'views/energy-view',
    'views/energyDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var EnergyController = Controller.extend({

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

    return EnergyController;
});
