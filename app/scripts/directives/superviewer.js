'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:superViewer
 * @description
 * # superViewer
 */
angular.module('statsdsuApp')
  .directive('superViewer', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the superViewer directive');
      }
    };
  });