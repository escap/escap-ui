if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function () {

    'use strict';

    var selectorPath = "config/submodules/fx-table/config/renderers/";

    return {

        type: "olap",

        lang : 'EN',

        pluginRegistry: {
            'olap': {
                path: selectorPath + 'sigmagrid'
            },
            'grid' : {
                path: selectorPath + 'bootstrap-table'
            }
        }
    }

});
