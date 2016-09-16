/*global define*/
define([
    'controllers/base/controller',
    'views/sti-view',
    'views/stiDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var StiController = Controller.extend({

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

    return StiController;
});
