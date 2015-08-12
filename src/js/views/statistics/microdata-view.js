/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/statistics/microdata.hbs',
    'i18n!nls/statistics-microdata',
 'fx-filter/start',
/*
    'fx-cat-br/start',
*/
    'config/submodules/fx-filter/Config',
    'config/Config',
    'config/Events',
    'text!templates/filter/surveyComponent.hbs',
    'text!templates/filter/geoComponent.hbs',
    'text!templates/filter/populationComponent.hbs',
    'text!templates/filter/foodComponent.hbs',
    'text!json/filter/geoSelector_leafletStyle.json',
    'handlebars'
], function (View, template, i18nLabels, Filter,/*Catalog,*/ CF, C, E,
             SurveyTemplate, GeoTemplate, PopulationTemplate, FoodTemplate, GEOJSONStyle,HandleBars) {

    'use strict';

    var s = {
        CATALOG_CONTAINER: '#fx-catalog-container'

    }

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

/*
            this._testCatalog();
*/

        },


        _testCatalog: function() {
            this.catalog = new Catalog({

                container: document.querySelector(s.CATALOG_CONTAINER),

                catalog: {
                    BLANK_FILTER: C.CATALOG_BLANK_FILTER
                },

                results: {
                    actions: {
                        SELECT_RESOURCE: {
                            event: 'select',
                            labels: {
                                EN: 'Select Resource'
                            }

                        }
                    }
                }

            }).init();
        },
        _test: function () {


            var o = {
                population_chars_enabled : true
            }

            var filter;
            $("#getValues").on('click', function () {
//        var ris = fc.getValues([{name: "FirstComponent3"}]);
                console.log(filter.getValues());
            });

            $('#addComponent').on('click', function () {
                var modd = [
                    {
                    "containerType": "fluidGridBaseContainer",
                    "title": "List Test Period",
                    "components": [
                        {
                            "componentType": "timeList-FENIX",
                            "lang": "EN",
                            "title": {
                                "EN": "Time List For Fenix",
                                "ES": "Time List For Fenix",
                                "DE": "Time List For Fenix",
                                "FR": "Time List For Fenix"
                            },
                            "name": "periodForFenix",
                            "component": {
                                "sourceType": "period",
                                "defaultsource": [{"from": 1983, "to": 1994}, {"from": 1996, "to": 1998}, {
                                    "from": 2002,
                                    "to": 2005
                                }, {"from": 2007, "to": 2011}]
                            }
                        }
                    ]
                }];
                filter.add(modd);
            });


            var FILTER_CONTAINER = 'fx-analysis-container';

            var self = this;


            var filter = new Filter();
            filter.init({

                component_plugin_dir: "src/js/component_plugin/gift/",

                container: FILTER_CONTAINER,
                plugin_prefix: CF.PLUGIN_FILTER_COMPONENT_DIRECTORY || CF.PLUGIN_FILTER_COMPONENT_DIRECTORY,
                layout: 'fluidGrid'
                //  plugin_subdir: 'FENIX-plugin'
            });

            var modules = [
/*
                {
                    "containerType": "fluidGridBaseContainer",
                    "title": "FOOD",
                    "components": [
                        {
                            "componentType": "food-GIFT",
                            "lang": "EN",
                            "title": {
                                "EN": "By single food categories",
                                "ES": "FOOD selectors for GIFT",
                                "DE": "FOOD selectors for GIFT",
                                "FR": "GEO selectors for GIFT"
                            },
                            "name": "FOODGift",
                            "template": {
                                "overallStructure": FoodTemplate,
                                "descriptions": CF.FILTER_CONFIG
                            },
                            "component": {
                             source:{
                                 uid: "GAUL",
                                 version: 2014
                             }
                            },
                            "events":CF.events
                        },
                        {
                            "componentType": "food-GIFT",
                            "lang": "EN",
                            "title": {
                                "EN": "By aggregated food categories",
                                "ES": "FOOD selectors for GIFT",
                                "DE": "FOOD selectors for GIFT",
                                "FR": "GEO selectors for GIFT"
                            },
                            "name": "FOODGift",
                            "template": {
                                "overallStructure": FoodTemplate,
                                "descriptions": CF.FILTER_CONFIG
                            },
                            "component": {
                                source:{
                                    uid: "GAUL",
                                    version: 2014
                                }
                            },
                            "events":CF.events
                        }


                    ]

                },
*/
                {
                    "containerType": "fluidGridBaseContainer",
                    "title": "GEOGRAPHIC",
                    "components": [
                        {
                            "componentType": "geo-GIFT",
                            "lang": "EN",
                            "title": {
                                "EN": "GEO selectors for GIFT",
                                "ES": "GEO selectors for GIFT",
                                "DE": "GEO selectors for GIFT",
                                "FR": "GEO selectors for GIFT"
                            },
                            "name": "GEOGift",
                            "template": {
                                "overallStructure": GeoTemplate,
                                "descriptions": CF.FILTER_CONFIG,
                                "style" : JSON.parse(GEOJSONStyle)
                            },
                            "component": {
                                ageRange: {
                                    "sourceType": "period",
                                    "defaultsource": {
                                        geoTree: {from: 0, to: 70}
                                    }
                                }
                            },
                            "events":CF.events
                        }

                    ]

                },
                {
                    "containerType": "fluidGridBaseContainer",
                    "title": "SURVEY",
                    "components": [
                        {
                            "componentType": "survey-GIFT",
                            "lang": "EN",
                            "title": {
                                "EN": "Survey selectors for GIFT",
                                "ES": "Survey selectors for GIFT",
                                "DE": "Survey selectors for GIFT",
                                "FR": "Survey selectors for GIFT"
                            },
                            "name": "surveyGIFT",
                            "template": {
                                "overallStructure": SurveyTemplate,
                                "descriptions": CF.FILTER_CONFIG
                            },
                            "component": {
                                years: {
                                    "sourceType": "period",
                                    "defaultsource": {"from": 1983, "to": 2014}
                                }
                            }
                        }

                    ]
                },
                {
                    "containerType": "fluidGridBaseContainer",
                    "title": "POPULATION",
                    "components": [
                        {
                            "componentType": "population-GIFT",
                            "lang": "EN",
                            "title": {
                                "EN": "Population selectors for GIFT",
                                "ES": "Population selectors for GIFT",
                                "DE": "Population selectors for GIFT",
                                "FR": "Population selectors for GIFT"
                            },
                            "name": "populationGIFT",
                            "template": {
                                "overallStructure": PopulationTemplate,
                                "descriptions": CF.FILTER_CONFIG
                            },
                            "component": {
                                ageRange: {
                                    "sourceType": "period",
                                    "defaultsource": {
                                        YEARS: {from: 0, to: 70},
                                        MONTHS:{ from:0, to: 840}
                                    }
                                }
                            },
                            "events":CF.events
                        }

                    ]

                },

            ];

            filter.add(modules);


            amplify.subscribe(CF.events.MODIFY, function(args){
                console.log('subscribed', args);
                var values = filter.getValues().populationGIFT;
                if(o.population_chars_enabled === false && values.gender === 'female' && (
                            (values.ageRangeType === 'YEARS' && values.ageRange.period.from >15 )
                        ||  (values.ageRangeType === 'MONTHS' && values.ageRange.period.from >180 ))){
                    var radioButtons = $('input[name="' + CF.FILTER_CONFIG.POPULATION.CHARACTERISTICS_RADIO_NAME + '"]:radio');
                    for(var i= 0,length = radioButtons.length; i<length; i++) {
                        radioButtons[i].removeAttribute("disabled");
                    }
                }
                else if(o.population_chars_enabled === true && values.gender === 'male' || (
                    (values.ageRangeType === 'YEARS' && values.ageRange.period.from <15 )
                    ||  (values.ageRangeType === 'MONTHS' && values.ageRange.period.from <180 ))){
                    var radioButtons = $('input[name="' +  CF.FILTER_CONFIG.POPULATION.CHARACTERISTICS_RADIO_NAME + '"]:radio');
                    for(var i= 0,length = radioButtons.length; i<length; i++) {
                        radioButtons[i].setAttribute('disabled', true);
                    }
                    o.population_chars_enabled = false;
                }
            })
        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }



    });

    return MicrodataView;
});

