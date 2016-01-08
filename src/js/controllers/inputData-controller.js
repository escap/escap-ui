/*global define*/
define([
    'chaplin',
    'underscore',
    'config/events',
    'controllers/base/controller',
    'views/inputData-view',
    'globals/AuthManager',
    'rsvp'
], function (Chaplin, _, E, Controller, View, AuthManager, RSVP) {
    'use strict';

    var InputdataController = Controller.extend({

        beforeAction: function () {
            Controller.prototype.beforeAction.call(this, arguments);

            return this.performAccessControlChecks().then(undefined, _.bind(this.denyAccessControl, this))
        },

        performAccessControlChecks: function () {

            return new RSVP.Promise(function (fulfilled, rejected) {

                if (!AuthManager.isLogged()) {
                    rejected();
                    return;
                }
                fulfilled();
            });
        },

        denyAccessControl: function () {
            this.authorized = false;
        },

        show: function (params) {

            if (this.authorized === false) {
                Chaplin.mediator.publish(E.NOT_AUTHORIZED);
                return;
            }

            this.view = new View({
                region: 'main'
            });
        }
    });

    return InputdataController;
});
