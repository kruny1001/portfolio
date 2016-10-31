'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.intro
 * @description
 * # intro
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('intro', function ($firebaseArray) {

    var introRef = firebase.database().ref().child('introProblem');
    var visRef = firebase.database().ref().child('visProblem');
    // Service logic
    // ...

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      course: function(){
        return $firebaseArray(introRef);
      },
      courseVis: function() {
        return $firebaseArray(visRef);
      }
    };
  });
