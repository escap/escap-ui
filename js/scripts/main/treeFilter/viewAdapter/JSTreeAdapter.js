define(['jquery', 'jstree'], function ($) {

    'use strict'

    var self;

    function JSTreeAdapter(container, searchForm) {
        self = this;
        this.o = {}
    }


    JSTreeAdapter.prototype.startTreeWithCallback = function (options) {

        this.o.container = options.container;
        this.o.searchForm = options.searchForm;

        var callbackGetFirstLevel = options.callbackFirstCall;
        var callbackGetChildrenLevels = options.callbackGetChildren;

        var self = this;

        this.o.container.jstree({
            'core': {
                worker: false,

                'data': function (node, cb) {
                    debugger;
                    if (node.id === "#") {
                        callbackGetFirstLevel(cb);
                    }
                    else {
                        callbackGetChildrenLevels(node, cb);
                    }
                },
                "multiple": true,
                "animation": 0,
                "themes": {"stripes": true}
            },
            "plugins": ["checkbox", "wholerow", "search"],
            "search": {
                show_only_matches: true
            }
        });


        var to = false;
        this.o.searchForm.find('#q').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                var v = self.o.searchForm.find('#q').val();
                self.o.container.jstree(true).search(v);
            }, 250);
        });

        this.o.container.on("changed.jstree", function (e, data) {

            var i, j, r = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push({
                    label: data.instance.get_node(data.selected[i]).text,
                    value: data.instance.get_node(data.selected[i])
                });
            }

            /* amplify.publish(E.MODULE_READY,
             {
             value: r,
             id: o.module.id,
             label :  o.module.label.EN
             });*/


        });
    }


    JSTreeAdapter.prototype.startTreeWithDataLoaded = function (options) {

        this.o.container = options.container;
        this.o.searchForm = options.searchForm;

        this.o.container.jstree({
            'core': {
                worker: false,
                'data': options.data,
                "multiple": true,
                "animation": 0,
                "themes": {"stripes": true}
            },
            "plugins": ["checkbox", "wholerow", "search"],
            "search": {
                show_only_matches: true
            }
        });


        var to = false;
        this.o.searchForm.find('#q').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                var v = self.o.searchForm.find('#q').val();
                self.o.container.jstree(true).search(v);
            }, 250);
        });
    }

    JSTreeAdapter.prototype.initTree = function (data, callback) {

        this.o.container.jstree({
            plugins: ["wholerow", "checkbox", "massload"],
            core: {
                "multiple": true,
                worker: false,
                'data': data
            }

        })

    }


    JSTreeAdapter.prototype.initTreeCallback = function (callback) {

        this.o.container.jstree({
            plugins: ["wholerow", "checkbox"],
            core: {
                worker: false,
                'data': function (node, cb) {

                    callback(node, cb);
                }
            }


        })

    }


    JSTreeAdapter.prototype.expandNode = function (parentID, arrayVertexWithChildrenData) {

        debugger;

        self.o.container.jstree('draw_children', arrayVertexWithChildrenData[0]);

        /*
         var position = 'inside';
         var parent = self.o.container.jstree('get_selected', parentID);
         var newNode = { state: "open", 'data': {id:'787hh', text:'pp'} };
         self.o.container.jstree("create_node", parent, position, newNode, false, false);*/
        /*
         self.o.container.jstree('draw_children', arrayVertexWithChildrenData[0]);
         */
    }


    return JSTreeAdapter;

})