'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:RegisterformCtrl
 * @description
 * # RegisterformCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('RegisterformCtrl', function ($scope, $location, $mdDialog, $http, $mdMedia, $log, ResearchFormService) {

    $scope.userInfo = {};
    $scope.submit = function(){
      var promise = ResearchFormService.addNewResearch($scope.data);
      promise.then(function(result){}, fun)
    }

    $scope.addNewUser = function(){
      $scope.userInfo.createAt = firebase.database.ServerValue.TIMESTAMP;
      var addWork = ResearchFormService.addNewResearch($scope.userInfo);
      addWork.then(function(result){
        $http({
          method:'POST',
          url:' https://ybroad-kfpd.herokuapp.com/statsdsu/sendConfirmEmail',
          data: {userInfo:result}
        })
        $scope.confirm();
      }, function(err){
        alert(err);
      });

    }

    $scope.userInfo.gender = 'g1';
    $scope.userInfo.ethnicity = 'e1';
    $scope.confirm = function() {
      var confirm = $mdDialog.confirm()
        .title('Thank you')
        .textContent('We are going to send email if you are selected for this camp.')
        .ok('Okay')
        .targetEvent()
      $mdDialog.show(confirm)
        .then(function(result) {
          $location.path('/')
      });
    };
  });
