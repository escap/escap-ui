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


            $('#sel').on('click', function() {
                var codes =
                console.log(codes);
                debugger;
            })

            if (this.o.isLazyLoaded) {
                this.startLazyLoading()
            } else {
                this.startCompleteLoading(config)
            }
        }


        TreeController.prototype.startLazyLoading = function () {
            var lazyOpts = {
                container: this.$treeContainer,
                searchForm: this.$searchForm,
                callbackFirstCall: dataConnector.getFirstLevelData,
                callbackGetChildren: dataConnector.getChildrenData,
                callbackSearch: dataConnector.getNodesBySearch
            }
            adapter.startTreeWithCallback(lazyOpts)
        }


        TreeController.prototype.startCompleteLoading = function (config) {
            var options = {
                container: this.$treeContainer,
                searchForm: this.$searchForm
            };
            if (config.data && config.data.length > 0) {
                options['data'] = dataConnector.parseAllData(config.data)
                adapter.startTreeWithDataLoaded(options)
            } else {
                options['callbackCodelist'] = dataConnector.takeAllCodelist
                adapter.startTreeWholeCodelist(options)
            }
        };


        TreeController.prototype.initializeVariables = function (config) {
            adapter = new Adapter();
            dataConnector = new DataConnector();
            this.$treeContainer = $('<div class="jstree-holder"></div>');
            this.$searchForm = $('<form id="s"><input type="search" id="q" class="form-control" /></form>');

            this.$container = $(config.config.container);
            this.$container.append(this.$searchForm);
            this.$container.append(this.$treeContainer);
            var isLazy = self._isLazyLoading(config);

            this.o = {
                container: $(config.config.container),
                isLazyLoaded: isLazy,
                language: "EN"
            }

            debugger;
            dataConnector.initialize(this.o.language, config.services);
        };


        TreeController.prototype._isLazyLoading = function (config) {
            debugger;
            var result =
                (!config.data || config.data === null || config.data.length === 0) &&
                (typeof config.services.lazyLoading === 'undefined' ||
                config.services.lazyLoading === null ||
                config.services.lazyLoading === true);
            return result;
        }


        TreeController.prototype.isAFakeChildren = function (node) {
            return typeof node.children !== 'undefined' &&
                node.children !== null &&
                node.children[0] === '*';
        }


        TreeController.prototype.getSelectedItems = function(onlyCodes){

            for(var i=0;length = on)
            return adapter.getSelectedNodes();
        }


        return TreeController;
    });