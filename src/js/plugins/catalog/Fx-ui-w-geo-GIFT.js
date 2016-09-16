/*global define, amplify, alert*/
define([
        "jquery",
        "geojson_selector",
        'config/config',
        "fx-filter/config/config",
        "fx-filter/config/config-default",
        "fx-filter/config/events",
        "text!worldCountries",
        "leaflet",
        "amplify"],
    function ($, GeoSelector,CT, C, DC, E, GEOJSON, L) {

        'use strict';

        var worldCountries = JSON.parse(GEOJSON),
            o = {
                lang: 'EN',
                //For filter logic .... start
                componentType: '',
                componentid: '',
                name: '',
                title: '',
                grid: '',
                source: '',
                defaultsource: '',
                adapter: null,
                css_classes: {
                    HOLDER: "fx-catalog-modular-form-holder",
                    HEADER: "fx-catalog-modular-form-header",
                    HANDLER: "fx-catalog-modular-form-handler",
                    CONTENT: "fx-catalog-modular-form-content",
                    CLOSE_BTN: "fx-catalog-modular-form-close-btn",
                    MODULE: 'fx-catalog-form-module',
                    RESIZE: ".fx-catalog-modular-form-resize-btn",
                    LABEL: "fx-catalog-modular-form-label"
                },

                sourceType: {
                    timelist: 'timeList',
                    period: 'period'
                },

                selectedCountry_key : 'id-selected',

                events: {
                    REMOVE_MODULE: "fx.filter.module.remove",
                    READY: "fx.filter.component.ready",
                    DESELECT: 'fx.filter.module.deselect.'
                }
                //For filter logic .... end
            };


        function FX_ui_geographic_component(optionsDefault) {

            if (this.options === undefined) {
                this.options = {};
            };

            this.$CT = CT.CATALOG_TEMPLATE;

            $.extend(true, this.options, o, optionsDefault);
        };


        FX_ui_geographic_component.prototype._initialize = function (e) {


            this.$geoConfiguration =  this.$CT.FILTER_CONFIG.GEO

            this.$componentStructure = e.template.overallStructure;

            this.$container = $(this.options.container);

            console.log(e.template)

            this.$geojson_def_opts = e.template.geo_opts;

        };

        FX_ui_geographic_component.prototype.render = function (e, container) {

            var self = this;

            self.options.container = container;

            self.options.module = e;

            $.extend(self.options.events, e.events); // extend events passed from the host

            this._initialize(e);

            this.$container.append(this.$componentStructure);

            // initialize map

            this._renderMap( this.$geojson_def_opts);

            this.bindEventListeners();

            if ((e.adapter != null) && (typeof e.adapter != "undefined")) {
                self.options.adapter = e.adapter;
            }

            self.options.name = e.name;
            self.options.componentid = $(container).attr("id");
            //Raise an event to show that the component has been rendered
            $(container).trigger(self.options.events.READY, {name: e.name});

        };

        FX_ui_geographic_component.prototype._renderMap = function (styleConf) {

            var self = this;

            this.$leafletMap = new L.Map(self.$geoConfiguration.MAP_ID, {
                zoomControl: false,
                minZoom: 0.9,
                layers: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            });

            this.$leafletMap.addControl(L.control.zoom({position: 'topright'}));

            var geoLayer = L.geoJson(worldCountries).addTo(this.$leafletMap);

            // zoom on every country to select
            this.$leafletMap.fitBounds(geoLayer.getBounds())
                .setMaxBounds(geoLayer.getBounds().pad(0.5));

            this.$geoList = new L.Control.GeoJSONSelector(geoLayer,styleConf);

            this.$leafletMap.addControl(this.$geoList);
        };

        FX_ui_geographic_component.prototype._manipulateDOMToFilterCountries = function () {

            var listCountries = document.getElementsByClassName(this.$geoConfiguration.GEOJSON_LIST_GROUP_CLASS)[0];
            var parentListCountries = listCountries.parentNode;
            var containerListCountries = document.createElement('div');
            containerListCountries.setAttribute('class', this.$geoConfiguration.LIST_COUNTRIES_CLASS);
            parentListCountries.replaceChild(containerListCountries, listCountries);
            containerListCountries.appendChild(listCountries);

            var containerListCountriesElement = document.getElementsByClassName(this.$geoConfiguration.LIST_COUNTRIES_CLASS)[0];
            var parentListCountriesElement = containerListCountriesElement.parentNode;
            var wrapperSelectorWithFilter = document.createElement('div');
            wrapperSelectorWithFilter.setAttribute('class', this.$geoConfiguration.SELECTOR_LIST_FILTER_CLASS)

            var inputFilter = document.createElement('input')
            inputFilter.setAttribute('class', this.$geoConfiguration.SEARCH_INPUT_CLASS)
            wrapperSelectorWithFilter.appendChild(inputFilter);
            parentListCountriesElement.replaceChild(wrapperSelectorWithFilter, containerListCountriesElement);
            wrapperSelectorWithFilter.appendChild(containerListCountriesElement);
        };

        FX_ui_geographic_component.prototype.validate = function (e) {

            //TODO


            return true;
        };

        FX_ui_geographic_component.prototype.processData = function (dataType, data) {
            // TODO

            var r = [];
            if (dataType == o.sourceType.timelist) {
                //Array of years
                data.sort(function (a, b) {
                    if (a < b)
                        return -1;
                    if (a > b)
                        return 1;
                    return 0;
                });

                $(data).each(function (index, item) {
                    r.push({"text": "" + item, "id": item, "children": false});
                });
            }
            else if (dataType == o.sourceType.period) {
                //Array of json object {from: to}
                $(data).each(function (index, item) {
                    var start_year = item.from;
                    var end_year = item.to;
                    var iYear = 0;
                    if (start_year <= end_year) {
                        for (iYear = start_year; iYear <= end_year; iYear++) {
                            r.push({"text": "" + iYear, "id": iYear, "children": false});
                        }
                    }
                });
            }

            return r;
        };

        FX_ui_geographic_component.prototype.bindEventListeners = function () {

            var self = this;

            // to adapt content of map to the container
            $(this.options.css_classes.RESIZE).on('click', function () {
                self.$leafletMap.invalidateSize();
            })


            this.$geoList.on('item-active', function (e) {
                console.log('item-active',this)
                var that = this;

                that._layer.setStyle(self.$geojson_def_opts.style);

                that._layer.eachLayer(function(layer) {
                    L.DomUtil.removeClass(layer.itemList, that.options.activeClass);
                });

                L.DomUtil.addClass(e.layers[0].itemList, that.options.activeClass);


                amplify.store(self.options.selectedCountry_key, e.layers[0].feature.id);

                var container  = $(self.$geoList._container);
                console.log(container)
                var scrollTo = $(e.layers[0].itemList)

                container.animate({
                    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
                });

                $('#' + self.$geoConfiguration.MAP_ID).prev('label').text(e.layers[0].feature.properties.name)
            });


            this.$leafletMap.whenReady(function (e) {
                // insert filter input search
                self._manipulateDOMToFilterCountries();
                self._setVariablesAfterManipulation()
            });


            // search filter on keyup
            this.$inputSearch.onkeyup = function () {
                var filter = self.$inputSearch.value.toUpperCase();
                var lis = self.$searchArea.getElementsByClassName(self.$geoConfiguration.GEOJSON_LIST_ITEM_CLASS);
                for (var i = 0; i < lis.length; i++) {
                    var name = lis[i].getElementsByTagName('span')[0].innerHTML
                    if (name.toUpperCase().indexOf(filter) == 0)
                        lis[i].style.display = self.$geoConfiguration.ITEM_LIST_CLASS;
                    else
                        lis[i].style.display = 'none';
                }
            }


            amplify.subscribe(E.MODULE_DESELECT + '.' + self.options.module.name, function (e) {
                self.deselectValue(e);
            });
        };

        FX_ui_geographic_component.prototype.deselectValue = function (obj) {


        };

        FX_ui_geographic_component.prototype._setVariablesAfterManipulation = function () {

            this.$inputSearch = document.getElementsByClassName(this.$geoConfiguration.SEARCH_INPUT_CLASS)[0];
            this.$searchArea = document.getElementsByClassName(this.$geoConfiguration.LIST_COUNTRIES_CLASS)[0];
        }

        //For filter logic .... start
        FX_ui_geographic_component.prototype.getName = function () {
            return this.options.name;
        };

        FX_ui_geographic_component.prototype.getAdapter = function () {
            return this.options.adapter;
        };
        //For filter logic .... end

        FX_ui_geographic_component.prototype.getValue = function (e) {


            /* Real country_code: amplify.store(this.options.selectedCountry_key)) */

            return {

                country_selected: {
                    codes : ['42']
                }

            };
        };

        return FX_ui_geographic_component;
    });