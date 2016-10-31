'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:TimelinesCtrl
 * @description
 * # TimelinesCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('TimelinesCtrl', function ($scope, $firebaseArray) {
    var timeLineRef = firebase.database().ref('timelines');
    $scope.timelines = $firebaseArray(timeLineRef)

    $scope.addNewTimeline = function(){}
    $scope.editTimeline = function(){}

    $scope.timelines = [
      {title:'Data Science Master Program (SDSU)', desc:'', date:'December 2017'},
      {title:'Stabilizing Kiosk & Digital Signage (YBROAD)', desc:'', date:'Septembr 2016'},
      {title:'Redesign User Interface (STATSDSU)', desc:'', date:'December 2016'},
      {title:'Start Data Camp for High School Students (STATSDSU)', desc:'', date:'June 2016'},
      {title:'Production Ready (STATSDSU)', desc:'', date:'June 2016'}

    ]
  });
