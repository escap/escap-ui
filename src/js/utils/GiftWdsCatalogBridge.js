
/*global define*/
define([
    'jquery',
    'config/config',
    'fx-cat-br/config/events',
    'fx-common/WDSClient',
    'q',
    'amplify'
], function ($, C, E, WDSClient, Q) {

    'use strict';

    function GiftWdsCatalogBridge() { }

    GiftWdsCatalogBridge.prototype.init = function() {

        this.wdsClient = new WDSClient({
            serviceUrl: C.WDS_URL,
            datasource: C.DB_NAME,
            outputType: C.WDS_OUTPUT_TYPE
        });

    };

    GiftWdsCatalogBridge.prototype.query = function(src, callback) {

        var plugin;

        if (!window.Fx_catalog_bridge_plugins || typeof window.Fx_catalog_bridge_plugins !== "object") {
            throw new Error(o.error_prefix + " Fx_catalog_bridge_plugins plugins repository not valid.");
        } else {
            plugin = window.Fx_catalog_bridge_plugins[src.getName()];
        }

        if (!plugin) {
            throw new Error(o.error_prefix + " plugin not found.");
        }

        if (typeof plugin.init !== "function") {
            throw new Error(o.error_prefix + " plugin for " + src.getName() + " does not have a public init() method.");
        } else {
            plugin.init({component: src});
        }

        this.currentRequest = {
            filter : plugin.getFilter(),
            onExit : callback
        };

        this._query();

    };

    GiftWdsCatalogBridge.prototype._query = function () {

        this._getUidsFromWds();
    };

    GiftWdsCatalogBridge.prototype._createWdsQuery = function () {

        var f;

        var query = C.WDS_DOWNLOAD_MICRODATA_SEARCH_QUERY;
        /*
         * GEO selector: adm0_code = '<country gaul code>'
         Survey selector - year: consumption_date BETWEEN '<year from>-01-01' AND '<year to>-12-31'
         Survey selector - national/subnational: ???
         Survey selector - rural/urban: ???
         Population - gender: gender = <gender code>
         Population - pregnant/lactating: special_condition = <condition code>
         Population - age range - year: age_year BETWEEN <age from> AND <age to>
         Population - age range - month: age_month BETWEEN <age from> AND <age to>
         Food: foodex2_code = '<food code>'
         *
         * */


        if (this.currentRequest.filter['geo-GIFT']) {
            query += " AND";
            query += " adm0_code=" + this.currentRequest.filter['geo-GIFT'].country_selected.codes[0];
        }

        if (this.currentRequest.filter['food-GIFT']){
            query += " AND";
            f = this.currentRequest.filter['food-GIFT'];
            query += " foodex2_code = '" + f.codes[0];

        }

        /*
         * Population - gender: gender = <gender code>
         Population - pregnant/lactating: special_condition = <condition code>
         Population - age range - year: age_year BETWEEN <age from> AND <age to>
         Population - age range - month: age_month BETWEEN <age from> AND <age to>
         Food: foodex2_code = '<food code>'*/

        if (this.currentRequest.filter['population-GIFT']) {
            query += " AND";

            f = this.currentRequest.filter['population-GIFT'];

            if ( f.age_year) {
                query += " age_year BETWEEN " + f.age_year.period.from + " AND "+ f.age_year.period.to ;

            } else {
                query += " age_month BETWEEN " + f.age_month.period.from + " AND "+ f.age_month.period.to ;

            }

            //query += " age_month BETWEEN '" + this.currentRequest.filter['geo-GIFT'].country_selected.codes[0];


            //query += " adm0_code=" + this.currentRequest.filter['geo-GIFT'].country_selected.codes[0];
            //query += " adm0_code=" + this.currentRequest.filter['geo-GIFT'].country_selected.codes[0];

        }

        if (this.currentRequest.filter['survey-GIFT']) {
            query += " AND";
            query += " consumption_date BETWEEN '" + this.currentRequest.filter['survey-GIFT'].years.period.from + "-01-01' AND '"+ this.currentRequest.filter['survey-GIFT'].years.period.to + "-12-31'";
            //query += " adm0_code=" + this.currentRequest.filter['geo-GIFT'].country_selected.codes[0];
            //query += " adm0_code=" + this.currentRequest.filter['geo-GIFT'].country_selected.codes[0];

        }

        this.currentRequest.queryVars = query;
    };

    GiftWdsCatalogBridge.prototype._getUidsFromWds = function () {

        this._createWdsQuery();



        this.wdsClient.retrieve({
            payload: {
                query:  C.WDS_DOWNLOAD_MICRODATA_SEARCH_QUERY,
                queryVars: this.currentRequest.queryVars
            },
            success: _.bind(this._getUidsFromWdsSuccess, this),
            error: _.bind(this.onSearchError, this)
        });

    };

    GiftWdsCatalogBridge.prototype._getUidsFromWdsSuccess = function (result ) {


        this.currentRequest.wdsOriginalRespose = result;

        this._getDatasetFromD3S();

    };
    GiftWdsCatalogBridge.prototype._createD3PBody = function ( ) {


        //todo add context system

        this.currentRequest.d3pBody = {
            "dsd.contextSystem":{"enumeration":["gift"]},
            "uid":{
                "enumeration": [this.currentRequest.wdsOriginalRespose[1]["?column?"]]
            }
        }


    };

    GiftWdsCatalogBridge.prototype._getDatasetFromD3S = function (  ) {

        this._createD3PBody();



        var SERVICE_PREFIX = C.SERVICE_BASE_ADDRESS,
            url = SERVICE_PREFIX + "/msd/resources/find?full=true",
            self= this;

        //Ask the plugin the filter, make the request and pass data to callback()
        $.ajax({
            url: url,
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(this.currentRequest.d3pBody),
            success: function (response, textStatus, jqXHR) {

                self.currentRequest.response =response;

                if (jqXHR.status !== 204) {

                    self._getDatasetFromD3SSuccess();

                } else {
                    amplify.publish(E.SEARCH_QUERY_EMPTY_RESPONSE,  {results : [], filter: filter });
                }

            },
            complete: function () {
                amplify.publish(E.SEARCH_QUERY_END);
            }
        });
    };
    GiftWdsCatalogBridge.prototype._getDatasetFromD3SSuccess = function () {

        var provaFilter = [
            {
                "name": "filter",
                "parameters": {
                    "rows": {
                        "gender_code": {
                            "codes":[
                                {
                                    "codes": [
                                        "1"
                                    ]
                                }
                            ]
                        }
                    }

                }
            }
        ];

        this.currentRequest.onExit({results : this.currentRequest.response, filter :provaFilter
        });

    };

    GiftWdsCatalogBridge.prototype.onSearchError = function () {
        alert("Error on search")
    };

    return GiftWdsCatalogBridge;

});
