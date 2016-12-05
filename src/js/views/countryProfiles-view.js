/*global define, _:false, $, console, amplify, FM*/
define([
    'jquery',
    'views/base/view',
    'config/config',
    'config/Queries',
    'config/events',
    'i18n!nls/countryProfiles',
    'text!templates/countryProfiles/profile.hbs',
    'handlebars',
    'fx-chart/start',
    'pdfmake.min',
    'vfs_fonts',
    'amplify'
], function ($,View, C, Q, E, i18nLabels, template,Handlebars,Chart) {

    'use strict';

    var s = {
        PRINT_REPORT: '#printPage',
        PRINT_AREA: '.print'
    };

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return {
              country_id : this.country_id,
              country_name: this.country_name
            };
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'countryProfiles'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();

          //  this.getBase64Image(img);

        },

        initVariables: function () {


        },

        initComponents: function () {


        },

        //Page section initialization
        _initDatabaseUpdatesList: function() {


        },

        printDatabaseUpdate: function (u) {


        },

        _initDocumentsLinkList: function () {

        },

        printDocuments: function (d) {

        },

        configurePage: function () {

        },

        bindEventListeners: function () {
          var self = this;
          var tableData = [];
          var latest = [];
          var year = _.range(2000,2009,1);
          var dataSet1 = [];
          var flag_pdf = [];

            $(document).ready(function(){
              //var baseUrl = C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/uid/"
              var baseUrl = "src/js/templates/countryProfiles/data/";
              var DemographicTrends = i18nLabels.Indicators.DemographicTrends;
              var Health = i18nLabels.Indicators.Health;
              var Education = i18nLabels.Indicators.Education;
              var Poverty = i18nLabels.Indicators.Poverty;
              var Gender = i18nLabels.Indicators.Gender;
              var Energy = i18nLabels.Indicators.Energy;
              var Disaster = i18nLabels.Indicators.Disaster;
              var Environment = i18nLabels.Indicators.Environment;
              var gdp = i18nLabels.Indicators.GDP;
              var Labour = i18nLabels.Indicators.Labour;
              var Trade = i18nLabels.Indicators.Trade;
              var Financing = i18nLabels.Indicators.Financing;
              var sti = i18nLabels.Indicators.STI;
              var Connectivity = i18nLabels.Indicators.Connectivity;
              var Governance = i18nLabels.Indicators.Governance;
              var Insecurities = i18nLabels.Indicators.Insecurities;

              var HealthGraph = i18nLabels.Graphs.Health;
              var EnergyGraph = i18nLabels.Graphs.Energy;
              var gdpGraph = i18nLabels.Graphs.GDP;
              var TradeGraph = i18nLabels.Graphs.Trade;
              var flag ='src/images/escap/cou_'+self.country_id+'.png';
              //var flag = $('#flag');


              var FX = { metadata:{ dsd:{ columns:[
                {"id" : "country","title" : {"EN" : "Country Code"},key:true},
                {"id" : "Unit_Id","title" : {"EN" : "Unit Code"},key:true},
                {"id" : "value","title" : {"EN" : "Data Value"},subject:"value",dataType:"number"},
                {"id" : "Year","title" : {"EN" : "Year"},key:true,subject:"time"},
                {"id" : "Structure_Id","title":{"EN" : "Indicator Classification"}},
                {"id" : "country_EN","title" : {"EN" : "Country"}},
                {"id" : "Unit_EN","title" : {"EN" : "Unit"}},
                {"id" : "Indicator_EN","title" : {"EN" : "Indicator Name"}}]}},
                "data" : dataSet1};
              //  console.log(FX);
              toDataUrl(flag,function(base64Image){
                 flag_pdf.push(base64Image);

              });


              //DemographicTrends Profile
              $('#demog_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
              'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
              var image1 = 'src/images/escap/10.png';
              toDataUrl(image1,function(base64Image){
                 flag_pdf.push(base64Image);
              });
              var demog_data = [['','Earliest','Latest']];
              _.each(DemographicTrends,function(obj){
                var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
                $.ajax({
                  async: false,
                  dataType: 'json',
                  url: dataUrl,
                  contentType: "application/json; charset=utf-8",
                  type: 'get',
                  success:function(res) {
                    var dataSet = _.filter(res["data"],function(obj1){
                      return obj1[0] == self.country_id;
                    });

                    var earliest_data = [];
                    _.each(year, function(y){
                      var earliest = _.find(dataSet,function(obj2){
                        return obj2[3] == y;
                      });
                      if(earliest){
                        earliest_data.push({"year":earliest[3],
                                       "value":earliest[2]});
                      }
                    });

                    var earliest = _.first(earliest_data);
                    var latest = _.last(dataSet);

                    if(!earliest && !latest){
                      var indic = obj.Indicator+" ("+obj.Unit+")";

                      $('#demog_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                      demog_data.push([indic,'-','-']);
                    }else if(!earliest){
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                      $('#demog_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                      demog_data.push([indic,'-',latest[2].toFixed(1)]);
                    }else if(!latest){
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                      $('#demog_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                      demog_data.push([indic,earliest.value.toFixed(1),'-']);
                    }else{
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                      $('#demog_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                      demog_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                    }

                  }
                });
              });

              //Health Profile
              $('#health_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
              'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
              var health_data = [['','Earliest','Latest']];
              var image2 = 'src/images/escap/20.png';
              toDataUrl(image2,function(base64Image){
                 flag_pdf.push(base64Image);
              });
              _.each(Health,function(obj){
                var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
                $.ajax({
                  async: false,
                  dataType: 'json',
                  url: dataUrl,
                  contentType: "application/json; charset=utf-8",
                  type: 'get',
                  success:function(res) {
                    var dataSet = _.filter(res["data"],function(obj1){
                      return obj1[0] == self.country_id;
                    });

                    var earliest_data = [];
                    _.each(year, function(y){
                      var earliest = _.find(dataSet,function(obj2){
                        return obj2[3] == y;
                      });
                      if(earliest){
                        earliest_data.push({"year":earliest[3],
                                       "value":earliest[2]});
                      }
                    });

                    var earliest = _.first(earliest_data);
                    var latest = _.last(dataSet);
                    if(!earliest && !latest){
                      var indic = obj.Indicator+" ("+obj.Unit+")";

                      $('#health_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                      health_data.push([indic,'-','-']);
                    }else if(!earliest){
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                      $('#health_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                      health_data.push([indic,'-',latest[2].toFixed(1)]);
                    }else if(!latest){
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                      $('#health_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                      health_data.push([indic,earliest.value.toFixed(1),'-']);
                    }else{
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                      $('#health_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                      health_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                    }
                  }
                });
              });

            //Education Profile
              $('#education_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
              'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
              var education_data = [['','Earliest','Latest']];
              var image3 = 'src/images/escap/30.png';
              toDataUrl(image3,function(base64Image){
                 flag_pdf.push(base64Image);
              });
              _.each(Education,function(obj){
                var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
                $.ajax({
                  async: false,
                  dataType: 'json',
                  url: dataUrl,
                  contentType: "application/json; charset=utf-8",
                  type: 'get',
                  success:function(res) {
                    var dataSet = _.filter(res["data"],function(obj1){
                      return obj1[0] == self.country_id;
                    });

                    var earliest_data = [];
                    _.each(year, function(y){
                      var earliest = _.find(dataSet,function(obj2){
                        return obj2[3] == y;
                      });
                      if(earliest){
                        earliest_data.push({"year":earliest[3],
                                       "value":earliest[2]});
                      }
                    });

                    var earliest = _.first(earliest_data);
                    var latest = _.last(dataSet);
                    if(!earliest && !latest){
                      var indic = obj.Indicator+" ("+obj.Unit+")";

                      $('#education_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                      education_data.push([indic,'-','-']);
                    }else if(!earliest){
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                      $('#education_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                      education_data.push([indic,'-',latest[2].toFixed(1)]);
                    }else if(!latest){
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                      $('#education_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                      education_data.push([indic,earliest.value.toFixed(1),'-']);
                    }else{
                      var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                      $('#education_table').append('<tr><td>'+indic+
                      '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                      education_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                    }
                  }
                });
              });

          //Poverty Profile
          $('#poverty_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var poverty_data = [['','Earliest','Latest']];
          var image4 = 'src/images/escap/40.png';
          toDataUrl(image4,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Poverty,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#poverty_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  poverty_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#poverty_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  poverty_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#poverty_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  poverty_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#poverty_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  poverty_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //Gender Profile
          $('#gender_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var gender_data = [['','Earliest','Latest']];
          var image5 = 'src/images/escap/50.png';
          toDataUrl(image5,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Gender,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#gender_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  gender_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#gender_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  gender_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#gender_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  gender_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#gender_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  gender_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //Energy Profile
          $('#energy_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var energy_data = [['','Earliest','Latest']];
          var image6 = 'src/images/escap/60.png';
          toDataUrl(image6,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Energy,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#energy_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  energy_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#energy_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  energy_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#energy_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  energy_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#energy_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  energy_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

        /*  _.each(EnergyGraph, function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                //console.log(res["data"]);

              }
            });
          });*/

          //Disaster Profile
          $('#disaster_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var disaster_data = [['','Earliest','Latest']];
          var image7 = 'src/images/escap/70.png';
          toDataUrl(image7,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Disaster,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#disaster_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  disaster_data.push([indic,'-','-']);

                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#disaster_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  disaster_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#disaster_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  disaster_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#disaster_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  disaster_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });


          //Environment Profile
          $('#environment_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var environment_data = [['','Earliest','Latest']];
          var image8 = 'src/images/escap/80.png';
          toDataUrl(image8,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Environment,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#environment_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  environment_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#environment_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  environment_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#environment_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  environment_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#environment_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  environment_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //GDP Profile
          $('#gdp_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var gdp_data = [['','Earliest','Latest']];
          var image9 = 'src/images/escap/90.png';
          toDataUrl(image9,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(gdp,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" ;

                  $('#gdp_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  gdp_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#gdp_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  gdp_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#gdp_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  gdp_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#gdp_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  gdp_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          _.each(gdpGraph, function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });
                 var y = _.last(dataSet)
                 var years = _.range(2000,y[3],1);
                _.each(years,function(obj2){
                  var dataVal2 = _.filter(dataSet,function(obj3){
                    return obj3[3] == obj2;
                  });

                  if(dataVal2.length != 0) {
                    dataSet1.push(dataVal2[0]);
                  }
                });
                //console.log(dataSet1);
              }
            });
          });

          var chart_config = {
                                series :["Indicator_EN","country_EN","Unit_EN"],
                                x :["Year"],
                                aggregations:["Indicator_EN"],
                                y:["value"],
                                aggregationFn:{value:"sum"},
                                formatter:"value",
                                decimals:1,
                                model:FX,
                                el:$('#gdp_graph'),
                                type:"column"
                              };
          $('#gdp_title').html('<label>'+gdpGraph[0].Indicator+'</label>').show();
          self.chart = new Chart(chart_config);

          //Labour Profile
          $('#labour_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var labour_data = [['','Earliest','Latest']];
          var image10 = 'src/images/escap/100.png';
          toDataUrl(image10,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Labour,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+") " ;

                  $('#labour_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  labour_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#labour_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  labour_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#labour_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  labour_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#labour_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  labour_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //Trade Profile
          $('#trade_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var trade_data = [['','Earliest','Latest']];
          var image11 = 'src/images/escap/110.png';
          toDataUrl(image11,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Trade,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#trade_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  trade_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#trade_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  trade_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#trade_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  trade_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#trade_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  trade_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          var dataSet2 = [];
          _.each(TradeGraph, function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });
                 var y = _.last(dataSet)
                 var years = _.range(2000,y[3],1);
                _.each(years,function(obj2){
                  var dataVal2 = _.filter(dataSet,function(obj3){
                    return obj3[3] == obj2;
                  });

                  if(dataVal2.length != 0) {
                    dataSet2.push(dataVal2[0]);
                  }
                });
                FX.data = dataSet2;
                //console.log(dataSet2);
              }
            });
          });
          $('#trade_title').html('<label>Merchandise Imports and Exports in Million USD</label>').show();
          var chart_config = {
                                series :["Indicator_EN","Country_EN","Unit_EN"],
                                x :["Year"],
                                aggregations:["Indicator_EN"],
                                y:["value"],
                                aggregationFn:{value:"sum"},
                                formatter:"value",
                                decimals:1,
                                model:FX,
                                el:$('#trade_graph'),
                                type:"line"
                              };
            self.chart = new Chart(chart_config);



          //Financing Profile
          $('#financing_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var financing_data = [['','Earliest','Latest']];
          var image12 = 'src/images/escap/120.png';
          toDataUrl(image12,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Financing,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#financing_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  financing_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#financing_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  financing_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#financing_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  financing_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#financing_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  financing_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //STI Profile
          $('#sti_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var sti_data = [['','Earliest','Latest']];
          var image13 = 'src/images/escap/130.png';
          toDataUrl(image13,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(sti,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+") ";

                  $('#sti_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  sti_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#sti_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  sti_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#sti_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  sti_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#sti_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  sti_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //Connectivity Profile
          $('#connectivity_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var connectivity_data = [['','Earliest','Latest']];
          var image14 = 'src/images/escap/140.png';
          toDataUrl(image14,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Connectivity,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")";

                  $('#connectivity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  connectivity_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#connectivity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  connectivity_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#connectivity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  connectivity_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#connectivity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  connectivity_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //Governance Profile
          $('#governance_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var governance_data = [['','Earliest','Latest']];
          var image15 = 'src/images/escap/150.png';
          toDataUrl(image15,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Governance,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+") ";

                  $('#governance_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  governance_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#governance_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  governance_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#governance_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  governance_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#governance_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  governance_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });

          //Insecurities Profile
          $('#insecurity_table').html('<tr><td class="col-md-4"></td><td class="col-md-1" style="text-align: right;">'+
          'Earliest</td><td class="col-md-1" style="text-align: right;">Latest</td></tr>').show();
          var insecurity_data = [['','Earliest','Latest']];
          var image16 = 'src/images/escap/160.png';
          toDataUrl(image16,function(base64Image){
             flag_pdf.push(base64Image);
          });
          _.each(Insecurities,function(obj){
            var dataUrl = baseUrl+ "INDICATOR_"+obj.I_Id+".json";
            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {
                var dataSet = _.filter(res["data"],function(obj1){
                  return obj1[0] == self.country_id;
                });

                var earliest_data = [];
                _.each(year, function(y){
                  var earliest = _.find(dataSet,function(obj2){
                    return obj2[3] == y;
                  });
                  if(earliest){
                    earliest_data.push({"year":earliest[3],
                                   "value":earliest[2]});
                  }
                });

                var earliest = _.first(earliest_data);
                var latest = _.last(dataSet);
                if(!earliest && !latest){
                  var indic = obj.Indicator+" ("+obj.Unit+") ";

                  $('#insecurity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;"> - </td></td></tr>').show();
                  insecurity_data.push([indic,'-','-']);
                }else if(!earliest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", ,"+latest[3];

                  $('#insecurity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;"> - </td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  insecurity_data.push([indic,'-',latest[2].toFixed(1)]);
                }else if(!latest){
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+",";

                  $('#insecurity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;"> - </td></tr>').show();
                  insecurity_data.push([indic,earliest.value.toFixed(1),'-']);
                }else{
                  var indic = obj.Indicator+" ("+obj.Unit+")" + ", "+earliest.year+", "+latest[3];

                  $('#insecurity_table').append('<tr><td>'+indic+
                  '<td style="text-align: right;">'+earliest.value.toFixed(1)+'</td><td style="text-align: right;">'+latest[2].toFixed(1)+'</td></tr>').show();
                  insecurity_data.push([indic,earliest.value.toFixed(1),latest[2].toFixed(1)]);
                }
              }
            });
          });


          //print profile

          console.log(flag_pdf);
          var country_name= "'" +self.country_name+ "'";
          var date = new Date();
          var docDefinition = {
            info: {
              title: 'Country Profile',
              author: 'UNESCAP Statistics Division'
            },
            footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount},
            header: function() {
                  return { text: 'ESCAP Online Statistical Database',
                  alignment: 'right',
                  italics: true,
                  fontSize: 6,
                  margin: 10};
              },
            content: [
              {columns:[
                {
                  width:'*',
                  text: 'Statistical Profile - '+ self.country_name , style: 'header',margin: 5
                },
                {
                  width:50,
                  height:28,
                  alignment:'right',
                  image: 'flag'
                }
              ]},
              {columns:[
              { width:'50%',
                columns:[
                  {
                    width:20,
                    height:20,
                    alignment:'left',
                    image:'demog'
                  },
                  {
                    width: '*',
                    text:'Demographic Trends',
                    fontSize:14,
                    margin: 5
                  }
                ]
              },
             { width:'50%',
             columns:[
               {
                 width:20,
                 height:20,
                 alignment:'left',
                 image:'health'
               },
               {
                 width: '*',
                 text:'Health',
                 fontSize:14,
                 margin: 5
               }
             ]
             }
           ],
          columnGap: 5},
            {columns: [
              {
                width: '50%',
                margin: 5,
                style: 'tableHeader',
                table: {
                  headerRows: 1,
                  widths: [ '60%', '20%', '20%'],

                  body: demog_data
                }
              },
              {
                width: '50%',
                style: 'tableHeader',
                table: {
                  headerRows: 1,
                  widths: [ '*', 'auto', 'auto'],

                  body: health_data
                }
              }
            ],
          columnGap: 5},
            {columns:[
              { width:'50%',
              columns:[
                {
                  width:20,
                  height:20,
                  alignment:'left',
                  image:'education'
                },
                {
                  width: '*',
                  text:'Education',
                  fontSize:14,
                  margin: 5
                }
              ]
              },
             { width:'50%',
             columns:[
               {
                 width:20,
                 height:20,
                 alignment:'left',
                 image:'poverty'
               },
               {
                 width: '*',
                 text:'Poverty',
                 fontSize:14,
                 margin: 5
               }
             ]
             }
           ]},
            {columns:[
              {
                width: '50%',
                margin: 5,
                style: 'tableHeader',
                table: {
                  headerRows: 1,
                  widths: [ '*', 'auto', 'auto'],

                  body: education_data
                }
              },
              {
                width: '50%',
                margin: 5,
                style: 'tableHeader',
                table: {
                  headerRows: 1,
                  widths: [ '*', 'auto', 'auto'],

                  body: poverty_data
                },
                pageBreak: 'after'
              },
            ],
          columnGap: 5,
          },
            {columns:[
              { width:'50%',
              columns:[
                {
                  width:20,
                  height:20,
                  alignment:'left',
                  image:'gender'
                },
                {
                  width: '*',
                  text:'Gender',
                  fontSize:14,
                  margin: 5
                }
              ]
              },
             { width:'50%',
             columns:[
               {
                 width:20,
                 height:20,
                 alignment:'left',
                 image:'energy'
               },
               {
                 width: '*',
                 text:'Energy and Natural Resources',
                 fontSize:14,
                 margin: 5
               }
             ]
             }
           ],
          columnGap: 5},
           {columns:[
             {
               width: '50%',
               margin: 5,
               style: 'tableHeader',
               table: {
                 headerRows: 1,
                 widths: [ '*', 'auto', 'auto'],

                 body: gender_data
               }
             },
             {
               width: '50%',
               margin: 5,
               style: 'tableHeader',
               table: {
                 headerRows: 1,
                 widths: [ '*', 'auto', 'auto'],

                 body: energy_data
               }
             },
           ],
          columnGap: 5},
           {columns:[
             { width:'50%',
             columns:[
               {
                 width:20,
                 height:20,
                 alignment:'left',
                 image:'disaster'
               },
               {
                 width: '*',
                 text:'Disasters',
                 fontSize:14,
                 margin: 5
               }
             ]
             },
            { width:'50%',
            columns:[
              {
                width:20,
                height:20,
                alignment:'left',
                image:'environment'
              },
              {
                width: '*',
                text:'Environment',
                fontSize:14,
                margin: 5
              }
            ]
            }
          ],
          columnGap: 5},
          {columns:[
            {
              width: '50%',
              margin: 5,
              style: 'tableHeader',
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', 'auto'],

                body: disaster_data
              }
            },
            {
              width: '50%',
              margin: 5,
              style: 'tableHeader',
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', 'auto'],

                body: environment_data
              },
              pageBreak: 'after'
            },
          ],
          columnGap: 5},
          {columns:[
            { width:'50%',
            columns:[
              {
                width:20,
                height:20,
                alignment:'left',
                image:'gdp'
              },
              {
                width: '*',
                text:'GDP',
                fontSize:14,
                margin: 5
              }
            ]
            },
           { width:'50%',
           columns:[
             {
               width:20,
               height:20,
               alignment:'left',
               image:'labour'
             },
             {
               width: '*',
               text:'Labour',
               fontSize:14,
               margin: 5
             }
           ]
           }
         ],
        columnGap: 5},
          {columns:[
            {
              width: '50%',
              margin: 5,
              style: 'tableHeader',
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', 'auto'],

                body: gdp_data
              }
            },
            {
              width: '50%',
              margin: 5,
              style: 'tableHeader',
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', 'auto'],

                body: labour_data
              }
            },
          ],
         columnGap: 5},
          {columns:[
            { width:'50%',
            columns:[
              {
                width:20,
                height:20,
                alignment:'left',
                image:'trade'
              },
              {
                width: '*',
                text:'Trade',
                fontSize:14,
                margin: 5
              }
            ]
            },
           { width:'50%',
           columns:[
             {
               width:20,
               height:20,
               alignment:'left',
               image:'financing'
             },
             {
               width: '*',
               text:'Financing',
               fontSize:14,
               margin: 5
             }
           ]
           }
         ],
        columnGap: 5},
          {columns:[
            {
              width: '50%',
              margin: 5,
              style: 'tableHeader',
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', 'auto'],

                body: trade_data
              }
            },
            {
              width: '50%',
              margin: 5,
              style: 'tableHeader',
              table: {
                headerRows: 1,
                widths: [ '*', 'auto', 'auto'],

                body: financing_data
              },
              pageBreak: 'after'
            },
          ],
          columnGap: 5},
          {columns:[
            { width:'50%',
            columns:[
              {
                width:20,
                height:20,
                alignment:'left',
                image:'sti'
              },
              {
                width: '*',
                text:'Science, Technology and Innovation',
                fontSize:14,
                margin: 5
              }
            ]
            },
           { width:'50%',
           columns:[
             {
               width:20,
               height:20,
               alignment:'left',
               image:'connectivity'
             },
             {
               width: '*',
               text:'Connectivity',
               fontSize:14,
               margin: 5
             }
           ]
           }
         ],
        columnGap: 5},
         {columns:[
           {
             width: '50%',
             margin: 5,
             style: 'tableHeader',
             table: {
               headerRows: 1,
               widths: [ '*', 'auto', 'auto'],

               body: sti_data
             }
           },
           {
             width: '50%',
             margin: 5,
             style: 'tableHeader',
             table: {
               headerRows: 1,
               widths: [ '*', 'auto', 'auto'],

               body: connectivity_data
             }
           },
         ],
        columnGap: 5},
         {columns:[
           { width:'50%',
           columns:[
             {
               width:20,
               height:20,
               alignment:'left',
               image:'governance'
             },
             {
               width: '*',
               text:'Governance',
               fontSize:14,
               margin: 5
             }
           ]
           },
          { width:'50%',
          columns:[
            {
              width:20,
              height:20,
              alignment:'left',
              image:'insecurity'
            },
            {
              width: '*',
              text:'Insecurity',
              fontSize:14,
              margin: 5
            }
          ]
          }
        ],
        columnGap: 5},
         {columns:[
           {
             width: '50%',
             margin: 5,
             style: 'tableHeader',
             table: {
               headerRows: 1,
               widths: [ '*', 'auto', 'auto'],

               body: governance_data
             }
           },
           {
             width: '50%',
             margin: 5,
             style: 'tableHeader',
             table: {
               headerRows: 1,
               widths: [ '*', 'auto', 'auto'],

               body: insecurity_data
             }
           },
         ],
        columnGap: 5},
        {text:'Source : //www.unescap.org/stat/data/',fontSize:9,margin:10},
        {text: 'Printed on:'+ date.toDateString(),fontSize:9, margin:10}
          ],
          images: {
            flag: flag_pdf[0],
            demog: flag_pdf[1],
            health: flag_pdf[2],
            education: flag_pdf[3],
            poverty: flag_pdf[4],
            gender: flag_pdf[5],
            energy: flag_pdf[6],
            disaster: flag_pdf[7],
            environment:flag_pdf[8],
            gdp: flag_pdf[9],
            labour: flag_pdf[10],
            trade:flag_pdf[11],
            financing: flag_pdf[12],
            sti: flag_pdf[13],
            connectivity: flag_pdf[14],
            governance: flag_pdf[15],
            insecurity:flag_pdf[16]
          },
          styles: {
            header: {
            fontSize: 22,
            bold: true
          },
          tableHeader: {
			        fontSize: 8,
           }
          }
        };
           console.log(docDefinition);
          $('#profile').on('click',function(){
            pdfMake.createPdf(docDefinition).download('StatisticalProfile.pdf');
          });

          function toDataUrl(file,callback) {
           var xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = function() {
             var reader = new FileReader();
             reader.onloadend = function() {
              callback(reader.result);
           }
             reader.readAsDataURL(xhr.response);
          };
           xhr.open('GET', file);
           xhr.send();
           }
        });

        },

        unbindEventListeners: function () {

        },
        printDocuments: function (d) {

        },
        configurePage: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        initialize: function(params){
          var self = this;

          var country = params.country.id.split('_');
          self.country_name = country[0].replace(/%20/g, " ");
          self.country_id = country[1];

        }
    });

    return HomeView;
});
