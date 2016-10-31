'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:EditRegisterformCtrl
 * @description
 * # EditRegisterformCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('EditRegisterformCtrl', function ($scope, $location, $mdDialog, $routeParams, $mdMedia, $log, ResearchFormService) {

    var registerId = $routeParams.registerId;
    $scope.registerInfo =  ResearchFormService.findRegister(registerId);

    $scope.submit = function(){
      var promise = ResearchFormService.addNewResearch($scope.data);
      promise.then(function(result){}, fun)
    }

    $scope.updateNewUser = function(){
      $scope.registerInfo.$save().then(function(ref) {
        $scope.confirm();
      })
    }

    $scope.confirm = function() {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
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
