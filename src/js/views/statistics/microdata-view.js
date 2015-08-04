/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/statistics/microdata.hbs',
    'i18n!nls/statistics-microdata',
    'fx-filter/start',
    'config/submodules/fx-filter/Config',
    'config/Config',
    'config/Events',
    'text!templates/filter/surveyComponent.hbs',
    'text!templates/filter/geoComponent.hbs',
    'text!templates/filter/populationComponent.hbs',
    'text!templates/filter/foodComponent.hbs'
], function (View, template, i18nLabels, Filter, CF, C, E,
             SurveyTemplate, GeoTemplate, PopulationTemplate, FoodTemplate) {

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


        _test: function () {

            var filter;
            $("#getValues").on('click', function () {
//        var ris = fc.getValues([{name: "FirstComponent3"}]);
                console.log(filter.getValues());
            });

            $('#addComponent').on('click', function () {
                var modd = [{
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
            })

            var FILTER_CONTAINER = 'fx-analysis-container';


            var filter = new Filter();
            filter.init({

                component_plugin_dir: "src/js/component_plugin/gift/",

                container: FILTER_CONTAINER,
                plugin_prefix: CF.PLUGIN_FILTER_COMPONENT_DIRECTORY || CF.PLUGIN_FILTER_COMPONENT_DIRECTORY,
                layout: 'fluidGrid'
                //  plugin_subdir: 'FENIX-plugin'
            });

            var modules = [
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
                                years: {
                                    "sourceType": "period",
                                    "defaultsource": {
                                        YEARS: {from: 0, to: 70},
                                        MONTHS:{ from:0, to: 840}
                                    }
                                }
                            }
                        }

                    ]
                }

                /*{
                 "containerType":"fluidGridBaseContainer",
                 "title":"List Test Period",
                 "components":[
                 {
                 "componentType":"timeList-FENIX",
                 "lang":"EN",
                 "title":{"EN": "Time List For Fenix",
                 "ES": "Time List For Fenix",
                 "DE": "Time List For Fenix",
                 "FR": "Time List For Fenix"},
                 "name":"periodForFenix",
                 "component": {
                 "sourceType": "period",
                 "defaultsource":[{"from": 1983, "to": 1994},{"from": 1996, "to": 1998},{"from": 2002, "to": 2005},{"from": 2007, "to": 2011}]
                 }
                 }
                 ]
                 }*/
            ];


            filter.add(modules);
        }

    });

    return MicrodataView;
});

