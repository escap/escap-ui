/*global define*/
define(function () {

        'use strict';

        return {


            SERVICE_BASE_ADDRESS : "http://fenix.fao.org/d3s",

            //Chaplin JS configuration
            CHAPLINJS_CONTROLLER_SUFFIX: '-controller',
            CHAPLINJS_PROJECT_ROOT: '/fenix/',
            CHAPLINJS_PUSH_STATE: false,
            CHAPLINJS_SCROLL_TO: false,
            CHAPLINJS_APPLICATION_TITLE: "FENIX Web App",

            //WDS configuration
            DB_NAME: 'GIFT',
            WDS_URL: 'http://hqlprfenixapp2.hq.un.fao.org:10100/wds-5.2.1/rest/crud',
            WDS_OUTPUT_TYPE: 'object',
            WDS_DOWNLOAD_MICRODATA_SEARCH_QUERY : "select distinct ('gift_'||survey_code) from master_avg where 1=1",


            MD_EXPORT_URL : 'http://fenixapps2.fao.org/fenixExport',

            //Top Menu configuration
            TOP_MENU_CONFIG: 'config/submodules/fx-menu/top_menu.json',
            TOP_MENU_TEMPLATE: 'fx-menu/templates/blank-fluid.html',
            TOP_MENU_SHOW_BREADCRUMB : true,
            TOP_MENU_SHOW_BREADCRUMB_HOME : true,
            TOP_MENU_SHOW_FOOTER: false,
            TOP_MENU_AUTH_MODE_HIDDEN_ITEMS: ['login'],
            TOP_MENU_PUBLIC_MODE_HIDDEN_ITEMS :['inputData','statistics','microdata','analysis','datamng', 'logout'],

            SECURITY_NOT_AUTHORIZED_REDIRECTION_LINK : "home",

            SOCIAL_LINK_FACEBOOK : "https://facebook.com",
            SOCIAL_LINK_TWITTER : "https://twitter.com",
            SOCIAL_LINK_YOUTUBE : "https://youtube.com",

            READY_TO_USE: ["consumption","safety","nutrition","environment"],

            DOWNLOAD_SOURCES: {
                "gift_000042BUR201001" : "files/fileWatcher-143.110.zip"
            }

        };
    });
