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
              console.log(filter.getValues());
            });

            var FILTER_CONTAINER= 'filterContainer';


            var filter = new Filter();
            filter.init({
                container: FILTER_CONTAINER,
                plugin_prefix: '../../../submodules/fenix-ui-filter/',
                layout: 'fluidGrid'
                //  plugin_subdir: 'FENIX-plugin'
            });

            var modules =[
                {
                    "containerType":"fluidGridBaseContainer",
                    "title":"List Test Timelist",
                    "components":[
                        {
                            "componentType":"timeList-FENIX",
                            "lang":"EN",
                            "title":{"EN": "Time List For Fenix",
                                "ES": "Time List For Fenix",
                                "DE": "Time List For Fenix",
                                "FR": "Time List For Fenix"},
                            "name":"timeListForFenix",
                            "component": {
                                "source": {
                                    "uid": "GAUL_ReferenceArea",
                                    "version": "1.0"
                                },
                                "sourceType": "timeList",
                                "defaultsource":[1986, 2015, 1997, 2000, 2002, 2003, 2005, 2007, 2010]
                            }
                        }
                    ]
                },
                {
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
                }
            ];


            filter.add(modules);
        }

    });

    return MicrodataView;
});

