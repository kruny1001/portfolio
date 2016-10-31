'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:pubInfo
 * @description
 * # pubInfo
 */
angular.module('statsdsuApp')
  .directive('pubInfo', function () {
    return {
      templateUrl: 'views/directives/pub-info.html',
      scope:{pub:'='},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });