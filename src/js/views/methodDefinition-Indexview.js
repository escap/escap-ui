/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/config',
    'config/Queries',
    'config/events',
    'i18n!nls/methodDefinition',
    'text!templates/methodDefinition/index.hbs',
    'handlebars',
    'amplify'
], function (View, C, Q, E, i18nLabels, template,Handlebars) {

    'use strict';

    var s = {
        DB_UPDATES_LIST: '#db-updates-list',
        DOCUMENTS_LIST: '#documents-list',
        CONTRIBUTORS_ID : '#gift-contributors'
    };

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return {
              //countries: this.countryList,

              //regions: this.regions
            };
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'methodDefinition'});

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
