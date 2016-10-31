'use strict';

/**
 * @ngdoc directive <course-cnt>
 * @name statsdsuApp.directive:courseCnt
 * @description
 * # courseCnt
 */
angular.module('statsdsuApp')
  .directive('courseCnt', function (rpcFactory, activityScore) {
    return {
      templateUrl: 'views/templates/courseCntDirective.html',
      scope:{target:'=', name:'=', type:'='},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var materials = [];
        var challenge = [];
        var initialMatLength, initialChalLength = 0;
        if(scope.target !== undefined){
          materials= scope.target.material
          challenge = scope.target.challenge

          initialMatLength = materials.length;
          initialChalLength = challenge.length;

          scope.history=[];
          scope.crntContent = _.first(materials);
          console.log(scope.target.$id)
          scope.history.push(_.first(materials))
          _.pullAt(materials, 0);
        }

        scope.popCnt = function() {
          console.log(scope.target.$id)
          if (materials.length != 0) {
            scope.history.push({cnt: _.first(materials), type:'material'})
            console.log('ddd '+materials);
            _.pullAt(materials, 0);
          } else if(materials.length==0 && challenge!=0) {
            scope.history.push({cnt: _.first(challenge), type:'challenge'})
            _.pullAt(challenge, 0);
          } else{
            alert("Done!");
            activityScore.completeCnt(scope.target.$id, scope.target.topic)
            //Update Activity
          }
          scope.$digest();
        }

        //Regular Case of code
        // Run the Code Btn Click
        scope.runOpenCpu = function(ele){
          ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
          var req = ocpu.rpc("runSrc", {
            text : ele.code
          }, function(output){


            //scope.target.$id

            //console.log(output.message);
            console.log(output);
            ele.result=output.value;
            scope.$digest();

            //$(function(){
            //  $(".result-code").typed({
            //    strings: [ele.result.toString()],
            //    typeSpeed: 0,
            //    showCursor: false,
            //    callback: scope.popCnt
            //  });
            //});
          });

          //if R returns an error, alert the error message
          req.fail(function(){
            ele.result = req.responseText;
            scope.$digest();
            $(function(){
              $(".result-code").typed({
                strings: [ele.result.toString()],
                typeSpeed: 2,
                showCursor: false,
              });
            });
          });
        }


        //Regular Case of code
        scope.exePlot = function(ele) {
          ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
          var ticker = $("#ticker").val();
          var req = $("#plotdiv").rplot("runSrc", {
            text : ele.code
          })

          //optional: add custom callbacks
          req.fail(function(){
            alert("R returned an error: " + req.responseText);
          });
        }

        scope.checkRecord = function() {
          console.log(scope.target);
          console.log(materials);
          console.log(challenge);
        }


        scope.items = [1,2,3,4,5];
        scope.selected = [];
        scope.toggle = function (item, list) {
          var idx = list.indexOf(item);
          if (idx > -1) list.splice(idx, 1);
          else list.push(item);
        };
        scope.exists = function (item, list) {
          return list.indexOf(item) > -1;
        };

        //(function(d, s, id) {
        //  var js, fjs = d.getElementsByTagName(s)[0];
        //  if (d.getElementById(id)) return;
        //  js = d.createElement(s); js.id = id;
        //  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=153541338330247";
        //  fjs.parentNode.insertBefore(js, fjs);
        //}(document, 'script', 'facebook-jssdk'));
      }
    };
  });