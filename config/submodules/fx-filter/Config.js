/* global define */
define(function () {

    'use strict';

    return {

        PLUGIN_FILTER_COMPONENT_DIRECTORY: "../../../submodules/fenix-ui-filter/",
        FILTER_CONFIG: {

            SURVEY:{
                YEARS:"#survey-timerange-container",
                ADD_CHARS_RADIO_NAME:"addCharsRadio"
            },

            POPULATION:{
                GENDERS_RADIO_NAME: "popGendersRadio",
                AGERANGE_TYPE_RADIO_NAME: "popGendersRadio",
                AGERANGE: "#population-ageRange",
                CHARACTERISTICS_RADIO_NAME:"popCharsRadio"
            },

            GEO:{},

            FOOD:{}
        }

    };
});
