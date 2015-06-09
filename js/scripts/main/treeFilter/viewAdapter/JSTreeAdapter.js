define(['jquery', 'jstree'], function ($) {

    'use strict'

    function JSTreeAdapter(container) {
        this.o = {}
        this.o.container = $(container);
    }

    JSTreeAdapter.prototype.initTree = function (data) {

        console.log(data);

        this.o.container.jstree({
            "plugins" : ["wholerow", "checkbox"],
            'core':{
                'data':data
            },
            "checkbox" : {
            "two_state" : true,
                "keep_selected_style" : false
            }
        })


    }

    return JSTreeAdapter;

})