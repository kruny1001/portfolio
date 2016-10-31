'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:ClassCtrl
 * @description
 * # ClassCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('ClassCtrl', function ($scope, $routeParams,
    Class, Course
  ) {
    var classId = $routeParams.id;
    $scope.classInfo = Class.getInfo(classId);
    $scope.classInfo.$loaded().then(function(data){
      console.log(data);
      $scope.childCourses = Course.listQuery(data.$id);
    });




  });
