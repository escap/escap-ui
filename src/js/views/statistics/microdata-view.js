/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'views/base/view',
    'text!templates/statistics/microdata.hbs',
    'text!templates/statistics/description.hbs',
    'text!json/statistics/data.json',
    'i18n!nls/statistics-microdata',
    'fx-cat-br/start',
    'fx-ana/start',
    'FENIX_UI_METADATA_VIEWER',
    'fx-report',
    'config/submodules/fx-catalog/plugins/Config',
    'config/Config',
    'config/Events'
], function ($, _, Backbone,Handlebars, View, template,templateDesc,dataTableDesc, i18nLabels, Catalog, Analysis, MetadataViewer, Report, CF, C, E) {

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

    var MicrodataView = View.extend({

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

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //Init
            $(s.OVERLAY_CONTENT).hide();
            $(s.OVERLAY).hide();

            this.$modalMetadata = this.$el.find(s.MODAL_METADATA);

            this.$modalDescription = this.$el.find(s.MODAL_DESCRIPTION);

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
                                EN: 'Description'
                            }
                        },
                        METADATA: {
                            event: 'metadata',
                            labels: {
                                EN: 'Metadata'
                            }
                        },
                        DOWNLOAD: {
                            event: 'download',
                            labels: {
                                EN: 'Download'
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

            Backbone.history.navigate('#dashboard/' + model.uid , {trigger: true});

        },

        onDescriptionClick: function (model) {

            this.$modalMetadata.modal('hide');

            this.$modalDescription.modal('show');

            this.$modalDescription.find(s.MODAL_DESCRIPTION_CONTAINER).empty();


            if(!this.$dataTable){
                this.$dataTable = JSON.parse(dataTableDesc);
            }

            var templateToAdd = Handlebars.compile(templateDesc);
            var $compiled = templateToAdd( this.$dataTable);

            this.$modalDescription.find(s.MODAL_DESCRIPTION_CONTAINER).append($compiled);

        },



        onMetadataClick: function (model) {

            if (model.hasOwnProperty('actions')) {
                delete model['actions']
            }

            var self = this;

            this.$modalDescription.modal('hide');

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
            $(s.BTN_EXPORT_METADATA).on('click', function () {

                var payload = {
                    input: {
                        config: {
                            uid: model.uid
                        }
                    },
                    output: {
                        config: {
                            lang: 'en'.toUpperCase(),
                            fileName: fileName + '.pdf'
                        }
                    }
                };

                self.$report.init('metadataExport');
                self.$report.exportData(payload, C.MD_EXPORT_URL);
            });
        },

        onDownloadClick: function (model) {
            console.log("download")
            console.log(model);

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

            this.catalog.destroy();

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },

        unbindEventListeners: function () {
            $(s.OVERLAY_OPEN).off();
            $(s.OVERLAY_CLOSE).off();
        }

});

return MicrodataView;
})
;

