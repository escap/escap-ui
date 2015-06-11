define(['jquery','fx-tree-starter', 'jstree', 'sinon'], function ($, Starter) {

    //   var PLUGINS_CONF = PLUGINS_MAP;

    'use strict'
    // var urlHS = http://fenix.fao.org/d3s_fenix/msd/resources/HS/2012?full=true&dsd=true

    function Host() {
        var starter = new Starter();
        starter.init({
            "config":{
                "lang":"EN",
                "container":{
                    "tree" : "#jstreeID"
                }
            },
            "data": [],
            "services":{
                "lazyLoading": true,
                "uid": "HS",
                "version":"1996"
            }
        })
    };

    return Host;
})




