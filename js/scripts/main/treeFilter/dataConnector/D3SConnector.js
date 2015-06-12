define(['jquery', 'underscore'], function ($, _) {

    'use strict'

    const D3S_CODELIST_URL = "http://fenix.fao.org/d3s_fenix/msd/codes/filter";

    var self;


    function D3SConnector() {
        this.o = {}
        self = this;
    }


    D3SConnector.prototype.initialize = function (language, services) {
        this.o.language = language;
        this.o.uid = services.uid;
        this.o.version = services.version;
    }

    D3SConnector.prototype.getFirstLevelData = function (cbJSTree) {

        var payload = {
            uid: self.o.uid,
            version: self.o.version,
            levels: 1,
            level: 1
        }

        $.ajax({
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).success(function (data) {
            if (data) {
                var dataParsed = self.parseDataOnLoading(data);
                cbJSTree(dataParsed);
            } else {
                alert('Fx_ui_tree error: no data available')
                throw new Error('pleas, change uid and version of the codelist')
            }
        }).error(function () {
            alert("Fx_ui_tree error: impossible to load codelist");
        });
    };


    D3SConnector.prototype.getChildrenData = function (node, cbJSTree) {
        var payload = {
            uid: self.o.uid,
            version: self.o.version,
            levels: 2,
            level: node.parents.length,
            codes: [node.id]
        }

        $.ajax({
            url: D3S_CODELIST_URL,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).success(function (data) {
            if (data) {
                cbJSTree(self.parseDataOnLoading(data[0].children || []));
            } else {
                cbJSTree([]);
            }
        }).error(function () {
            alert("Fx_ui_tree error error: impossible to load codelist");
        });
    }


    D3SConnector.prototype.takeAllCodelist = function (cbJSTree) {

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
        }).success(function (data) {
            if (data) {
                cbJSTree(self.parseAllData(data || []));
            } else {
                cbJSTree([]);
            }
        }).error(function () {
            alert("Fx_ui_tree error error: impossible to load codelist");
        });
    }


    D3SConnector.prototype.parseAllData = function (D3SData) {

        var result = [];

        for (var i = 0, length = D3SData.length; i < length; i++) {
            var self = this;
            var tmp = {
                'id': D3SData[i].code,
                'text': D3SData[i].title[this.o.language],
                'children': self.handleRecursive(D3SData[i])
            };
            result.push(tmp);
        }
        return result;
    }

    D3SConnector.prototype.handleRecursive = function (childObject) {

        if (this.isNodeALeaf(childObject.children)) {
            return [];
        } else {
            return this.parseData(childObject.children);
        }
    }

    D3SConnector.prototype.isNodeALeaf = function (arrayObject) {
        return typeof arrayObject === 'undefined' || arrayObject === null || arrayObject.length === 0
    }


    D3SConnector.prototype.parseDataOnLoading = function (data) {
        var r = [];
        for (var i = 0, length = data.length; i < length; i++) {
            r.push({"text": data[i].title.EN, "id": data[i].code, "children": true});
        }
        return r;

    }

    return D3SConnector;

})