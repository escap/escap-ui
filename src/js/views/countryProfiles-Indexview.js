/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/config',
    'config/Queries',
    'config/events',
    'i18n!nls/countryProfiles',
    'text!templates/countryProfiles/index.hbs',
    'text!templates/home/database_update_item.hbs',
    'text!templates/home/document_item.hbs',
    'text!json/home/database_updates.json',
    'text!json/home/documents.json',
    'handlebars',
    'fx-common/WDSClient',
    'swiper',
    'amplify'
], function (View, C, Q, E, i18nLabels, template,
             dbUpdatesTemplate, documentTemplate,
             dbUpdatesModels, documentsModels,
             Handlebars, WDSClient, Swiper) {

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
              ENEA: this.ENEA,
              SEA: this.SEA,
              SSWA:this.SSWA,
              NCA: this.NCA,
              PACIFIC: this.PACIFIC,
              ESCAP:this.ESCAP,
              WORLD:this.WORLD
              //regions: this.regions
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

            var bannerSwiper = new Swiper(s.CONTRIBUTORS_ID,{
                keyboardControl: false,
                autoplay: 5000,
                loop: true,
                autoplayDisableOnInteraction: false,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30
            })
        },

        initVariables: function () {
            this.$dbUpdatesList = this.$el.find(s.DB_UPDATES_LIST);

            //document list
            this.$documentsList = this.$el.find(s.DOCUMENTS_LIST);

        },

        initComponents: function () {

            this._initDatabaseUpdatesList();
            this._initDocumentsLinkList();
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
        },

        initialize: function(params){
          var self = this;
          var countries_url=C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/data/uid/ESCAP_COUNTRIES?language=EN";
          var countryList_1 ={};
          var countryList_2 ={};
          var countryList_3 = [];
          var regions = [];
          var object = {};
          self.countryList=[];
          self.regions = [];
          self.ENEA = [];
          self.SEA = [];
          self.SSWA =[];
          self.NCA = [];
          self.PACIFIC = [];
          self.ESCAP = [];
          self.WORLD = [];

          $.ajax({
            async: false,
            dataType: 'json',
            url: countries_url,
            contentType: "application/json; charset=utf-8",
            type: 'get',
            success:function(res){
              self.ENEA = _.find(res,function(obj){
                return obj.code == 1003;
              });

              self.ENEA["children"] = _.sortBy(self.ENEA["children"],function(obj1){
                return obj1.title["EN"];
              });

              self.SEA = _.find(res,function(obj){
                return obj.code == 1022;
              });

              self.SEA["children"] = _.sortBy(self.SEA["children"],function(obj1){
                return obj1.title["EN"];
              });

              self.SSWA = _.find(res,function(obj){
                return obj.code == 1021;
              });

              self.SSWA["children"] = _.sortBy(self.SSWA["children"],function(obj1){
                return obj1.title["EN"];
              });

              self.NCA = _.find(res,function(obj){
                return obj.code == 1016;
              });

              self.NCA["children"] = _.sortBy(self.NCA["children"],function(obj1){
                return obj1.title["EN"];
              });

              self.PACIFIC = _.find(res,function(obj){
                return obj.code == 1018;
              });

              self.PACIFIC["children"] = _.sortBy(self.PACIFIC["children"],function(obj1){
                return obj1.title["EN"];
              });

              self.ESCAP = _.find(res,function(obj){
                return obj.code == 1005;
              });

              self.ESCAP["children"] = _.sortBy(self.ESCAP["children"],function(obj1){
                return obj1.title["EN"];
              });

              self.WORLD = _.find(res,function(obj){
                return obj.code == 1025;
              });

              self.WORLD["children"] = _.sortBy(self.WORLD["children"],function(obj1){
                return obj1.title["EN"];
              });
            }
          });

        }
    });

    return HomeView;
});
