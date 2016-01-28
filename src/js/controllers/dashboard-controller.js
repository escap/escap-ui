/*global define*/
define([
    'jquery',
    'backbone',
    'chaplin',
    'config/config',
    'config/events',
    'controllers/base/controller',
    'views/dashboard-view',
    'globals/AuthManager',
    'q',
    'loglevel',
    'amplify'
], function ($, Backbone, Chaplin, C, E, Controller, View, AuthManager, Q, log) {

    'use strict';

    var DashboardController = Controller.extend({

        beforeAction: function (params) {

            log.trace('dashboard controller: before action')

            Controller.prototype.beforeAction.call(this, arguments);

            return this.performAccessControlChecks(params).then(undefined, _.bind(this.denyAccessControl, this))
        },

        performAccessControlChecks: function (params) {

            log.trace('dashboard controller:performAccessControlChecks')

            var self = this;

            return new Q.Promise(function (fulfilled, rejected) {

                if (!AuthManager.isLogged()) {
                    rejected();
                    return;
                }


                self.validUid = params.hasOwnProperty('uid');

                fulfilled();

            });

        },

        show: function (params) {

            log.trace('dashboard controller show')

            var conf = {
                region: 'main'
            };

            log.debug('Is a valid uid? ' + this.validUid);

            //Pass the valid id to view if valid
            if (this.validUid === true && this.authorized !== false) {

                conf.id = params.uid;

                log.debug('Dataset uid: ' + conf.id);

                this.view = new View(conf);

            } else {

                log.debug('redirect user to #home/');

                Chaplin.mediator.publish(E.NOT_AUTHORIZED);

                return;
            }


        },
        denyAccessControl: function () {
            this.authorized = false;
        }


    });

    return DashboardController;
});
