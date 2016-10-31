'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:UserinfoCtrl
 * @description
 * # UserinfoCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('UserinfoCtrl', function ($scope, $routeParams, $location, $firebaseObject) {
    var user_id = $routeParams.user_id
    var userRef = firebase.database().ref().child('users/'+user_id);
    $scope.userInfo = $firebaseObject(userRef);
    $scope.userRole = $scope.userInfo.Role;
    $scope.roles = ["Student", "Admin"];

    $scope.save = function(){
      $scope.userInfo.Role = $scope.userRole;
      $scope.userInfo.$save();
      $location.path('admin');
    }
  });
