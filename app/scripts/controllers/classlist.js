'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:ClasslistCtrl
 * @description
 * # ClasslistCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('ClasslistCtrl', function ($scope, $location,$interval,
                                         Class, Course
  ) {
    $scope.classes = Class.list();
    $scope.courses = Course.list();

    TweenMax.from('.logo', 1, {opacity:0.5, rotation:45});
    $scope.goto = function(path){
      $location.path( path );
    }
  });
