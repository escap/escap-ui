define(['jquery', 'fx-tree-controller'], function($, Controller) {

    'use strict'

    var controller;

    function Starter(){

    }

    Starter.prototype.init = function(config) {

        //TODO validation
        if(true) {
            this.o = $.extend(true,{}, config);
            controller = new Controller;
            controller.init(config);
        }

    }


    Starter.prototype.getSelectedCodes = function() {

    }

    Starter.prototype.getSelectedLabels = function() {

    }

    Starter.prototype.destroy = function() {

    }

    return Starter;
})