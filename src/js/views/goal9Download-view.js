/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/sdg/goal9.hbs',
    'i18n!nls/goal9',
    'config/events',
    'amplify'
], function (View, template, i18nLabels, E) {

    'use strict';

    var Goal9View = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'modules',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'demog'});

        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
    });

    return Goal9View;
});