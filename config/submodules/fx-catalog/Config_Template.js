/* global define */
define(function () {

    'use strict';

    return {

        PLUGIN_FILTER_COMPONENT_DIRECTORY: "../../../submodules/fenix-ui-filter/",
        FILTER_CONFIG: {

            SURVEY: {
                YEARS: "#survey-timerange-container",
                ADD_CHARS_RADIO_NAME: "addCharsRadio"
            },

            POPULATION: {
                GENDERS_RADIO_NAME: "popGendersRadio",
                AGERANGE_TYPE_RADIO_NAME: "popAgeRangeRadio",
                AGERANGE: "#population-ageRange",
                CHARACTERISTICS_RADIO_NAME: "popCharsRadio"
            },

            GEO: {
                MAP_ID: "map-container-donwload-microdata",
                SEARCH_INPUT_CLASS:"search",
                LIST_COUNTRIES_CLASS:"list-countries",
                ITEM_LIST_CLASS:"list-item",
                GEOJSON_LIST_GROUP_CLASS:"geojson-list-group",
                GEOJSON_LIST_ITEM_CLASS:"geojson-list-item",
                SELECTOR_LIST_FILTER_CLASS:"list-countries-container"
            },

            FOOD: {}
        },
        events: {
            MODIFY: "fx.filter.gift.population.changed"
        }

    };
});
