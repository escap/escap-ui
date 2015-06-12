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
                callbackGetChildren: dataConnector.getChildrenData
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
                options['callBackCodelist'] = dataConnector.takeAllCodelist
                adapter.startTreeWithCallback(options)
            }
        };


        TreeController.prototype.bindEvents = function () {

            this.o.container.on("before_open.jstree", function (event, node) {
                if (self.isAFakeChildren(node.node)) {
                    dataConnector.expandBranchWithLazyLoading(node.node.id, node.node.parents.length + 1, adapter.expandNode);
                }
            });

        }


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

            dataConnector.initialize(this.o.language, config.services);
        };


        TreeController.prototype._isLazyLoading = function (config) {
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


        return TreeController;

    });