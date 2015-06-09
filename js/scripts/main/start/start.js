define(['jquery', 'data','fx-tree-starter', 'jstree', 'sinon'], function ($, DATA, Starter) {

    //   var PLUGINS_CONF = PLUGINS_MAP;

    'use strict'
    // var urlHS = http://fenix.fao.org/d3s_fenix/msd/resources/HS/2012?full=true&dsd=true

    function Start() {
        var starter = new Starter();
        starter.init({
            "config":{
                "lang":"EN",
                "container":{
                    "tree" : "#jstreeID"
                }
            },
            "data":DATA,
            "services":{}
        })
    }

    Start.prototype.init = function () {



        $('#jstreeID').jstree({
            "plugins" : ["wholerow", "checkbox"],
            'core':{
                'data':DATA.data
            },
            "checkbox" : {
                "two_state" : true,
                "keep_selected_style" : false
            }
        })/*.on('before_open.jstree', function(e, node){
            console.log(e);
            console.log(node);
        });*/

/*
        $('#tree').jstree({
            'core': {
                'data': {
                    'url': function (node) {
                        return node.id === '#' ?
                            'ajax_roots.json' :
                            'ajax_children.json';
                    },
                    'data': function (node) {
                        return {'id': node.id};
                    }
                }
            }
        });


        var server = sinon.fakeServer.create();


        var server;

        server = sinon.fakeServer.create();

        var success = sinon.spy(),
            error = sinon.spy();

        getTodos(42, success);
        var ppop = success.args;
        console.log(ppop)


        server.requests[0].respond(
            200,
            {"Content-Type": "application/json"},
            JSON.stringify([{id: 1, text: "Provide examples", done: true}])
        );
        console.log(success.args);
        debugger;

        // This is part of the FakeXMLHttpRequest API


        function getTodos(listId, callback) {

            var object;
            $.ajax({
                url: "/todo/" + listId + "/items",
                success: function (data) {

                    callback(data, null);
                    object = success.args;
                },
                error: error
            });

            return object
        }*/
    }


    Start.prototype.makeRequest = function (listId, callback) {

        var result;
        $.ajax({
            url: "/todo/" + listId + "/items",
            success: function (data) {
                // Node-style CPS: callback(err, data)
                callback(null, data);
                result = data;
                console.log(data);

            }
        });
        console.log(result);
        return result;
    }


    Start.prototype.adapteObjectTo


    return Start;
})




