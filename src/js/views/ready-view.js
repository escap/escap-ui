/*global define, amplify*/
define([
    'require',
    'jquery',
    'underscore',
    'views/base/view',
    '../lib/ready-configurator',
    'text!templates/ready/ready.hbs',
    'text!templates/ready/generic_indicator.hbs',
    'text!json/indicators/indicators.json',
    'i18n!nls/ready',
    'config/events',
    'handlebars',
    'amplify',
    'jstree','jqwidgets', 'highcharts'

], function (require,$, _,View, Configurator,template, templateGen, indicatorsDoc, i18nLabels, E, Handlebars) {

    'use strict';

    var s = {
        READY_CONTAINER: "#ready-container",
        OPTIONS: {
            NUTRITION: 'nutrition',
            SAFETY: 'safety',
            ENVIRONMENT: 'environment',
            CONSUMPTION: 'consumption'
        },
        CONTAINERS: [

        ]
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

            this.$documents = Configurator;
        },

        _configurePage: function () {

            if (this.id !== undefined) {
                this._onStartingSelected(this.id);
            }
        },

        _onStartingSelected: function (id) {
            var self = this;

            this.$topic = this.$documents[id];

            require(['text!'+this.$topic.template], _.bind(this._onCompileTemplate, this), function(){ throw new Error( 'not valid template!')} )
        },

        _onCompileTemplate : function (templateSelected) {
            var templateToAdd = Handlebars.compile(templateSelected);
            var $compiled = templateToAdd( this.$topic.model);

            this.$readyContainer.append($compiled);
            this.$topic.onEnter();
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
