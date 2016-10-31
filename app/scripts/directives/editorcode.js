'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:editorCode
 * @description
 * # editorCode
 */
angular.module('statsdsuApp')
  .directive('editorCode', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the editorCode directive');
      }
    };
  });