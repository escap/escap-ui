define(["jquery",
        "fx-tree-adapter",
        "fx-tree-dataConn",
        'underscore',
        'promises'],
    function ($, Adapter, DataConnector, _) {

    'use strict'

    var adapter, dataConnector, self;

    function TreeController() {
        self = this;
        this.o = {}
    }

    TreeController.prototype.init = function (config) {

        this.initializeVariables(config);

        this.chooseAndStartLoading();

    }

    TreeController.prototype.chooseAndStartLoading = function () {
        if (this.o.isLazyLoaded) {

            adapter.initTreeCallback(this.tryLazyLoading)
/*
            dataConnector.takeOnlyFirstLevelData(self.startTree)
            this.bindEvents();*/

        } else {
            dataConnector.takeAllCodelist(this.startTree);
        }
    }

    TreeController.prototype.bindEvents = function () {

        this.o.container.on("before_open.jstree", function (event, node) {
            if (self.isAFakeChildren(node.node)) {
                debugger;
                dataConnector.expandBranchWithLazyLoading(node.node.id, node.node.parents.length + 1, adapter.expandNode);
            }
        });

    }

    TreeController.prototype.initializeVariables = function (config) {
        var isLazy = self._isLazyLoading(config.services);
        this.o = {
            container: $(config.config.container.tree),
            isLazyLoaded: isLazy
        }

        adapter = new Adapter(this.o.container);
        dataConnector = new DataConnector(config.config.lang, config.services);
    }

    TreeController.prototype.startTree = function (d3sData) {
        adapter.initTree(dataConnector.parseData(d3sData), dataConnector.expandBranchWithLazyLoading);
    }

    TreeController.prototype._isLazyLoading = function (services) {
        var result =
            typeof services.lazyLoading === 'undefined' ||
            services.lazyLoading === null ||
            services.lazyLoading === true;
        return result;
    }


   TreeController.prototype.tryLazyLoading = function(node, cb) {

       console.log()
       if(node.id === '#') {
           var a  =  dataConnector.takeOnlyFirstLevelData2();
           var ser =  self.parseAndGiveData(a);
          return cb(ser);
       }

       else if(node.children.length === 0){

           debugger;
           var a = dataConnector.expandBranchWithLazyLoading2(node.id, node.parents.length);
           var ser =  self.parseAndGiveData(a);
           return cb(ser)

       }

/*
      return dataConnector.takeOnlyFirstLevelData2().then(function(res){return self.parseAndGiveData(res)})
*/
/*
       return  dataConnector.takeOnlyFirstLevelData2(self.parseAndGiveData).then(function(res){return res});
*/

    }

        TreeController.prototype.parseAndGiveData = function(d3Sdata) {
            return dataConnector.parseData(d3Sdata);
        }


    TreeController.prototype.isAFakeChildren = function (node) {
       return typeof node.children !== 'undefined' &&
            node.children !== null &&
            node.children[0] === '*';
    }

    return TreeController;

})