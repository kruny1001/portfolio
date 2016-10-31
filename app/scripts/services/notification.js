'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.notification
 * @description
 * # notification
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('notification', function ($firebaseArray, $firebaseObject, $firebaseAuth) {
    var Auth = $firebaseAuth();
    var userAuth = Auth.$getAuth();
    var ref = firebase.database().ref().child('notification');

    // Public API here
    return {
      getUserUid: getUserUid,
      listNotification: listNotification,
      addNotification: addNotification,
      updateNotification: updateNotification,
    };
    function getUserUid(){
      console.log(userAuth);
    }

    function listNotification() {
      var targetRef = ref.child(userAuth.uid);
      return $firebaseArray(targetRef);
    }

    function addNotification(cnt) {
      var targetRef = ref.child(cnt.targetUser);
      console.log(targetRef);
      var targetList = $firebaseArray(targetRef);
      targetList.$add(cnt);
    }

    function updateNotification(rec, index){
      var targetRef = ref.child(userAuth.uid).child('unread');
      var unreadList = $firebaseArray(targetRef);
    }

    function deleteAll(){
      var targetRef = ref.child(userAuth.uid).child('unread');
      var list = $firebaseObject(targetRef);
      list.$remove();
    }
  });

