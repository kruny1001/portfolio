'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:SuperBlogListCtrl
 * @description
 * # SuperBlogListCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('SuperBlogListCtrl', function ($scope, $firebaseArray) {
    var ref = firebase.database().ref().child('materials-test')
    $scope.materials = $firebaseArray(ref);
  });
