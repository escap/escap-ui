/*global define*/
define([
    'controllers/base/controller',
    'views/governance-view',
    'views/governanceDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var GovernanceController = Controller.extend({

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

    return GovernanceController;
});
