'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('UserListCtrl', function ($scope, $firebaseArray) {
    var usersRef = firebase.database().ref().child('newUsers');
    var query = usersRef.orderByChild('createAt');
    $scope.users = $firebaseArray(query);

    $scope.sendEmail = function(){
    }

      $scope.users.$loaded().then(function(){
          console.table($scope.users, ["fName", "lName", "school", "phone", "userEmail"])
      })

  });
