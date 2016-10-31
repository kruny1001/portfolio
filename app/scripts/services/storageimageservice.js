'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.storageImageService
 * @description
 * # storageImageService
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('storageImageService', function () {
    // Service logic
    // ...

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();


    // Public API here
    return {
      storageRef: function () {
        return storage.ref();
      }
    };
  });
