/*global define*/
define([
    'controllers/base/controller',
    'views/finance-view',
    'views/financeDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var FinanceController = Controller.extend({

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

    return FinanceController;
});
