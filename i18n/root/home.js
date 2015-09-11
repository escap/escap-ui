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
        fast_link_title : "Ready to use",
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


        // slider news
        home_news_header : "News 1",
        home_news_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium ligula ut eros condimentum malesuada.",
        home_news_link_url:"http://www.google.com",
        home_news_link_label :"LEARN MORE",

        // contacts
        contacts_people_title :"Contact us",
        contacts_title: "FAO NUTRITION DIVISION",
        contacts_street_place : "Headquarters",
        contacts_street_first :"Viale delle Terme di Caracalla",
        contacts_street_second: "00153 Rome, Italy",
        contacts_street_phone :"Tel:(+39) 06 57051",
        contacts_street_mail :"e-mail：FAO-HQ@fao.org",
        contacts_street_general_media_title :"General media inquiries",
        contacts_street_general_media_phone :"Tel: (+39) 06 570 53625",
        contacts_street_general_media_mail :"e-mail: FAO-Newsroom@fao.org"

    });

});