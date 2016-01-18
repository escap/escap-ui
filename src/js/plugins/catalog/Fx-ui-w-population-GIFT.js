/*global define, amplify, alert*/
define([
    "jquery",
    "fx-filter/config/config",
    "fx-filter/config/config-default",
    "fx-filter/config/events",
    'config/config',
    "jQAllRangeSliders",
    "amplify"
], function ($, C, DC, E, CT) {

    'use strict';

    var o = {
        lang: 'EN',
        //For filter logic .... start
        componentType: '',
        componentid: '',
        name: '',
        title: '',
        grid: '',
        source: '',
        defaultsource: '',
        adapter: null,
        css_classes: {
            HOLDER: "fx-catalog-modular-form-holder",
            HEADER: "fx-catalog-modular-form-header",
            HANDLER: "fx-catalog-modular-form-handler",
            CONTENT: "fx-catalog-modular-form-content",
            CLOSE_BTN: "fx-catalog-modular-form-close-btn",
            MODULE: 'fx-catalog-form-module',
            RESIZE: ".fx-catalog-modular-form-resize-btn",
            LABEL: "fx-catalog-modular-form-label",
            HIDE_CLASS :'.displayNone',
            SHOW_CLASS : '.display'
        },

        sourceType: {
            timelist: 'timeList',
            period: 'period'
        },

        events: {
            REMOVE_MODULE: "fx.filter.module.remove",
            READY: "fx.filter.component.ready",
            DESELECT: 'fx.filter.module.deselect.'
        },
        options: {
            YEARS_LABEL : 'YEARS'
        },
        gender_codes : {
            MALE_CODE : '1',
            FEMALE_CODE : '2',
            UNKNOWN_CODE : '3'
        }
        //For filter logic .... end
    };


    function FX_ui_population_component(optionsDefault) {

        if (this.options === undefined) {
            this.options = {};
        }

        this.$CT = CT.CATALOG_TEMPLATE;
        console.log(this.$CT)

        $.extend(true, this.options, o, optionsDefault);
    };


    FX_ui_population_component.prototype._initialize = function (e) {

        this.$nodisplay_class = this.$CT.FILTER_CONFIG.POPULATION.NODISPLAY_CLASS;

        console.log( this.$CT.FILTER_CONFIG.POPULATION)

        // gender
        console.log(this.$CT)
        this.$populationGenderName = this.$CT.FILTER_CONFIG.POPULATION.GENDERS_RADIO_NAME;
        this.$populationGenderSelector = $('input[name="' + this.$populationGenderName + '"]:radio');


        // agerange Type
        this.$populationAgeRangeTypeName = this.$CT.FILTER_CONFIG.POPULATION.AGERANGE_TYPE_RADIO_NAME;
        this.$populationAgeRangeTypeSelector = $('input[name="' + this.$populationAgeRangeTypeName + '"]:radio');


        // agerange
        this.$populationAgerange = $(this.$CT.FILTER_CONFIG.POPULATION.AGERANGE);

        // characteristics

        this.$addchars_container = $(this.$CT.FILTER_CONFIG.POPULATION.ADD_CHARS_CONTAINER);
        this.$populationCharsName = this.$CT.FILTER_CONFIG.POPULATION.CHARACTERISTICS_RADIO_NAME;
        this.$populationCharsSelector = $('input[name="' + this.$populationCharsName + '"]:checkbox');
        this.$popCharseElements = document.getElementsByName("popCharsRadio");

        // initialization data timerange
        this.$dataTimeRange = {
            yearsRange: e.component.ageRange.defaultsource.YEARS,
            monthsRange: e.component.ageRange.defaultsource.MONTHS
        };


        // initialization of default values
        this._rangeYearSelected = {
            min: this.$dataTimeRange.yearsRange.from + 5,
            max: this.$dataTimeRange.yearsRange.to - 5
        };
        this._isFemaleSelected = true;
        this._isYearSelected = true;
        this._popCharsSelected = 'none';

    };


    FX_ui_population_component.prototype.render = function (e, container) {

        var self = this;

        self.options.container = container;

        self.options.module = e;

        $.extend(self.options.events, e.events); // extend events passed from the host

        this.$componentStructure = e.template.overallStructure;

        this.$container = $(container);

        this.$container.append(this.$componentStructure);

        this.$isYearTypeSelected = true;

        this._initialize(e);

        // ageRange selector
        this.$populationAgerange.rangeSlider({
            bounds: {min: this.$dataTimeRange.yearsRange.from, max: this.$dataTimeRange.yearsRange.to},
            step: 1,
            arrows: false,
            defaultValues: {min: this.$dataTimeRange.yearsRange.from + 5, max: this.$dataTimeRange.yearsRange.to - 5}
        });

        this.bindEventListeners();

        if ((e.adapter != null) && (typeof e.adapter != "undefined")) {
            self.options.adapter = e.adapter;
        }

        self.options.name = e.name;
        self.options.componentid = $(container).attr("id");
        //Raise an event to show that the component has been rendered
        $(container).trigger(self.options.events.READY, {name: e.name});


        setTimeout(function(){
            self.$populationAgerange.rangeSlider('resize');
        }, 300)


    };


    FX_ui_population_component.prototype.validate = function (e) {

        //TODO


        return true;
    };


    FX_ui_population_component.prototype.processData = function (dataType, data) {
        // TODO

        var r = [];
        if (dataType == o.sourceType.timelist) {
            //Array of years
            data.sort(function (a, b) {
                if (a < b)
                    return -1;
                if (a > b)
                    return 1;
                return 0;
            });

            $(data).each(function (index, item) {
                r.push({"text": "" + item, "id": item, "children": false});
            });
        }
        else if (dataType == o.sourceType.period) {
            //Array of json object {from: to}
            $(data).each(function (index, item) {
                var start_year = item.from;
                var end_year = item.to;
                var iYear = 0;
                if (start_year <= end_year) {
                    for (iYear = start_year; iYear <= end_year; iYear++) {
                        r.push({"text": "" + iYear, "id": iYear, "children": false});
                    }
                }
            });
        }

        return r;
    };


    FX_ui_population_component.prototype._checkAndSetPopCharacteristics = function () {

        if (this._areThereConditionForLactating()) {
            $('.displayNone').each(function(index){
                var el = $(this)
               console.log($(this).removeClass( "displayNone").addClass('display'))})
            this.$addchars_container.removeClass(this.$nodisplay_class);
            for (var i = 0, length = this.$popCharseElements.length; i < length; i++)
                this.$popCharseElements[i].disabled = false;
        } else {
            $('.display').each(function(index){
                var el = $(this)
                console.log($(this).removeClass( "display").addClass('displayNone'))})
            this.$addchars_container.addClass(this.$nodisplay_class);
            for (var i = 0, length = this.$popCharseElements.length; i < length; i++) {
                this.$popCharseElements[i].disabled = true;
                this.$popCharseElements[i].checked = (i === length - 1);
            }
        }
    };


    FX_ui_population_component.prototype._areThereConditionForLactating = function () {
        return this._isFemaleSelected && (
            (this._isYearSelected && this._rangeYearSelected.min >= 15) ||
            (!this._isYearSelected && this._rangeYearSelected.min >= 180))
    };


    FX_ui_population_component.prototype.bindEventListeners = function () {

        var self = this;


        this.$populationCharsSelector.on("change", function (e, data) {
            e.preventDefault();
            if ($(e.target).val() === 'none' && ($(e.target).is(':checked'))) {
                for (var i = 0, length = self.$popCharseElements.length; i < length; i++)
                    self.$popCharseElements[i].checked = (i === length - 1);
            } else {
                self.$popCharseElements[self.$popCharseElements.length - 1].checked = false;
            }
        })

        // on change gender
        this.$populationGenderSelector.on('change', function (e, data) {

            e.preventDefault();
            self._isFemaleSelected = ($(e.target).val() == self.options.gender_codes.FEMALE_CODE);

            self._checkAndSetPopCharacteristics();
/*
            console.log(self.options.events.MODIFY)
*/
        });


        // on change kind of age range
        this.$populationAgeRangeTypeSelector.on('change', function (e, data) {
            e.preventDefault();
            var kindOfAgeRange = $(e.target).val();
            self._isYearSelected = kindOfAgeRange === 'YEARS';
            self._checkAndSetPopCharacteristics();
            // change in months
            if (self.$isYearTypeSelected === true && kindOfAgeRange === 'MONTHS') {
                self.$isYearTypeSelected = false;
                self.$populationAgerange.rangeSlider('bounds', self.$dataTimeRange.monthsRange.from, self.$dataTimeRange.monthsRange.to);
                self.$populationAgerange.rangeSlider('values', self.$dataTimeRange.monthsRange.from + 48, self.$dataTimeRange.monthsRange.to - 240)

            } else if (self.$isYearTypeSelected === false && kindOfAgeRange === 'YEARS') {
                self.$isYearTypeSelected = true;
                self.$populationAgerange.rangeSlider('bounds', self.$dataTimeRange.yearsRange.from, self.$dataTimeRange.yearsRange.to);
                self.$populationAgerange.rangeSlider('values', self.$dataTimeRange.yearsRange.from + 5, self.$dataTimeRange.yearsRange.to - 5)
            }

        });


        this.$populationAgerange.bind("valuesChanged", function (e, data) {
            e.preventDefault();
            self._rangeYearSelected = data.values;
            self._checkAndSetPopCharacteristics();

            // data.values =  {min:yy, max:xx}
/*
            amplify.publish(self.options.events.MODIFY)
*/
        });


        // oresize jqallrange slider
        $(this.options.css_classes.RESIZE).on('click', function () {
            self.$populationAgerange.rangeSlider('resize');
        })

    };

    //For filter logic .... start
    FX_ui_population_component.prototype.getName = function () {
        return this.options.name;
    };


    FX_ui_population_component.prototype.getAdapter = function () {
        return this.options.adapter;
    };

    //For filter logic .... end
    FX_ui_population_component.prototype.getValue = function (e) {

        var self = this;

        var ageRangeSelected = $( this.$CT.FILTER_CONFIG.POPULATION.AGERANGE).rangeSlider('values');


        var ageRange = {
            "period":{
                from: ageRangeSelected.min,
                to: ageRangeSelected.max
            }
        };
        var result= {};


       $('input[name="' + this.$CT.FILTER_CONFIG.POPULATION.AGERANGE_TYPE_RADIO_NAME + '"]:radio:checked').val() ==='YEARS'?
           result['age_year'] = ageRange:  result['age_month'] = ageRange;

        result['gender'] = $('input[name="' + this.$CT.FILTER_CONFIG.POPULATION.GENDERS_RADIO_NAME + '"]:radio:checked').val();
        result['characteristics'] = $('input[name="' + this.$CT.FILTER_CONFIG.POPULATION.CHARACTERISTICS_RADIO_NAME + '"]:checkbox:checked').val();

        return result;
    };


    return FX_ui_population_component;
});