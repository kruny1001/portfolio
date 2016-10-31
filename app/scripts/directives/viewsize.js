'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:viewSize
 * @description
 * # viewSize
 */
angular.module('statsdsuApp')
  .directive('viewSize', function ($rootScope, $mdMedia) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(function() { return $mdMedia('xs'); }, function(xs) {
          $rootScope.xsScreen = xs;
          //console.log('xs');
        });
        scope.screenIsSmall = $mdMedia('sm');
        scope.customQuery = $mdMedia('(min-width: 1234px)');
        scope.anotherCustom = $mdMedia('max-width: 300px');
      }
    };
  });