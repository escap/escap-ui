/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'text!templates/ready/ready.hbs',
    'text!templates/ready/generic_indicator.hbs',
    'text!json/indicators/indicators.json',
    'i18n!nls/ready',
    'config/Events',
    'handlebars',
    'amplify',
    'jstree'
], function ($, View, template, templateGen, indicatorsDoc, i18nLabels, E, Handlebars) {

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

        initVariables: function () {

            this.$readyContainer = this.$el.find(s.READY_CONTAINER);

            this.$documents = JSON.parse(indicatorsDoc);

        },

        _configurePage: function () {

            if (this.id !== undefined) {
                this._onStartingSelected(this.id);
            }
        },

        _onStartingSelected: function (id) {

            var model, templateToAdd, $compiled;

            model = this.$documents[id];

            templateToAdd = Handlebars.compile(templateGen);
            $compiled = templateToAdd(model);

            this.$readyContainer.append($compiled);
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
