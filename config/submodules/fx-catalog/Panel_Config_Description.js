/* global define */

define([
    'text!templates/filter/surveyComponent.hbs',
    'text!templates/filter/geoComponent.hbs',
    'text!templates/filter/populationComponent.hbs',
    'text!templates/filter/foodComponent.hbs',
    'text!json/filter/geoSelector_leafletStyle.json'
], function ( SurveyTemplate, GeoTemplate, PopulationTemplate, FoodTemplate,GEOJSONStyle) {

    'use strict';

    return {

        "population-GIFT": {
            "id": "population-GIFT",
            "type": "text",
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
                        geoTree: {from: 0, to: 70}
                    }
                },
                "template": {
                    "overallStructure": SurveyTemplate,
                }
            }
        },

        "geo-GIFT": {
            "id": "geo-GIFT",
            "type": "enumeration",
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
            }
        },

        "survey-GIFT": {
            "id": "survey-GIFT",
            "type": "codes",
            "label": {
                "EN": "Survey",
                "ES": "Survey",
                "DE": "Survey",
                "FR": "Survey"
            },
            "component": {
                "source": {
                    "uid": "GAUL_ReferenceArea",
                    "version": "1.0"
                }
            }
        }
    };
});


