define(['jquery', 'jstree'], function ($) {

    'use strict'

    function JSTreeAdapter(container) {
        this.o = {}
        this.o.container = container;
    }

    JSTreeAdapter.prototype.initTree = function (data) {

        console.log(data)

        this.o.container.jstree({
            "plugins" : ["wholerow", "checkbox"],
            'core':{
                "check_callback": true,
                'data':data
            },
            "checkbox" : {
            "two_state" : true,
                "keep_selected_style" : false
            }
        })

    }

    JSTreeAdapter.prototype.expandNode = function(parentID, childrenData) {


        debugger;
    }

    return JSTreeAdapter;

})