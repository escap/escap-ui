/*global define, amplify*/
define([
    'require',
    'jquery',
    'underscore',
    'views/base/view',
    'text!templates/consumption/consumption.hbs',
    'i18n!nls/consumption',
    'config/events',
    'handlebars',
    'amplify',
    'jstree','jqwidgets', 'highcharts'

], function (require,$, _,View, template,   i18nLabels, E, Handlebars) {

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

    var ConsumptionView = View.extend({


        initialize: function (params) {

            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, params);

        },
        // Automatically render after initialize
        autoRender: true,

        className: 'consumption',

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
            amplify.publish(E.STATE_CHANGE, {menu: 'consumption'});
            this.initVariables();
            this._configurePage();

        },

        initVariables: function () {


        },

        _configurePage: function () {

          /*  if (this.id !== undefined) {
                this._onStartingSelected(this.id);
            }*/
        },



        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return ConsumptionView;
});
