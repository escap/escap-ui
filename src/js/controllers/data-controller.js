/*global define*/
define([
    'controllers/base/controller',
    'views/data-view',
    'views/dataDownload-view'
], function (Controller, View, downloadView) {
    'use strict';

    var DataController = Controller.extend({

        show: function (params) {
          var conf = {
              region: 'main',
              domain: params
          };

          //Pass the valid id to view if valid
          if (this.isReadyToUse === true) {
              conf.id = params.id;
          } else {
              Backbone.history.navigate('#data/' , {trigger: false});
          }

          this.view = new View(conf);
        },

      /*  download: function (params) {

            this.view = new downloadView({
                region: 'main'
            });
        }*/
    });

    return DataController;
});
