'use strict';

/**
 * @ngdoc filter
 * @name statsdsuApp.filter:genderFilter
 * @function
 * @description
 * # genderFilter
 * Filter in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .filter('genderFilter', function () {
    return function (input) {
      var gender = "";
      if(input =='g1')
        gender = "Male"
      else
        gender = "Female"
      return gender;
    };
  });

