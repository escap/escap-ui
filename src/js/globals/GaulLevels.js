/*global define*/
define(['jquery','underscore',
    '../../../config/config'
    ], function($,_, C) {

    'use strict';

    function processData(data) {

        //console.log('processData',data);

        var r = [];
        data.sort(function(a,b){
            return (a.title.EN).toString().localeCompare( (b.title.EN).toString() )
        });
        for (var i = 0, length = data.length; i < length; i++) {
            r.push({"text": data[i].title.EN, "id": data[i].code, "children": true});
        }
        return r;
    }

    return {
        getLevel0: function (cb) {

            var self = this;
            var payload = {
                    uid: 'GAUL',
                    version: '2014',
                    level: 1,
                    levels: 1
                };

            $.ajax({
                url: C.SERVICE_BASE_ADDRESS+"/msd/codes/filter",                
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(payload),
                dataType: "json",
                success: function (data) {
                    if (data) {
                        cb(processData(data));
                    }
                }
            });
        },
        getLevel1: function (ids, cb) {

            var self = this;
            var payload = {
                    uid: 'GAUL',
                    version: '2014',
                    level: 1,   //start level
                    levels: 2,  //depth                    
                    codes: ids
                };

            $.ajax({
                url: C.SERVICE_BASE_ADDRESS+"/msd/codes/filter",
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(payload)
            }).success(function (data) {
                if (data) {
                    cb(processData(data[0].children || []));
                } else {
                    cb([]);
                }
            });
        }
    };
});
