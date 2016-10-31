'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.runSrc
 * @description
 * # runSrc
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('runSrc', function () {

    ocpu.seturl("//kruny1001.ocpu.io/rRemoteSDSU/R");
    var meaningOfLife = 42;

    // Public API here
    return {
      runR: function (code) {

        return ocpu.call("runSrc", {
          text: code
        }, function(output){
        }).fail(function(text){
        });


      }
    };
  });
