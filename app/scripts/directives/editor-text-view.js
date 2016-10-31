'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:editorTextView
 * @description
 * # editorTextView
 */
angular.module('statsdsuApp')
  .directive('editorTextView', function (SECArray, SECService) {
    return {
      scope:{
        editId: '@',
        target: '=',
        mode:'@',
        index:'@',
        cnt:'='
      },
      templateUrl: 'views/templates/superEditor/editor-text.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.SEC = scope.cnt;
        //console.log(scope.SEC);

        //scope.target = scope.SEC;
        scope.editor = false;
        scope.tool = true;
        if(scope.mode==='read'){
          scope.editor = true;
          scope.tool = false;
        } else {
          scope.disabled = false;
        }

        scope.deleteElement = function(){
          SECArray.removeElement(scope.SEC.uid)
          element.empty();
          scope.$destroy();
        }
      }
    };
  })


  .directive('editorTextViewCnt', function (SECArray, SECService) {
    return {
      scope:{
        editId: '@',
        cnt: '=',
        mode:'@',
        index:'@'
      },
      template:
      //'<div ng-show="!editor" text-angular="text-angular"  ng-model="cnt.cnt"></div>' +
      '<div style="background-color: white;" ng-show="editor" ta-bind="text" ng-model="SEC.cnt" ta-readonly="disabled"></div>',
      //+ '<div ng-show="editor" ng-bind-html="SEC.cnt"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.SEC = SECArray.getElement(scope.index)
        //console.log(scope.SEC)
        scope.editor = false;
        scope.tool = true;
        if(scope.mode==='read'){
          scope.editor = true;
          scope.tool = false;
        } else{
          scope.editor = false;
          scope.tool = true;
        }

        scope.deleteElement = function(){
          SECArray.removeElement(scope.target)
          element.empty();
          scope.$destroy();
        }
      }
    };
  });