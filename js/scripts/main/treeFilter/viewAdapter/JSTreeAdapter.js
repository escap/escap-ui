define(['jquery', 'jstree'], function ($) {

    'use strict'

    var self;

    function JSTreeAdapter(container) {
        self = this;
        this.o = {}
        this.o.container = container;
    }

    JSTreeAdapter.prototype.initTree = function (data, callback) {

        this.o.container.jstree({
            plugins : ["wholerow", "checkbox", "massload"],
            core:{
                "check_callback": true,
                 worker:false,
                'data':data
            },
            checkbox : {
                two_state : true,
                keep_selected_style : false
            }
        })

    }


    JSTreeAdapter.prototype.initTreeCallback = function (callback) {

        this.o.container.jstree({
            plugins : ["wholerow", "checkbox"],
            core:{
                check_callback: true,
                worker:false,
                'data': function(node, cb){

                    callback(node, cb);
                }
            },


            checkbox : {
                two_state : true,
                keep_selected_style : false
            }
        })

    }


    JSTreeAdapter.prototype.expandNode = function(parentID, arrayVertexWithChildrenData) {

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