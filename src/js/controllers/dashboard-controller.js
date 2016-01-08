/*global define*/
define([
    'jquery',
    'backbone',
    'chaplin',
    'config/config',
    'controllers/base/controller',
    'views/dashboard-view',
    'q',
    'loglevel',
    'amplify'
], function ($, Backbone, Chaplin, C, Controller, View, Q, log) {

    'use strict';

    var DashboardController = Controller.extend({

        beforeAction: function (params) {

            console.log("befor")

            Controller.prototype.beforeAction.call(this, arguments);

            return this.performAccessControlChecks(params)
        },

        performAccessControlChecks: function (params) {

            console.log("performAccessControlChecks")

            var self= this;

            return new Q.Promise(function (fulfilled, rejected) {


                console.log("promi")

                self.validUid = params.hasOwnProperty('uid');

                fulfilled();

            });

        },

        show: function (params) {

            var conf = {
                region: 'main'
            };

            log.debug('Is a valid uid? ' + this.validUid );

            //Pass the valid id to view if valid
            if (this.validUid === true) {

                conf.id = params.uid;

                log.debug('Dataset uid: ' + conf.id );

                this.view = new View(conf);

            } else {

                log.debug('redirect user to #home/');

                Backbone.history.navigate('#home/' , {trigger: false});
            }


        }

    });

    return DashboardController;
});
