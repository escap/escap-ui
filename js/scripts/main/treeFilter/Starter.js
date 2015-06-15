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
            controller.init(this.o);
        }

    }


    Starter.prototype.getSelectedCodes = function() {
        return controller.getSelectedItems(true);
    };

    Starter.prototype.getSelectedLabels = function() {
        return controller.getSelectedItems(false);
    }

    Starter.prototype.destroy = function() {

    }


    return Starter;
})