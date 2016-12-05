/*global define, _:false, $, console, amplify, FM*/
define([
    'jquery',
    'views/base/view',
    'config/config',
    'config/Queries',
    'config/events',
    'i18n!nls/methodDefinition',
    'text!templates/methodDefinition/profile.hbs',
    'handlebars',
    'fx-chart/start',
    //'jspdf.debug',
    'amplify'
], function ($,View, C, Q, E, i18nLabels, template,Handlebars,Chart,jsPDF) {

    'use strict';

    var s = {
        PRINT_REPORT: '#printPage',
        PRINT_AREA: '.print'
    };

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return {
              country_id : this.country_id,
              country_name: this.country_name
            };
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'countryProfiles'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {


        },

        initComponents: function () {


        },

        //Page section initialization
        _initDatabaseUpdatesList: function() {


        },

        printDatabaseUpdate: function (u) {


        },

        _initDocumentsLinkList: function () {

        },

        printDocuments: function (d) {

        },

        configurePage: function () {

        },

        bindEventListeners: function () {

        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        initialize: function(params){


        }
    });

    return HomeView;
});
