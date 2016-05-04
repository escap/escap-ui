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

    'leaflet_markecluster',
    'fenix-ui-map',
    'fenix-ui-map-config',

    'text!../../../tests/consuption_data/test_Free.json',
    'text!../../../tests/consuption_data/test_Confidential.json',
    'text!../../../tests/consuption_data/test_NotForPublication.json',
    'text!../../../tests/consuption_data/test_SecondaryConfidentiality.json',

    'amplify'
], function (require,$, _, Handlebars, View, template,   i18nLabels, E,

    LeafletMarkecluster,
    FenixMap,
    FenixConfig,

    dataFree,
    dataConfidential,
    dataNotForPublication,
    dataSecondaryConfidentiality

    ) {

    var testData = {
        Free: JSON.parse(dataFree),        
        Confidential: JSON.parse(dataConfidential),
        NotForPublication: JSON.parse(dataNotForPublication),
        SecondaryConfidentiality: JSON.parse(dataSecondaryConfidentiality)
    };

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

            var self = this;

            this.$map = this.$el.find(s.MAP_CONTAINER);

            this._dataByCountry = testData;
            this.mapCodesGroup = _.union(_.map(testData, function(meta) {
                
                return {
                    confid: meta.meAccessibility.seConfidentiality.confidentialityStatus.codes[0].code,
                    codes: meta.meContent.seCoverage.coverageGeographic.codes
                }

            }) );

            this.mapCodesByConfid = _.groupBy(this.mapCodesGroup,'confid');
        },

        attach: function () {

            var self = this;

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'consumption'});
            this.initVariables();
            this._configurePage();

            this.fenixMap = new FM.Map(this.$map, mapOpts);
            this.fenixMap.createMap();


            var codesByCountry = {};
            for(var i in this.mapCodesGroup) {
                var group = this.mapCodesGroup[i];

                if(group.codes) {
                    for(var n in group.codes) {
                        var country = group.codes[n],
                            countryCode = country.code,
                            countryName = country.label.EN;

                        if(!codesByCountry[countryCode])
                            codesByCountry[countryCode] = {
                                countryCode: countryCode,
                                countryName: countryName,
                                confids: []
                            };

                        codesByCountry[countryCode].confids.push(group.confid)
                    }
                }
            }

            console.log(//this.mapCodesGroup,
                //JSON.stringify(this.mapCodesByConfid, null, 2),
                JSON.stringify(codesByCountry, null, 2)
            );

            //var lGroup = L.markerClusterGroup().addTo(this.fenixMap.map);
            var lGroup = L.layerGroup().addTo(this.fenixMap.map);

            _.each(codesByCountry, function(item, countryCode) {

                self._getMarker(item).addTo( lGroup );

            }); //*/
        },

        _getMarker: function(item) {

            var loc = this._getLocByCode(item.countryCode),
                m = L.marker(loc);

            var list = _.map(item.confids, function(item) {
                    return item;
                }).join('<br />');

            m.bindPopup( '<b>'+item.countryName+'</b><br>'+ list );//*/

            return m;
        },

        _getLocByCode: function(code) {

            //DEBUG
            function randomLatLng(bb) {
                var sw = bb.getSouthWest(),
                    ne = bb.getNorthEast(),
                    lngs = ne.lng - sw.lng,
                    lats = ne.lat - sw.lat;

                return new L.LatLng(
                        sw.lat + lats * Math.random(),
                        sw.lng + lngs * Math.random());
            }

            return randomLatLng( this.fenixMap.map.getBounds() );
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