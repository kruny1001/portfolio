'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.dataset
 * @description
 * # dataset
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('dataset', function () {
    // Service logic
    // ...

    var dataset1 = 'a <- c(1,2,5,3,6,-2,4)'

    // Public API here
    return {
      getDataset1: function () {
        return dataset1;
      }
    };
  });
