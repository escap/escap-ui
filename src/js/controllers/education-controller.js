/*global define*/
define([
    'controllers/base/controller',
    'views/education-view',
    'views/educationDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var EducationController = Controller.extend({

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

    return EducationController;
});
