define(["jquery","fx-tree-adapter", "fx-tree-dataConn"], function($,Adapter, DataConnector) {

    'use strict'

    var adapter, dataConnector;

    function TreeController(){
        this.o ={}
    }

    TreeController.prototype.init = function(config) {

        this.initializeVariables(config);

        this.chooseAndStartLoading();

    }

    TreeController.prototype.chooseAndStartLoading = function() {
        if (this.o.isLazyLoaded) {
            dataConnector.takeOnlyFirstLevelData(this.startTree)
        } else {
            dataConnector.takeAllCodelist(this.startTree);
            this.bindEvents();
        }
    }

    TreeController.prototype.bindEvents = function() {

        this.o.container.on("before_open.jstree", function(event, node){
            debugger;
            var childrenData = dataConnector.getNodesFromId(node.node.id);
            adapter.expandNode (node.node.id, childrenData)
        });

    }

    TreeController.prototype.initializeVariables = function(config) {
        this.o = {
            container : $(config.config.container.tree),
            isLazyLoaded : config.services.lazyLoading
        }

        adapter = new Adapter(this.o.container);
        dataConnector = new DataConnector(config.config.lang, config.services);
    }

    TreeController.prototype.startTree = function(d3sData) {
        adapter.initTree(dataConnector.parseData(d3sData));
    }

    return TreeController;

})