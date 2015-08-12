/* global define */

define(function () {

    'use strict';

    return {
        "panels": [
            {
                "title": {
                    "EN": "GEOGRAPHIC"
                },
                "popover": {
                    "data-container": "body",
                    "data-toggle": "popover",
                    "data-placement": "left",
                    "data-content": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
                    "data-trigger": "hover"

                },
                "modules": [
                    {
                        "module": "geo-GIFT",
                        "label": {
                            "EN": "Geo Selector"
                        },
                        "icon": "fa fa-database fa-lg fa-fw"
                    },
                ]
            },
            {
                "title": {
                    "EN": "SURVEY"
                },
                "popover": {
                    "data-container": "body",
                    "data-toggle": "popover",
                    "data-placement": "left",
                    "data-content": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
                    "data-trigger": "hover"

                },
                "modules": [
                    {
                        "module": "survey-GIFT",
                        "label": {
                            "EN": "Survey Selector"
                        },
                        "icon": "fa fa-database fa-lg fa-fw"
                    }

                ]
            },
            {
                "title": {
                    "EN": "POPULATION"
                },
                "popover": {
                    "data-container": "body",
                    "data-toggle": "popover",
                    "data-placement": "left",
                    "data-content": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
                    "data-trigger": "hover"

                },
                "modules": [
                    {
                        "module": "population-GIFT",
                        "label": {
                            "EN": "Population Selector"
                        },
                        "icon": "fa fa-globe fa-lg fa-fw"
                    }
                ]
            }
        ]
    };

});


