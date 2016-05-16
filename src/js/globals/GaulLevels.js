/*global define*/
define(['jquery','underscore',
    'config/Config',
    'fx-cat-br/config/config-default',
    ], function($,_, C, DC) {

    'use strict';

    return {
        getFirstCall: function ( cb) {

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
                    console.warn("Fx_ui_w_foodComponent error: impossible to load codelist");
                }
            });
        },
        getChildren: function ( node, cb) {

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
                console.warn("Fx_ui_tree error error: impossible to load codelist");
            });
        }
    };
});
