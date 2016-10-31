'use strict';

/**
 * @ngdoc filter
 * @name statsdsuApp.filter:ethinicityFilter
 * @function
 * @description
 * # ethinicityFilter
 * Filter in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .filter('ethinicityFilter', function () {
    return function (input) {
      var ethinicity = "";
      if(input =="e1"){
        ethinicity ="Asian or Pacific Islander";
      }
      else if(input =="e2"){
        ethinicity="Indian"
      }
      else if(input =="e3"){
        ethinicity="Black/African American (non-Hispanic)"
      }
      else if(input =="e4"){
        ethinicity="Caucasian/White"
      }
      else if(input =="e5"){
        ethinicity="Native American"
      }
      else if(input =="e6"){
        ethinicity="Latino/Hispanic"
      }
      else if(input =="e7"){
        ethinicity="Puerto Rican"
      }
      else if(input =="e99"){
        ethinicity="Prefer not to answer"
      }
      return ethinicity
    };
  });

