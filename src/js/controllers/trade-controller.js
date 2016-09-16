/*global define*/
define([
    'controllers/base/controller',
    'views/trade-view',
    'views/tradeDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var TradeController = Controller.extend({

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

    return TradeController;
});
