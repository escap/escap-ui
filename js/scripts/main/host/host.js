define(['jquery', 'fx-tree-starter', 'jstree', 'sinon'], function ($, Starter) {

    //   var PLUGINS_CONF = PLUGINS_MAP;

    'use strict'
    // var urlHS = http://fenix.fao.org/d3s_fenix/msd/resources/HS/2012?full=true&dsd=true

    function Host() {
        var starter = new Starter();
        starter.init({
            "config": {
                "lang": "EN",
                "container": "#treeContainer"
            },
            data:
                [ {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Food Availability"
                    },
                    "code" : "FA",
                    "rid" : "64_84943"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Fertilizers"
                    },
                    "code" : "FER",
                    "rid" : "64_84948"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Fisheries"
                    },
                    "code" : "FIS",
                    "rid" : "64_84952"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Forestry"
                    },
                    "code" : "FOR",
                    "rid" : "64_84951"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Government Expenditure"
                    },
                    "code" : "GE",
                    "rid" : "64_84955"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Labor"
                    },
                    "code" : "L",
                    "rid" : "64_84947"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Land Use"
                    },
                    "code" : "LU",
                    "rid" : "64_84945"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Machinery"
                    },
                    "code" : "M",
                    "rid" : "64_84950"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Production"
                    },
                    "code" : "P",
                    "rid" : "64_84941"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Pesticides"
                    },
                    "code" : "PES",
                    "rid" : "64_84949"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Population"
                    },
                    "code" : "POP",
                    "rid" : "64_84946"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Prices"
                    },
                    "code" : "PR",
                    "rid" : "64_84944"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Trade"
                    },
                    "code" : "T",
                    "rid" : "64_84942"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Value Added"
                    },
                    "code" : "VA",
                    "rid" : "64_84954"
                }, {
                    "level" : 1,
                    "leaf" : true,
                    "title" : {
                        "EN" : "Water"
                    },
                    "code" : "W",
                    "rid" : "64_84953"
                } ],

            "services": {
                "lazyLoading": true,
                "uid": "GAUL",
                "version": "2014"
            }
        })
    };

    return Host;
})




