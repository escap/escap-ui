/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/statistics/microdata.hbs',
    'i18n!nls/statistics-microdata',
    'fx-filter/start',
    'config/Events',
    'amplify'
], function (View, template, i18nLabels,Filter, E) {

    'use strict';

    var MicrodataView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'modules',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'microdata'});

            this._test();

        },


        _test: function() {

            var filter;
            $("#jqxButton").on('click', function () {
//        var ris = fc.getValues([{name: "FirstComponent3"}]);
                var ris = fc.getValues();
            });

            debugger;
            var FILTER_CONTAINER= 'filterContainer';


            var filter = new Filter();
            filter.init({
                container: FILTER_CONTAINER,
                plugin_prefix: '',
                layout: 'fluidGrid'
                //  plugin_subdir: 'FENIX-plugin'
            });

            var modules = [
                {
                    "containerType": "container1",
                    "title": "Container1Title",
                    "components": [
                        {"componentType": "baseList",
//                    "source": [
//                        {"label": "l1", "value": "v1"},
//                        {"label": "l2", "value": "v2"}
//                    ],
                            //"type":"radiobuttongroup",
                            //"domain_type" : "CommodityDomain",
                            //"group_name":"fx_selector_1_group",
                            "elements": [
                                {"value": true, "id": "fx_selector_1_rb1", "label": "Agricultural", "code": 1, "position": 0},
                                {"value": false, "id": "fx_selector_1_rb2", "label": "Biofuels", "code": 2, "position": 1},
                                {"value": false, "id": "fx_selector_1_rb3", "label": "Both", "code": -1, "position": 3}
                            ],
                            "lang": "EN",
                            "title": {
                                "EN": "Component 1",
                                "ES": "ES List",
                                "FR": "FR List"},
                            "subtitle": {
                                "EN": "SubTitle1EN",
                                "ES": "SubTitle1ES",
                                "FR": "SubTitle1FR"},
                            "multipleselection": true,
                            "name": "FirstComponent",
                            "details": {
                                "cl": {
                                    "system": "CS_Units",
                                    "version": "1.0"}
                            },
                            "component": {
                                "source": {
                                    "datafields": [
                                        {
                                            "name": "label"
                                        },
                                        {
                                            "name": "value"
                                        }
                                    ],
                                    "id": "code"
                                },
                                "rendering": {
                                    "displayMember": "label",
                                    "valueMember": "value",
                                    "multiple": true,
                                    "width": "100%",
                                    "height": "100%"
                                }}
                        }
                        ,
                        {"componentType": "baseList",
                            "source": [
                                {"label": "l6", "value": "v6"},
                                {"label": "l7", "value": "v7"}
                            ],
                            //"type":"radiobuttongroup",
                            //"domain_type" : "CommodityDomain",
                            //"group_name":"fx_selector_1_group",
                            "elements": [
                                {"value": true, "id": "fx_selector_1_rb1", "label": "Agricultural", "code": 1, "position": 0},
                                {"value": false, "id": "fx_selector_1_rb2", "label": "Biofuels", "code": 2, "position": 1},
                                {"value": false, "id": "fx_selector_1_rb3", "label": "Both", "code": -1, "position": 3}
                            ],
                            "lang": "EN",
                            "title": {
                                "EN": "Component 2",
                                "ES": "ES List",
                                "FR": "FR List"},
                            "multipleselection": true,
                            "name": "SecondComponent",
                            "details": {
                                "cl": {
                                    "system": "CS_Units",
                                    "version": "1.0"}
                            },
                            "component": {
                                "source": {
                                    "datafields": [
                                        {
                                            "name": "label"
                                        },
                                        {
                                            "name": "value"
                                        }
                                    ],
                                    "id": "code"
                                },
                                "rendering": {
                                    "displayMember": "label",
                                    "valueMember": "value",
                                    "multiple": true,
                                    "width": "100%",
                                    "height": "100%"
                                }}
                        }
                    ]
                },
                {
                    "containerType": "container1",
                    "title": "Container2Title",
                    "components": [
                        {"componentType": "baseList",
                            "source": [
                                {"label": "l13", "value": "v13"},
                                {"label": "l23", "value": "v23"}
                            ],
                            //"type":"radiobuttongroup",
                            //"domain_type" : "CommodityDomain",
                            //"group_name":"fx_selector_1_group",
                            "elements": [
                                {"value": true, "id": "fx_selector_1_rb1", "label": "Agricultural", "code": 1, "position": 0},
                                {"value": false, "id": "fx_selector_1_rb2", "label": "Biofuels", "code": 2, "position": 1},
                                {"value": false, "id": "fx_selector_1_rb3", "label": "Both", "code": -1, "position": 3}
                            ],
                            "lang": "EN",
                            "title": {
                                "EN": "Component 3",
                                "ES": "ES List",
                                "FR": "FR List"},
                            "subtitle": {
                                "EN": "SubTitle2EN",
                                "ES": "SubTitle1ES",
                                "FR": "SubTitle1FR"},
                            "multipleselection": true,
                            "name": "ThirdComponent",
                            "component": {
                                "source": {
                                    "datafields": [
                                        {
                                            "name": "label"
                                        },
                                        {
                                            "name": "value"
                                        }
                                    ],
                                    "id": "code"
                                },
                                "rendering": {
                                    "displayMember": "label",
                                    "valueMember": "value",
                                    "multiple": true,
                                    "width": "100%",
                                    "height": "100%"
                                }}
                        }
                        ,
                        {"componentType": "baseList",
                            "source": [
                                {"label": "l61", "value": "v61"},
                                {"label": "l71", "value": "v71"}
                            ],
                            //"type":"radiobuttongroup",
                            //"domain_type" : "CommodityDomain",
                            //"group_name":"fx_selector_1_group",
                            "elements": [
                                {"value": true, "id": "fx_selector_1_rb1", "label": "Agricultural", "code": 1, "position": 0},
                                {"value": false, "id": "fx_selector_1_rb2", "label": "Biofuels", "code": 2, "position": 1},
                                {"value": false, "id": "fx_selector_1_rb3", "label": "Both", "code": -1, "position": 3}
                            ],
                            "lang": "EN",
                            "title": {
                                "EN": "Component 4",
                                "ES": "ES List",
                                "FR": "FR List"},
                            "multipleselection": true,
                            "name": "4Component",
                            "component": {
                                "source": {
                                    "datafields": [
                                        {
                                            "name": "label"
                                        },
                                        {
                                            "name": "value"
                                        }
                                    ],
                                    "id": "code"
                                },
                                "rendering": {
                                    "displayMember": "label",
                                    "valueMember": "value",
                                    "multiple": true,
                                    "width": "100%",
                                    "height": "100%"
                                }}
                        }
                    ]
                }
            ];

            filter.add(modules);
        }

    });

    return MicrodataView;
});

