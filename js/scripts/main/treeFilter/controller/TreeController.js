define(["fx-tree-adapter", "fx-tree-dataConn"], function(Adapter, DataConnector) {

    'use strict'

    var adapter, dataConnector;

    function TreeController(){
        this.o ={}
    }

    TreeController.prototype.init=function(config) {
        
        dataConnector = new DataConnector(config.config.lang);

        adapter = new Adapter(config.config.container.tree);

        var dataModel = dataConnector.parseData(config.data.data, config.config.lang)

        // pass id of the tree
        adapter.initTree(dataModel);

    }

    return TreeController;

})