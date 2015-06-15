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
            data:[],

            "services": {
                "uid": "GAUL",
                "version": "2014"
            }
        })
    };

    return Host;
})




