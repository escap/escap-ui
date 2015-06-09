// Place third party dependencies in the lib folder
requirejs.config({
    "baseUrl":              "js/scripts/libs",
    "paths": {
        jquery              :  "jquery",
        jstree              :  "//fenixapps.fao.org/repository/js/jstree/3.0.8/dist/jstree.min",
        start               :  "../main/start/start",
        data                :  "../main/data/fenixCODELIST/data_big",
        "fx-tree-starter"   :  "../main/treeFilter/Starter",
        "fx-tree-adapter"   :  "../main/treeFilter/viewAdapter/JSTreeAdapter",
        "fx-tree-dataConn"  :  "../main/treeFilter/dataConnector/D3SConnector",
        "fx-tree-controller":  "../main/treeFilter/controller/TreeController"
    },
    "shim": {
        "bootstrap": {
            deps: ["jquery"]
        },
        "jstree" : {
            deps:["jquery"]
        }
    }
});


require(["../../IndexContext", "domReady!", "bootstrap"], function(IndexContext) {
    console.log("index.js() - require() on domReady!");

   var indexContext = new IndexContext;
    indexContext.init();

});







