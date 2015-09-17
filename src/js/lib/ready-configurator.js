define([], function () {

    return {

        nutrition: {
            model: {
                "elements": [
                    {
                        "title": "Share of Energy",
                        "indicators": [
                            {
                                "indicator": "Macronutrient share of usual energy intakes",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Philippines HarvestPlus, 2008"
                            }
                        ],
                        "comments": "The macronutrients share of usual energy intakes is in line with the WHO population goals with a rather low content of fat in the diet, and a very high contribution of carbohydrates."
                    }
                ]
            },
            template: "templates/ready/nutrition.hbs",

            onEnter: function () {

                var data = [
                    {"macronutrient": "Energy", "percentage": 100},
                    {"macronutrient": "Protein", "percentage": 13},
                    {"macronutrient": "Carbohydrate", "percentage": 73},
                    {"macronutrient": "Fat", "percentage": 14}
                ]

                var source = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: data
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#table-energy-intake").jqxGrid({
                    sortable: true,
                    filterable: true,
                    showfilterrow: true,
                    pageable: true,
                    autorowheight: true,
                    columnsresize: true,
                    pagesize: 30,
                    //groupable:true,
                    keyboardnavigation: true,
                    width: '100%',
                    source: dataAdapter,
                    columnsresize: true,
                    columns: [
                        {text: 'Macronutrient', datafield: 'macronutrient'},
                        {text: '%', datafield: 'percentage'}
                    ]
                });

                $("#pie-energy-intake").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "",
                        colorByPoint: true,
                        data: [{
                            name: "Carbon",
                            y: 13.0693198372095
                        }, {
                            name: "Protein",
                            y: 72.9589523152147,
                            sliced: true,
                            selected: true
                        }, {
                            name: "Fat",
                            y: 14.0081092410591
                        }]
                    }]
                })
            }
        },

        safety: {
            model: {
                "elements": [
                    {
                        "title": "Groundnuts consumption",
                        "indicators": [
                            {
                                "indicator": "Consumption of groundnuts in g/kg body weight/day over 2 days in consumers only",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/kg body weight/day over 2 days in consumers only",
                                "Gender": "Male and Female",
                                "Age_range": "24-59 months",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/day over 2 days in consumers only",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/day over 2 days in consumers only",
                                "Gender": "Male and Female",
                                "Age_range": "24-59 months",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            }
                        ],
                        "comments": "Groundnuts are a known potential source of aflatoxins. The estimated level of consumption usually considered for African countries is 5.1 g/day, based on GEMS regional diets which are derived from national availability (Food Balance Sheets). The observed level of consumption from the Harvest plus surveys suggests a significantly higher level of consumption (up to 107 and 142 g/day at the 95th percentile of consumers only in children and women respectively). Potential high dietary exposure to aflatoxins through groundnuts can be calculated based on the observed high level of consumption per kg body weight; it reaches 7.7 g/kg bw/day and 3.0 g/kg bw/day in children and women respectively at the 95th percentile in consumers only."
                    }]
            },
            template: "templates/ready/safety.hbs",
            onEnter: function () {
            }
        },

        environment: {},

        consumption: {
            model: {
                "elements": [
                    {
                        "title": "Minimum Dietary Diversity-Women (MDD-W)",
                        "indicators": [
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Summary statistics",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "id": "table-mdd-female"

                            },
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Percentage of the population achieving the MDD-W",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "id": "pie-mdd-female"

                            },
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Number of food groups consumed over 1 day",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "id": "chart-mdd-female"

                            },
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Frequency of consumption of each food group over 1 day",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "id": "stock-mdd-female"

                            }
                        ],
                        "comments": "Less than one woman out of four reaches the Minimum Dietary Diversity-Women cut-off of 5 out of ten food groups consumed in one day. Three quarter of the women have a diversity score between 3 and 4 and none consumes more than 7 food groups over a day. This suggests a fairly low diversity of the diet. The five most frequently consumed food groups were, in order, 'all starchy staples', 'other vegetables', 'dark green leafy vegetables', 'flesh foods' and 'beans and peas'. The frequency of consumption of 'Nuts and seeds', 'eggs' and 'all dairy', three key sources of protein, was particularly low."
                    }]
            },
            template: "templates/ready/consumption.hbs",
            onEnter: function () {

                var data = [
                    {"macronutrient": "N", "percentage": 422},
                    {"macronutrient": "Mean", "percentage": 3.7},
                    {"macronutrient": "SD", "percentage": 1.1},
                    {"macronutrient": "Min", "percentage": 3},
                    {"macronutrient": "25th", "percentage": 3},
                    {"macronutrient": "percentile", "percentage": null},
                    {"macronutrient": "Median", "percentage": 3},
                    {"macronutrient": "75th", "percentage": 3},
                    {"macronutrient": "Max", "percentage": 3},

                ]

                var source = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: data
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#table-mdd-female").jqxGrid({
                    sortable: true,
                    filterable: true,
                    showfilterrow: true,
                    pageable: true,
                    autorowheight: true,
                    columnsresize: true,
                    pagesize: 30,
                    //groupable:true,
                    keyboardnavigation: true,
                    width: '100%',
                    source: dataAdapter,
                    columnsresize: true,
                    columns: [
                        {text: 'Dietary', datafield: 'macronutrient'},
                        {text: 'Stats', datafield: 'percentage'}
                    ]
                });

                $("#pie-mdd-female").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "",
                        colorByPoint: true,
                        data: [{
                            name: "<5",
                            y: 77
                        }, {
                            name: ">=5",
                            y: 23,
                            sliced: true,
                            selected: true
                        }]
                    }]
                });

                $("#chart-mdd-female").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "",
                        colorByPoint: true,
                        data: [
                            {
                                y: 0
                            },
                            {
                                y: 1.4218009479
                            },
                            {
                                y: 12.7962085308
                            },
                            {
                                y: 31.2796208531
                            },
                            {
                                y: 31.7535545024
                            },
                            {
                                y: 16.1137440758
                            },
                            {
                                y: 5.9241706161
                            },
                            {
                                y: 0.7109004739
                            },

                            {
                                y: 0
                            },
                            {
                                y: 0
                            }
                             ]
                    }]
                });

                $("#stock-mdd-female").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "",
                        colorByPoint: true,
                        data: [
                            {
                                x:"All starchy staples",
                                y: 100
                            },
                            {
                                x: "Flesh foods",
                                y: 38.86
                            },
                            {
                                x: "Eggs",
                                y: 11.85
                            },
                            {
                                x: "All dairy",
                                y: 11.37
                            },
                            {
                                x: "Beans and peas",
                                y: 36.02
                            },
                            {
                                x:"Nuts and seeds",
                                y: 1.66
                            },
                            {
                                x:"Dark green leafy vegetables",
                                y: 44.31
                            },
                            {
                                x:" Other vitamin A-rich vegetables and fruits",
                                y: 20.38
                            },
                            {
                                x:"Other fruits",
                                y: 15.88
                            },
                            {
                                 x:"Other vegetables",
                                y:88.63
                            }

                        ]
                    }]
                });

            }
        }











    }
})