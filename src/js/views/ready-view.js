/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'text!templates/ready/ready.hbs',
    'text!templates/ready/consumption.hbs',
    'text!templates/ready/environment.hbs',
    'text!templates/ready/safety.hbs',
    'text!templates/ready/nutrition.hbs',
    'i18n!nls/ready',
    'config/Events',
    'handlebars',
    'amplify',
    'jstree'
], function ($, View, template, templConsumpt, templEnv, templSft, templNut,i18nLabels,E, Handlebars) {

    'use strict';

    var s = {
        READY_CONTAINER: "#ready-container",
        OPTIONS: {
            NUTRITION: 'nutrition',
            SAFETY: 'safety',
            ENVIRONMENT: 'environment',
            CONSUMPTION: 'consumption'
        }
    };

    var ReadyView = View.extend({


        initialize: function (params) {
            console.log(params);
            console.log(i18nLabels);

            this.readyToUseParams = params;

            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, params);

        },
        // Automatically render after initialize
        autoRender: true,

        className: 'ready',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'ready'});
            this.initVariables();
            this._configurePage();

        },

        initVariables: function() {

            this.$readyContainer = this.$el.find(s.READY_CONTAINER);

        },

        _configurePage: function() {

            if (this.id !== undefined) {
                this._onStartingSelected(this.id);
            }
        },

        _onStartingSelected : function(id) {

            switch (id) {
                case s.OPTIONS.NUTRITION:
                    this.$content = templNut;
                    break;

                case s.OPTIONS.SAFETY:
                    this.$content = templSft;
                    break;

                case s.OPTIONS.ENVIRONMENT:
                    this.$content = templEnv;
                    break;

                case s.OPTIONS.CONSUMPTION:
                    this.$content = templConsumpt;
                    break;
            }
            this.$readyContainer.append(this.$content);
        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return ReadyView;
});
