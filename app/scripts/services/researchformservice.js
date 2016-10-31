'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.ResearchFormService
 * @description
 * # ResearchFormService
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('ResearchFormService', function ($q, $firebaseObject, $firebaseArray) {
    var ref = firebase.database().ref()
    var researchRef = ref.child('newUsers');
    // Public API here
    return {
      addNewResearch: function(newObj){
        var deferred = $q.defer();
        var newResearch = researchRef.child(newObj.phone)
        newResearch.set(newObj, function(error) {
            if (error) {
              deferred.reject(error);
            } else {
              deferred.resolve(newObj)
            }
        })
        return deferred.promise;
      },
      listResearches: function(){
        return $firebaseArray(researchRef);
      },
      findRegister: function(registerId){
        return $firebaseObject(researchRef.child(registerId))
      },
      setStatus: function(){
        //Get User Id
        //Set True
      }
    };
  });
