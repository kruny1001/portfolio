'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.errHandler
 * @description
 * # errHandler
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('errHandler', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
