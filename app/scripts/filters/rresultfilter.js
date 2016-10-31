'use strict';

/**
 * @ngdoc filter
 * @name statsdsuApp.filter:rResultFilter
 * @function
 * @description
 * # rResultFilter
 * Filter in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .filter('rResultFilter', function () {
    return function (input) {
      if(_.isArray(input))
        if(input.length > 1)
          return input
        else
          return input[0]
    };
  });

