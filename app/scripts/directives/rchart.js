'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:rChart
 * @description
 * # rChart
 */
angular.module('statsdsuApp')
  .directive('rChart', function () {
    return {
      template: '<div class="well">'+
    '<div class="core-subtitle">{{rSource.title}}</h2></div>'+
'<p>{{rSource.content}}</p>'+
'<br>'+
'<div class="row">'+
  '<div class="col-md-4">'+
  '<div ng-model="rSource.src" ui-ace="aceOptions"></div>'+
  '<input type="submit" value="Submit" class="btn btn-success" ng-click="makeChart(rSource)" />'+
  '</div>'+
  '<div class="col-md-8">'+
  '<iframe class="output" ng-src="{{result}}" seamless></iframe>'+
'</div>'+
'</div>'+
'</div>',
      scope:{rSource:'='},
      restrict: 'E',
      link:
        function(scope, element, attrs, controllers){
          scope.aceOptions = {
            theme: 'solarized_dark',
            mode: 'r',
            useWrapMode : true
          };
          ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");

          scope.makeChart = function(example){
            var req = ocpu.call("make_chart", {
              text: example.src
            }, function(session){
              element.find('iframe').attr('src', session.getLoc() + 'files/output.html');
              //$("#output"+num).attr('src', session.getLoc() + "files/output.html");

            }).fail(function(text){
              alert("Error: " + req.responseText);
            });
          };
          scope.makeChart(scope.rSource);
        }
    };
  });