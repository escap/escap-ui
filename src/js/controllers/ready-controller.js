/*global define*/
define([
    'jquery',
    'backbone',
    'chaplin',
    'config/config',
    'controllers/base/controller',
    'views/ready-view',
    'q',
    'amplify'
], function ($, Backbone, Chaplin, C, Controller, View, Q) {

    'use strict';

    var ReadyController = Controller.extend({

        beforeAction: function (params) {


            Controller.prototype.beforeAction.call(this, arguments);

            //TODO cache codelist

            return this.performAccessControlChecks(params)
        },

        performAccessControlChecks: function (params) {

            this.isReadyToUse = (C.READY_TO_USE.indexOf(params.id)!= -1)
        },

        show: function (params) {

            var conf = {
                region: 'main'
            };

            //Pass the valid id to view if valid
            if (this.isReadyToUse === true) {
                conf.id = params.id;
            } else {
                Backbone.history.navigate('#ready/' , {trigger: false});
            }

            this.view = new View(conf);
        }

    });


    return ReadyController;
});
