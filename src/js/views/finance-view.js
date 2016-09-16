/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/domain/finance.hbs',
    'i18n!nls/finance',
    'config/events',
    'config/config',
    'amplify'
], function (View, template, i18nLabels, E,C) {

    'use strict';

    var FinanceView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'modules',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
          return {
              title: i18nLabels.title,
              subDomainItems: this.subDomainItems
           };
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'finance'});

        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        initialize: function(params){
            var subDomainList_url= C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/data/uid/ESCAP_INDICATOR_STRUCTURE?language=EN";
            var self = this
            var subDomainList = {};
            var subDomainItems = {};
            var subDomains ={};

            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, params);

            self.subDomainList = {};
            self.subDomains = {};
            self.subDomainItems ={};

            $.ajax({
                async: false,
                dataType: 'json',
                url: subDomainList_url,
                contentType: "application/json; charset=utf-8",
                type: 'get',
                success:function(res) {
                   subDomainList = _.find(res,function(a){
                     return a.code == 120;
                   });

//console.log('Sub Domain Codes', subDomainList);
//console.log('Sub Domains', subDomains);


                    subDomainItems = _.groupBy(subDomainList["children"], function(obj) {
                       return obj.code;
                    });

                    self.subDomainItems=_.sortBy(subDomainItems,function(obj){
                      return obj.code;
                    });
//console.log('Sub Domain Items', self.subDomainItems);

                }
            });

        }
    });

    return FinanceView;
});
