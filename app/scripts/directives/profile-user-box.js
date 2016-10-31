'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:profileUserBox
 * @description
 * # profileUserBox
 */
angular.module('statsdsuApp')
  .directive('profileUserBox', function () {
    return {
      templateUrl: 'views/templates/profile/user-box.html',
      scope:{info:'='},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });