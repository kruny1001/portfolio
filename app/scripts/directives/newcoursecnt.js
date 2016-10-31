'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:newCourseCnt
 * @description
 * # newCourseCnt
 */
angular.module('statsdsuApp')
  .directive('newCourseCnt', function () {
    return {
      templateUrl: 'views/templates/newCourseCntDirective.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });