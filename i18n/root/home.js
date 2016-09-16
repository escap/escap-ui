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
        link_food_consumption: "#ready/consumption",
        title_food_consumption: "Food consumption",
        link_food_safety: "#ready/safety",
        title_food_safety: "Food safety",
        link_food_nutrition: "#ready/nutrition",
        title_food_nutrition: "Nutrition",
        link_food_environment: "",
        title_food_environment: "Environment",
        database_update_title: "News",
        contacts_collaborations_title: "In collaboration with",

        // slider news
        home_news_header: "News 1",
        home_news_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium ligula ut eros condimentum malesuada.",
        home_news_link_url: "http://www.google.com",
        home_news_link_label: "LEARN MORE",

        slides: [
            {
                "class_item": "item active",
                "data_link": "1",
                "active_link": "active",

                "src": "src/images/home_pictures/1.jpg"
            },
            {
                "class_item": "item",
                "data_link": "2",

                "src": "src/images/home_pictures/2.jpg"

            },
            {
                "class_item": "item",
                "data_link": "3",

                "src": "src/images/home_pictures/3.jpg"

            },
            {
                "class_item": "item",
                "data_link": "4",

                "src": "src/images/home_pictures/4.jpg"
            },
            {
                "class_item": "item",
                "data_link": "5",

                "src": "src/images/home_pictures/5.jpg"
            },
            /*   {
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
             },*/
            /*  {
             "class_item": "item",
             "data_link" : "9",

             "src": "src/images/home_pictures/9.jpg"
             },*/
            {
                "class_item": "item",
                "data_link": "10",

                "src": "src/images/home_pictures/10.jpg"
            },
            {
                "class_item": "item",
                "data_link": "11",

                "src": "src/images/home_pictures/11.jpg"
            },
            {
                "class_item": "item",
                "data_link": "12",

                "src": "src/images/home_pictures/12.jpg"
            },
            {
                "class_item": "item",
                "data_link": "13",

                "src": "src/images/home_pictures/13.jpg"
            },
            {
                "class_item": "item",
                "data_link": "14",

                "src": "src/images/home_pictures/14.jpg"
            },
            {
                "class_item": "item",
                "data_link": "15",

                "src": "src/images/home_pictures/15.jpg"
            },
            {
                "class_item": "item",
                "data_link": "16",

                "src": "src/images/home_pictures/16.jpg"
            },
            {
                "class_item": "item",
                "data_link": "17",

                "src": "src/images/home_pictures/17.jpg"
            },
            {
                "class_item": "item",
                "data_link": "18",

                "src": "src/images/home_pictures/18.jpg"
            },
            {
                "class_item": "item",
                "data_link": "19",

                "src": "src/images/home_pictures/19.jpg"
            },
            {
                "class_item": "item",
                "data_link": "20",

                "src": "src/images/home_pictures/20.jpg"
            }
        ],
        slides_prev:"Previous",
        slides_next:"Next",

        contributors: [
            {
                "title": "FAO Head Quarters ESN",
                "description": "  In the Nutrition Division (ESN), the leading team consists of" +
                "Catherine Leclercq and Pauline Allemand; Ruth Charrondière provides" +
                "advice on the link between food consumption and food composition" +
                "data; Yvette Fautsch and Yenory Hernandez Garbanzo provided advice" +
                "on the data collection methods for the participatory development of" +
                "the tool."
            },
            {
                "title": "FAO Head Quarters ESS",
                "description": "In the Statistics Division (ESS), Fabio Grita and his team are in" +
                "charge of the development of the data management system and of the" +
                "web-dissemination software; Nathalie Troubat, Ana Moltedo and" +
                "Filippo Gheri work under the leadership of Piero Conforti and in" +
                "coordination with ESN on the development of a common pool of" +
                "nutrition indicators that can be derived from surveys performed at" +
                "household and individual level.",
            },
            {
                "title": "FAO Head Quarters AGDF",
                "description": "In the Food Safety and Quality Unit (AGDF), Markus Lipp and" +
                "colleagues are supporting the development of the tool by providing" +
                "advice and are involved in the selection of indicators in the field" +
                "of food safety.",
            },
            {
                "title": "WHO Head Quarters",
                "description": "In WHO Head Quarters, two departments are involved:" +
                "Philippe Verger, in the Department of Food Safety and Zoonoses" +
                "(FOS), collaborates actively to the development of the FAO/WHO GIFT" +
                "through weekly calls with the ESN leading team." +
                "In addition, FAO has regular meetings with Francesco Branca," +
                "Director of the Department of Nutrition for Health and Development" +
                "(NHD), to get feedback and advice on the tool development",
            },
            {
                "title": "European Food Safety Authority (EFSA)",
                "description": "The European Food Safety Authority (EFSA) is a key partner within the" +
                "FAO/WHO GIFT project. The FAO and WHO teams worked with the Evidence" +
                "Management Unit (DATA), in particular with Francesco Vernazza to" +
                "scale up the EFSA food categorization and description system named" +
                "FoodEx2 at the global level; advice is also provided by Davide" +
                "Arcella and Stefano Cappé in relation to the web-dissemination" +
                "software.",
            },
            {
                "title": "HarvestPlus",
                "description": "HarvestPlus, through Mourad Moursi, provided the microdata related to" +
                "datasets of individual food consumption survey from Bangladesh," +
                "Burkina Faso, Philippines and Uganda which were used to develop the" +
                "pilot FAO/WHO GIFT.",
            },
            {
                "title": "Tufts University – Global Dietary Database - Bill and Melinda Gates Foundation",
                "description": "The International Dietary Data Expansion (INDDEX) Project (2015-2018)" +
                "involves activities for the development of FAO/WHO GIFT and is" +
                "coordinated by Jennifer Coates with funding from Tufts University’s" +
                "Gerald J. and Dorothy R. Friedman School of Nutrition Science and" +
                "Policy." +
                "The Global Dietary Database (GDD), at Tufts University, is developed" +
                "by the Global Nutrition and Policy Consortium, led by Dariush" +
                "Mozaffarian, informing the Global Burden of Diseases Study." +
                "Both projects received grants from the Bill & Melinda Gates" +
                "Foundation.",
            },
            {
                "title": "International Agency for Research on Cancer (IARC)",
                "description": "The Global nutrition surveillance initiative (GloboDiet), using an" +
                "international computerized software for the collection of 24 h" +
                "recalls, is developed by Nadia Slimani, Dietary Exposure Assessment" +
                "Group (DEX), at the International Agency for Research on Cancer" +
                "(IARC-WHO).",
            }
        ],

        "contact_us":{
            "upper_title": "Contact us",
            "lower_title":"FAO NUTRITION DIVISION",

            "address": "Viale delle Terme di Caracalla<br>00153 Rome, Italy",

            "hq_address":"Headquarters<br>"+
                            "Viale delle Terme di Caracalla<br>"+
                            "00153 Rome, Italy<br>"+
                            "Tel:(+39) 06 57051<br>"+
                            "e-mail：FAO-HQ@fao.org",

            "other_info":"General media inquiries<br>"+
                            "Tel: (+39) 06 570 53625<br>"+
                            "e-mail: FAO-Newsroom@fao.org"
        }

    });

});