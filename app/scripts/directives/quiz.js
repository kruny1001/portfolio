'use strict';

/**
 * @ngdoc directive
 * @name statsdsuApp.directive:quiz
 * @description
 * # quiz
 */
angular.module('statsdsuApp')
  .directive('quiz', function ($window) {
    return {
      templateUrl: 'views/templates/quiz/quiz.html',
      scope:{quizObj: '='},
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    }
  });