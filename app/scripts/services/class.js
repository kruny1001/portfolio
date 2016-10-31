'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.class
 * @description
 * # class
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('Class', function ($firebaseObject, $firebaseArray) {

    var ref = firebase.database().ref()
    var courseRef = ref.child('course');
    var classRef = ref.child('classes');

    // Public API here
    return {
      create: function(classObj){
        var newClassRef = classRef.push();
        classObj.pubStatus = true;
        classObj.createdAt = firebase.database.ServerValue.TIMESTAMP

        console.log(classObj);
        newClassRef.set(classObj);
      },
      update: function(id, classObj){
        console.log(classObj);
        delete classObj.$$hashKey;
        delete classObj.$$mdSelectId;
        delete classObj.$priority;
        delete classObj.$id;
        classObj.updatedAt = firebase.database.ServerValue.TIMESTAMP
        classRef.child(id.toString()).update(classObj);
      },
      list: function(){
        return $firebaseArray(classRef);
      },
      remove: function(id){
        var onComplete = function(error) {
          if (error) {
            console.log('Remove Data failed');
          } else {
            console.log('Remove Data succeeded');
          }
        };
        classRef.child(id).remove(onComplete);
      },
      publish: function(id){
        classRef.child(id).update({pubStatus: true});
      },
      unpublish: function(id){
        classRef.child(id).update({pubStatus: false});
      },
      getInfo: function(id){
        return $firebaseObject(classRef.child(id));
      },
      getChildCourse: function(){}

    };
  });
