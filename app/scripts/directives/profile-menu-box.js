'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:profileMenuBox
 * @description
 * # profileMenuBox
 */
angular.module('statsdsuApp')
  .directive('profileMenuBox', function () {
    return {
      templateUrl: 'views/templates/profile/menu-box.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });