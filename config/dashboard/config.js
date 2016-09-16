/*global define*/

define(function () {

    'use strict';

    return {

        "FoodGroups": {

            filter: [
                {
                    "type": "codelist",
                    "containerType": "baseContainer",
                    "title": "Gender",
                    "defaultCodes": ["2"],
                    "components": [
                        {
                            "type": "codelist",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "uid": "GIFT_Gender",
                            "title": {"EN": "Distinct"},
                            // name is the ID output in tehe filter getValues()
                            "name": "gender",
                            "config": {
                                "defaultsource": []
                            }

                        }
                    ]
                },
                {
                    "type": "codelist",
                    "containerType": "baseContainer",
                    "title": "Special Condition",
                    "defaultCodes": ["1"],
                    "components": [
                        {
                            "type": "codelist",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "uid": "GIFT_SpecialConditions",
                            "title": {"EN": "Distinct"},
                            // name is the ID output in tehe filter getValues()
                            "name": "specialCondition",
                            "config": {
                                "defaultsource": []
                            }

                        }
                    ]
                },
                {
                    "type": "static",
                    "containerType": "baseContainer",
                    "title": "Age From",
                    "components": [
                        {
                            "type": "time",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "title": {"EN": "Age From"},
                            "name": "ageFrom",
                            config: {
                                "defaultsource": [{"value": 0, "label": 0, "selected": false}, {
                                    "value": 1,
                                    "label": 1,
                                    "selected": false
                                }, {"value": 2, "label": 2, "selected": false}, {
                                    "value": 3,
                                    "label": 3,
                                    "selected": false
                                }, {"value": 4, "label": 4, "selected": false}, {
                                    "value": 5,
                                    "label": 5,
                                    "selected": true
                                }, {"value": 6, "label": 6, "selected": false}, {
                                    "value": 7,
                                    "label": 7,
                                    "selected": false
                                }, {"value": 8, "label": 8, "selected": false}, {
                                    "value": 9,
                                    "label": 9,
                                    "selected": false
                                }, {"value": 10, "label": 10, "selected": false}, {
                                    "value": 11,
                                    "label": 11,
                                    "selected": false
                                }, {"value": 12, "label": 12, "selected": false}, {
                                    "value": 13,
                                    "label": 13,
                                    "selected": false
                                }, {"value": 14, "label": 14, "selected": false}, {
                                    "value": 15,
                                    "label": 15,
                                    "selected": false
                                }, {"value": 16, "label": 16, "selected": false}, {
                                    "value": 17,
                                    "label": 17,
                                    "selected": false
                                }, {"value": 18, "label": 18, "selected": false}, {
                                    "value": 19,
                                    "label": 19,
                                    "selected": false
                                }, {"value": 20, "label": 20, "selected": false}, {
                                    "value": 21,
                                    "label": 21,
                                    "selected": false
                                }, {"value": 22, "label": 22, "selected": false}, {
                                    "value": 23,
                                    "label": 23,
                                    "selected": false
                                }, {"value": 24, "label": 24, "selected": false}, {
                                    "value": 25,
                                    "label": 25,
                                    "selected": false
                                }, {"value": 26, "label": 26, "selected": false}, {
                                    "value": 27,
                                    "label": 27,
                                    "selected": false
                                }, {"value": 28, "label": 28, "selected": false}, {
                                    "value": 29,
                                    "label": 29,
                                    "selected": false
                                }, {"value": 30, "label": 30, "selected": false}, {
                                    "value": 31,
                                    "label": 31,
                                    "selected": false
                                }, {"value": 32, "label": 32, "selected": false}, {
                                    "value": 33,
                                    "label": 33,
                                    "selected": false
                                }, {"value": 34, "label": 34, "selected": false}, {
                                    "value": 35,
                                    "label": 35,
                                    "selected": false
                                }, {"value": 36, "label": 36, "selected": false}, {
                                    "value": 37,
                                    "label": 37,
                                    "selected": false
                                }, {"value": 38, "label": 38, "selected": false}, {
                                    "value": 39,
                                    "label": 39,
                                    "selected": false
                                }, {"value": 40, "label": 40, "selected": false}, {
                                    "value": 41,
                                    "label": 41,
                                    "selected": false
                                }, {"value": 42, "label": 42, "selected": false}, {
                                    "value": 43,
                                    "label": 43,
                                    "selected": false
                                }, {"value": 44, "label": 44, "selected": false}, {
                                    "value": 45,
                                    "label": 45,
                                    "selected": false
                                }, {"value": 46, "label": 46, "selected": false}, {
                                    "value": 47,
                                    "label": 47,
                                    "selected": false
                                }, {"value": 48, "label": 48, "selected": false}, {
                                    "value": 49,
                                    "label": 49,
                                    "selected": false
                                }, {"value": 50, "label": 50, "selected": false}, {
                                    "value": 51,
                                    "label": 51,
                                    "selected": false
                                }, {"value": 52, "label": 52, "selected": false}, {
                                    "value": 53,
                                    "label": 53,
                                    "selected": false
                                }, {"value": 54, "label": 54, "selected": false}, {
                                    "value": 55,
                                    "label": 55,
                                    "selected": false
                                }, {"value": 56, "label": 56, "selected": false}, {
                                    "value": 57,
                                    "label": 57,
                                    "selected": false
                                }, {"value": 58, "label": 58, "selected": false}, {
                                    "value": 59,
                                    "label": 59,
                                    "selected": false
                                }, {"value": 60, "label": 60, "selected": false}, {
                                    "value": 61,
                                    "label": 61,
                                    "selected": false
                                }, {"value": 62, "label": 62, "selected": false}, {
                                    "value": 63,
                                    "label": 63,
                                    "selected": false
                                }, {"value": 64, "label": 64, "selected": false}, {
                                    "value": 65,
                                    "label": 65,
                                    "selected": false
                                }, {"value": 66, "label": 66, "selected": false}, {
                                    "value": 67,
                                    "label": 67,
                                    "selected": false
                                }, {"value": 68, "label": 68, "selected": false}, {
                                    "value": 69,
                                    "label": 69,
                                    "selected": false
                                }, {"value": 70, "label": 70, "selected": false}]
                            }
                        }
                    ]
                },
                {
                    "type": "static",
                    "containerType": "baseContainer",
                    "title": "Age To",
                    "components": [
                        {
                            "type": "time",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "title": {"EN": "Age To"},
                            "name": "ageTo",
                            config: {
                                "defaultsource": [{"value": 0, "label": 0, "selected": false}, {
                                    "value": 1,
                                    "label": 1,
                                    "selected": false
                                }, {"value": 2, "label": 2, "selected": false}, {
                                    "value": 3,
                                    "label": 3,
                                    "selected": false
                                }, {"value": 4, "label": 4, "selected": false}, {
                                    "value": 5,
                                    "label": 5,
                                    "selected": false
                                }, {"value": 6, "label": 6, "selected": false}, {
                                    "value": 7,
                                    "label": 7,
                                    "selected": false
                                }, {"value": 8, "label": 8, "selected": false}, {
                                    "value": 9,
                                    "label": 9,
                                    "selected": false
                                }, {"value": 10, "label": 10, "selected": false}, {
                                    "value": 11,
                                    "label": 11,
                                    "selected": false
                                }, {"value": 12, "label": 12, "selected": false}, {
                                    "value": 13,
                                    "label": 13,
                                    "selected": false
                                }, {"value": 14, "label": 14, "selected": false}, {
                                    "value": 15,
                                    "label": 15,
                                    "selected": false
                                }, {"value": 16, "label": 16, "selected": false}, {
                                    "value": 17,
                                    "label": 17,
                                    "selected": false
                                }, {"value": 18, "label": 18, "selected": false}, {
                                    "value": 19,
                                    "label": 19,
                                    "selected": false
                                }, {"value": 20, "label": 20, "selected": false}, {
                                    "value": 21,
                                    "label": 21,
                                    "selected": false
                                }, {"value": 22, "label": 22, "selected": false}, {
                                    "value": 23,
                                    "label": 23,
                                    "selected": false
                                }, {"value": 24, "label": 24, "selected": false}, {
                                    "value": 25,
                                    "label": 25,
                                    "selected": false
                                }, {"value": 26, "label": 26, "selected": false}, {
                                    "value": 27,
                                    "label": 27,
                                    "selected": false
                                }, {"value": 28, "label": 28, "selected": false}, {
                                    "value": 29,
                                    "label": 29,
                                    "selected": false
                                }, {"value": 30, "label": 30, "selected": false}, {
                                    "value": 31,
                                    "label": 31,
                                    "selected": false
                                }, {"value": 32, "label": 32, "selected": false}, {
                                    "value": 33,
                                    "label": 33,
                                    "selected": false
                                }, {"value": 34, "label": 34, "selected": false}, {
                                    "value": 35,
                                    "label": 35,
                                    "selected": false
                                }, {"value": 36, "label": 36, "selected": false}, {
                                    "value": 37,
                                    "label": 37,
                                    "selected": false
                                }, {"value": 38, "label": 38, "selected": false}, {
                                    "value": 39,
                                    "label": 39,
                                    "selected": false
                                }, {"value": 40, "label": 40, "selected": true}, {
                                    "value": 41,
                                    "label": 41,
                                    "selected": false
                                }, {"value": 42, "label": 42, "selected": false}, {
                                    "value": 43,
                                    "label": 43,
                                    "selected": false
                                }, {"value": 44, "label": 44, "selected": false}, {
                                    "value": 45,
                                    "label": 45,
                                    "selected": false
                                }, {"value": 46, "label": 46, "selected": false}, {
                                    "value": 47,
                                    "label": 47,
                                    "selected": false
                                }, {"value": 48, "label": 48, "selected": false}, {
                                    "value": 49,
                                    "label": 49,
                                    "selected": false
                                }, {"value": 50, "label": 50, "selected": false}, {
                                    "value": 51,
                                    "label": 51,
                                    "selected": false
                                }, {"value": 52, "label": 52, "selected": false}, {
                                    "value": 53,
                                    "label": 53,
                                    "selected": false
                                }, {"value": 54, "label": 54, "selected": false}, {
                                    "value": 55,
                                    "label": 55,
                                    "selected": false
                                }, {"value": 56, "label": 56, "selected": false}, {
                                    "value": 57,
                                    "label": 57,
                                    "selected": false
                                }, {"value": 58, "label": 58, "selected": false}, {
                                    "value": 59,
                                    "label": 59,
                                    "selected": false
                                }, {"value": 60, "label": 60, "selected": false}, {
                                    "value": 61,
                                    "label": 61,
                                    "selected": false
                                }, {"value": 62, "label": 62, "selected": false}, {
                                    "value": 63,
                                    "label": 63,
                                    "selected": false
                                }, {"value": 64, "label": 64, "selected": false}, {
                                    "value": 65,
                                    "label": 65,
                                    "selected": false
                                }, {"value": 66, "label": 66, "selected": false}, {
                                    "value": 67,
                                    "label": 67,
                                    "selected": false
                                }, {"value": 68, "label": 68, "selected": false}, {
                                    "value": 69,
                                    "label": 69,
                                    "selected": false
                                }, {"value": 70, "label": 70, "selected": false}]
                            }
                        }
                    ]
                }
                /*
                 {
                 "type": "codelist",
                 "containerType": "baseContainer",
                 "title": "Food Group",
                 "defaultCodes": [],
                 "components": [
                 {
                 "type": "codelist",
                 "componentType": "dropDownList-FENIX",
                 "lang": "EN",
                 "uid": "TODO",
                 "title": {"EN": "Distinct"},
                 // name is the ID output in tehe filter getValues()
                 "name": "TODO",
                 "config": {
                 "defaultsource": []
                 }

                 }
                 ]
                 },
                 */
            ],

            dashboard: {

                //bridge configuration
                bridge: {

                    type: "d3p"

                },

                /*
                 * in case bridge is WDS this is the cube metadata.
                 * if bridge is D3P this is ignored
                 * */
                metadata: {},

                items: [

                    {
                        id: 'item-4',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#item-2",
                        config: {
                            container: "#item-2",
                            adapter: {
                                type: "pie",
                                valueDimensions: 'value',
                                seriesDimensions: ['region']
                            },
                            template: {},
                            creator: {
                                chartObj: {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: null,
                                        plotShadow: false,
                                        type: 'pie'
                                    },
                                    title: {
                                        //enable : false
                                        text: ''
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: 'pointer',
                                            dataLabels: {
                                                enabled: true
                                            },
                                            showInLegend: true
                                        }
                                    }
                                }
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: ['gender', 'specialCondition', 'ageFrom', 'ageTo', 'ageYear'],
                        filter: [
                            {
                                "name": "giftEnergyPercentage",
                                "parameters": {
                                    "gender": "2",
                                    "specialCondition": "1",
                                    "ageFrom": 5,
                                    "ageTo": 40,
                                    "ageYear": true,
                                    "food": ["A000Y", "A00BR", "A0F6B", "A03FQ", "A002N", "A0ETG", "A010C", "A000T", "A00JF", "A01SN", "A027J", "A00ZZ", "A01AB", "A013N", "A037A", "A00KJ", "A03NS", "A02JP", "A011P", "A00MJ"],
                                    "consumers": false

                                }
                            }

                        ]
                    },
                    /*
                     {
                     id: 'item-4',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#item-3",
                     config: {
                     container: "#item-3",
                     adapter: {
                     type: "pie",
                     valueDimensions: 'value',
                     seriesDimensions: ['region']
                     },
                     template: {},
                     creator: {
                     chartObj: {
                     chart: {
                     plotBackgroundColor: null,
                     plotBorderWidth: null,
                     plotShadow: false,
                     type: 'pie'
                     },
                     title: {
                     //enable : false
                     text: ''
                     },
                     tooltip: {
                     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                     },
                     plotOptions: {
                     pie: {
                     allowPointSelect: true,
                     cursor: 'pointer',
                     dataLabels: {
                     enabled: true
                     },
                     showInLegend: true
                     }
                     }
                     }
                     }
                     },
                     // for now it takes the id, TODO: add uid as well
                     //allowedFilter: ['indicator', 'year'],
                     filter: [
                     {
                     "name": "giftEnergyPercentage",
                     "parameters": {
                     "gender": "2",
                     "specialCondition": "3",
                     "ageFrom": 5,
                     "ageTo": 40,
                     "ageYear": true,
                     "food": [ "A000Y", "A00BR", "A0F6B", "A03FQ", "A002N", "A0ETG", "A010C", "A000T", "A00JF", "A01SN", "A027J", "A00ZZ", "A01AB", "A013N", "A037A", "A00KJ", "A03NS", "A02JP", "A011P", "A00MJ" ],
                     "consumers" : true
                     }
                     }
                     ]
                     }
                     */

                    /*
                     {
                     //Time series
                     id: 'population-1',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#item-1",
                     config: {
                     container: "#item-1",
                     adapter: {
                     type: "standard",
                     xDimensions: 'time',
                     yDimensions: 'item',
                     valueDimensions: 'value',
                     seriesDimensions: []
                     },
                     template: {
                     //"title": "Top 25..."
                     },
                     creator: {}
                     },


                     filter: [
                     {
                     "name": "filter",
                     "parameters": {
                     "rows": {
                     "IndicatorCode": {
                     "codes": [
                     {
                     "uid": "UNECA_ClassificationOfActivities",
                     "codes": [
                     "010101"
                     ]
                     }
                     ]
                     }
                     }
                     }
                     }
                     ]
                     },




                     {
                     id: 'population-2',
                     type: 'table',
                     class: "fx-map-chart",
                     //needed if layout = injected
                     container: "#population-2",
                     config: {
                     container: "#population-2",
                     leaflet: {
                     zoomControl: false,
                     attributionControl: true,
                     scrollWheelZoom: false,
                     minZoom: 2
                     }
                     },
                     // for now it takes the id, TODO: add uid as well
                     allowedFilter: [],
                     filter: [
                     {
                     "name": "filter",
                     "parameters": {
                     "rows": {
                     "IndicatorCode": {
                     "codes": [
                     {
                     "uid": "UNECA_ClassificationOfActivities",
                     "codes": [
                     "010103"
                     ]
                     }
                     ]
                     }
                     },
                     "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                     }
                     }
                     ]
                     },




                     {
                     //Time series
                     id: 'population-3',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#population-3",
                     config: {
                     container: "#population-3",
                     adapter: {
                     type: "standard",
                     xDimensions: 'time',
                     yDimensions: 'item',
                     valueDimensions: 'value',
                     seriesDimensions: ['AgeRangeCode']
                     },
                     template: {
                     //"title": "Top 25..."
                     },
                     creator: {
                     chartObj: {
                     chart: {
                     type: "area"
                     }
                     }
                     }
                     },

                     filter: [
                     {
                     "name": "filter",
                     "parameters": {
                     "rows": {
                     "IndicatorCode": {
                     "codes": [
                     {
                     "uid": "UNECA_ClassificationOfActivities",
                     "codes": [
                     "01010104"
                     ]
                     }
                     ]
                     }
                     }
                     }
                     }
                     ]
                     },


                     {
                     //Time series
                     id: 'population-4',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#population-4",
                     config: {
                     container: "#population-4",
                     adapter: {
                     type: "standard",
                     xDimensions: 'time',


                     yDimensions: 'item',
                     valueDimensions: 'value',
                     seriesDimensions: ['GenderCode']
                     },
                     template: {
                     //"title": "Top 25..."
                     },
                     creator: {
                     chartObj: {
                     chart: {
                     type: "column"
                     }
                     }
                     }
                     },


                     filter: [
                     {
                     "name": "filter",
                     "parameters": {
                     "rows": {
                     "IndicatorCode": {
                     "codes": [
                     {
                     "uid": "UNECA_ClassificationOfActivities",
                     "codes": [
                     "01010101"
                     ]
                     }
                     ]
                     }
                     }
                     }
                     }
                     ]
                     },


                     {
                     id: 'population-5',
                     type: 'table',
                     class: "fx-map-chart",
                     //needed if layout = injected
                     container: "#population-5",
                     config: {
                     container: "#population-5",
                     leaflet: {
                     zoomControl: false,
                     attributionControl: true,
                     scrollWheelZoom: false,
                     minZoom: 2
                     }
                     },
                     // for now it takes the id, TODO: add uid as well
                     allowedFilter: [],
                     filter: [
                     {
                     "name": "filter",
                     "parameters": {
                     "rows": {
                     "IndicatorCode": {
                     "codes": [
                     {
                     "uid": "UNECA_ClassificationOfActivities",
                     "codes": [
                     "010108"
                     ]
                     }
                     ]
                     }
                     },
                     "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                     }
                     }
                     ]
                     },





                     {
                     id: 'population-7',
                     type: 'table',
                     class: "fx-map-chart",
                     //needed if layout = injected
                     container: "#population-7",
                     config: {
                     container: "#population-7",
                     leaflet: {
                     zoomControl: false,
                     attributionControl: true,
                     scrollWheelZoom: false,
                     minZoom: 2
                     }
                     },
                     // for now it takes the id, TODO: add uid as well
                     allowedFilter: [],
                     filter: [
                     {
                     "name": "filter",
                     "parameters": {
                     "rows": {
                     "IndicatorCode": {
                     "codes": [
                     {
                     "uid": "UNECA_ClassificationOfActivities",
                     "codes": [
                     "010102"
                     ]
                     }
                     ]
                     }
                     },
                     "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                     }
                     }
                     ]
                     }
                     */

                ]
            }
        }
    }

});