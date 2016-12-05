/*global define*/
define([
    'controllers/base/controller',
    'views/methodDefinition-view',
    'views/methodDefinition-Indexview'
], function (Controller, View, indexView) {

    'use strict';

    var MethodAndDefinitionController = Controller.extend({

        show: function (params) {
          var conf = {
              region: 'main',
              country: params
          };

          //Pass the valid id to view if valid
          if (this.isReadyToUse === true) {
              conf.id = params.id;
          } else {
              Backbone.history.navigate('#methodDefinition/' , {trigger: false});
          }

          this.view = new View(conf);
        },

        index: function (params) {
            this.view = new indexView({
                region: 'main'
            });
        }
    });

    return MethodAndDefinitionController;
});
