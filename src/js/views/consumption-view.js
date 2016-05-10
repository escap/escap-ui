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
    'config/config',

    'leaflet_markecluster',
    'fenix-ui-map',
    'fenix-ui-map-config',

    'text!gaul0Centroids',

    'text!../../../tests/consuption_data/test_Free.json',
    'text!../../../tests/consuption_data/test_Confidential.json',
    'text!../../../tests/consuption_data/test_NotForPublication.json',
    'text!../../../tests/consuption_data/test_SecondaryConfidentiality.json',

    'amplify'
], function (require,$, _, Handlebars, View, template,   i18nLabels, E, C,

    LeafletMarkecluster,
    FenixMap,
    FenixConfig,

    gaul0Centroids,

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

    var LANG = requirejs.s.contexts._.config.i18n.locale.toUpperCase(),
        s = {
            READY_CONTAINER: "#ready-container",
            MAP_CONTAINER: "#consumption_map"
        },
        confidentialityCodelistUrl = C.SERVICE_BASE_ADDRESS+'/msd/resources/uid/GIFT_STATUS',
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

    var confidentialityCodelistStyles = {
        //MAP CODES with Boostrap themes
            'C': "primary",
            'D': "success",
            'F': "info",
            'N': "warning"
            //'X': "bg-danger"
        };

    var ConsumptionView = View.extend({


        initialize: function (params) {

            var self = this;

            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, params);

            self.confidentialityCodelist = {};
            self.legend_items = [];

            $.ajax({
                async: false,                
                dataType: 'json',
                url: confidentialityCodelistUrl,
                success: function(res) {
                
                    var titles = _.groupBy(res.data, function(d) {
                        return d.code;
                    });

                    _.each(titles, function(obj, code) {
                        
                        self.confidentialityCodelist[ code ]= obj[0].title[ LANG ];

                        self.legend_items.push({
                            code: code,
                            title: obj[0].title[ LANG ],
                            className: confidentialityCodelistStyles[ code ]
                        });
                    });

                }
            });
        },
        // Automatically render after initialize
        autoRender: true,

        className: 'consumption',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return {
                title: i18nLabels.title,
                legend_items: this.legend_items
             };
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

            this.gaul0Centroids = JSON.parse(gaul0Centroids);

            this.gaul0Centroids_adm0_code = _.groupBy(this.gaul0Centroids.features, function(feature) {
                return feature.properties.adm0_code;
            });

            this.mapLocsByAdm0Code = {};

            _.each(this.gaul0Centroids_adm0_code, function(feature, code) {
                self.mapLocsByAdm0Code[ code ] = feature[0].geometry.coordinates.reverse();
            });
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

            var lGroup = L.markerClusterGroup();

            this.iconMarkerFunc = lGroup._defaultIconCreateFunction;

            _.each(codesByCountry, function(item, countryCode) {

                self._getMarker(item).addTo( lGroup );

            });

            lGroup.addTo(this.fenixMap.map);
        },

        _getMarker: function(item) {

            var self = this;

            var loc = this._getLocByCode(item.countryCode),
                icon = this.iconMarkerFunc({
                    getChildCount: function() {
                        return item.confids.length;
                    }
                }),
                m = L.marker(loc, {icon: icon });

            var list = '';

            _.map(item.confids, function(code) {
                list +='<li class="list-group-item">'+
                    '<i class="label label-'+confidentialityCodelistStyles[ code ]+'">'+code+'</i>'+
                    '&nbsp;&nbsp;'+
                    self.confidentialityCodelist[ code ]+
                '</li>';
            });

            console.log(list)

            m.bindPopup(
                '<label>'+item.countryName+'</label>'+
                '<ul class="list-group">'+
                    list +
                '</ul>',{
                    closeButton:false
                });

            return m;
        },

        _getLocByCode: function(code) {

            var loc = this.mapLocsByAdm0Code[ code ];

            return loc;

            // //DEBUG
            // function randomLatLng(bb) {
            //     var sw = bb.getSouthWest(),
            //         ne = bb.getNorthEast(),
            //         lngs = ne.lng - sw.lng,
            //         lats = ne.lat - sw.lat;

            //     return new L.LatLng(
            //             sw.lat + lats * Math.random(),
            //             sw.lng + lngs * Math.random());
            // }

            // return randomLatLng( this.fenixMap.map.getBounds() );
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
