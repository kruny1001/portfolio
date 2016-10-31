'use strict';

/**
 * @ngdoc service
 * @name statsdsuApp.activityScore
 * @description
 * # activityScore
 * Factory in the statsdsuApp.
 */
angular.module('statsdsuApp')
  .factory('activityScore', function ($firebaseObject, $firebaseAuth) {
    var Auth = $firebaseAuth();
    var userAuth = Auth.$getAuth();
    var ref = firebase.database().ref().child('actScore');

    // Public API here
    return {
      incScore: function (val) {
        var targetRef = ref.child(userAuth.uid).child('score');
        targetRef.transaction(function(crtData){
          var score = (crtData || 0) + val;
          setLevel(score);
          return score;
        });
      },
      decScore: function (val) {
        var targetRef = ref.child(userAuth.uid).child('score');
        targetRef.transaction(function(crtData){
          var score = (crtData || 0) - val;
          setLevel(score);
          return score;
        });
      },
      getScore: function(){
        var targetRef = ref.child(userAuth.uid).child('score');
        return $firebaseObject(targetRef);
      },
      completeCnt: function(cntId, courseName){
        var targetRef = ref.child(userAuth.uid).child('completeCourse').child(cntId);
        targetRef.set({topic:courseName});
      }
    };
    function setLevel(score){

      var targetRef = ref.child(userAuth.uid);
      targetRef.update({level:1});
    }
  });

