/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
    'fx-filter/start',
    'text!templates/dashboard/template.hbs',
    'text!templates/dashboard/bases.hbs',
    'text!templates/dashboard/resume.hbs',
    'i18n!nls/dashboard',
    'config/events',
    'text!config/dashboard/lateral_menu.json',
    'text!json/dashboard/resume_filter.json',
    'config/dashboard/config',
    'handlebars',
    'fx-filter/Fx-filter-configuration-creator',
    'fx-ds/bridges/d3p',
    'loglevel',
    'amplify',
    'jstree'
], function ($, View, Dashboard, Filter, template, basesTemplate, resumeTemplate, i18nLabels, E, LateralMenuConfig, ResumeFilter, PC, Handlebars, FilterConfCreator, D3P, log) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: "filter-container",
        FILTER_BTN: "#filter-submit-btn",
        RESUME_CONTAINER: "#item-1",
        EXPORT_PROCESS: ".fx-dashboard-process"
    };

    var DashboardView = View.extend({

        initialize: function (params) {

            log.trace('initialize params ' + JSON.stringify(params));

            View.prototype.initialize.call(this, arguments);

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'dashboard',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            log.trace('attach dashboard');

            View.prototype.attach.call(this, arguments);

            //update State

            log.trace('"' + E.STATE_CHANGE + '" event triggered');

            amplify.publish(E.STATE_CHANGE, {menu: 'dashboard'});

            this._initVariables();

            this._renderPage();

            this._bindEventListeners();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.$filterBtn = this.$el.find(s.FILTER_BTN);


        },

        _bindEventListeners: function () {

            var self = this;

            this.$filterBtn.on('click', function (e, data) {

                var values = [self.filter.getValues()];

                // TODO: funzione per distruggere dashboard e ricrearla con gli items giusti:

                log.debug('Filtering dashboard with values: ' + JSON.stringify(values));

                var newFilter = self._reformatCodes(values);

                self.dashboard.filter(newFilter);

                self.$el.find(s.RESUME_CONTAINER).empty();

                var oldFilter = JSON.parse(ResumeFilter);
                var filterResume = self._reformatFilter(oldFilter, newFilter);

                self._updateResume(filterResume);

            });

            log.warn(this.$exportBtn);

            this.$exportBtn.on('click', function (e, data) {

                alert()

                log.warn(e, e);
                log.warn(data, data);
            })

        },

        _reformatFilter: function (oldFilter, newFilter) {


            var valueSpecialCondition = newFilter[0]['specialCondition'];
            delete newFilter[0]['specialCondition'];
            newFilter[0]['specialCondition'] = valueSpecialCondition;


            for (var attr in newFilter[0]) {

                if (newFilter[0][attr].hasOwnProperty("removeFilter")) {
                    delete newFilter[0][attr];
                }
            }

            newFilter[0]["ageYear"] = true;
            newFilter[0]["food"] = [
                "A000Y",
                "A00BR",
                "A0F6B",
                "A03FQ",
                "A002N",
                "A0ETG",
                "A010C",
                "A000T",
                "A00JF",
                "A01SN",
                "A027J",
                "A00ZZ",
                "A01AB",
                "A013N",
                "A037A",
                "A00KJ",
                "A03NS",
                "A02JP",
                "A011P",
                "A00MJ"
            ];

            oldFilter[0].parameters = newFilter[0];

            return oldFilter;
        },

        _reformatCodes: function (values) {

            var result = [];

            var data = {};

            for (var attr in values[0]) {

                var value_data_format = Object.keys(values[0][attr])[0]

                switch (value_data_format) {
                    case "time":

                        if (values[0][attr][value_data_format][0]["from"]) {
                            data[attr] = values[0][attr][value_data_format][0]["from"];
                        } else if (values[0][attr][value_data_format][0]["to"]) {
                            data[attr] = values[0][attr][value_data_format][0]["to"];
                        } else {
                            data[attr] = {"removeFilter": true};
                        }
                        break;
                    case "codes":

                        if (values[0][attr][value_data_format]) {
                            data[attr] = values[0][attr][value_data_format][0]['codes'][0];
                        } else {
                            data[attr] = {"removeFilter": true};
                        }
                        break;

                    default :
                        data[attr] = {"removeFilter": true};

                        break;
                }
            }

            result.push(data)

            return result;

        },

        _renderPage: function () {

            log.trace('rendering page component');

            var self = this;

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    log.debug("Showing always 'FoodGroups' dashboard");

                    self._onChangeDashboard("FoodGroups");

                    return;

                    if (!data.instance.is_leaf(data.node)) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                        self.$lateralMenu.jstree(true).toggle_node(data.node);

                    } else {

                        self._onChangeDashboard(data.selected[0]);

                    }

                }, this))

                .on("loaded.jstree", function (event, data) {
                    self.$lateralMenu.jstree('select_node', 'ul > li:first');
                });

            //this._printDashboard('FoodGroups');

            //bind events from tree click to dashboard refresh
            /*
             * - destroy current dashboard
             * - inject new template    this._printDashboardBase( jstree item selected );
             * - render new dashboard
             *
             * */

        },

        _printDashboard: function (item) {

            this._printDashboardBase(item);

            var config = PC[item];

            if (!config || !config.dashboard || !config.filter) {
                alert("Impossible to find configuration for topic: " + item);
                return;
            }

            var dashboardConfig = this._getDashboardConfig(config.dashboard),
                filterConfig = config.filter;

            this._renderDashboard(dashboardConfig);

            this._renderFilter(filterConfig);

            log.debug("Temporary workaround. TODO remove me");
            this._printTable();
        },

        _onChangeDashboard: function (item) {

            this._printDashboard(item);

        },

        _printDashboardBase: function (id) {

            var self = this;

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                template = Handlebars.compile(source.prop('outerHTML')),
                html = template({});

            this.$el.find(s.DASHBOARD_CONTENT).html(html);

            this.$exportBtn = this.$el.find(s.EXPORT_PROCESS);

            this.$exportBtn.on('click', function (e, data) {
                var model = self.dashboard.getModel(this.dataset.dashboardId);

                log.warn(model)

                if (model && model != null) {
                    //TODo: export
                }
            })

        },

        _getDashboardConfig: function (conf) {

            //get from PC the 'id' conf

            log.trace("Creating dashboard configuration with uid: " + this.id);

            conf.uid = this.id;

            return conf;
        },

        _renderDashboard: function (config) {

            if (this.dashboard && this.dashboard.destroy) {

                log.trace("Destroying previous instance of the dashboard");

                this.dashboard.destroy();
            }

            console.log('on _renderDashboard dahsboiard')


            this.dashboard = new Dashboard({
                layout: "injected"
            });

            log.trace("Rendering dashboard");

            this.dashboard.render(config);

        },

        _renderFilter: function (config) {

            var self = this;

            this.filterConfCreator = new FilterConfCreator();

            this.filterConfCreator.getConfiguration(config)
                .then(function (c) {

                    self.filter = new Filter();

                    self.filter.init({
                        container: s.FILTER_CONTAINER,
                        layout: 'fluidGrid'
                    });

                    var adapterMap = {};

                    log.debug("Rendering filter");

                    self.filter.add(c, adapterMap);

                });

        },

        _printTable: function () {

            var self = this;

            this.bridge = new D3P({
                bridge: {},
                uid: this.id
            });

            this._updateResume(JSON.parse(ResumeFilter));
        },

        _updateResume: function (filter) {


            var self = this;
            this.bridge.query(filter).then(function (data) {

                var model = {},
                    rawData = data.data;

                for (var i = 0; i < rawData.length; i++) {
                    model[rawData[i][0]] = (rawData[i][1] && rawData[i][1] !== null) ? rawData[i][1].toFixed(1) : rawData[i][1];
                }

                //Inject HTML
                var template = Handlebars.compile(resumeTemplate),
                    html = template(model);

                self.$el.find(s.RESUME_CONTAINER).html(html);

            });
        },

        _unbindEventListeners : function() {

            log.trace('dahsboard unbind eVent listeners');


            this.$filterBtn.off();

            this.$exportBtn.off();

        },

        dispose: function () {

            log.trace('dashboard dispose');

/*
            alert()
            debugger;

            this.dashboard.destroy();*/

/*
            this._unbindEventListeners();
*/

            View.prototype.dispose.call(this, arguments);
        }
    });

    return DashboardView;
});