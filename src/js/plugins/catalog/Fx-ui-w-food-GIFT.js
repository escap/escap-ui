/* global define, amplify, alert*/

define([
    "jquery",
    "fx-cat-br/config/config",
    "fx-cat-br/config/config-default",
    "fx-cat-br/config/events",
    'config/submodules/fx-catalog/Config_Template',
    "q",
    "jstree",
    "amplify",
], function ($, C, DC, E, CT, Q) {

    'use strict';

    var o = {
        lang: 'EN',
        //For filter logic .... start
        componentType: '',
        componentid: '',
        name: '',
        title: '',
        grid: '',
        source: '',
        adapter: null,

        events: {
            REMOVE_MODULE: "fx.filter.module.remove",
            READY: "fx.filter.component.ready",
            DESELECT: 'fx.filter.module.deselect.'
        }
    };


    function Fx_ui_w_foodComponent(optionsDefault) {
        if (this.options === undefined) {
            this.options = {};
        }

        $.extend(true, this.options, o, optionsDefault);
    }

    Fx_ui_w_foodComponent.prototype.validate = function (e) {

        return true;
    };

    Fx_ui_w_foodComponent.prototype.processData = function (data ,isChildren) {

        var r = [];
        data.sort(function(a,b){
            return (a.title.EN).toString().localeCompare( (b.title.EN).toString())
        })
        for (var i = 0, length = data.length; i < length; i++) {
            r.push({"text": data[i].title.EN, "id": data[i].code, "children": true});
        }
        return r;
    };


    Fx_ui_w_foodComponent.prototype.render = function (e, container) {

        var self = this;

        self.options.container = container;
        self.options.module = e;

        $.extend(self.options.events, e.events); // extend events passed from the host

        this._initialize(e);

        this.$treeContainer.jstree({
            'core': {
                worker: false,
                'data': function (node, cb) {
                    if (node.id === "#") {
                        self.getFirstCall( cb);
                    }
                    else {
                        self.getChildren( node, cb)
                    }
                },
                "multiple": true,
                "animation": 0,
                "themes": {"stripes": true}
            },
            /* themes: {
             icons: false
             },*/
            "plugins": ["checkbox", "wholerow"/*, "search"*/],
          /*  "search": {
                show_only_matches: true,
                ajax: function(searchParameter,cb){
                    self._searchOnLazyLoading(searchParameter, cb)
                }
            }*/
        });

        var to = false;
        this.$searchForm.find('#q').keyup(function () {
            if (to) {
                clearTimeout(to);
            }
            to = setTimeout(function () {
                var v = self.$searchForm.find('#q').val();
                self.$treeContainer.jstree(true).search(v);
            }, 250);
        });


        this.bindEventListeners();

        if ((e.adapter != null) && (typeof e.adapter != "undefined")) {
            self.options.adapter = e.adapter;
        }

        self.options.name = e.name;
        self.options.componentid = $(container).attr("id");
        //Raise an event to show that the component has been rendered
        $(container).trigger(self.options.events.READY, {name: e.name});

    };


    Fx_ui_w_foodComponent.prototype._initialize = function (e) {
        this.$componentStructure = e.template.overallStructure;
        this.$foodConfiguration = CT.FILTER_CONFIG.FOOD


        this.$treeContainer = $('<div class="jstree-holder"></div>');
        this.$searchForm = $('<form id="s"><input type="search" id="q" class="form-control" /></form>');

        this.$container = $(this.options.container);
/*
        this.$container.append(this.$searchForm);
*/
        this.$container.append(this.$treeContainer);
    };

    Fx_ui_w_foodComponent.prototype.getFirstCall = function ( cb) {

        var self = this;
        var payload = {};
            payload = {
                uid: self.options.module.component.source.uid,
                level: 2,
                levels: 1
            };

        if (self.options.module.component.source.version) {
            payload.version = self.options.module.component.source.version;
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: (C.SERVICE_BASE_ADDRESS || DC.SERVICE_BASE_ADDRESS) + "/codes/filter",
            data: JSON.stringify(payload),
            dataType: "json",
            success: function (data) {
                if (data) {
                    cb(self.processData(data, true));
                }
            },
            error: function () {
                alert("Fx_ui_w_foodComponent error: impossible to load codelist");
            }
        });
    };

    Fx_ui_w_foodComponent.prototype.getChildren = function ( node, cb) {

        var self = this;
        var payload = {};
        payload = {
            uid: self.options.module.component.source.uid,
            level: node.parents.length+1,
            levels: 2,
            codes: [node.id]
        };

        if (self.options.module.component.source.version) {
            payload.version = self.options.module.component.source.version;
        }

        console.log('getChildren!')

        $.ajax({
            url: (C.SERVICE_BASE_ADDRESS || DC.SERVICE_BASE_ADDRESS) + "/codes/filter",
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(payload)
        }).success(function (data) {
            if (data) {
                cb(self.processData(data[0].children || []));
            } else {
                cb([]);
            }
        }).error(function () {
            alert("Fx_ui_tree error error: impossible to load codelist");
        });
    };

    Fx_ui_w_foodComponent.prototype._searchOnLazyLoading = function(searchString, cbSearch) {

        var arrayRes  =['122','1622'];
        cbSearch(arrayRes);
    };


    Fx_ui_w_foodComponent.prototype.bindEventListeners = function () {

        var self = this;


 /*       this.$treeContainer.on("changed.jstree", function (e, data) {

            var i, j, r = [];
            for (i = 0, j = data.selected.length; i < j; i++) {
                r.push({
                    label: data.instance.get_node(data.selected[i]).text,
                    value: data.instance.get_node(data.selected[i])
                });*/
/*
            }
*/
            /*
             amplify.publish(E.MODULE_READY,
             {
             value: r,
             id: self.options.module.name,
             label :  self.options.module.title.EN
             });*/


/*
        });
*/

        this.$searchForm.find('.sel_all').on('click', function () {
            self.$treeContainer.jstree(true).select_all();
        });

        this.$searchForm.find('.desel_all').on('click', function () {
            self.$treeContainer.jstree(true).deselect_all();
        });


        amplify.subscribe(E.MODULE_DESELECT + '.' + self.options.module.name, function (e) {
            self.deselectValue(e);
        });

    };

    Fx_ui_w_foodComponent.prototype.deselectValue = function (obj) {

        this.$treeContainer.jstree('deselect_node', [obj.value]);
        this.$treeContainer.jstree(true).deselect_node([obj.value]);
    };

    //For filter logic .... start
    Fx_ui_w_foodComponent.prototype.getName = function () {
        return this.options.name;
    };

    Fx_ui_w_foodComponent.prototype.getAdapter = function () {
        return this.options.adapter;
    };
    //For filter logic .... end

    Fx_ui_w_foodComponent.prototype.getValue = function (e) {

        var codes = $("#" + e.id).find('.jstree-holder').jstree(true).get_selected(),
            uid = e.module.component.source.uid,
            version = e.module.component.source.version;

        if (codes.length <= 0) {
            return null;
        }

        return {
            codes: codes
        };

        /*return {
            codes: [
                {
                    uid: uid,
                    version: version,
                    codes: codes
                }
            ]
        };*/
    };

    return Fx_ui_w_foodComponent;
});
