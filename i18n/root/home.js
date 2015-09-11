/*global define*/
define([
    'jquery',
    'i18n!nls/common'
], function ($, Common) {

    'use strict';

    return $.extend(true, {}, Common, {

        // titles
        home_welcome_title: "Welcome to " + Common["project_name"],
        slider_title: "News",
        fast_link_title: "Ready to use",
        link_food_consumption: "http://google.com",
        title_food_consumption: "Food consumption",
        link_food_safety: "http://google.com",
        title_food_safety: "Food safety",
        link_food_nutrition: "http://google.com",
        title_food_nutrition: "Food nutrition",
        link_food_environment: "http://google.com",
        title_food_environment: "Food environment",
        database_update_title: "Database updates",

        contacts_collaborations_title: "In collaboration with",


        // slider news
        home_news_header: "News 1",
        home_news_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium ligula ut eros condimentum malesuada.",
        home_news_link_url: "http://www.google.com",
        home_news_link_label: "LEARN MORE",

        // contacts
        contacts_people_title: "Contact us",
        contacts_title: "FAO NUTRITION DIVISION",
        contacts_street_place: "Headquarters",
        contacts_street_first: "Viale delle Terme di Caracalla",
        contacts_street_second: "00153 Rome, Italy",
        contacts_street_phone: "Tel:(+39) 06 57051",
        contacts_street_mail: "e-mail：FAO-HQ@fao.org",
        contacts_street_general_media_title: "General media inquiries",
        contacts_street_general_media_phone: "Tel: (+39) 06 570 53625",
        contacts_street_general_media_mail: "e-mail: FAO-Newsroom@fao.org",

        slides: [
            {
                "class_item": "item active",
                "data_link" : "1",
                "active_link":"active",

                "src": "src/images/home_pictures/1.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "2",

                "src": "src/images/home_pictures/2.jpg"

            },
            {
                "class_item": "item",
                "data_link" : "3",

                "src": "src/images/home_pictures/3.jpg"

            },
            {
                "class_item": "item",
                "data_link" : "4",

                "src": "src/images/home_pictures/4.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "5",

                "src": "src/images/home_pictures/5.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "6",

                "src": "src/images/home_pictures/6.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "7",

                "src": "src/images/home_pictures/7.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "8",

                "src": "src/images/home_pictures/8.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "9",

                "src": "src/images/home_pictures/9.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "10",

                "src": "src/images/home_pictures/10.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "11",

                "src": "src/images/home_pictures/11.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "12",

                "src": "src/images/home_pictures/12.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "13",

                "src": "src/images/home_pictures/13.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "14",

                "src": "src/images/home_pictures/14.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "15",

                "src": "src/images/home_pictures/15.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "16",

                "src": "src/images/home_pictures/16.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "17",

                "src": "src/images/home_pictures/17.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "18",

                "src": "src/images/home_pictures/18.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "19",

                "src": "src/images/home_pictures/19.jpg"
            },
            {
                "class_item": "item",
                "data_link" : "20",

                "src": "src/images/home_pictures/20.jpg"
            }
        ]
    });

});