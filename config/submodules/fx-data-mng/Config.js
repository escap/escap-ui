/*global define*/
define(['jquery',
        'fx-submodules/config/baseConfig'],
    function ($, config_base) {

        'use strict';

        var cfg = {};
        $.extend(cfg, config_base);

        cfg.TOP_MENU = {
            url: './config/submodules/fx-menu/top_menu_data_mng.json',
            active: "datamng",
            template: 'fx-menu/templates/blank-fluid.html',
            container: "#top-menu-container"
        };

       /* cfg.SECONDARY_MENU = {
            url: './config/submodules/fx-data-mng/secondary_menu.json',
            template: 'fx-menu/templates/blank-fluid.html',
            disable: ['delete', 'close', 'data', 'dsd']
        };*/

        cfg.SECONDARY_MENU = {
            url: './submodules/fenix-ui-data-management/config/secondary_menu.json',
            disable: ['delete', 'close', 'data', 'dsd']
        }


        cfg.SITE_TEMPLATE = 'topmenu';

        cfg.DSD_EDITOR_CONTEXT_SYSTEM = "gift";
        cfg.DSD_EDITOR_DATASOURCES = ["D3S"];

        //cfg.DATA_MANAGEMENT_NOT_LOGGEDIN_URL="index.html"

/*
        cfg.METADATA_EDITOR_AJAX_EVENT_CALL = "./config/submodules/fx-data-mng/fx-metadata-editor-ajax-config.json";
*/

        return cfg;
    });