/*global define*/
define([
    'jquery',
    'i18n!nls/common'
], function ($, Common) {

    'use strict';

    return $.extend(true, {}, Common, {

        // titles
        home_welcome_title : "Welcome to " + Common["project_name"],
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
        contacts_people_title :"Contact us",

        // slider news
        title_header_news:"News",
        title_slider_news:"News for gift",
        subtitle_slider_news:"These are the news",

        title_header_news_1:"News 1",
        title_slider_news_1:"News for gift 1",
        subtitle_slider_news_1:"These are the news 1",

        title_header_news_2:"News 2",
        title_slider_news_2:"News for gift 2",
        subtitle_slider_news_2:"hese are the news 2"


    });

});