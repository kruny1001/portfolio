'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:ClassesCtrl
 * @description
 * # ClassesCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('ClassesCtrl', function ($scope, Class, Course, Chapter) {
    $scope.classes = Class.list();
    $scope.toggleDetail = false;
    $scope.expandClass = function(targetClass){
      targetClass.toggleDetail = !targetClass.toggleDetail
      targetClass.courses = Course.listQuery(targetClass.$id);
      targetClass.courses.$loaded().then(function(snapshot){
        snapshot.forEach(function(course, index){
          targetClass.courses[index].chapter = Chapter.listByCourseId(course.$id)
        })
      })
      console.log(targetClass)
    }
    /*
    {"createdAt":1452953549888,
    "description":"Math Category",
    "instructor":{"provider":"facebook","uid":"facebook:10153059062650800"},
    "pubStatus":true,
    "title":"Math","$id":"-K89lvjTjVnVKZNO7N45","$priority":null}
    * */
  });
