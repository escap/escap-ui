/* global define */

define([
    'text!templates/statistics/pluginTemplates/surveyComponent.hbs',
    'text!templates/statistics/pluginTemplates/geoComponent.hbs',
    'text!templates/statistics/pluginTemplates/populationComponent.hbs',
    'text!templates/statistics/pluginTemplates/foodComponent.hbs',
    'text!json/filter/geoSelector_leafletStyle.json'
], function (SurveyTemplate, GeoTemplate, PopulationTemplate, FoodTemplate, GEO_OPTS) {

    'use strict';

    return {
        /**
         * Configuration for the filters of the catalog, what the need to display and the templates
         */

        "population-GIFT": {
            "id": "population-GIFT-id",
            "type": "population-GIFT",
            "label": {
                "EN": "Population",
                "DE": "Population",
                "ES": "Population",
                "FR": "Population"
            },
            "component": {
                "rendering": {
                    "placeholder": {
                        "EN": "Population",
                        "DE": "Population",
                        "ES": "Population",
                        "FR": "Population"
                    },
                    "htmlattributes": {
                        "className": "form-control"
                    }
                },
                ageRange: {
                    "sourceType": "period",
                    "defaultsource": {
                        YEARS: {from: 0, to: 70},
                        MONTHS: {from: 0, to: 840}
                    }
                }
            },
            "template": {
                "overallStructure": PopulationTemplate
            }
        },

        "geo-GIFT": {
            "id": "geo-GIFT-id",
            "type": "geo-GIFT",
            "label": {
                "EN": "Geographic",
                "DE": "Geographic",
                "ES": "Geographic",
                "FR": "Geographic"
            },

            "component": {
                "source": {

                    "uid": "RepresentationType"
                }
            },
            "template": {
                "overallStructure": GeoTemplate,
                "geo_opts": JSON.parse(GEO_OPTS)
            }
        },

        "survey-GIFT": {
            "id": "survey-GIFT-id",
            "type": "survey-GIFT",
            "label": {
                "EN": "Survey",
                "ES": "Survey",
                "DE": "Survey",
                "FR": "Survey"
            },
            "component": {
                years: {
                    "sourceType": "period",
                    "defaultsource": {"from": 1983, "to": 2015}
                }
                /*  "source": {
                 "uid": "GAUL_ReferenceArea",
                 "version": "1.0"
                 }*/
            },
            "template": {
                "overallStructure": SurveyTemplate
            }
        },

        "food-GIFT": {
            "id": "food-GIFT-id",
            "type": "food-GIFT",
            "label": {
                "EN": "Food",
                "ES": "Food",
                "DE": "Food",
                "FR": "Food"
            },
            "component": {
                "source": {
                    "uid": "GIFT_Foods"
                }
            },
            "template": {
                "overallStructure": FoodTemplate
            }
        }
    };
});


