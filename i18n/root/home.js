/*global define*/
define([
    'jquery',
    'i18n!nls/common'
], function ($, Common) {

    'use strict';

    return $.extend(true, {}, Common, {

        home_welcome_title : "Welcome to " + Common["project_name"],
        text : "Change me in i18n/root/home.js",
        slider_title: "News",
        fast_link_title : "Fast links",
        link_food_consumption : "http://google.com",
        title_food_consumption:"Food consumption",
        link_food_safety:"http://google.com",
        title_food_safety:"Food safety",
        link_food_nutrition:"http://google.com",
        title_food_nutrition:"Food nutrition",
        link_food_environment:"http://google.com",
        title_food_environment:"Food environment",
        database_update_title : "Database updates",

        contacts_collaborations_title: "In collaboration with",
        contacts_people_title :"Contact us"
    });

});