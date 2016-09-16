/*global define*/
define([
    'controllers/base/controller',
    'views/gender-view',
    'views/genderDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var GenderController = Controller.extend({

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

    return GenderController;
});
