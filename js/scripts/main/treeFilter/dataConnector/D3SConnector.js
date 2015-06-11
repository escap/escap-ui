define(['jquery', 'underscore'], function ($) {

    'use strict'

    const D3S_CODELIST_URL = "http://fenix.fao.org/d3s_fenix/msd/codes/filter";

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
            levels: 1,
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
            _.bind(successCallback(data), self);
        });
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


    D3SConnector.prototype.expandBranchWithLazyLoading = function(codeId, successCallback) {
        var payload = {uid: "HS", version: "1996", "code":"0210"}

        var self = this;
        $.ajax({
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).done(function (data) {
           successCallback(data, self);
/*
            self.initController(data, self);
*/
        });
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
            return false;
        } else {
            return this.parseData(childObject.children);
        }
    }

    D3SConnector.prototype.isNodeALeaf = function (arrayObject) {
        return typeof arrayObject === 'undefined' || arrayObject === null || arrayObject.length === 0
    }

    D3SConnector.prototype.getNodesFromId = function (idNode) {

        var exampleUrl = './js/scripts/main/data/fenixCODELIST/'+idNode+'.json';

        var result;
        $.ajax({
            async: false,
            url: exampleUrl,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json'
        }).done(function (data) {
            result =  data.children;
        });

        return result;
    }

    return D3SConnector;

})