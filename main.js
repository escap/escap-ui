/*global require*/

require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-common/js/paths',
    './submodules/fenix-ui-menu/js/paths',
    './submodules/fenix-ui-filter/src/js/paths',
    './submodules/fenix-ui-analysis/js/paths',
    './submodules/fenix-ui-catalog/js/paths'

], function (Compiler, Common, Menu, Filter, Analysis, Catalog) {

    'use strict';
    console.log(Filter);

    var submodules_path = '../../submodules/';

    var commonConfig = Common;
    commonConfig.baseUrl = submodules_path + 'fenix-ui-common/js';

    var menuConfig = Menu;
    menuConfig.baseUrl = submodules_path + 'fenix-ui-menu/js';

    var filterConfig = Filter;
    filterConfig.baseUrl = submodules_path + 'fenix-ui-filter/';

    var analysisConfig = Analysis;
    analysisConfig.baseUrl = submodules_path +'fenix-ui-analysis/js/';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = submodules_path +'fenix-ui-catalog/js/';



    Compiler.resolve([commonConfig, menuConfig, filterConfig, analysisConfig,catalogConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixrepo.fao.org/cdn"},

            config: {

                //Set the config for the i18n
                i18n: {
                    locale: 'en'
                },

                // The path where your JavaScripts are located
                baseUrl: './src/js',

                // Specify the paths of vendor libraries
                paths: {
                    bootstrap: "{FENIX_CDN}/js/bootstrap/3.3.4/js/bootstrap.min",
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",
                    domReady: "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    text: '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',
                    leaflet:          "{FENIX_CDN}/js/leaflet/0.7.3/leaflet",
                    test_geo_json :"../../tests/resources/geo_json",
                    list_filter: "lib/list.min",
/*
                    leaflet_encoded:  "{FENIX_CDN}/js/leaflet/plugins/leaflet.encoded/0.0.5/Polyline.encoded",
*/
/*
                    geojson_decoder:  "{FENIX_CDN}/js/leaflet/plugins/geojson_decode",
*/
/*
                    geojson_selector: "{FENIX_CDN}/js/leaflet/plugins/leaflet-geojson-selector/0.2.0/dist/leaflet-geojson-selector.min",
*/
                    geojson_selector : "lib/provaSelector",

                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',

                    nls: "../../i18n",
                    config: "../../config",
                    json: "../../json",

                    'fx-common/config/auth_users' : '../../config/auth_users.json'
                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    bootstrap: {
                        deps: ["jquery"]
                    },
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    'geojson_selector': ['leaflet']

                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'application',
        'routes',
        'config/Config',
        'domReady!'
    ], function (Application, routes, C) {

        var app = new Application({
            routes: routes,
            controllerSuffix: C.CHAPLINJS_CONTROLLER_SUFFIX,
            root: C.CHAPLINJS_PROJECT_ROOT,
            pushState: C.CHAPLINJS_PUSH_STATE,
            scrollTo: C.CHAPLINJS_SCROLL_TO
        });
    });
});