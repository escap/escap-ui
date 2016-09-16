/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'backbone',
    'chaplin',
    'handlebars',
    'views/base/view',
    'config/dashboard/config-description',
    'text!templates/statistics/microdata.hbs',
    'text!templates/statistics/description.hbs',
    'text!json/statistics/data.json',
    'i18n!nls/statistics-microdata',
    'fx-cat-br/start',
    'fx-ana/start',
    'fx-mdv/start',
    'fx-report',
    'config/config',
    'config/events',
    'loglevel',
    'highcharts'
], function ($, _, Backbone,Chaplin,Handlebars,View,
             descriptionConfig,template,templateDesc,dataTableDesc, i18nLabels,
             Catalog, Analysis, MetadataViewer, Report,
             C, E, log) {

    'use strict';

    var s = {
        ANALYSIS_CONTAINER: '#fx-analysis-container',
        CATALOG_CONTAINER: '#fx-catalog-container',
        MODULES_STACK_CONTAINER: '#fx-modules-stack-container',
        OVERLAY: "#overlay",
        OVERLAY_CONTENT: '.overlay-content',
        OVERLAY_OPEN: '.open-overlay',
        OVERLAY_CLOSE: '.close-overlay',
        PAGE_CONTENT: "#analysis-page-content",
        MODAL_METADATA: '#gift-metadata-modal',
        MODAL_DESCRIPTION: '#gift-description-modal',
        MODAL_METADATAVIEWER_CONTAINER: '[data-content="metadata-viewer-container"]',
        MODAL_DESCRIPTION_CONTAINER: '[data-content="description-viewer-container"]',
        BTN_EXPORT_METADATA: '.fx-md-report-btn'
    };

    var StatisticsView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'microdata',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        _initVariables : function() {

            $(s.OVERLAY_CONTENT).hide();
            $(s.OVERLAY).hide();

            if(!this.$modalMetadata) {
                this.$modalMetadata = this.$el.find(s.MODAL_METADATA);
            }

            if(!this.$modalDescription) {
                this.$modalDescription = this.$el.find(s.MODAL_DESCRIPTION);
            }

            this.$dataTable = JSON.parse(dataTableDesc);

        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this._initVariables();

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'microdata'});

            this.catalog = new Catalog({

                container: document.querySelector(s.CATALOG_CONTAINER),

                catalog: {
                    BLANK_FILTER: C.CATALOG_BLANK_FILTER
                },

                results: {
                    actions: {
                        ANALYSIS: {
                            event: 'analysis',
                            labels: {
                                EN: 'Analysis'
                            }
                        },
                        DESCRIPTION: {
                            event: 'description',
                            labels: {
                                EN: 'Dataset Content'
                            }
                        },
                        METADATA: {
                            event: 'metadata',
                            labels: {
                                EN: 'Survey Description'
                            }
                        },
                        DOWNLOAD: {
                            event: 'download',
                            labels: {
                                EN: 'Download Microdata'
                            }
                        }

                    }
                }

            }).init();

            this.$modalMetadata = this.$el.find(s.MODAL_METADATA);

            this.$report = new Report();

            this.openOverly();

            this._bindEventListener();
        },

        _bindEventListener: function () {

            $(s.OVERLAY_OPEN).on('click', _.bind(this.openOverly, this));

            $(s.OVERLAY_CLOSE).on('click', _.bind(this.closeOverly, this));

            amplify.subscribe('fx.widget.catalog.analysis', _.bind(this.onAnalysisClick, this));

            amplify.subscribe('fx.widget.catalog.description', _.bind(this.onDescriptionClick, this));

            amplify.subscribe('fx.widget.catalog.metadata', _.bind(this.onMetadataClick, this));

            amplify.subscribe('fx.widget.catalog.download', _.bind(this.onDownloadClick, this));

        },

        onAnalysisClick: function (model) {

            this.closeOverly();

            //TODO: for now
            model.uid = 'gift_avg_000042BUR201001';


            log.trace('on analysis click!')
            Backbone.history.navigate('#dashboard/' + model.uid ,  {'trigger': true});

        },

        onDescriptionClick: function (model) {

            this.$modalMetadata.modal('hide');

            $('.modal-backdrop').remove();

            this.$modalDescription.modal('show');

            this.$modalDescription.find(s.MODAL_DESCRIPTION_CONTAINER).empty();

            if(!this.$dataTable){
                this.$dataTable = JSON.parse(dataTableDesc);
            }


            var templateToAdd = Handlebars.compile(templateDesc);
            var $compiled = templateToAdd(descriptionConfig[model.uid].resume);

            this.$modalDescription.find(s.MODAL_DESCRIPTION_CONTAINER).append($compiled);

            descriptionConfig[model.uid].resume.onRender();
        },


        onMetadataClick: function (model) {

            if (model.hasOwnProperty('actions')) {
                delete model['actions']
            }

            var self = this;

            this.$modalDescription.modal('hide');

            $('.modal-backdrop').remove();

            this.$modalMetadata.modal('show');

            var metadata = new MetadataViewer();

            self.$modalMetadata.find(s.MODAL_METADATAVIEWER_CONTAINER).empty();

            metadata.init({
                lang: 'en',
                data: model,
                placeholder: self.$modalMetadata.find(s.MODAL_METADATAVIEWER_CONTAINER)
            });


            self._listenToExportMetadata(model);

        },

        _listenToExportMetadata: function (model) {
            var fileName = model.title['EN'].replace(/[^a-z0-9]/gi, '_').toLowerCase();

            var self = this;

            $(s.BTN_EXPORT_METADATA).on('click', function(){

                debugger;

                var template = model.filter && model.filter["dsd.contextSystem"] && model.filter["dsd.contextSystem"].enumeration && [0] && model.filter["dsd.contextSystem"].enumeration[0] === 'uneca'?
                    'uneca' : 'fao';

                var payload = {
                    resource: {
                        metadata : {
                            uid : model.uid
                        },
                        data : []
                    },
                    input:{
                    },
                    output: {
                        config:{
                            template : template,
                            lang : 'en'.toUpperCase(),
                            fileName: fileName+'.pdf'
                        }
                    }
                };

                self.$report.init('metadataExport');
                self.$report.exportData(payload,C.SERVICE_BASE_ADDRESS);
            });
        },

        onDownloadClick: function (model) {
            window.location = C.DOWNLOAD_SOURCES[model.uid]
        },

        openOverly: function () {

            $(s.PAGE_CONTENT).hide();

            $(s.OVERLAY).show();

            $(s.OVERLAY_CONTENT).show();
        },

        closeOverly: function () {
            $(s.OVERLAY_CONTENT).hide();
            $(s.OVERLAY).hide();
            $(s.PAGE_CONTENT).show();
        },

        dispose: function () {

            log.trace('dispose statistics page!')

            this.catalog.destroy();

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },

        unbindEventListeners: function () {
            $(s.OVERLAY_OPEN).off();
            $(s.OVERLAY_CLOSE).off();
        }

    });

    return StatisticsView;
});

