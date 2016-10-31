/**
 * @ngdoc function
 * @name statsdsuApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('statsdsuApp')
  .directive('ngShowAuth', ['$firebaseAuth', '$timeout', function ($firebaseAuth, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        var Auth = $firebaseAuth();
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !Auth.$getAuth());
          }, 0);
        }

        Auth.$onAuthStateChanged(update);
        update();
      }
    };
  }]);
