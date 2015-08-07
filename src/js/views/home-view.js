/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/Config',
    'config/Queries',
    'config/Events',
    'i18n!nls/home',
    'text!templates/home/home.hbs',
    'text!templates/home/database_update_item.hbs',
    'text!templates/home/document_item.hbs',
    'text!json/home/database_updates.json',
    'text!json/home/documents.json',
    'handlebars',
    'fx-common/WDSClient',
    'amplify'
], function (View, C, Q, E, i18nLabels, template,
             dbUpdatesTemplate, documentTemplate,
             dbUpdatesModels, documentsModels,
             Handlebars, WDSClient) {

    'use strict';

    var s = {
        DB_UPDATES_LIST: '#db-updates-list',
        DOCUMENTS_LIST: '#documents-list'
    };

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {
            this.$dbUpdatesList = this.$el.find(s.DB_UPDATES_LIST);

            //document list
            this.$documentsList = this.$el.find(s.DOCUMENTS_LIST);

        },

        initComponents: function () {

            this._initDatabaseUpdatesList();
            this._initDocumentsLinkList();

            /*   this.WDSClient = new WDSClient({
             serviceUrl: C.WDS_URL,
             datasource: C.DB_NAME,
             outputType : C.WDS_OUTPUT_TYPE
             });*/
        },
        //Page section initialization
        _initDatabaseUpdatesList: function() {
            _.each(JSON.parse(dbUpdatesModels), _.bind(this.printDatabaseUpdate, this));

        },

        printDatabaseUpdate: function (u) {

            var template = Handlebars.compile(dbUpdatesTemplate);
            this.$dbUpdatesList.append(template(u));
        },

        _initDocumentsLinkList: function () {
            _.each(JSON.parse(documentsModels), _.bind(this.printDocuments, this));
        },

        printDocuments: function (d) {
            var template = Handlebars.compile(documentTemplate);
            this.$documentsList.append(template(d));
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
        }
    });

    return HomeView;
});
