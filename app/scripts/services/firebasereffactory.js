'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.FirebaseRefFactory
 * @description
 * # FirebaseRefFactory
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('FirebaseRefFactory', function($firebaseArray){
    var ref = firebase.database().ref()
    var targetRef;

    return {
      arrayObj: function(){
        return $firebaseArray(targetRef);
      },
      getRef: function(){
        return targetRef;
      },
      setRef: function(refName){
        //console.log(refName);
        targetRef = ref.child(refName);
      }
    }
  })
