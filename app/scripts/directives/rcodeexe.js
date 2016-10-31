'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:rCodeExe
 * @description
 * # rCodeExe
 */

angular.module('statsdsuApp')
  .directive('rCodeExe', function ($timeout, rpcFactory, activityScore, SECArray, SECService) {
    return {
      templateUrl: 'views/templates/superEditor/r-code-exe.html',
      scope: {target: '@', mode:'@', cnt:'=', index:'@', code:'='},
      restrict: 'E',
      replace: true,
      link: {
        pre: function preLink(scope, element, attrs){
          var number =false;
          var theme = 'chrome';
          //Read Content
          scope.SEC = scope.cnt; // SECArray.getElement(scope.index);
          if(scope.SEC.codeOnly !== undefined)
          {
            number = false;
            theme = 'chrome'
          }
          scope.aceOption =  {
            useWrapMode: false,
            autoScrollEditorIntoView: false,
            //minLines: 5,
            showGutter: number,
            theme: theme,
            maxLines: Infinity,
            mode: 'r',
            onLoad: function (_ace) {
              //console.log(element);
              _ace.renderer.setScrollMargin(10, 10)
              _ace.$blockScrolling =Infinity;
              if(scope.SEC.codeOnly && scope.mode != 'edit')
                _ace.setReadOnly(true);
              //var Range = ace.require('ace/range').Range;
              //_ace.getSession().addMarker(new Range(0, 5, 0, 16),"warning", "text");

              if(_ace.getSession().getScreenLength() == 0){
                //console.log('No Code')

                var newHeight =
                  1 * _ace.renderer.lineHeight + _ace.renderer.scrollBar.getWidth() +20;
                element.find('.course-ui-ace ').height((newHeight).toString() + "px");
                //console.log('target');
                _ace.resize();
              }else{
                //console.log('Code')
                //var newHeight =
                //  //(_ace.getSession().getScreenLength() + 1)
                //  (scope.SEC.code.split(/\r\n|\r|\n/).length)
                //  * 16
                //  + _ace.renderer.scrollBar.getWidth() +30;
                //console.log(_ace.getSession().getScreenLength(), _ace.renderer.lineHeight, _ace.renderer.scrollBar.getWidth())
                //console.log(newHeight);
                //element.find('.course-ui-ace ').height((newHeight).toString() + "px");
                ////_ace.resize();
              }
            },
            onChange: function(_ace) {
              //console.log("onChange")
              var newHeight =
                (_ace[1].getSession().getScreenLength()+1)
                //* _ace[1].renderer.lineHeight
                * 16
                + _ace[1].renderer.scrollBar.getWidth() + 16;

              //console.log(_ace[1].getSession().getScreenLength(), _ace[1].renderer.lineHeight, _ace[1].renderer.scrollBar.getWidth())
              element.find('.course-ui-ace').height(newHeight.toString() + "px");
              element.find('.ace_content').height(newHeight.toString() + "px");
              //_ace[1].resize();
              //_ace[1].resize(true);
            }
          }
        },
        post: function postLink(scope, element, attrs) {
          scope.tool = true;
          scope.activate = false;
          scope.isRunning =false;
          scope.success = false;
          if(scope.SEC.result === undefined)
            scope.SEC.result = null;
          //scope.SEC.graphOnly = false;
          scope.SEC.result = null;

          scope.deleteElement = function(){
            SECArray.removeElement(scope.SEC.uid)
            //console.log(SECArray.getCnt())
            element.empty();
            scope.$destroy();
          }

          scope.popCnt = function () {
            //console.log(scope.target.$id)
            if (materials.length != 0) {
              scope.history.push({cnt: _.first(materials), type: 'material'})
              //console.log('ddd ' + materials);
              _.pullAt(materials, 0);
            } else if (materials.length == 0 && challenge != 0) {
              scope.history.push({cnt: _.first(challenge), type: 'challenge'})
              _.pullAt(challenge, 0);
            } else {
              alert("Done!");
              activityScore.completeCnt(scope.target.$id, scope.target.topic)
              //Update Activity
            }
            scope.$digest();
          }

          //Regular Case of code
          // Run the Code Btn Click
          scope.runTest = function(code){
            scope.isRunning =true;
            //alert(ele.code);
            ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
            var req = ocpu.rpc(code, {}, function (output) {
              scope.$digest();
              console.log(output);
            });
            //if R returns an error, alert the error message
            req.fail(function () {
              scope.isRunning =false;
            });
          }

          scope.runOpenCpu = function (ele) {
            scope.isRunning =true;
            //alert(ele.code);
            ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
            var json;
            var consoleVal;
            var req = ocpu.call("runSrc", {
              text: ele.code
            }, function (output) {
              //scope.target.$id
              //console.log(output.message);
              scope.isRunning =false;

              output.getObject(function(outtxt){
                scope.isRunning =false;
                console.log(outtxt)
                json = JSON.parse(outtxt);
                console.log(json);
                  console.log(ele.result)
                if(json.visible){
                  ele.result =json.value.toString();
                } else {
                  ele.result = consoleVal;
                }
              });
              output.getConsole( function(val){
                console.log('getConsole')
                // break the textblock into an array of lines
                val = val.replace('\t','');
                var lines = val.split('\n');
                // remove one line, starting at the first position
                lines.splice(0,1);
                // join the array back into a single string
                var newtext = lines.join('\n');

                consoleVal = newtext;
                //ele.result = val;
                console.log(val);
                if(json.visible){
                  ele.result =json.value.toString();
                } else {
                  ele.result = consoleVal;
                }
              } )
              //console.log(output.getKey());
              //ele.result = output.value;
              scope.$digest();
            });
            req.success(function(session){
              scope.success = true;
              console.log(session);
              var result = [];
            })
            //if R returns an error, alert the error message
            req.fail(function () {
              scope.isRunning =false;
              ele.result = req.responseText;
              scope.$digest();
              $(function () {
                $(".result-code").typed({
                  strings: [ele.result.toString()],
                  typeSpeed: 2,
                  showCursor: false,
                });
              });
            });
          }

          //Regular Case of code
          scope.exePlot = function (ele) {
            scope.isRunning =true;
            ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
            scope.success = true;
            //console.log(console.log(element[0].querySelector('.plotdiv')))
            var req = $(element[0].querySelector('.plotdiv')).rplot("runSrc", {
              text: ele.code
            })
            req.success(function(session){
              scope.isRunning =false;
              scope.$digest();
            })
            req.fail(function () {
              scope.success = false;
              alert("R returned an error: " + req.responseText);
            });
          }
          if(scope.SEC.graphOnly){

            $timeout(function(){
              scope.exePlot(scope.SEC);
            })

          }
        }
      }
    };
  })
  .directive("contenteditable", function() {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {

        function read() {
          ngModel.$setViewValue(element.html());
        }

        ngModel.$render = function() {
          element.html(ngModel.$viewValue || "");
        };

        element.bind("blur keyup change", function() {
          scope.$apply(read);
        });
      }
    };
  })
  .directive('rCodeExeView', function (rpcFactory, activityScore, SECArray, SECService) {
  return {
    templateUrl: 'views/templates/superEditor/r-code-exe.html',
    scope: {target: '@', cnt:'=', mode:'@'},
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      var session ="";
      if(scope.mode === 'read')
        scope.cmdCode = true

      scope.tool = true;
      //scope.targetObj = {
      //  topic: 'Line Charts',
      //  desc: 'First we will produce a very simple graph using the values in the car vector',
      //  crntContent: '123',
      //  code: '# Define the cars vector with 5 values\n'
      //  + 'cars <- c(1, 3, 6, 4, 9)\n'
      //  + '# Graph the cars vector with all defaults\n'
      //  + 'plot(cars)\n'
      //};

      scope.SEC = scope.cnt;
      if(scope.SEC.title === undefined)
        scope.SEC.title = '';
      if(scope.SEC.desc === undefined)
        scope.SEC.desc = '';

      if (scope.target !== undefined) {
        scope.crntContent = '123'
      }

      //scope.aceLoaded  = function (_editor) {
      //
      //  _editor.setValue('hello');
      //
      //  // This is to remove following warning message on console:
      //  // Automatically scrolling cursor into view after selection change this will be disabled in the next version
      //  // set editor.$blockScrolling = Infinity to disable this message
      //  _editor.$blockScrolling = Infinity;
      //  alert('1');
      //}
      //scope.aceChanged =  function(_ed){
      //  //console.log(_ed);
      //}

      scope.deleteElement = function(){
        console.log(scope.target)
        //SECArray.removeElement(scope.target)
        //element.empty();
        //scope.$destroy();
      }

      scope.popCnt = function () {
        if (materials.length != 0) {
          scope.history.push({cnt: _.first(materials), type: 'material'})
          _.pullAt(materials, 0);
        } else if (materials.length == 0 && challenge != 0) {
          scope.history.push({cnt: _.first(challenge), type: 'challenge'})
          _.pullAt(challenge, 0);
        } else {
          alert("Done!");
          activityScore.completeCnt(scope.target.$id, scope.target.topic)
          //Update Activity
        }
        scope.$digest();
      }

      //Regular Case of code
      // Run the Code Btn Click
      scope.runOpenCpu = function (ele) {
        //alert(ele.code);
        if(session==="")
          ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
        else //http://tmp.ocpu.io/x0f18843030/
          ocpu.seturl("//tmp.ocpu.io/"+session+"/R");
        var req = ocpu.call("runSrc", {
          text: ele.code
        }, function (output) {
          //scope.target.$id
          session = output.getKey();
          output.getObject(function(outtxt){
            //console.log(outtxt)
            ele.result = outtxt.value;
          });

          //console.log(output.getFileURL())
          //ele.result = output.value;
          scope.$digest();
        });
        //if R returns an error, alert the error message
        req.fail(function () {
          ele.result = req.responseText;
          scope.$digest();
          $(function () {
            $(".result-code").typed({
              strings: [ele.result.toString()],
              typeSpeed: 2,
              showCursor: false,
            });
          });
        });
      }

      //Regular Case of code
      scope.exePlot = function (ele) {
        ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
        var ticker = $("#ticker").val();
        var req = $("#plotdiv").rplot("runSrc", {
          text: ele.code
        })
        //optional: add custom callbacks
        req.fail(function () {
          alert("R returned an error: " + req.responseText);
        });
      }
      scope.checkRecord = function () {
      }
    }

  };
});