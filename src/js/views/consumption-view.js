/*global define, amplify*/
define([
    'require',
    'jquery',
    'underscore',
    'handlebars',    
    'views/base/view',
    'text!templates/consumption/consumption.hbs',
    'i18n!nls/consumption',
    'config/events',

    'fenix-ui-map',
    'fenix-ui-map-config',

    'amplify'
], function (require,$, _, Handlebars, View, template,   i18nLabels, E,

    FenixMap, FenixConfig) {

    'use strict';

    var s = {
            READY_CONTAINER: "#ready-container",
            MAP_CONTAINER: "#consumption_map"
        },
        mapOpts = {
            plugins: {
                disclaimerfao: true,
                geosearch: true,
                mouseposition: false,
                controlloading : true,
                zoomcontrol: 'bottomright'
            },
            guiController: {
                overlay: false,
                baselayer: false,
                wmsLoader: false
            }
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

        initVariables: function () {

            this.$map = this.$el.find(s.MAP_CONTAINER);

        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'consumption'});
            this.initVariables();
            this._configurePage();

            this.fenixMap = new FM.Map(this.$map, mapOpts);
            this.fenixMap.createMap();
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
