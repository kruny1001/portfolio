'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:QuiztestCtrl
 * @description
 * # QuiztestCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('QuiztestCtrl', function ($scope) {
    $scope.quiz = {description: 'What is the ', options: ['cool', 'boom', 'good'], answer:2}
    $scope.quiz2 = {description: 'Select this this this ', options: ['cool', 'boom', 'good'], answer:2}
    $scope.quiz3 = {description: 'Select this this this ', options: ['cool', 'boom', 'good'], answer:2}
  });
