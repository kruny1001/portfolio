'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:ChapterDetailCtrl
 * @description
 * # ChapterDetailCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('ChapterDetailCtrl', function ($scope, $routeParams,
    Course
  ) {
    var courseId = $routeParams.id;
    $scope.courseInfo = Course.getInfo(courseId);
    $scope.courseInfo.$loaded().then(function(data){console.log(data)})
  });
