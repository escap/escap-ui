define(['jquery', 'underscore'], function ($, _) {

    'use strict'

    const D3S_CODELIST_URL = "http://fenix.fao.org/d3s_fenix/msd/codes/filter";

    var FAKE_CHILDREN = [{id:'*', title:'*'}];


    function D3SConnector(language, services) {
        this.o = {
            "lang": language,
            "services": services
        }

    }

    D3SConnector.prototype.takeOnlyFirstLevelData = function(successCallback) {
        var payload = {
            uid: this.o.services.uid,
            version: this.o.services.version,
            levels: 2,
            level:1
        }

        var self = this;
        $.ajax({
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function (data) {
           successCallback(data);
        });
    }

    D3SConnector.prototype.takeOnlyFirstLevelData2 = function() {

        var result;

        var payload = {
            uid: this.o.services.uid,
            version: this.o.services.version,
            levels: 2,
            level:1
        }

        var self = this;
        $.ajax({
            async:false,
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function(data){
            result = data;
        })
        return result;
    }


    D3SConnector.prototype.takeAllCodelist = function(successCallback) {

        var payload = {
            uid: this.o.services.uid,
            version: this.o.services.version
        };

        var self = this;
        $.ajax({
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function (data) {
            _.bind(successCallback(data), self);
        });
    }


    D3SConnector.prototype.expandBranchWithLazyLoading = function(codeId,depth, successCallback) {
        var payload = {
            uid: this.o.services.uid,
            version: this.o.services.version,
            codes: [codeId],
            levels: 2,
            level:depth-1
        }

        var self = this;
        $.ajax({
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function (data) {

            var dataParsed = self.parseData(data);
            debugger;

            _.bind(successCallback(codeId,dataParsed ), self);
        });
    }

    D3SConnector.prototype.expandBranchWithLazyLoading2 = function(codeId,depth) {


        debugger;
        var result;
        var payload = {
            uid: this.o.services.uid,
            version: this.o.services.version,
            codes: [codeId],
            levels: depth,
            level:depth
        }

        var self = this;
        $.ajax({
            async:false,
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function (data) {
            result  = data;
        });
        return result;
    }




    D3SConnector.prototype.parseData = function (D3SData) {

        var result = [];

        for (var i = 0, length = D3SData.length; i < length; i++) {
            var self = this;
            var tmp = {
                'id': D3SData[i].code,
                'text': D3SData[i].title[this.o.lang],
                'children': self.handleRecursive(D3SData[i])
            };
            result.push(tmp);
        }

        return result;

    }

    D3SConnector.prototype.handleRecursive = function (childObject) {

        if (this.isNodeALeaf(childObject.children)) {
            return true;
        } else {
            return this.parseData(childObject.children);
        }
    }

    D3SConnector.prototype.isNodeALeaf = function (arrayObject) {
        return typeof arrayObject === 'undefined' || arrayObject === null || arrayObject.length === 0
    }


    return D3SConnector;

})