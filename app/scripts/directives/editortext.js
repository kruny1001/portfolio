'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:editorText
 * @description
 * # editorText
 */
angular.module('statsdsuApp')
  .directive('editorText', function (SECArray, SECService) {
    return {
      scope:{
        editId: '@',
        target: '@',
        mode:'@'
      },
      template: '<div ng-show="tool"><md-button ng-click="editor = !editor">Edit</md-button>' +
      '<md-button ng-click="deleteElement()">Delete</md-button></div>' +
      //  '<pre>{{editId}}</pre>'+
      //'<pre>{{target}}</pre>'+
      '<div ng-show="!editor" text-angular="text-angular"  ng-model="SEC.cnt"></div>' +
      '<div ng-show="editor" ng-bind-html="SEC.cnt"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.SEC = SECArray.getElement(scope.target)
        scope.editor = false;
        scope.tool = true;
        if(scope.mode==='read'){

          scope.editor = true;
          scope.tool = false;
        }

        scope.deleteElement = function(){
          SECArray.removeElement(scope.target)
          element.empty();
          scope.$destroy();
        }
      }
    };
  });