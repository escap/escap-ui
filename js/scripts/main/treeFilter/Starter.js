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

   /* Starter.prototype.initController= function(data, context) {
        console.log(this.o)
        context.o.data = data
        controller.init(context.o);
    }*/


    Starter.prototype.getSelectedCodes = function() {

    }

    Starter.prototype.getSelectedLabels = function() {

    }

    Starter.prototype.destroy = function() {

    }

    Starter.prototype.getCodelistData = function() {



        var payload = {uid: "HS", version: "1996", "code":"0210"}

        var ulrProa = "http://fenix.fao.org/d3s_fenix/msd/codes/filter"
        var self = this;
        $.ajax({
            url: ulrProa,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function (data) {
            debugger;
           self.initController(data, self);
        });
    }

    return Starter;
})