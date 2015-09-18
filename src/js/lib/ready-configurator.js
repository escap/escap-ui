define([], function () {

    return {

        nutrition: {
            model: {
                "element_1": {
                    "title": "Share of Energy",
                    "indicators": [
                        {
                            "indicator": "Macronutrient share of usual energy intakes",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Philippines HarvestPlus, 2008",
                            "id_table" : "table-energy-intake",
                            "id_chart" : "pie-energy-intake"

                        }
                    ],
                    "comments": "The macronutrients share of usual energy intakes is in line with the WHO population goals with a rather low content of fat in the diet, and a very high contribution of carbohydrates."
                },
                "element_2": {

                    "title": "Vitamin A intakes: Comparison between two datasets",
                    "indicators": [
                        {
                            "indicator": "Vitamin A intakes: Summary statistics for the total population",
                            "Gender"   : "Female",
                            "Age_range": "19-50 years",
                            "Survey"   : "Uganda HarvestPlus/IRD, 2007",
                            "id_table" : "table-vitA-1",
                            "id_chart" : "chart-vitA-1"
                        },
                        {
                            "indicator": "Vitamin A intakes: Summary statistics for the highest tercile of vitamin A intake in the population",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Uganda HarvestPlus/IRD, 2007",
                            "id_table" : "table-vitA-2",
                            "id_chart" : "chart-vitA-2"
                        },
                        {
                            "indicator": "Vitamin A intakes: Summary statistics for the total population",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                            "id_table" : "table-vitA-3",
                            "id_chart" : "chart-vitA-3"
                        },
                        {
                            "indicator": "Vitamin A intakes: Summary statistics for the highest tercile of vitamin A intake in the population",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                            "id_table" : "table-vitA-4",
                            "id_chart" : "chart-vitA-4"
                        },

                    ]
                  },
                "element_3" :{
                    "indicators": [
                        {
                            "indicator": "Vitamin A intakes: Food groups providing the highest contribution to vitamin A intake among the highest tercile of the population",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Uganda HarvestPlus, 2007 + Burkina Faso HarvestPlus/IRD, 2010",
                            "src" :"src/images/ready/table.jpg"
                        },
                        {
                            "indicator": "Vitamin A intakes:  providing the highest contribution to vitamin A intake among the highest tercile of the population",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Uganda HarvestPlus, 2007 + Burkina Faso HarvestPlus/IRD, 2010",
                            "src" :"src/images/ready/imgNutrition.jpg"
                        }
                    ]
                },
                "tot_comment": "The comparison between the distribution of vitamin A intakes between women of child bearing age form Uganda and Burkina Faso suggests that vitamin A intakes are significantly higher " +
                "in the Uganda datasets. This observation must be interpreted after checking information available as metadata since the surveys are not necessarily comparable (different season, different methodology)." +
                " The identification of food with the highest contribution to vitamin A intake is useful to promote the consumption of these foods, in particular in the highest tercile of intake. Based on the available information, food sources of vitamin A to be promoted in Burkina Faso could be orange flesh sweet  potatoes since these appear to make the difference between intakes observed in the tow datasets."


            },
            template: "templates/ready/nutrition.hbs",

            onEnter: function () {

                var dataEnergy = [
                    {"macronutrient": "Energy", "percentage": 100},
                    {"macronutrient": "Protein", "percentage": 13},
                    {"macronutrient": "Carbohydrate", "percentage": 73},
                    {"macronutrient": "Fat", "percentage": 14}
                ]

                var sourceEnergy = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: dataEnergy
                };

                var dataAdapterEnergy = new $.jqx.dataAdapter(sourceEnergy);

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
                    source: dataAdapterEnergy,
                    columnsresize: true,
                    columns: [
                        {text: 'Macronutrient', datafield: 'macronutrient', width: '70%'},
                        {text: '%', datafield: 'percentage', width: '30%'}
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
                    credits: {
                        enabled: false
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
                            name: "Protein",
                            y: 13.0693198372095
                        }, {
                            name: "Carbohydrate",
                            y: 72.9589523152147,
                            sliced: true,
                            selected: true
                        }, {
                            name: "Fat",
                            y: 14.0081092410591
                        }]
                    }]
                });


                var dataTab1 = [
                    {"macronutrient": "N", "percentage": 529},
                    {"macronutrient": "Mean", "percentage": 690},
                    {"macronutrient": "SD", "percentage": 733},
                    {"macronutrient": "Min", "percentage": 8},
                    {"macronutrient": "25th percentile", "percentage": 146},
                    {"macronutrient": "Median", "percentage": 397},
                    {"macronutrient": "75th percentile", "percentage": 1024},
                    {"macronutrient": "Max", "percentage": 4091},
                ]


                var sourceTab1 = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: dataTab1
                };

                var dataAdapterTab1 = new $.jqx.dataAdapter(sourceTab1);

                $("#table-vitA-1").jqxGrid({
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
                    source: dataAdapterTab1,
                    columnsresize: true,
                    columns: [
                        {text: '', datafield: 'macronutrient', width: '70%'},
                        {text: 'µg RAE', datafield: 'percentage', width: '30%'}
                    ]
                });

                var dataTab2 = [

                    {"macronutrient": "N", "percentage": 174},
                    {"macronutrient": "Mean", "percentage": 1551},
                    {"macronutrient": "SD", "percentage": 661},
                    {"macronutrient": "Min", "percentage": 797},
                    {"macronutrient": "25th percentile", "percentage": 1032},
                    {"macronutrient": "Median", "percentage": 1424},
                    {"macronutrient": "75th percentile", "percentage": 1842},
                    {"macronutrient": "Max", "percentage": 4091},

                ]


                var sourceTab2 = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: dataTab2
                };

                var dataAdapterTab2 = new $.jqx.dataAdapter(sourceTab2);

                $("#table-vitA-2").jqxGrid({
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
                    source: dataAdapterTab2,
                    columnsresize: true,
                    columns: [
                        {text: '', datafield: 'macronutrient'   , width: '70%'},
                        {text: 'µg RAE', datafield: 'percentage',width: '30%'  }
                    ]
                });

                var dataTab3 = [

                    {"macronutrient": "N", "percentage": 472},
                    {"macronutrient": "Mean", "percentage": 127},
                    {"macronutrient": "SD", "percentage": 113},
                    {"macronutrient": "Min", "percentage": 1},
                    {"macronutrient": "25th percentile", "percentage": 53},
                    {"macronutrient": "Median", "percentage": 100},
                    {"macronutrient": "75th percentile", "percentage": 166},
                    {"macronutrient": "Max", "percentage": 878},

                ];


                var sourceTab3 = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: dataTab3
                };

                var dataAdapterTab3 = new $.jqx.dataAdapter(sourceTab3);


                $("#table-vitA-3").jqxGrid({
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
                    source: dataAdapterTab3,
                    columnsresize: true,
                    columns: [
                        {text: 'Macronutrient', datafield: 'macronutrient', width: '70%'},
                        {text: '%', datafield: 'percentage', width: '30%'}
                    ]
                });

                var dataTab4 = [

                    {"macronutrient": "N", "percentage": 156},
                    {"macronutrient": "Mean", "percentage": 243},
                    {"macronutrient": "SD", "percentage": 124},
                    {"macronutrient": "Min", "percentage": 140},
                    {"macronutrient": "25th percentile", "percentage": 167},
                    {"macronutrient": "Median", "percentage": 200},
                    {"macronutrient": "75th percentile", "percentage": 275},
                    {"macronutrient": "Max", "percentage": 878},

                ];


                var sourceTab4 = {
                    datatype: "json",
                    datafields: [
                        {name: 'macronutrient'},
                        {name: 'percentage'}
                    ],
                    localdata: dataTab4
                };

                var dataAdapterTab4 = new $.jqx.dataAdapter(sourceTab4);


                $("#table-vitA-4").jqxGrid({
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
                    source: dataAdapterTab4,
                    columnsresize: true,
                    columns: [
                        {text: 'Macronutrient', datafield: 'macronutrient', width: '70%'},
                        {text: '%', datafield: 'percentage', width: '30%'}
                    ]
                });

                // Grafici


                $("#chart-vitA-1").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: 'Percentage'
                        }
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
                        name: "Vitamin A intakes in µg RAE ",
                        colorByPoint: true,
                        data :[
                            {
                                x:0,
                                y:2.835538752},
                            {
                                x:50,
                                y:10.39697543},
                            {
                                x:100,
                                y:8.695652174},
                            {
                                x:150,
                                y:6.994328922},
                            {
                                x:200,
                                y:6.805293006},
                            {
                                x:250,
                                y:3.59168242},
                            {
                                x:300,
                                y:4.536862004},
                            {
                                x:350,
                                y:4.347826087},
                            {
                                x:400,
                                y:3.780718336},
                            {
                                x:450,
                                y:2.457466919},
                            {
                                x:500,
                                y:3.024574669},
                            {
                                x:550,
                                y:2.646502836},
                            {
                                x:600,
                                y:1.512287335},
                            {
                                x:650,
                                y:1.512287335},
                            {
                                x:700,
                                y:1.512287335},
                            {
                                x:750,
                                y:1.512287335},
                            {
                                x:800,
                                y:2.646502836},
                            {
                                x:850,
                                y:2.835538752},
                            {
                                x:900,
                                y:1.134215501},
                            {
                                x:950,
                                y:0.945179584},
                            {
                                x:1000,
                                y:1.512287335},
                            {
                                x:1050,
                                y:0.945179584},
                            {
                                x:1100,
                                y:1.134215501},
                            {
                                x:1150,
                                y:0.945179584},
                            {
                                x:1200,
                                y:1.890359168},
                            {
                                x:1250,
                                y:0.56710775},
                            {
                                x:1300,
                                y:1.134215501},
                            {
                                x:1350,
                                y:0.945179584},
                            {
                                x:1400,
                                y:0.756143667},
                            {
                                x:1450,
                                y:1.134215501},
                            {
                                x:1500,
                                y:0.756143667},
                            {
                                x:1550,
                                y:0.378071834},
                            {
                                x:1600,
                                y:2.268431002},
                            {
                                x:1650,
                                y:1.134215501},
                            {
                                x:1700,
                                y:1.134215501},
                            {
                                x:1750,
                                y:0.378071834},
                            {
                                x:1800,
                                y:0.56710775},
                            {
                                x:1850,
                                y:0.56710775},
                            {
                                x:1900,
                                y:0.756143667},
                            {
                                x:1950,
                                y:0.189035917},
                            {
                                x:2000,
                                y:0.945179584},
                            {
                                x:2050,
                                y:0.378071834},
                            {
                                x:2100,
                                y:0.56710775},
                            {
                                x:2150,
                                y:0.378071834},
                            {
                                x:2200,
                                y:0.378071834},
                            {
                                x:2250,
                                y:0},
                            {
                                x:2300,
                                y:0.756143667},
                            {
                                x:2350,
                                y:0.189035917},
                            {
                                x:2400,
                                y:0.56710775},
                            {
                                x:2450,
                                y:0.189035917},
                            {
                                x:2500,
                                y:0.189035917},
                            {
                                x:2550,
                                y:0},
                            {
                                x:2600,
                                y:0.189035917},
                            {
                                x:2650,
                                y:0.189035917},
                            {
                                x:2700,
                                y:0},
                            {
                                x:2750,
                                y:0.378071834},
                            {
                                x:2800,
                                y:0},
                            {
                                x:2850,
                                y:0.378071834},
                            {
                                x:2900,
                                y:0},
                            {
                                x:2950,
                                y:0},
                            {
                                x:3000,
                                y:0.189035917},
                            {
                                x:3050,
                                y:0.189035917},
                            {
                                x:3100,
                                y:0},
                            {
                                x:3150,
                                y:0},
                            {
                                x:3200,
                                y:0},
                            {
                                x:3250,
                                y:0},
                            {
                                x:3300,
                                y:0.189035917},
                            {
                                x:3350,
                                y:0},
                            {
                                x:3400,
                                y:0},
                            {
                                x:3450,
                                y:0.189035917},
                            {
                                x:3500,
                                y:0.189035917},
                            {
                                x:3550,
                                y:0},
                            {
                                x:3600,
                                y:0},
                            {
                                x:3650,
                                y:0.189035917},
                            {
                                x:3700,
                                y:0.189035917},
                            {
                                x:3750,
                                y:0},
                            {
                                x:3800,
                                y:0},
                            {
                                x:3850,
                                y:0},
                            {
                                x:3900,
                                y:0},
                            {
                                x:3950,
                                y:0},
                            {
                                x:4000,
                                y:0},
                            {
                                x:4050,
                                y:0},
                            {
                                x:4100,
                                y:0.189035917
                            }
                        ]


                    }]
                });


                $("#chart-vitA-2").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: 'Percentage'
                        }
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
                        name: "Vitamin A intakes in µg RAE ",
                        colorByPoint: true,
                        data :[
                            {
                                x:800,
                                y:5.172413793
                            },
                            {
                                x:850,
                                y:8.620689655
                            },
                            {
                                x:900,
                                y:3.448275862
                            },
                            {
                                x:950,
                                y:2.873563218
                            },
                            {
                                x:1000,
                                y:4.597701149
                            },
                            {
                                x:1050,
                                y:2.873563218
                            },
                            {
                                x:1100,
                                y:3.448275862
                            },
                            {
                                x:1150,
                                y:2.873563218
                            },
                            {
                                x:1200,
                                y:5.747126437
                            },
                            {
                                x:1250,
                                y:1.724137931
                            },
                            {
                                x:1300,
                                y:3.448275862
                            },
                            {
                                x:1350,
                                y:2.873563218
                            },
                            {
                                x:1400,
                                y:2.298850575
                            },
                            {
                                x:1450,
                                y:3.448275862
                            },
                            {
                                x:1500,
                                y:2.298850575
                            },
                            {
                                x:1550,
                                y:1.149425287
                            },
                            {
                                x:1600,
                                y:6.896551724
                            },
                            {
                                x:1650,
                                y:3.448275862
                            },
                            {
                                x:1700,
                                y:3.448275862
                            },
                            {
                                x:1750,
                                y:1.149425287
                            },
                            {
                                x:1800,
                                y:1.724137931
                            },
                            {
                                x:1850,
                                y:1.724137931
                            },
                            {
                                x:1900,
                                y:2.298850575
                            },
                            {
                                x:1950,
                                y:0.574712644
                            },
                            {
                                x:2000,
                                y:2.873563218
                            },
                            {
                                x:2050,
                                y:1.149425287
                            },
                            {
                                x:2100,
                                y:1.724137931
                            },
                            {
                                x:2150,
                                y:1.149425287
                            },
                            {
                                x:2200,
                                y:1.149425287
                            },
                            {
                                x:2250,
                                y:0
                            },
                            {
                                x:2300,
                                y:2.298850575
                            },
                            {
                                x:2350,
                                y:0.574712644
                            },
                            {
                                x:2400,
                                y:1.724137931
                            },
                            {
                                x:2450,
                                y:0.574712644
                            },
                            {
                                x:2500,
                                y:0.574712644
                            },
                            {
                                x:2550,
                                y:0
                            },
                            {
                                x:2600,
                                y:0.574712644
                            },
                            {
                                x:2650,
                                y:0.574712644
                            },
                            {
                                x:2700,
                                y:0
                            },
                            {
                                x:2750,
                                y:1.149425287
                            },
                            {
                                x:2800,
                                y:0
                            },
                            {
                                x:2850,
                                y:1.149425287
                            },
                            {
                                x:2900,
                                y:0
                            },
                            {
                                x:2950,
                                y:0
                            },
                            {
                                x:3000,
                                y:0.574712644
                            },
                            {
                                x:3050,
                                y:0.574712644
                            },
                            {
                                x:3100,
                                y:0
                            },
                            {
                                x:3150,
                                y:0
                            },
                            {
                                x:3200,
                                y:0
                            },
                            {
                                x:3250,
                                y:0
                            },
                            {
                                x:3300,
                                y:0.574712644
                            },
                            {
                                x:3350,
                                y:0
                            },
                            {
                                x:3400,
                                y:0
                            },
                            {
                                x:3450,
                                y:0.574712644
                            },
                            {
                                x:3500,
                                y:0.574712644
                            },
                            {
                                x:3550,
                                y:0
                            },
                            {
                                x:3600,
                                y:0
                            },
                            {
                                x:3650,
                                y:0.574712644
                            },
                            {
                                x:3700,
                                y:0.574712644
                            },
                            {
                                x:3750,
                                y:0
                            },
                            {
                                x:3800,
                                y:0
                            },
                            {
                                x:3850,
                                y:0
                            },
                            {
                                x:3900,
                                y:0
                            },
                            {
                                x:3950,
                                y:0
                            },
                            {
                                x:4000,
                                y:0
                            },
                            {
                                x:4050,
                                y:0
                            },
                            {
                                x:4100,
                                y:0.574712644}
                        ]

                    }]
                });

                $("#chart-vitA-3").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: 'Percentage'
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'Percentage',
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
                        name: "Vitamin A intakes in µg RAE ",
                        colorByPoint: true,
                        data :[
                            {
                                x:0,
                                y:0.63559322
                            },
                            {
                                x:10,
                                y:2.118644068
                            },
                            {
                                x:20,
                                y:6.56779661
                            },
                            {
                                x:30,
                                y:6.355932203
                            },
                            {
                                x:40,
                                y:4.661016949
                            },
                            {
                                x:50,
                                y:5.296610169
                            },
                            {
                                x:60,
                                y:5.084745763
                            },
                            {
                                x:70,
                                y:5.720338983
                            },
                            {
                                x:80,
                                y:6.144067797
                            },
                            {
                                x:90,
                                y:5.296610169
                            },
                            {
                                x:100,
                                y:4.872881356
                            },
                            {
                                x:110,
                                y:4.449152542
                            },
                            {
                                x:120,
                                y:4.872881356
                            },
                            {
                                x:130,
                                y:2.966101695
                            },
                            {
                                x:140,
                                y:4.872881356
                            },
                            {
                                x:150,
                                y:2.754237288
                            },
                            {
                                x:160,
                                y:2.118644068
                            },
                            {
                                x:170,
                                y:2.542372881
                            },
                            {
                                x:180,
                                y:3.177966102
                            },
                            {
                                x:190,
                                y:1.694915254
                            },
                            {
                                x:200,
                                y:2.330508475
                            },
                            {
                                x:210,
                                y:1.694915254
                            },
                            {
                                x:220,
                                y:1.059322034
                            },
                            {
                                x:230,
                                y:0.63559322
                            },
                            {
                                x:240,
                                y:0.423728814
                            },
                            {
                                x:250,
                                y:1.483050847
                            },
                            {
                                x:260,
                                y:1.271186441
                            },
                            {
                                x:270,
                                y:0.63559322
                            },
                            {
                                x:280,
                                y:1.059322034
                            },
                            {
                                x:290,
                                y:0.211864407
                            },
                            {
                                x:300,
                                y:0.423728814
                            },
                            {
                                x:310,
                                y:0.211864407
                            },
                            {
                                x:320,
                                y:0.847457627
                            },
                            {
                                x:330,
                                y:0.63559322
                            },
                            {
                                x:340,
                                y:0.211864407
                            },
                            {
                                x:350,
                                y:0.423728814
                            },
                            {
                                x:360,
                                y:0.211864407
                            },
                            {
                                x:370,
                                y:0.63559322
                            },
                            {
                                x:380,
                                y:0.423728814
                            },
                            {
                                x:390,
                                y:0
                            },
                            {
                                x:400,
                                y:0.423728814
                            },
                            {
                                x:410,
                                y:0.211864407
                            },
                            {
                                x:420,
                                y:0
                            },
                            {
                                x:430,
                                y:0
                            },
                            {
                                x:440,
                                y:0.211864407
                            },
                            {
                                x:450,
                                y:0.211864407
                            },
                            {
                                x:460,
                                y:0
                            },
                            {
                                x:470,
                                y:0.211864407
                            },
                            {
                                x:480,
                                y:0.423728814
                            },
                            {
                                x:490,
                                y:0
                            },
                            {
                                x:500,
                                y:0
                            },
                            {
                                x:510,
                                y:0
                            },
                            {
                                x:520,
                                y:0
                            },
                            {
                                x:530,
                                y:0
                            },
                            {
                                x:540,
                                y:0
                            },
                            {
                                x:550,
                                y:0.211864407
                            },
                            {
                                x:560,
                                y:0
                            },
                            {
                                x:570,
                                y:0
                            },
                            {
                                x:580,
                                y:0
                            },
                            {
                                x:590,
                                y:0.211864407
                            },
                            {
                                x:600,
                                y:0
                            },
                            {
                                x:610,
                                y:0
                            },
                            {
                                x:620,
                                y:0
                            },
                            {
                                x:630,
                                y:0
                            },
                            {
                                x:640,
                                y:0
                            },
                            {
                                x:650,
                                y:0
                            },
                            {
                                x:660,
                                y:0
                            },
                            {
                                x:670,
                                y:0
                            },
                            {
                                x:680,
                                y:0.211864407
                            },
                            {
                                x:690,
                                y:0
                            },
                            {
                                x:700,
                                y:0
                            },
                            {
                                x:710,
                                y:0
                            },
                            {
                                x:720,
                                y:0
                            },
                            {
                                x:730,
                                y:0
                            },
                            {
                                x:740,
                                y:0
                            },
                            {
                                x:750,
                                y:0.211864407
                            },
                            {
                                x:760,
                                y:0
                            },
                            {
                                x:770,
                                y:0
                            },
                            {
                                x:780,
                                y:0
                            },
                            {
                                x:790,
                                y:0.211864407
                            },
                            {
                                x:800,
                                y:0
                            },
                            {
                                x:810,
                                y:0
                            },
                            {
                                x:820,
                                y:0
                            },
                            {
                                x:830,
                                y:0
                            },
                            {
                                x:840,
                                y:0
                            },
                            {
                                x:850,
                                y:0
                            },
                            {
                                x:860,
                                y:0
                            },
                            {
                                x:870,
                                y:0
                            },
                            {
                                x:880,
                                y:0.211864407
                            }]

                    }]
                });



                $("#chart-vitA-4").highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: 'Percentage'
                        }
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
                        name: "Vitamin A intakes in µg RAE ",
                        colorByPoint: true,
                        data :[{
                            x:140,
                            y:8.974358974
                        },
                            {
                                x:150,
                                y:8.333333333
                            },
                            {
                                x:160,
                                y:6.41025641
                            },
                            {
                                x:170,
                                y:7.692307692
                            },
                            {
                                x:180,
                                y:9.615384615
                            },
                            {
                                x:190,
                                y:5.128205128
                            },
                            {
                                x:200,
                                y:7.051282051
                            },
                            {
                                x:210,
                                y:5.128205128
                            },
                            {
                                x:220,
                                y:3.205128205
                            },
                            {
                                x:230,
                                y:1.923076923
                            },
                            {
                                x:240,
                                y:1.282051282
                            },
                            {
                                x:250,
                                y:4.487179487
                            },
                            {
                                x:260,
                                y:3.846153846
                            },
                            {
                                x:270,
                                y:1.923076923
                            },
                            {
                                x:280,
                                y:3.205128205
                            },
                            {
                                x:290,
                                y:0.641025641
                            },
                            {
                                x:300,
                                y:1.282051282
                            },
                            {
                                x:310,
                                y:0.641025641
                            },
                            {
                                x:320,
                                y:2.564102564
                            },
                            {
                                x:330,
                                y:1.923076923
                            },
                            {
                                x:340,
                                y:0.641025641
                            },
                            {
                                x:350,
                                y:1.282051282
                            },
                            {
                                x:360,
                                y:0.641025641
                            },
                            {
                                x:370,
                                y:1.923076923
                            },
                            {
                                x:380,
                                y:1.282051282
                            },
                            {
                                x:390,
                                y:0
                            },
                            {
                                x:400,
                                y:1.282051282
                            },
                            {
                                x:410,
                                y:0.641025641
                            },
                            {
                                x:420,
                                y:0
                            },
                            {
                                x:430,
                                y:0
                            },
                            {
                                x:440,
                                y:0.641025641
                            },
                            {
                                x:450,
                                y:0.641025641
                            },
                            {
                                x:460,
                                y:0
                            },
                            {
                                x:470,
                                y:0.641025641
                            },
                            {
                                x:480,
                                y:1.282051282
                            },
                            {
                                x:490,
                                y:0
                            },
                            {
                                x:500,
                                y:0
                            },
                            {
                                x:510,
                                y:0
                            },
                            {
                                x:520,
                                y:0
                            },
                            {
                                x:530,
                                y:0
                            },
                            {
                                x:540,
                                y:0
                            },
                            {
                                x:550,
                                y:0.641025641
                            },
                            {
                                x:560,
                                y:0
                            },
                            {
                                x:570,
                                y:0
                            },
                            {
                                x:580,
                                y:0
                            },
                            {
                                x:590,
                                y:0.641025641
                            },
                            {
                                x:600,
                                y:0
                            },
                            {
                                x:610,
                                y:0
                            },
                            {
                                x:620,
                                y:0
                            },
                            {
                                x:630,
                                y:0
                            },
                            {
                                x:640,
                                y:0
                            },
                            {
                                x:650,
                                y:0
                            },
                            {
                                x:660,
                                y:0
                            },
                            {
                                x:670,
                                y:0
                            },
                            {
                                x:680,
                                y:0.641025641
                            },
                            {
                                x:690,
                                y:0
                            },
                            {
                                x:700,
                                y:0
                            },
                            {
                                x:710,
                                y:0
                            },
                            {
                                x:720,
                                y:0
                            },
                            {
                                x:730,
                                y:0
                            },
                            {
                                x:740,
                                y:0
                            },
                            {
                                x:750,
                                y:0.641025641
                            },
                            {
                                x:760,
                                y:0
                            },
                            {
                                x:770,
                                y:0
                            },
                            {
                                x:780,
                                y:0
                            },
                            {
                                x:790,
                                y:0.641025641
                            },
                            {
                                x:800,
                                y:0
                            },
                            {
                                x:810,
                                y:0
                            },
                            {
                                x:820,
                                y:0
                            },
                            {
                                x:830,
                                y:0
                            },
                            {
                                x:840,
                                y:0
                            },
                            {
                                x:850,
                                y:0
                            },
                            {
                                x:860,
                                y:0
                            },
                            {
                                x:870,
                                y:0
                            },
                            {
                                x:880,
                                y:0.641025641
                            }]

                    }]
                });



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
                                src:"src/images/ready/safety/tablechart1.jpg"
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/kg body weight/day over 2 days in consumers only",
                                "Gender": "Male and Female",
                                "Age_range": "24-59 months",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                src:"src/images/ready/safety/tablechart2.jpg"
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/day over 2 days in consumers only",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                src:"src/images/ready/safety/tablechart3.jpg"
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/day over 2 days in consumers only",
                                "Gender": "Male and Female",
                                "Age_range": "24-59 months",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                src:"src/images/ready/safety/tablechart4.jpg"
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
                "elements_1": [
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

                            }
                        ]
                    }],
                elements_2: [{
                    "indicators": [
                        {
                            "indicator": "Minimum Dietary Diversity-Women (MDD-W): Frequency of consumption of each food group over 1 day",
                            "Gender": "Female",
                            "Age_range": "19-50 years",
                            "Survey": "Bangladesh HarvestPlus, 2008",
                            "src": "src/images/ready/image_consu_2.jpg"
                        }
                    ]
                }],
                "comments": "Less than one woman out of four reaches the Minimum Dietary Diversity-Women cut-off of 5 out of ten food groups consumed in one day. Three quarter of the women have a diversity score between 3 and 4 and none consumes more than 7 food groups over a day. This suggests a fairly low diversity of the diet. The five most frequently consumed food groups were, in order, 'all starchy staples', 'other vegetables', 'dark green leafy vegetables', 'flesh foods' and 'beans and peas'. The frequency of consumption of 'Nuts and seeds', 'eggs' and 'all dairy', three key sources of protein, was particularly low."

            },
            template: "templates/ready/consumption.hbs",
            onEnter: function () {

                var data = [
                    {"macronutrient": "N", "percentage": 422},
                    {"macronutrient": "Mean", "percentage": 3.7},
                    {"macronutrient": "SD", "percentage": 1.1},
                    {"macronutrient": "Min", "percentage": 1},
                    {"macronutrient": "25th percentile", "percentage": 3},
                    {"macronutrient": "Median", "percentage": 4},
                    {"macronutrient": "75th percentile", "percentage": 4},
                    {"macronutrient": "Max", "percentage": 7}

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
                        {text: 'Stats', datafield: 'macronutrient'},
                        {text: 'Value', datafield: 'percentage'}
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
                    credits: {
                        enabled: false
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
                            name: "less than 5 ",
                            y: 77
                        }, {
                            name: "greater than or equal to 5",
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
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: 'Percentage'
                        }
                    },
                    xAxis: {
                        allowDecimals: false,
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: false,
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
                        name: "Minimum Dietary Diversity-Women (MDD-W): Number of food groups consumed over 1 day",
                        colorByPoint: false,
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
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
                                x: "All starchy staples",
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
                                x: "Nuts and seeds",
                                y: 1.66
                            },
                            {
                                x: "Dark green leafy vegetables",
                                y: 44.31
                            },
                            {
                                x: " Other vitamin A-rich vegetables and fruits",
                                y: 20.38
                            },
                            {
                                x: "Other fruits",
                                y: 15.88
                            },
                            {
                                x: "Other vegetables",
                                y: 88.63
                            }

                        ]
                    }]
                });

            }
        }


    }
})